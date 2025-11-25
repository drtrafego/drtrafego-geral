import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const sql = neon(process.env.DATABASE_URL!);

// Função para escrever o cabeçalho
async function writeHeader(sheets: any, spreadsheetId: string) {
    const header = [['id', 'name', 'email', 'phone', 'created_at']];
    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'A1',
        valueInputOption: 'RAW',
        requestBody: { values: header },
    });
}

// Função para garantir que o cabeçalho exista na planilha
async function ensureHeader(sheets: any, spreadsheetId: string) {
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'A1:E1', // Verifica a primeira linha
    });

    // Se a primeira linha estiver vazia, escreve o cabeçalho
    if (!res.data.values || res.data.values.length === 0) {
      await writeHeader(sheets, spreadsheetId);
    }
  } catch (error) {
    // Se a planilha estiver completamente vazia, a leitura pode falhar (lança um erro).
    // Nesse caso, assumimos que o cabeçalho não existe e o criamos.
    await writeHeader(sheets, spreadsheetId);
  }
}

// Função principal que envia os dados para a planilha
async function appendToSheet(lead: any) {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const client_email = process.env.GOOGLE_CLIENT_EMAIL;
    const private_key = process.env.GOOGLE_PRIVATE_KEY;

    if (!spreadsheetId || !client_email || !private_key) {
        console.error('As variáveis de ambiente do Google Sheets não estão configuradas corretamente.');
        return;
    }

    // 1. Autenticação
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email,
        private_key: private_key.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 2. Garante que o cabeçalho exista
    await ensureHeader(sheets, spreadsheetId);

    // 3. Prepara os dados na ordem correta
    const values = [
      [
        lead.id || 'pendente', // ID pode não estar disponível imediatamente
        lead.name,
        lead.email,
        lead.phone,
        lead.created_at || new Date().toISOString(),
      ],
    ];

    // 4. Envia os dados para a planilha
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    console.log('Lead salvo com sucesso no Google Sheets.');
  } catch (error) {
    console.error('Erro ao salvar lead no Google Sheets:', error);
  }
}

// Função assíncrona para salvar no banco (para rodar em background)
async function saveToNeon(name: string, email: string, phone: string) {
    try {
        const result = await sql`
            INSERT INTO public."Leads" (name, email, phone)
            VALUES (${name}, ${email}, ${phone})
            ON CONFLICT (email) DO UPDATE SET
                name = EXCLUDED.name,
                phone = EXCLUDED.phone,
                updated_at = NOW()
            RETURNING *;
        `;
        console.log('Lead salvo no Neon:', result[0]);
        // Se quisermos garantir que o ID correto vá para o Sheets, podemos chamar o Sheets AQUI
        // Mas isso cria dependência. Se a prioridade é salvar nos dois lugares, podemos salvar no Sheets
        // com ID "pendente" em paralelo, OU chamar aqui para ter o ID correto.
        // Como o usuário quer VELOCIDADE, vamos deixar independente.
    } catch (error) {
        console.error('Erro ao salvar no Neon:', error);
    }
}


export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ message: 'Nome, email e telefone são obrigatórios.' }, { status: 400 });
    }

    // 1. Dispara o salvamento no Neon (sem await)
    // Usamos 'void' para indicar explicitamente que não estamos esperando a Promise
    void saveToNeon(name, email, phone);

    // 2. Dispara o salvamento no Google Sheets (sem await)
    // Passamos os dados brutos, pois não temos o ID do banco ainda
    void appendToSheet({
        id: 'web-' + Date.now(), // ID temporário para controle
        name,
        email,
        phone,
        created_at: new Date().toISOString()
    });

    // 3. Retorna sucesso IMEDIATAMENTE
    console.log('Resposta enviada ao cliente instantaneamente.');
    return NextResponse.json({ message: 'Processamento iniciado.' }, { status: 200 });

  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
  }
}