import type { Lang } from './ui';
import type { IconName } from '@/lib/icons';

// Conteúdo de "Sobre" e "Capacidades". Fonte: currículo, cases e certificados — sem métricas inventadas.
// Cada informação aparece em um só lugar: números ficam no hero, trajetória detalhada na seção de experiência.
interface Capability {
  icon: IconName;
  title: string;
  summary: string;
  points: string[];
  tech: string[];
}

interface AboutCopy {
  kicker: string;
  title: string;
  titleAccent: string;
  paragraphs: string[];
  aiTitle: string;
  aiLead: string;
  aiFlow: string[];
  aiTools: string[];
  aiLink: string;
  capabilitiesTitle: string;
  capabilitiesLead: string;
  capabilities: Capability[];
}

export const about: Record<Lang, AboutCopy> = {
  pt: {
    kicker: 'Sobre',
    title: 'Do esquema do banco',
    titleAccent: 'ao app na loja.',
    paragraphs: [
      'Projeto, construo e coloco no ar produtos completos — web, mobile e desktop. Hoje sou dev principal e product owner de produtos SaaS multi-tenant, em contato direto com clientes do requisito à entrega.',
      'Antes do código, foram mais de 7 anos em cartório auditando documentos contra fraude. Esse rigor com dados sensíveis virou prática de engenharia: segurança e LGPD desde o desenho.',
    ],
    aiTitle: 'Engenharia com IA',
    aiLead: 'A IA acelera a entrega. A revisão humana decide o que vai para produção.',
    aiFlow: ['Especificação', 'Código com IA', 'Testes', 'Revisão humana', 'Merge'],
    aiTools: ['Claude Code', 'MCP', 'Agentes', 'Subagentes', 'Agent Skills', 'Amazon Bedrock', 'Google Vertex AI'],
    aiLink: 'Ver certificações da Anthropic',
    capabilitiesTitle: 'Capacidades',
    capabilitiesLead: 'Quatro frentes que se conectam em cada produto que entrego.',
    capabilities: [
      {
        icon: 'layers',
        title: 'Produto e arquitetura',
        summary: 'SaaS multi-tenant pensado para crescer sem fork.',
        points: ['Isolamento por empresa e white-label por configuração', 'Máquinas de estado e ledger imutável', 'Conectores reutilizáveis e declarativos'],
        tech: ['TypeScript', 'React', 'Next.js', 'Node.js'],
      },
      {
        icon: 'database',
        title: 'Dados e integrações',
        summary: 'Modelagem relacional e integrações que não quebram.',
        points: ['ERP via SQL Server com controle de concorrência', 'Sincronização bidirecional com outbox', 'RPA com Playwright em sistemas sem API'],
        tech: ['PostgreSQL', 'SQL Server', 'SQLite', 'REST'],
      },
      {
        icon: 'shield',
        title: 'Segurança e LGPD',
        summary: 'Segurança no desenho de cada funcionalidade, não no final.',
        points: [
          'Consultas parametrizadas, proteção XSS, CSRF e SSRF',
          'RBAC, rate limiting e trilhas de auditoria',
          'Criptografia AES-256-GCM, consentimento e k-anonimato',
        ],
        tech: ['RBAC', 'JWT', 'AES-256-GCM', 'OWASP'],
      },
      {
        icon: 'phone',
        title: 'Mobile e entrega',
        summary: 'Do build à loja e ao servidor de produção.',
        points: ['Apps Android e iOS com Capacitor', 'Publicação na Google Play: build, políticas e versões', 'Deploy, servidores Linux e hardening SSH'],
        tech: ['Capacitor', 'Google Play', 'Linux', 'CI/CD'],
      },
    ],
  },
  en: {
    kicker: 'About',
    title: 'From database schema',
    titleAccent: 'to app store release.',
    paragraphs: [
      'I design, build and ship complete products — web, mobile and desktop. Today I am lead developer and product owner of multi-tenant SaaS products, working directly with clients from requirements to delivery.',
      'Before code, I spent over 7 years at notary offices auditing documents against fraud. That rigor with sensitive data became an engineering practice: security and privacy by design.',
    ],
    aiTitle: 'AI-augmented engineering',
    aiLead: 'AI speeds up delivery. Human review decides what ships.',
    aiFlow: ['Spec', 'AI-assisted code', 'Tests', 'Human review', 'Merge'],
    aiTools: ['Claude Code', 'MCP', 'Agents', 'Subagents', 'Agent Skills', 'Amazon Bedrock', 'Google Vertex AI'],
    aiLink: 'See Anthropic certifications',
    capabilitiesTitle: 'Capabilities',
    capabilitiesLead: 'Four fronts that come together in every product I ship.',
    capabilities: [
      {
        icon: 'layers',
        title: 'Product and architecture',
        summary: 'Multi-tenant SaaS designed to grow without forks.',
        points: ['Per-company isolation and white-label by configuration', 'State machines and immutable ledgers', 'Reusable, declarative connectors'],
        tech: ['TypeScript', 'React', 'Next.js', 'Node.js'],
      },
      {
        icon: 'database',
        title: 'Data and integrations',
        summary: 'Relational modeling and integrations that hold up.',
        points: ['ERP through SQL Server with concurrency control', 'Two-way sync with the outbox pattern', 'Playwright RPA for systems without an API'],
        tech: ['PostgreSQL', 'SQL Server', 'SQLite', 'REST'],
      },
      {
        icon: 'shield',
        title: 'Security and privacy',
        summary: 'Security designed into every feature, not added at the end.',
        points: ['Parameterized queries, XSS, CSRF and SSRF protection', 'RBAC, rate limiting and audit trails', 'AES-256-GCM encryption, consent and k-anonymity'],
        tech: ['RBAC', 'JWT', 'AES-256-GCM', 'OWASP'],
      },
      {
        icon: 'phone',
        title: 'Mobile and delivery',
        summary: 'From build to app store and production server.',
        points: ['Android and iOS apps with Capacitor', 'Google Play publishing: builds, policies and releases', 'Deploy, Linux servers and SSH hardening'],
        tech: ['Capacitor', 'Google Play', 'Linux', 'CI/CD'],
      },
    ],
  },
};
