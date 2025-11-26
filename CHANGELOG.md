# Histórico de Alterações (Changelog)

Todas as alterações notáveis neste projeto serão documentadas neste arquivo.

## [1.1.0] - 2025-11-25

### Adicionado

- **Configuração de SEO e GEO:** Implementada uma base sólida de SEO (Search Engine Optimization) e GEO (Geolocalização) para melhorar a visibilidade do site em buscadores e ferramentas de IA.
  - Criação do arquivo `src/app/robots.ts` para permitir a indexação por bots (Googlebot, GPTBot, etc.).
  - Criação do arquivo `src/app/sitemap.ts` para mapear a estrutura do site e garantir que todas as páginas sejam encontradas.
  - Injeção de **JSON-LD Schema** (`ProfessionalService`) no `layout.tsx` com dados estruturados sobre o negócio, incluindo área de atendimento nacional (Brasil) e um endereço de referência em São Paulo para fortalecimento de autoridade.
- **Arquivo de Changelog:** Adicionado este arquivo (`CHANGELOG.md`) para documentar as alterações no projeto.

### Modificado

- **Domínio Principal:** Todo o site foi atualizado para usar o domínio `https://www.drtrafego.com` como URL principal.
  - URLs canônicas, OpenGraph e links no sitemap foram ajustados.
- **Metadados de SEO:** O arquivo `src/app/layout.tsx` foi enriquecido com metadados essenciais (título, descrição e palavras-chave) focados em "tráfego pago" e "gestão de tráfego".
- **Conteúdo GEO:** Adicionada a informação "Atendimento em todo o Brasil" no rodapé para reforçar a área de serviço.

### Corrigido

- **Inconsistência do Dark Mode:** Corrigido um problema onde o layout aparecia com tema claro em alguns dispositivos na Vercel. O modo escuro foi forçado globalmente através da configuração do Tailwind CSS (`darkMode: 'class'`) e da aplicação da classe `dark` no HTML.
