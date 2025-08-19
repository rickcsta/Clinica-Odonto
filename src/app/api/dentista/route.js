import pool from '@/lib/db'

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM dentista ORDER BY nome');
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro ao buscar dentistas' }), { status: 500 });
  }
}