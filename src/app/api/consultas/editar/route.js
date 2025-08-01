import pool from '../../../../lib/db'

export async function PUT(req) {
  try {
    const { id_consulta, data, hora } = await req.json();

    await pool.query(
      'UPDATE consulta SET data = $1, hora = $2 WHERE id_consulta = $3',
      [data, hora, id_consulta]
    );

    return new Response(JSON.stringify({ message: 'Consulta atualizada!' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Erro ao editar consulta' }), { status: 500 });
  }
}