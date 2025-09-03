import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function OPTIONS() {
  const res = NextResponse.json({});
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return res;
}

export async function POST(req) {
  try {
    const { nome, duracaoEstimada, preco } = await req.json();

    await pool.query(
      "INSERT INTO procedimento (nome, duracao_estimada, preco) VALUES ($1, $2, $3)",
      [nome, duracaoEstimada, preco]
    );

    const res = NextResponse.json({ message: "Procedimento criado com sucesso" }, { status: 201 });
    res.headers.set('Access-Control-Allow-Origin', '*');
    return res;
  } catch (error) {
    console.error(error);
    const res = NextResponse.json({ error: "Erro ao cadastrar procedimento" }, { status: 500 });
    res.headers.set('Access-Control-Allow-Origin', '*');
    return res;
  }
}