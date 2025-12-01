import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const sql = neon(process.env.DATABASE_URL!);

// Função para enviar notificação por email
async function sendEmailNotification(lead: any) {
  try {
    console.log('--- INICIANDO DIAGNÓSTICO DE EMAIL ---');
    const host = process.env.EMAIL_HOST;
    const portEnv = process.env.EMAIL_PORT;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const to = process.env.EMAIL_TO;

    // Log de verificação detalhado
    console.log(`[DIAGNÓSTICO] EMAIL_HOST: ${host ? 'OK' : 'FALHOU'}`);
    console.log(`[DIAGNÓSTICO] EMAIL_PORT: ${portEnv ? 'OK' : 'FALHOU'}`);
    console.log(`[DIAGNÓSTICO] EMAIL_USER: ${user ? 'OK' : 'FALHOU'}`);
    console.log(`[DIAGNÓSTICO] EMAIL_PASS: ${pass ? 'OK' : 'FALHOU'}`);
    console.log(`[DIAGNÓSTICO] EMAIL_TO: ${to ? 'OK' : 'FALHOU'}`);

    if (!host || !portEnv || !user || !pass || !to) {
      console.error('[DIAGNÓSTICO] FINALIZANDO: Uma ou mais variáveis de ambiente de email não foram encontradas.');
      console.log('--- FIM DIAGNÓSTICO DE EMAIL ---');
      return;
    }
    
    const port = parseInt(portEnv);

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true para 465, false para outras portas
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from: `"Dr. Tráfego Lead" <${user}>`,
      to,
      subject: `Novo Lead Cadastrado: ${lead.name}`,
      text: `
        Novo lead capturado no site!
        
        Nome: ${lead.name}
        Email: ${lead.email}
        Telefone: ${lead.whatsapp}
        Data: ${new Date().toLocaleString('pt-BR')}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0066cc;">Novo Lead Capturado! 🚀</h2>
          <p>Um novo cliente em potencial acabou de se cadastrar no site.</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Nome:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lead.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>WhatsApp:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${lead.whatsapp}</td>
            </tr>
             <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Data:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${new Date().toLocaleString('pt-BR')}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">Este é um email automático enviado pelo sistema do site Dr. Tráfego.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email de notificação enviado:', info.messageId);

  } catch (error) {
    console.error('Erro ao enviar email de notificação:', error);
  }
}

// Função para escrever o cabeçalho
async function writeHeader(sheets: any, spreadsheetId: string) {
    const header = [['id', 'name', 'email', 'whatsapp', 'created_at']];
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
        lead.id,
        lead.name,
        lead.email,
        lead.whatsapp,
        lead.created_at,
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
async function saveToNeon(lead: any) {
    try {
        console.log('Tentando salvar no Neon:', {
            name: lead.name,
            email: lead.email,
            phone: lead.phone
        });

        // 1. Buscar organization_id e column_id padrão (primeira coluna do quadro)
        // Isso é necessário porque organization_id e column_id são NOT NULL
        const defaultColumn = await sql`
            SELECT id, organization_id 
            FROM columns 
            ORDER BY "order" ASC 
            LIMIT 1
        `;

        if (!defaultColumn || defaultColumn.length === 0) {
            throw new Error('Não foi possível encontrar uma coluna padrão na tabela "columns". Verifique se a tabela existe e tem dados.');
        }

        const { id: columnId, organization_id: organizationId } = defaultColumn[0];
        console.log(`Usando column_id: ${columnId} e organization_id: ${organizationId}`);

        // 2. Inserir Lead com os campos obrigatórios
        // Definimos status como 'Novo' e usamos os IDs recuperados
        const result = await sql`
            INSERT INTO public.leads (
                name, email, whatsapp, created_at, 
                status, column_id, organization_id
            )
            VALUES (
                ${lead.name}, ${lead.email}, ${lead.phone}, ${lead.created_at}, 
                'Novo', ${columnId}, ${organizationId}
            )
            ON CONFLICT (email) DO UPDATE SET
                name = EXCLUDED.name,
                whatsapp = EXCLUDED.whatsapp,
                updated_at = NOW()
            RETURNING *;
        `;
        
        if (!result || result.length === 0) {
            throw new Error('O comando INSERT rodou mas não retornou nenhum dado. Verifique permissões RLS ou triggers.');
        }

        const savedLead = result[0];
        console.log('SUCESSO NEON! Lead salvo/atualizado:', savedLead);
        return savedLead;
    } catch (error) {
        console.error('Erro detalhado ao salvar no Neon:', error);
        throw error;
    }
}


// Função auxiliar de timeout
const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> => {
    let timeoutId: NodeJS.Timeout;
    const timeoutPromise = new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => {
            reject(new Error(`Operação abortada por timeout após ${ms}ms`));
        }, ms);
    });

    return Promise.race([
        promise.finally(() => clearTimeout(timeoutId)),
        timeoutPromise
    ]);
};

export async function POST(request: NextRequest) {
  try {
    console.log('--- INICIANDO PROCESSAMENTO DE LEAD (Versão: Fix IDs Automáticos) ---');
    const { name, email, phone } = await request.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ message: 'Nome, email e telefone são obrigatórios.' }, { status: 400 });
    }

    // Cria um objeto unificado para o lead inicial
    const initialLead = {
      name,
      email,
      phone,
      created_at: new Date().toISOString(),
    };

    // Primeiro, tenta salvar no banco de dados com TIMEOUT de 2 segundos
    let savedLead;
    try {
        // Força um timeout de 2s para não travar a função se o banco estiver lento
        savedLead = await withTimeout(saveToNeon(initialLead), 2000);
    } catch (dbError) {
        console.error('⚠️ FALHA OU TIMEOUT NO NEON (Ignorando para salvar no Sheets/Email):', dbError);
        // Cria um objeto de backup para garantir que o lead vá para o Email e Sheets
        savedLead = {
            id: 'backup_timeout_' + Date.now(),
            name: initialLead.name,
            email: initialLead.email,
            whatsapp: initialLead.phone,
            created_at: initialLead.created_at
        };
    }

    // Em seguida, executa as tarefas restantes em paralelo
    // Também protegemos essas chamadas para que uma não trave a outra
    const results = await Promise.allSettled([
      appendToSheet(savedLead),
      sendEmailNotification(savedLead)
    ]);
    
    // Loga o resultado das operações paralelas
    results.forEach((result, index) => {
        if (result.status === 'rejected') {
            console.error(`Erro na tarefa paralela ${index === 0 ? 'Sheets' : 'Email'}:`, result.reason);
        }
    });

    // Retorna sucesso
    console.log('Processamento finalizado. Enviando resposta 200.');
    return NextResponse.json({ message: 'Lead processado (com ou sem DB).' }, { status: 200 });

  } catch (error: any) {
    console.error('Erro ao processar a requisição:', error);
    return NextResponse.json({ 
        message: 'Erro interno do servidor.',
        error: error.message || String(error)
    }, { status: 500 });
  }
}