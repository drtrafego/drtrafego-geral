# Projeto: Landing Page para Captação de Clientes (Tráfego Pago)

## Objetivo Principal
Desenvolver um site de uma página (Landing Page) com o objetivo de capturar leads (clientes interessados) para serviços de gestão de tráfego pago.

## Estrutura Planejada
O site será composto pelas seguintes seções:
1.  **Header:** Navegação principal e um Call-to-Action (CTA) claro.
2.  **Seção Hero:** Uma mensagem de impacto inicial para prender a atenção do visitante.
3.  **Serviços:** Descrição dos serviços de tráfego pago oferecidos.
4.  **Cases de Sucesso:** Prova social com exemplos de resultados de clientes.
5.  **Contato:** Formulário para captação de leads.

## Tecnologias
- **Frontend:** Next.js (React)
- **Estilização:** Tailwind CSS
- **Deploy:** Vercel

## Integração da Captura de Leads com Neon

A seção de contato foi integrada a um banco de dados PostgreSQL hospedado na Neon para armazenar os leads capturados pelo formulário.

- **API Endpoint:** Foi criado um endpoint em `src/app/api/contact/route.ts` que recebe os dados do formulário (nome, email e telefone).

- **Banco de Dados:**
  - A tabela `Leads` (schema `public`) armazena as informações.
  - **Estrutura da Tabela:**
    ```sql
    CREATE TABLE "Leads" (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      phone VARCHAR(255),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    ```

- **Lógica de Armazenamento (UPSERT):**
  - Para evitar a duplicação de leads, foi implementada uma lógica de `UPSERT` (`INSERT ... ON CONFLICT DO UPDATE`).
  - Se um lead com o mesmo email já existe, seus dados (nome e telefone) e a data de atualização (`updated_at`) são atualizados.
  - Caso contrário, um novo lead é inserido na tabela.
  - Essa abordagem garante que a base de contatos esteja sempre atualizada sem criar registros duplicados.

- **Deploy na Vercel:**
  - A comunicação entre a aplicação na Vercel e o banco de dados Neon foi estabelecida com sucesso.
  - Foi necessário qualificar o nome da tabela com o schema (`public."Leads"`) nas queries SQL para resolver erros de "relação não encontrada" que ocorriam apenas no ambiente de produção.
  - A variável de ambiente `DATABASE_URL` foi configurada no painel da Vercel para garantir a conexão segura.

## Próximos Passos
1.  Estruturar o projeto técnico (criar a base do Next.js).
2.  Desenvolver cada uma das seções da página.
3.  Integrar a copy e o design que serão fornecidos.