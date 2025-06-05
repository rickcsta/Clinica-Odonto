import { NextResponse } from 'next/server'
import pool from "../lib/db"

// cadastro 

export async function POST(request) {
  try {
    const { nome, cpfcad, nascimento, endereco, contato, senhacad } = await request.json()
    const client = await pool.connect()
    const result = await client.query(
      'INSERT INTO cliente (nome, cpf, nascimento, endereco, contato, senha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nome, cpfcad, nascimento, endereco, contato, senhacad]
    )

    const id_cliente = result.rows[0].id_cliente
    client.release()

    return NextResponse.json({ message: 'Cliente criado com sucesso', id_cliente }, { status: 201 })
  } catch (error) {
    console.error('Erro ao adicionar cliente:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}




