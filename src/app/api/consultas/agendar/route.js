import pool from '@/lib/db'

export async function POST(req) {
  try {
    const { id_paciente, id_dentista, id_prontuario, data, hora, procedimentos } = await req.json();

    const consultaExistente = await pool.query(
      `SELECT * FROM consulta 
       WHERE id_paciente = $1 AND data = $2 AND status = 'agendada'`,
      [id_paciente, data]
    );

    if (consultaExistente.rows.length > 0) {
      return new Response(
        JSON.stringify({ error: "Paciente já possui uma consulta agendada para esta data." }),
        { status: 400 }
      );
    }

    const dentistaOcupado = await pool.query(
      `SELECT * FROM consulta 
       WHERE id_dentista = $1 AND data = $2 AND hora = $3 AND status = 'agendada'`,
      [id_dentista, data, hora]
    );

    if (dentistaOcupado.rows.length > 0) {
      return new Response(
        JSON.stringify({ error: "Dentista já possui consulta agendada neste horário." }),
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO consulta (id_paciente, id_dentista, id_prontuario, data, hora, status)
       VALUES ($1, $2, $3, $4, $5, 'agendada')
       RETURNING id_consulta`,
      [id_paciente, id_dentista, id_prontuario, data, hora]
    );

    const id_consulta = result.rows[0].id_consulta;

    if (procedimentos && procedimentos.length > 0) {
      for (const procedimento of procedimentos) {
        await pool.query(
          `INSERT INTO procedimento_consulta 
           (id_procedimento, id_consulta, quantidade, preco_aplicado)
           VALUES ($1, $2, $3, $4)`,
          [procedimento.id_procedimento, id_consulta, 
           procedimento.quantidade || 1, procedimento.preco_aplicado]
        );
      }
    }

    return new Response(
      JSON.stringify({ 
        message: "Consulta agendada com sucesso!", 
        id_consulta: id_consulta 
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