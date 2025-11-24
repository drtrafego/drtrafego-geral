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

    // Tenta inserir o novo lead e retorna os dados inseridos
    const result = await sql`
      INSERT INTO Leads (name, email, phone) 
      VALUES (${name}, ${email}, ${phone}) 
      ON CONFLICT (email) DO NOTHING 
      RETURNING *;
    `;

    // Verifica se a inserção realmente aconteceu
    if (result.length > 0) {
      console.log('Novo lead inserido:', result[0]);
      return NextResponse.json({ message: 'Lead cadastrado com sucesso!', lead: result[0] }, { status: 201 });
    } else {
      console.log('Lead com este email já existe. Nenhuma ação foi tomada.');
      return NextResponse.json({ message: 'Lead com este email já existe.' }, { status: 200 });
    }

  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
