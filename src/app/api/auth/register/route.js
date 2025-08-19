import { NextResponse } from 'next/server'
import pool from "@/lib/db"

export async function POST(request) {
  try {
    const { nome, cpfcad, nascimento, endereco, contato, senhacad } = await request.json()
    const pacient = await pool.connect()
    const result = await pacient.query(
      'INSERT INTO paciente (nome, cpf, data_nascimento, endereco, telefone, senha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nome, cpfcad, nascimento, endereco, contato, senhacad]
    )

    const id_paciente = result.rows[0].id_paciente
    pacient.release()

    return NextResponse.json({ message: 'Paciente registrado com sucesso', id_paciente }, { status: 201 })
  } catch (error) {
    console.error('Erro ao adicionar paciente:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}




