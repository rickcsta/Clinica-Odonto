
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    await pool.query("DELETE FROM procedimento WHERE id_procedimento = $1", [id]);

    const res = NextResponse.json({ message: "Procedimento excluído" }, { status: 200 });
    res.headers.set('Access-Control-Allow-Origin', '*');
    return res;
  } catch (error) {
    const res = NextResponse.json({ error: "Erro ao excluir procedimento" }, { status: 500 });
    res.headers.set('Access-Control-Allow-Origin', '*');
    return res;
  }
}