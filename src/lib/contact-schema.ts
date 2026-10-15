import { z } from 'zod';

// Compartilhado entre o formulário (client) e o endpoint (server).
export const CONTACT_LIMITS = { name: 80, email: 254, message: 2000 } as const;

// Remove caracteres de controle (exceto quebra de linha e tab) e normaliza espaços nas pontas.
const clean = (s: string) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();

export const contactSchema = z.object({
  name: z.string().transform(clean).pipe(z.string().min(2, 'name').max(CONTACT_LIMITS.name, 'name')),
  email: z.string().transform(clean).pipe(z.email('email').max(CONTACT_LIMITS.email, 'email')),
  message: z.string().transform(clean).pipe(z.string().min(10, 'message').max(CONTACT_LIMITS.message, 'message')),
  // Honeypot: humanos não veem o campo; qualquer valor indica bot.
  website: z.string().max(200).optional().default(''),
  turnstileToken: z.string().min(1, 'captcha').max(2048, 'captcha'),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactField = 'name' | 'email' | 'message' | 'captcha';
