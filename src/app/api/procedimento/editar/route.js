export async function PUT(req) {
  try {
    const { id, nome, duracaoEstimada, preco } = await req.json()

    await pool.query(
      "UPDATE procedimento SET nome = $1, duracao_estimada = $2, preco = $3 WHERE id_procedimento = $4",
      [nome, duracaoEstimada, preco, id]
    )

    return new Response(
      JSON.stringify({ message: "Procedimento atualizado" }),
      { status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erro ao atualizar procedimento" }),
      { status: 500 }
    )
  }
}