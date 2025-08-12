import { NextResponse } from 'next/server'
import pool from "@/lib/db"

export async function GET(Response) {
  try {
    const pacient = await pool.connect()
    const result = await pacient.query(
      'SELECT nome, nascimento FROM paciente'

    )

    pacient.release()

    return NextResponse.json({result}, { status: 201 })
  } catch (error) {
    console.error('Erro ao logar cliente:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}