import pool from '@/lib/db';

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*', 
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function PUT(req) {
  try {
    const body = await req.json();
    console.log("Body recebido:", body);

    const { id, nome, duracaoEstimada, preco } = body;

    if (!id || !nome || !duracaoEstimada || !preco) {
      return new Response(
        JSON.stringify({ error: "Dados incompletos" }),
        { status: 400 }
      );
    }

    await pool.query(
      "UPDATE procedimento SET nome = $1, duracao_estimada = $2, preco = $3 WHERE id_procedimento = $4",
      [nome, duracaoEstimada, preco, id]
    );

    return new Response(
      JSON.stringify({ message: "Procedimento atualizado" }),
      {
        status: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
  } catch (error) {
    console.error("Erro no PUT /editar:", error);

    return new Response(
      JSON.stringify({ error: "Erro ao atualizar procedimento", detalhe: error.message }),
      {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
  }
}
