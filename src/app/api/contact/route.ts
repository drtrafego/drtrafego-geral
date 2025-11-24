import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ message: 'Nome, email e telefone são obrigatórios.' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO Leads (name, email, phone)
      VALUES (${name}, ${email}, ${phone})
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        phone = EXCLUDED.phone,
        updated_at = NOW()
      RETURNING *;
    `;

    if (result.length > 0) {
      console.log('Lead inserido ou atualizado:', result[0]);
      return NextResponse.json({ message: 'Lead cadastrado ou atualizado com sucesso!', lead: result[0] }, { status: 201 });
    } else {
      console.error('Falha ao inserir ou atualizar o lead.');
      return NextResponse.json({ message: 'Falha ao processar o lead.' }, { status: 500 });
    }

  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}
