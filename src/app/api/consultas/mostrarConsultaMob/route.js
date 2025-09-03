import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT p.nome AS nome_paciente, pr.nome, c.hora 
      FROM paciente p 
      JOIN consulta c ON p.id_paciente = c.id_paciente 
      JOIN procedimento_consulta pc ON c.id_consulta = pc.id_consulta 
      JOIN procedimento pr ON pc.id_procedimento = pr.id_procedimento
      WHERE DATE(c.data) = CURRENT_DATE;
    `);
    client.release();

    const res = NextResponse.json({ data: result.rows }, { status: 200 });
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  } catch (error) {
    console.error("Erro ao pesquisar consulta:", error);
    const res = NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  }
}
