# Kawan Pereira — Portfólio

Portfólio pessoal de desenvolvedor full stack: rápido, acessível, bilíngue (PT-BR/EN) e com segurança tratada como requisito, não como detalhe.

**Stack:** Astro 7 (output estático) · TypeScript strict · Tailwind CSS 4 · React 19 (apenas no formulário) · Zod · Resend · Cloudflare Turnstile · Vercel

## Como rodar

Requer Node.js ≥ 22.12 (veja `.nvmrc`).

```bash
nvm use
npm ci
cp .env.example .env   # preencha os valores
npm run dev            # http://localhost:4321
npm run build          # astro check + build
```

Para desenvolvimento local, o Turnstile oferece [chaves de teste](https://developers.cloudflare.com/turnstile/troubleshooting/testing/) que sempre aprovam.

### Variáveis de ambiente

| Variável | Escopo | Uso |
| --- | --- | --- |
| `RESEND_API_KEY` | servidor (secreta) | Envio do e-mail de contato |
| `CONTACT_TO_EMAIL` | servidor (secreta) | Destinatário das mensagens |
| `CONTACT_FROM_EMAIL` | servidor (secreta) | Remetente verificado no Resend |
| `TURNSTILE_SECRET_KEY` | servidor (secreta) | Validação do captcha |
| `PUBLIC_TURNSTILE_SITE_KEY` | cliente (pública) | Renderização do widget |

As variáveis são declaradas e validadas com `astro:env`: segredos só podem ser importados em código de servidor.

## Estrutura

```
src/
├── config/site.ts         # dados pessoais e placeholders centralizados
├── content/               # conteúdo tipado (Content Collections + Zod)
│   ├── data/*.yaml        # experiência, stack, segurança, certificações
│   └── projects/{pt,en}/  # cases em Markdown
├── content.config.ts      # schemas
├── i18n/                  # textos de interface e helpers de rota
├── components/            # seções em Astro; ContactForm.tsx é a única ilha React
├── layouts/
├── lib/                   # schema do contato, rate limit, helpers de projetos
└── pages/                 # rotas PT em /, EN em /en; api/contact.ts é serverless
```

Para editar o conteúdo, mexa em `src/config/site.ts` (itens `[PREENCHER]`), `src/content/` e `src/i18n/ui.ts`. Para trocar a foto, coloque `src/assets/profile.jpg`; ela é otimizada automaticamente para AVIF/WebP.

Cases com `draft: true` aparecem só em `npm run dev` e não vão para produção.

## Decisões de arquitetura

- **Estático por padrão, serverless só onde precisa.** Todas as páginas são pré-renderizadas; apenas `POST /api/contact` roda como função. A página não carrega JavaScript, exceto o script de tema (~300 B), o botão de tema e o formulário, que hidrata só quando entra na tela (`client:visible`).
- **Conteúdo separado de componentes.** Cases, experiência e stack ficam em Content Collections validadas por Zod; textos de interface ficam em `src/i18n/ui.ts`. Erro de conteúdo quebra o build, não a página.
- **i18n por rota.** PT-BR em `/`, EN em `/en`, com `hreflang`, `og:locale` e sitemap com alternates. Os cases usam o mesmo slug nos dois idiomas, o que mantém a troca de idioma direta.
- **Mockups em HTML com dados fictícios.** Nenhum print de sistema real; as ilustrações dos cases são componentes leves que respeitam o tema claro/escuro.
- **Tema sem flash.** Um script inline mínimo aplica o tema antes da pintura, respeitando `prefers-color-scheme` e a preferência salva.

## Segurança

- **CSP estrita sem `unsafe-inline` em scripts.** Gerada pelo Astro (`security.csp`) com hash de cada script inline e enviada como header HTTP (`staticHeaders`). O hash do script de tema é calculado no build a partir do arquivo. Nenhum asset é embutido como `data:` URI.
- **Headers** (`vercel.json`): HSTS, `X-Frame-Options: DENY`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` mínima e COOP.
- **Endpoint de contato**:
  - verificação de `Origin`, `Content-Type` e limite de 10 KB no corpo;
  - rate limit por IP (janela deslizante em memória);
  - honeypot e Cloudflare Turnstile validado no servidor;
  - mesmo schema Zod no cliente e no servidor, com remoção de caracteres de controle e limites de tamanho;
  - e-mail enviado só em texto puro, sem HTML montado a partir de input;
  - respostas de erro genéricas e logs sem dados sensíveis;
  - nenhuma mensagem é armazenada.
- **Privacidade:** analytics cookieless (Vercel Web Analytics), sem banner de cookies, e página de privacidade explicando a finalidade e a não retenção dos dados.
- **CI** (`.github/workflows/security.yml`): gitleaks em todo o histórico, `npm audit` das dependências de produção, type check e build em PRs e na `main`.

> O rate limit em memória vale por instância serverless. É uma camada complementar; a barreira principal contra abuso é o Turnstile. Para um limite global, a evolução natural é um store compartilhado (ex.: Upstash Redis) ou uma regra de rate limiting no firewall da Vercel.

## Deploy

1. Importe o repositório na Vercel (framework detectado: Astro). A branch `main` é produção.
2. Cadastre as variáveis de ambiente acima no projeto.
3. Ajuste `site.url` em `src/config/site.ts` para o domínio final.
4. Habilite o Web Analytics no painel da Vercel.
5. Depois do primeiro deploy, confira os headers: `curl -sI https://SEU_DOMINIO | grep -iE 'content-security|strict-transport|x-frame'`.

