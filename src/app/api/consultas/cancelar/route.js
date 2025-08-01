import pool from '../../../../lib/db'

export async function DELETE(req) {
  try {
    const { id_consulta } = await req.json();

    await pool.query('DELETE FROM consulta WHERE id_consulta = $1', [id_consulta]);

    return new Response(JSON.stringify({ message: 'Consulta cancelada!' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Erro ao cancelar consulta' }), { status: 500 });
  }
}