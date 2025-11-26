# Projeto: Landing Page de Alta Conversão para Captação de Leads

## 1. Visão Geral e Objetivo

O objetivo deste projeto é desenvolver uma landing page de uma única página, otimizada para performance e conversão, com o propósito de capturar leads qualificados para serviços de gestão de tráfego pago.

A página foi projetada para ser visualmente impactante, com uma narrativa clara que guia o visitante desde a apresentação do problema até a solução, culminando em um formulário de contato.

---

## 2. Tech Stack & Dependências

A aplicação é construída com as seguintes tecnologias:

- **Framework Principal:** [Next.js](https://nextjs.org/) 14+ (com App Router)
- **Linguagem:** TypeScript
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [Shadcn/UI](https://ui.shadcn.com/) (base para componentes como Button, Card, Input, etc.)
- **Ícones:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Banco de Dados:** [Neon](https://neon.tech/) (PostgreSQL Serverless)
- **ORM/Query Builder:** `@neondatabase/serverless` para conexão direta com o banco.
- **Deploy:** [Vercel](https://vercel.com/)

### Scripts Principais (`package.json`):
- `npm run dev`: Inicia o servidor de desenvolvimento local.
- `npm run build`: Compila a aplicação para produção.
- `npm run start`: Inicia um servidor de produção após o build.
- `npm run lint`: Executa o linter para análise de código.

---

## 3. Estrutura de Arquivos

A estrutura do projeto segue o padrão do Next.js App Router.

```
/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts    # Endpoint da API para salvar leads no DB.
│   │   ├── obrigado/
│   │   │   └── page.tsx        # Página de agradecimento pós-envio do form.
│   │   ├── globals.css         # Estilos globais e configuração do Tailwind.
│   │   ├── layout.tsx          # Layout principal da aplicação.
│   │   └── page.tsx            # Componente principal da Landing Page.
│   │
│   ├── components/
│   │   └── ui/                 # Componentes reutilizáveis (ex: Button, Input).
│   │
│   └── lib/
│       └── utils.ts            # Funções utilitárias (ex: `cn` do Tailwind Merge).
│
├── public/                     # Arquivos estáticos (imagens, fontes).
│
├── .env.local                  # Arquivo para variáveis de ambiente (NÃO versionado).
├── next.config.mjs             # Configurações do Next.js.
├── tailwind.config.ts          # Configurações do Tailwind CSS.
└── PROJETO.md                  # Esta documentação.
```

---

## 4. Como Executar o Projeto Localmente

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as Variáveis de Ambiente:**
    - Crie um arquivo `.env.local` na raiz do projeto.
    - Adicione a connection string do banco de dados Neon:
      ```
      DATABASE_URL="postgres://user:password@host/dbname"
      ```
4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```
5.  Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 5. Funcionalidades Implementadas

### 5.1. Captura e Armazenamento de Leads

A principal funcionalidade da página é a captura de leads através de um formulário de contato.

-   **Endpoint:** `POST /api/contact` (`src/app/api/contact/route.ts`)
-   **Validação:** A validação dos dados ocorre no frontend antes do envio.
-   **Banco de Dados:** Os leads são armazenados em uma tabela `Leads` no banco de dados PostgreSQL (Neon).
-   **Lógica de UPSERT:** Para evitar duplicatas, a API utiliza uma lógica `INSERT ... ON CONFLICT DO UPDATE`. Se um email já cadastrado for enviado, os dados do lead (nome, telefone) são atualizados, e a data `updated_at` é renovada. Isso mantém a base de dados limpa e atualizada.

#### Estrutura da Tabela `Leads`
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

### 5.2. Redirecionamento Pós-Cadastro

Após o envio bem-sucedido do formulário, o usuário é redirecionado para a página de agradecimento em `/obrigado`.

---

## 6. Deploy (Vercel)

-   **Conexão com GitHub:** O projeto está conectado a um repositório no GitHub, e o deploy é acionado automaticamente a cada `push` na branch `main`.
-   **Variáveis de Ambiente:** A variável `DATABASE_URL` foi configurada diretamente no painel de configurações do projeto na Vercel para garantir a conexão segura com o banco de dados em produção.
-   **Observação Importante:** Durante o desenvolvimento, foi identificado que as queries SQL no ambiente Vercel exigem a qualificação explícita do schema (`public."Leads"`). Isso foi corrigido no código da API para garantir a comunicação com o banco de dados.

---

## 7. Histórico de Alterações (Changelog)

### [1.1.0] - 2025-11-25

### Adicionado

- **Configuração de SEO e GEO:** Implementada uma base sólida de SEO (Search Engine Optimization) e GEO (Geolocalização) para melhorar a visibilidade do site em buscadores e ferramentas de IA.
  - Criação do arquivo `src/app/robots.ts` para permitir a indexação por bots (Googlebot, GPTBot, etc.).
  - Criação do arquivo `src/app/sitemap.ts` para mapear a estrutura do site e garantir que todas as páginas sejam encontradas.
  - Injeção de **JSON-LD Schema** (`ProfessionalService`) no `layout.tsx` com dados estruturados sobre o negócio, incluindo área de atendimento nacional (Brasil) e um endereço de referência em São Paulo para fortalecimento de autoridade.

### Modificado

- **Domínio Principal:** Todo o site foi atualizado para usar o domínio `https://www.drtrafego.com` como URL principal.
  - URLs canônicas, OpenGraph e links no sitemap foram ajustados.
- **Metadados de SEO:** O arquivo `src/app/layout.tsx` foi enriquecido com metadados essenciais (título, descrição e palavras-chave) focados em "tráfego pago" e "gestão de tráfego".
- **Conteúdo GEO:** Adicionada a informação "Atendimento em todo o Brasil" no rodapé para reforçar a área de serviço.

### Corrigido

- **Inconsistência do Dark Mode:** Corrigido um problema onde o layout aparecia com tema claro em alguns dispositivos na Vercel. O modo escuro foi forçado globalmente através da configuração do Tailwind CSS (`darkMode: 'class'`) e da aplicação da classe `dark` no HTML.
