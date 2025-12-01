import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const logs: string[] = [];
    const log = (msg: string, data?: any) => {
        const timestamp = new Date().toISOString().split('T')[1].slice(0, -1);
        const line = `[${timestamp}] ${msg} ${data ? JSON.stringify(data) : ''}`;
        console.log(line);
        logs.push(line);
    };

    try {
        log('=== INICIANDO DEBUG NEON ===');
        
        const dbUrl = process.env.DATABASE_URL;
        log(`Verificando DATABASE_URL...`);
        
        if (!dbUrl) {
            throw new Error('ERRO CRÍTICO: DATABASE_URL não está definida nas variáveis de ambiente!');
        }
        
        // Mascarar a URL para segurança no log
        const maskedUrl = dbUrl.replace(/:[^:]*@/, ':****@');
        log(`URL encontrada: ${maskedUrl}`);

        log('Inicializando cliente Neon...');
        const sql = neon(dbUrl);
        
        // 1. Teste de conexão simples
        log('Passo 1: Testando SELECT NOW()...');
        const start = Date.now();
        const now = await sql`SELECT NOW()`;
        log(`Sucesso! Tempo: ${Date.now() - start}ms. Horário DB:`, now[0].now);

        // 2. Buscando colunas
        log('Passo 2: Buscando coluna padrão e organização...');
        const defaultColumn = await sql`
            SELECT id, organization_id, title 
            FROM columns 
            ORDER BY "order" ASC 
            LIMIT 1
        `;
        
        if (!defaultColumn || defaultColumn.length === 0) {
            throw new Error('FALHA: A consulta retornou vazia. A tabela "columns" existe?');
        }
        
        log('Coluna encontrada:', defaultColumn[0]);
        const { id: columnId, organization_id: organizationId } = defaultColumn[0];

        // 3. Tentativa de Insert
        log('Passo 3: Tentando inserir Lead de Teste...');
        const testEmail = `debug-${Date.now()}@teste.com`;
        
        const insertQuery = await sql`
            INSERT INTO public.leads (
                name, email, whatsapp, created_at, 
                status, column_id, organization_id
            )
            VALUES (
                'Debug Vercel User', ${testEmail}, '11999999999', NOW(), 
                'Novo', ${columnId}, ${organizationId}
            )
            RETURNING *;
        `;
        
        log('INSERT REALIZADO COM SUCESSO!', insertQuery[0]);

        return NextResponse.json({ 
            status: 'SUCESSO TOTAL', 
            message: 'O banco de dados está funcionando perfeitamente.',
            logs, 
            data: insertQuery[0] 
        });

    } catch (error: any) {
        log('❌ ERRO FATAL:', error.message);
        if (error.cause) log('Causa:', error.cause);
        log('Stack:', error.stack);
        
        return NextResponse.json({ 
            status: 'FALHA', 
            message: 'Ocorreu um erro durante o teste.',
            error: error.message,
            logs 
        }, { status: 500 });
    }
}