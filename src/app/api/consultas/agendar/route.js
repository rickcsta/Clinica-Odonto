import { NextResponse } from 'next/server'
import pool from '../../../../lib/db'

export async function POST(request) {
  try {
    const { id_paciente, data, hora, motivo } = await request.json()

    const client = await pool.connect()

    await client.query(
      'INSERT INTO consulta (id_paciente, data, hora, motivo) VALUES ($1, $2, $3, $4)',
      [id_paciente, data, hora, motivo]
    )

    client.release()

    return NextResponse.json({ message: 'Consulta agendada com sucesso' }, { status: 201 })

  } catch (error) {
    console.error('Erro ao agendar consulta:', error)
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 })
  }
}
