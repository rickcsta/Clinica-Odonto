import pool from '../../../../lib/db'

export async function POST(req) {
  try {
    const { id_paciente, data, hora, motivo } = await req.json();

    const consultaExistente = await pool.query(
      `SELECT * FROM consulta 
       WHERE id_paciente = $1 AND data >= CURRENT_DATE AND status = 'agendada'`,
      [id_paciente]
    );

    if (consultaExistente.rows.length > 0) {
      return new Response(
        JSON.stringify({ error: "Paciente já possui uma consulta agendada." }),
        { status: 400 }
      );
    }

    await pool.query(
      `INSERT INTO consulta (id_paciente, data, hora, motivo, status)
       VALUES ($1, $2, $3, $4, 'agendada')`,
      [id_paciente, data, hora, motivo]
    );

    return new Response(JSON.stringify({ message: "Consulta agendada com sucesso!" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erro ao agendar consulta." }), {
      status: 500,
    });
  }
}
