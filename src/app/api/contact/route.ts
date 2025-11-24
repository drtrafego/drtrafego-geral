import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

// Inicializa o cliente do Neon com a string de conexão
const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ message: 'Nome, email e telefone são obrigatórios.' }, { status: 400 });
    }

    // Conecta ao Neon e insere o novo lead.
    await sql`INSERT INTO Leads (name, email, phone) VALUES (${name}, ${email}, ${phone}) ON CONFLICT (email) DO NOTHING;`;

    return NextResponse.json({ message: 'Lead cadastrado com sucesso!' }, { status: 201 });

  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
