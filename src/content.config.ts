import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const l10n = z.object({ pt: z.string().min(1), en: z.string().min(1) });

const experience = defineCollection({
  loader: file('src/content/data/experience.yaml'),
  schema: z.object({
    order: z.number().int(),
    timeline: z.enum(['current', 'internship', 'freelance', 'notary']),
    org: l10n,
    role: l10n,
    summary: l10n,
  }),
});

const skills = defineCollection({
  loader: file('src/content/data/skills.yaml'),
  schema: z.object({
    order: z.number().int(),
    group: l10n,
    items: z.array(z.string().min(1)).min(1),
  }),
});

const security = defineCollection({
  loader: file('src/content/data/security.yaml'),
  schema: z.object({
    order: z.number().int(),
    title: l10n,
    detail: l10n,
  }),
});

const certifications = defineCollection({
  loader: file('src/content/data/certifications.yaml'),
  schema: ({ image }) =>
    z.object({
      order: z.number().int(),
      title: z.string().min(1),
      issuer: z.string().min(1),
      // Opcional até haver a data real do certificado; nunca estimar.
      date: z.string().regex(/^\d{4}(-\d{2})?$/).optional(),
      category: z.enum(['IA', 'Frontend', 'Backend', 'Segurança', 'Banco', 'DevOps', 'Palestras', 'Outros']),
      status: z.enum(['concluido', 'em_andamento']),
      hours: z.number().positive().optional(),
      credentialUrl: z.url().optional(),
      // Somente imagens já recortadas/mascaradas (sem CPF/RG), em src/assets/certificados/.
      image: image().optional(),
      highlight: z.boolean().default(false),
      // Cor predominante do certificado (extraída da imagem), usada só na iluminação.
      color: z.string().regex(/^#[0-9a-f]{6}$/i).optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '{pt,en}/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1).max(220),
    order: z.number().int(),
    draft: z.boolean().default(false),
    role: z.string().min(1),
    mockup: z.enum(['engagement', 'inspection', 'survey', 'jobs', 'documents', 'agenda', 'commissions', 'remediation']),
    stack: z.array(z.string()).min(1),
    highlights: z.array(z.string()).min(2).max(4),
  }),
});

export const collections = { experience, skills, security, certifications, projects };
