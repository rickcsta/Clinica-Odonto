import { NextResponse } from 'next/server'
import pool from "../lib/db"

//login

export async function POST(request) {
  try {
    const {  cpflog, senhalog } = await request.json()
    const client = await pool.connect()
    const result = await client.query(
      'SELECT * FROM cliente WHERE cpf = $1 AND senha = $2',
      [cpflog, senhalog]
    )

    const id_cliente = result.rows[0].id_cliente
    client.release()

    return NextResponse.json({ message: 'Cliente logado com sucesso', id_cliente }, { status: 201 })
  } catch (error) {
    console.error('Erro ao logar cliente:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}