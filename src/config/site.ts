// Dados pessoais centralizados. Itens marcados [PREENCHER] precisam ser revisados antes do deploy.
// Não incluir telefone, endereço ou CPF.

export const site = {
  url: 'https://kawanpereira.dev', // [PREENCHER] domínio final
  name: 'Kawan Pereira',
  initials: 'KP',
  location: 'São Paulo, SP',
  // E-mail público de contato (pedido explícito do autor; o do currículo).
  email: 'kawan.nino1004@gmail.com',
  social: {
    linkedin: 'https://www.linkedin.com/in/kawan-pereira-aa620a21b',
    github: 'https://github.com/Kawan1004',
  },
  education: {
    course: { pt: 'Análise e Desenvolvimento de Sistemas', en: 'Systems Analysis and Development' },
    institution: 'UNIP — Universidade Paulista',
    year: 2025,
  },
  languages: { pt: 'Inglês intermediário', en: 'Intermediate English' },
  resumePdf: null as string | null, // ex.: '/curriculo-kawan-pereira.pdf' em /public (sem telefone, endereço ou CPF)
  timeline: {
    current: { start: '2026-01' },
    internship: { start: '2025-11', end: '2025-12' }, // [CONFIRMAR] currículo indica entrada em nov/2025
    freelance: { start: '[PREENCHER]', end: '[PREENCHER]' },
    notary: { start: '2018-04', end: '2025-11' },
  },
  // Números reais exibidos na seção "Números". Não incluir valores estimados.
  stats: {
    anthropicCerts: 23,
    yearsWithSensitiveData: 2026 - 2018,
    storeApps: 1,
  },
} as const;

export type Site = typeof site;
