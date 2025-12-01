import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

// Removendo inicialização global para evitar problemas de cache em serverless
// const sql = neon(process.env.DATABASE_URL!);

// Função para enviar notificação por email
async function sendEmailNotification(lead: any, dbError?: string, dbUrlUsed?: string, dbMeta?: any, sheetsError?: string) {
  try {
    console.log('--- INICIANDO DIAGNÓSTICO DE EMAIL ---');
    const host = process.env.EMAIL_HOST;
    const portEnv = process.env.EMAIL_PORT;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const to = process.env.EMAIL_TO;

    // ... logs de diagnóstico ...

    if (!host || !portEnv || !user || !pass || !to) {
        // ...
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

    // Prepara aviso de erro do banco, se houver
    let dbStatusHtml = '<p style="color: green;"><strong>Banco de Dados (Neon):</strong> Salvo com sucesso ✅</p>';
    let dbStatusText = 'Banco de Dados (Neon): Salvo com sucesso';
    let subjectPrefix = '';

    if (dbError) {
        subjectPrefix = '[ALERTA DB] ';
        dbStatusHtml = `
            <div style="background-color: #ffebee; border: 1px solid #ef9a9a; color: #c62828; padding: 10px; margin-bottom: 15px; border-radius: 4px;">
                <strong>⚠️ FALHA AO SALVAR NO NEON (BANCO DE DADOS)</strong><br/>
                O lead foi recebido, mas não pôde ser salvo no banco.<br/>
                <strong>Erro:</strong> ${dbError}<br/>
                <strong>URL do Banco (parcial):</strong> ${dbUrlUsed || 'Não identificada'}
            </div>
        `;
        dbStatusText = `⚠️ FALHA AO SALVAR NO BANCO DE DADOS:\nErro: ${dbError}\nURL: ${dbUrlUsed}\n`;
    } else if (dbMeta) {
        // Adiciona informações de onde foi salvo para ajudar o usuário a localizar
        dbStatusHtml += `
            <div style="background-color: #e8f5e9; border: 1px solid #a5d6a7; color: #2e7d32; padding: 10px; margin-bottom: 15px; border-radius: 4px; font-size: 12px;">
                <strong>📍 Rastreamento do Banco de Dados:</strong><br/>
                <strong>Host (Servidor):</strong> ${dbMeta.host}<br/>
                <strong>Total de Leads na Tabela:</strong> ${dbMeta.count}<br/>
                <em>Verifique se o endpoint no seu painel Neon confere com o Host acima.</em>
            </div>
        `;
        dbStatusText += `\n[RASTREAMENTO DB]\nHost: ${dbMeta.host}\nTotal Leads: ${dbMeta.count}\n`;
    }

    // Prepara aviso de erro do Google Sheets, se houver
    let sheetsStatusHtml = '<p style="color: green;"><strong>Google Sheets:</strong> Salvo com sucesso ✅</p>';
    let sheetsStatusText = 'Google Sheets: Salvo com sucesso';

    if (sheetsError) {
        if (!subjectPrefix) subjectPrefix = '[ALERTA SHEETS] ';
        else subjectPrefix = '[ALERTA DB+SHEETS] ';
        
        sheetsStatusHtml = `
            <div style="background-color: #fff3e0; border: 1px solid #ffcc80; color: #e65100; padding: 10px; margin-bottom: 15px; border-radius: 4px;">
                <strong>⚠️ FALHA AO SALVAR NO GOOGLE SHEETS</strong><br/>
                O lead não foi salvo na planilha.<br/>
                <strong>Erro:</strong> ${sheetsError}
            </div>
        `;
        sheetsStatusText = `⚠️ FALHA AO SALVAR NO GOOGLE SHEETS:\nErro: ${sheetsError}\n`;
    }

    const mailOptions = {
      from: `"Dr. Tráfego Lead" <${user}>`,
      to,
      subject: `${subjectPrefix}Novo Lead Cadastrado: ${lead.name}`,
      text: `
        ${dbStatusText}
        ${sheetsStatusText}
        
        Novo lead capturado no site!
        
        Nome: ${lead.name}
        Email: ${lead.email}
        Telefone: ${lead.whatsapp}
        Data: ${new Date().toLocaleString('pt-BR')}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0066cc;">Novo Lead Capturado! 🚀</h2>
          ${dbStatusHtml}
          ${sheetsStatusHtml}
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
        throw new Error(`Configuração incompleta: ${!spreadsheetId ? 'GOOGLE_SHEET_ID ' : ''}${!client_email ? 'GOOGLE_CLIENT_EMAIL ' : ''}${!private_key ? 'GOOGLE_PRIVATE_KEY' : ''} faltando.`);
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
    return { success: true };
  } catch (error: any) {
    console.error('Erro ao salvar lead no Google Sheets:', error);
    throw error; // Propaga o erro para ser capturado no POST
  }
}

// Função assíncrona para salvar no banco (para rodar em background)
async function saveToNeon(lead: any) {
    try {
        console.log('Tentando salvar no Neon (Nova Instância):', {
            name: lead.name,
            email: lead.email,
            phone: lead.phone
        });
        
        // Inicializa o cliente Neon DENTRO da função para garantir conexão fresca
        const sql = neon(process.env.DATABASE_URL!);

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
        // Removido ON CONFLICT pois a tabela não tem constraint UNIQUE no email
        const result = await sql`
            INSERT INTO public.leads (
                name, email, whatsapp, created_at, 
                status, column_id, organization_id
            )
            VALUES (
                ${lead.name}, ${lead.email}, ${lead.phone}, ${lead.created_at}, 
                'Novo', ${columnId}, ${organizationId}
            )
            RETURNING *;
        `;
        
        if (!result || result.length === 0) {
            throw new Error('O comando INSERT rodou mas não retornou nenhum dado. Verifique permissões RLS ou triggers.');
        }

        // 3. Contar quantos leads existem na tabela (para prova de inserção)
        const countResult = await sql`SELECT count(*) FROM leads`;
        const totalCount = countResult[0].count;

        const savedLead = result[0];
        console.log('SUCESSO NEON! Lead salvo/atualizado:', savedLead);
        
        // Extrai o host da URL para rastreamento
        const dbUrl = process.env.DATABASE_URL || '';
        const host = dbUrl.split('@')[1]?.split('/')[0] || 'Desconhecido';

        return { ...savedLead, _meta: { host, count: totalCount } };
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

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('--- INICIANDO PROCESSAMENTO DE LEAD (Versão: Produção Estável) ---');
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

    // Primeiro, tenta salvar no banco de dados com TIMEOUT de 15 segundos
    let savedLead;
    let dbErrorMsg = undefined;
    let dbUrlMasked = undefined;
    let dbMeta = undefined;

    try {
        console.log('Iniciando tentativa de salvar no Neon (Timeout: 15s)...');
        savedLead = await withTimeout(saveToNeon(initialLead), 15000);
        if (savedLead._meta) {
            dbMeta = savedLead._meta;
        }
    } catch (dbError: any) {
        console.error('⚠️ FALHA OU TIMEOUT NO NEON:', dbError);
        
        dbErrorMsg = dbError.message || String(dbError);
        const dbUrl = process.env.DATABASE_URL || '';
        dbUrlMasked = dbUrl.replace(/:[^:]*@/, ':****@');

        // Cria um objeto de backup
        savedLead = {
            id: 'backup_timeout_' + Date.now(),
            name: initialLead.name,
            email: initialLead.email,
            whatsapp: initialLead.phone,
            created_at: initialLead.created_at
        };
    }

    // Em seguida, tenta salvar no Google Sheets (sequencial para pegar o status para o email)
    let sheetsErrorMsg = undefined;
    try {
        await appendToSheet(savedLead);
    } catch (error: any) {
        console.error('Erro capturado no POST ao salvar no Sheets:', error);
        sheetsErrorMsg = error.message || String(error);
    }

    // Por fim, envia o email com o status de tudo
    await sendEmailNotification(savedLead, dbErrorMsg, dbUrlMasked, dbMeta, sheetsErrorMsg);
    
    // Retorna sucesso
    return NextResponse.json({ 
        message: 'Lead processado com sucesso.',
        lead: savedLead
    }, { status: 200 });

  } catch (error: any) {
    console.error('Erro ao processar a requisição:', error);
    return NextResponse.json({ 
        message: 'Erro interno do servidor.',
        error: error.message || String(error)
    }, { status: 500 });
  }
}