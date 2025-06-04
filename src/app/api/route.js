
import { NextResponse } from 'next/server'
import pool from "../lib/db";

export async function POST(request) {
  try {
    const { nome, cpf, nascimento, endereco, contato, senha } = await request.json()
    const client = await pool.connect()
    await client.query(
      'INSERT INTO cliente (nome, cpf, nascimento, endereco, contato, senha) VALUES ($1, $2, $3, $4, $5, $6)',
      [nome, cpf, nascimento, endereco, contato, senha]
    )
    client.release()
    return NextResponse.json({ message: 'Cliente criado com sucesso' }, { status: 201 })
  } catch (error) {
    console.error('Error adding cliente:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}