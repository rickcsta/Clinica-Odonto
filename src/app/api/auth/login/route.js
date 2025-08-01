import { NextResponse } from 'next/server'
import pool from "../../../../lib/db"

export async function POST(request) {
  try {
    const { cpflog, senhalog } = await request.json()
    const pacient = await pool.connect()
    const result = await pacient.query(
      'SELECT * FROM paciente WHERE cpf = $1 AND senha = $2',
      [cpflog, senhalog]
    )

    const id_paciente = result.rows[0].id_paciente
    pacient.release()

    return NextResponse.json({ message: 'Cliente logado com sucesso', id_paciente }, { status: 201 })
  } catch (error) {
    console.error('Erro ao logar cliente:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

