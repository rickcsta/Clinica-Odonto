import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
  try {
    const pacient = await pool.connect();
    const result = await pacient.query("SELECT id_paciente AS id, nome, EXTRACT(YEAR FROM AGE(data_nascimento)) AS idade FROM paciente;");
    pacient.release();

    const response = NextResponse.json({ data: result.rows }, { status: 201 });
    
    // Adiciona os headers de CORS
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    return response;
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
