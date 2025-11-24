
import { sql } from '@neondatabase/serverless/sql';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ message: 'Nome, email e telefone são obrigatórios.' }, { status: 400 });
    }

    // Conecta ao Neon e insere o novo lead.
    // A string de conexão é pega automaticamente do arquivo .env.local (variável DATABASE_URL)
    await sql`INSERT INTO Leads (name, email, phone) VALUES (${name}, ${email}, ${phone});`;

    return NextResponse.json({ message: 'Lead cadastrado com sucesso!' }, { status: 201 });

  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
