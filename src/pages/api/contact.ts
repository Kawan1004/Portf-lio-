import type { APIRoute } from 'astro';
import { CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, RESEND_API_KEY, TURNSTILE_SECRET_KEY } from 'astro:env/server';
import { contactSchema } from '@/lib/contact-schema';
import { rateLimit } from '@/lib/rate-limit';

export const prerender = false;

const MAX_BODY_BYTES = 10_000;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

// Resposta genérica: nunca expor detalhes internos ao cliente.
const fail = (status = 400) => json(status, { ok: false });

async function verifyTurnstile(token: string, ip: string, secret: string): Promise<boolean> {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    signal: AbortSignal.timeout(5_000),
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

async function sendEmail(input: { name: string; email: string; message: string }, key: string, from: string, to: string): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
    },
    // Só texto puro: nenhum conteúdo do usuário é interpretado como HTML.
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email,
      subject: `Portfólio · contato de ${input.name.replace(/[\r\n]+/g, ' ')}`,
      text: `Nome: ${input.name}\nE-mail: ${input.email}\n\n${input.message}`,
    }),
    signal: AbortSignal.timeout(8_000),
  });
  return res.ok;
}

export const POST: APIRoute = async ({ request, clientAddress, url }) => {
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL || !TURNSTILE_SECRET_KEY) return fail(503);
  const origin = request.headers.get('origin');
  if (origin !== url.origin) return fail(403);
  if (!request.headers.get('content-type')?.includes('application/json')) return fail(415);

  const ip = clientAddress || 'unknown';
  if (!rateLimit(ip)) return fail(429);

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return fail(413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail();
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return fail();
  const { website, turnstileToken, ...data } = parsed.data;

  // Bot preencheu o honeypot: finge sucesso e descarta.
  if (website) return json(200, { ok: true });

  try {
    if (!(await verifyTurnstile(turnstileToken, ip, TURNSTILE_SECRET_KEY))) return fail(400);
    if (!(await sendEmail(data, RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL))) {
      console.error('[contact] falha no envio via Resend');
      return fail(502);
    }
  } catch {
    console.error('[contact] erro em chamada externa');
    return fail(502);
  }

  return json(200, { ok: true });
};

export const ALL: APIRoute = () => new Response(null, { status: 405, headers: { allow: 'POST' } });
