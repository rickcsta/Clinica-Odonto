import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(Response) {
  try {
    const pacient = await pool.connect();
    const result = await pacient.query("SELECT p.nome AS nome_paciente, pr.nome, c.hora FROM paciente p JOIN consulta c ON p.id_paciente = c.id_paciente JOIN procedimento_consulta pc ON c.id_consulta = pc.id_consulta JOIN procedimento pr ON pc.id_procedimento = pr.id_procedimento; ");
    pacient.release();

    return NextResponse.json({ data: result.rows }, { status: 201 });
  } catch (error) {
    console.error("Erro ao perquisar consulta:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
