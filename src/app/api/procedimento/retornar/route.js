import pool from '@/lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM procedimento ORDER BY nome');
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    };

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers,
    });
  } catch (error) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    };

    return new Response(JSON.stringify({ error: 'Erro ao buscar procedimentos' }), {
      status: 500,
      headers,
    });
  }
}
