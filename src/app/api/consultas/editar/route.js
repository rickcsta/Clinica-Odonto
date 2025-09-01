import pool from '@/lib/db'

export async function PUT(req) {
  try {
    const { id_consulta, data, hora, procedimento } = await req.json();

    if (!id_consulta) {
      return new Response(JSON.stringify({ error: 'id_consulta é obrigatório' }), { status: 400 });
    }

    // Converte id_consulta para número (para evitar erro de tipo no PG)
    const consultaId = parseInt(id_consulta, 10);

    // Atualiza data e hora se enviados
    await pool.query(
      `UPDATE consulta 
       SET 
         data = COALESCE($1, data), 
         hora = COALESCE($2, hora)
       WHERE id_consulta = $3`,
      [data || null, hora || null, consultaId]
    );

    // Atualiza procedimento somente se enviado
    if (procedimento) {
      await pool.query(
        `DELETE FROM procedimento_consulta WHERE id_consulta = $1`,
        [consultaId]
      );

      await pool.query(
        `INSERT INTO procedimento_consulta (id_consulta, id_procedimento, preco_aplicado)
         SELECT $1, id_procedimento, preco
         FROM procedimento
         WHERE id_procedimento = $2`,
        [consultaId, procedimento]
      );
    }

    return new Response(
      JSON.stringify({ message: 'Consulta atualizada!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Erro ao editar consulta' }),
      { status: 500 }
    );
  }
}
