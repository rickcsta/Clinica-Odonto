import pool from '@/lib/db'

export async function PUT(req) {
  try {
    const { id_consulta } = await req.json();

    const result = await pool.query(
      'UPDATE consulta SET status = $1 WHERE id_consulta = $2 RETURNING *',
      ['Cancelada', id_consulta]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Consulta não encontrada.' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Consulta cancelada!' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Erro ao cancelar consulta' }), { status: 500 });
  }
}
