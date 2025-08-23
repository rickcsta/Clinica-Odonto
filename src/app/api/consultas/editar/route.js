import pool from '@/lib/db'

export async function PUT(req) {
  try {
    const { id_consulta, id_dentista, data, hora, procedimento } = await req.json();

    // Atualiza data, hora e dentista se enviados
    await pool.query(
      `UPDATE consulta 
       SET 
         data = COALESCE($1, data), 
         hora = COALESCE($2, hora), 
         id_dentista = COALESCE($3, id_dentista)
       WHERE id_consulta = $4`,
      [data, hora, id_dentista, id_consulta]
    );

    // Atualiza procedimento somente se enviado
    if (procedimento) {
      await pool.query(`DELETE FROM procedimento_consulta WHERE id_consulta = $1`, [id_consulta]);
      await pool.query(
        `INSERT INTO procedimento_consulta (id_consulta, id_procedimento, preco_aplicado)
         SELECT $1, id_procedimento, preco
         FROM procedimento
         WHERE id_procedimento = $2`,
        [id_consulta, procedimento]
      );
    }

    return new Response(JSON.stringify({ message: 'Consulta atualizada!' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Erro ao editar consulta' }), { status: 500 });
  }
}
