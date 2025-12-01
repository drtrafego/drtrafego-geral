import { neon } from '@neondatabase/serverless';
import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const results: any = {
        env: {},
        email: { status: 'pending' },
        sheets: { status: 'pending' },
        neon: { status: 'pending' }
    };

    // 1. Verifica Variáveis de Ambiente (sem mostrar os valores reais por segurança)
    const vars = [
        'DATABASE_URL',
        'EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_TO',
        'GOOGLE_SHEET_ID', 'GOOGLE_CLIENT_EMAIL', 'GOOGLE_PRIVATE_KEY'
    ];

    vars.forEach(v => {
        results.env[v] = process.env[v] ? 'OK (Definido)' : 'ERRO (Faltando)';
    });

    // 2. Teste de Email
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: parseInt(process.env.EMAIL_PORT || '587') === 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.verify();
        results.email = { status: 'OK', message: 'Conexão SMTP verificada com sucesso' };
    } catch (error: any) {
        results.email = { status: 'ERRO', message: error.message };
    }

    // 3. Teste de Google Sheets
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const sheets = google.sheets({ version: 'v4', auth });
        await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'A1:A1',
        });
        results.sheets = { status: 'OK', message: 'Leitura da planilha realizada com sucesso' };
    } catch (error: any) {
        results.sheets = { status: 'ERRO', message: error.message };
    }

    // 4. Teste de Neon (Banco de Dados)
    try {
        if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL não definida');
        const sql = neon(process.env.DATABASE_URL);
        // Tenta uma query simples
        const serverTime = await sql`SELECT NOW()`;
        results.neon = { status: 'OK', message: 'Conexão com Neon bem sucedida', time: serverTime[0] };
        
        // Tenta verificar a tabela leads
        try {
            // Tenta inserir um lead de teste dummy que será deletado ou ignorado,
            // mas SELECT é mais seguro para teste. Vamos tentar listar 1 linha.
            const leads = await sql`SELECT * FROM public.leads LIMIT 1`;
            results.neon.table = { status: 'OK', found: leads.length >= 0 };
        } catch (tableError: any) {
            results.neon.table = { status: 'ERRO', message: tableError.message };
        }

    } catch (error: any) {
        results.neon = { status: 'ERRO', message: error.message };
    }

    return NextResponse.json(results, { status: 200 });
}
