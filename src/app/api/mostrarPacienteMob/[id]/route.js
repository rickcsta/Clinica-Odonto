import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = params;
  const patientId = parseInt(id, 10);

  if (isNaN(patientId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT id_paciente, nome, cpf, telefone, EXTRACT(YEAR FROM AGE(data_nascimento)) AS idade, endereco FROM paciente WHERE id_paciente = $1",
      [patientId]
    );

    if (result.rows.length > 0) {
      const response = NextResponse.json({ data: result.rows[0] }, { status: 200 });
      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      return response;
    } else {
      return NextResponse.json({ error: "Paciente não encontrado" }, { status: 404 });
    }
  } catch (error) {
    console.error("Erro ao buscar detalhes do paciente:", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  } finally {
    client.release();
  }
}
