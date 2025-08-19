import pool from '@/lib/db'

export async function POST(req) {
  try {
    const { id_paciente, id_dentista, data, hora, procedimentos } = await req.json();



// 1. Verifica se já existe prontuário
let prontuarioId = null; 
const resPront = await pool.query(
  `SELECT id_prontuario FROM prontuario WHERE id_paciente = $1`,
  [id_paciente]
);

if (resPront.rows.length > 0) {
  prontuarioId = resPront.rows[0].id_prontuario;
} else {
  // 2. Cria novo prontuário se não existir
  const novoPront = await pool.query(
    `INSERT INTO prontuario (id_paciente, data_abertura)
     VALUES ($1, NOW())
     RETURNING id_prontuario`,
    [id_paciente]
  );
  prontuarioId = novoPront.rows[0].id_prontuario;
}

    // 3. Valida se já existe consulta agendada no mesmo dia para o paciente
    const consultaExistente = await pool.query(
      `SELECT * FROM consulta 
       WHERE id_paciente = $1 AND data = $2 AND status = 'Agendada'`,
      [id_paciente, data]
    );

    if (consultaExistente.rows.length > 0) {
      return new Response(
        JSON.stringify({ error: "Paciente já possui uma consulta agendada para esta data." }),
        { status: 400 }
      );
    }

    // 4. Valida se o dentista está ocupado nesse horário
    const dentistaOcupado = await pool.query(
      `SELECT * FROM consulta 
       WHERE id_dentista = $1 AND data = $2 AND hora = $3 AND status = 'Agendada'`,
      [id_dentista, data, hora]
    );

    if (dentistaOcupado.rows.length > 0) {
      return new Response(
        JSON.stringify({ error: "Dentista já possui consulta agendada neste horário." }),
        { status: 400 }
      );
    }

    // 5. Insere a consulta
    const result = await pool.query(
      `INSERT INTO consulta (id_paciente, id_dentista, id_prontuario, data, hora, status)
       VALUES ($1, $2, $3, $4, $5, 'Agendada')
       RETURNING id_consulta`,
      [id_paciente, id_dentista, prontuarioId, data, hora]
    );

    const id_consulta = result.rows[0].id_consulta;

    // 6. Insere procedimento se houver
   if (procedimentos && procedimentos.length > 0) {
  for (const proc of procedimentos) {
    if (!proc.id_procedimento) continue; // ignora procedimentos inválidos
    await pool.query(
      `INSERT INTO procedimento_consulta 
       (id_procedimento, id_consulta, quantidade, preco_aplicado)
       VALUES ($1, $2, $3, $4)`,
      [proc.id_procedimento, id_consulta, proc.quantidade || 1, proc.preco_aplicado || 0]
    );
  }
}

    return new Response(
      JSON.stringify({ 
        message: "Consulta agendada com sucesso!", 
        id_consulta: id_consulta,
        id_prontuario: prontuarioId
      }), 
      { status: 200 }
    );

  } catch (error) {
    console.error("Erro ao agendar consulta:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno ao agendar consulta." }), 
      { status: 500 }
    );
  }
}
