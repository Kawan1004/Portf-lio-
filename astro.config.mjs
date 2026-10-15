// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { site } from './src/config/site.ts';

// Script de tema roda inline (evita flash) e é liberado na CSP pelo hash do conteúdo exato.
/** @type {`sha256-${string}`} */
const themeInitHash = `sha256-${createHash('sha256')
  .update(readFileSync(new URL('./src/scripts/theme-init.js', import.meta.url)))
  .digest('base64')}`;

const TURNSTILE = 'https://challenges.cloudflare.com';
// No dev o Vite injeta CSS/JS inline para HMR; a CSP só vale para o build.
const isDev = process.argv.includes('dev');

export default defineConfig({
  site: site.url,
  output: 'static',
  // Barra de ferramentas do Astro no modo dev desativada.
  devToolbar: { enabled: false },
  adapter: vercel({ staticHeaders: true, webAnalytics: { enabled: true } }),
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: 'pt', locales: { pt: 'pt-BR', en: 'en' } },
      filter: (page) => !page.includes('/api/'),
    }),
  ],
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  env: {
    schema: {
      // Opcionais: o formulário de contato saiu do site; o endpoint só funciona se forem configuradas.
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_TO_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      CONTACT_FROM_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      TURNSTILE_SECRET_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
  security: {
    csp: !isDev && {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        `frame-src ${TURNSTILE}`,
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        'upgrade-insecure-requests',
      ],
      scriptDirective: { resources: ["'self'", TURNSTILE], hashes: [themeInitHash] },
    },
  },
  markdown: { syntaxHighlight: false },
  // Sem assets inline em data: URI, para manter a CSP estrita.
  vite: { plugins: [tailwindcss()], build: { assetsInlineLimit: 0 } },
});
