import pool from '@/lib/db'

export async function POST(req) {
  try {
    const { id_paciente, id_dentista, data, hora, procedimento } = await req.json();

    // 1. Verifica se já existe prontuário
    let prontuarioId = null; 
    const resPront = await pool.query(
      `SELECT id_prontuario FROM prontuario WHERE id_paciente = $1`,
      [id_paciente]
    );

    if (resPront.rows.length > 0) {
      prontuarioId = resPront.rows[0].id_prontuario;
    } else {
      const novoPront = await pool.query(
        `INSERT INTO prontuario (id_paciente, data_abertura)
         VALUES ($1, NOW())
         RETURNING id_prontuario`,
        [id_paciente]
      );
      prontuarioId = novoPront.rows[0].id_prontuario;
    }

    // 2. Valida consultas duplicadas
   const consultaExistente = await pool.query(
  `SELECT * FROM consulta 
   WHERE id_paciente = $1 AND data >= CURRENT_DATE AND status = 'Agendada'`,
  [id_paciente]
);

    if (consultaExistente.rows.length > 0) {
      return new Response(
        JSON.stringify({ error: "Paciente já possui uma consulta agendada." }),
        { status: 400 }
      );
    }

    // 3. Verifica disponibilidade do dentista
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

    // 4. Insere a consulta
    const result = await pool.query(
      `INSERT INTO consulta (id_paciente, id_dentista, id_prontuario, data, hora, status)
       VALUES ($1, $2, $3, $4, $5, 'Agendada')
       RETURNING id_consulta`,
      [id_paciente, id_dentista, prontuarioId, data, hora]
    );

    const id_consulta = result.rows[0].id_consulta;

    // 5. Insere procedimento automaticamente
    if (procedimento) {
      await pool.query(
        `INSERT INTO procedimento_consulta (id_consulta, id_procedimento, quantidade, preco_aplicado)
         SELECT $1, id_procedimento, 1, preco
         FROM procedimento
         WHERE id_procedimento = $2`,
        [id_consulta, procedimento]
      );
    }

    // 6. Retorna sucesso
    return new Response(
      JSON.stringify({ message: "Consulta agendada com sucesso!", id_consulta, id_prontuario: prontuarioId }),
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
