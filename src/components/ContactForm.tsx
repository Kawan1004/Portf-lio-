import { useEffect, useId, useRef, useState, type SubmitEvent } from 'react';
import { PUBLIC_TURNSTILE_SITE_KEY } from 'astro:env/client';
import { CONTACT_LIMITS, contactSchema, type ContactField } from '@/lib/contact-schema';

type Labels = Record<
  | 'name' | 'email' | 'message' | 'submit' | 'sending' | 'success' | 'error'
  | 'errName' | 'errEmail' | 'errMessage' | 'errCaptcha' | 'privacy' | 'privacyLink',
  string
>;

interface Props {
  labels: Labels;
  lang: string;
  privacyHref: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

const TURNSTILE_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SRC}"]`);
    const script = existing ?? Object.assign(document.createElement('script'), { src: TURNSTILE_SRC, async: true });
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => reject(new Error('turnstile')));
    if (!existing) document.head.append(script);
  });
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm({ labels, lang, privacyHref }: Props) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [messageLength, setMessageLength] = useState(0);

  const errorText: Record<ContactField, string> = {
    name: labels.errName,
    email: labels.errEmail,
    message: labels.errMessage,
    captcha: labels.errCaptcha,
  };

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !widgetRef.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(widgetRef.current, {
          sitekey: PUBLIC_TURNSTILE_SITE_KEY,
          language: lang,
          theme: document.documentElement.dataset['theme'] === 'dark' ? 'dark' : 'light',
          callback: (t: string) => setToken(t),
          'expired-callback': () => setToken(''),
          'error-callback': () => setToken(''),
        });
      })
      .catch(() => setErrors((e) => ({ ...e, captcha: labels.errCaptcha })));
    return () => {
      cancelled = true;
    };
  }, [lang, labels.errCaptcha]);

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const parsed = contactSchema.safeParse({
      name: form.get('name') ?? '',
      email: form.get('email') ?? '',
      message: form.get('message') ?? '',
      website: form.get('website') ?? '',
      turnstileToken: token,
    });

    if (!parsed.success) {
      const next: Partial<Record<ContactField, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = (issue.path[0] === 'turnstileToken' ? 'captcha' : issue.path[0]) as ContactField;
        if (field in errorText) next[field] ??= errorText[field];
      }
      setErrors(next);
      const first = (['name', 'email', 'message'] as const).find((f) => next[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...parsed.data }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('success');
      formRef.current?.reset();
      setMessageLength(0);
    } catch {
      setStatus('error');
    } finally {
      setToken('');
      window.turnstile?.reset(widgetId.current);
    }
  }

  const field = (name: ContactField) => ({
    id: `${id}-${name}`,
    name,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
  });

  const inputClass =
    'mt-2 block w-full rounded-xl border border-border bg-surface px-4 py-3 text-base text-fg transition-colors duration-200 placeholder:text-fg-muted hover:border-fg-muted focus:border-accent focus:outline-none aria-[invalid]:border-red-500';

  const errorMsg = (name: ContactField) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="mt-2 text-sm text-red-600 dark:text-red-400">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-medium">{labels.name}</label>
          <input {...field('name')} type="text" autoComplete="name" required maxLength={CONTACT_LIMITS.name} className={inputClass} />
          {errorMsg('name')}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-medium">{labels.email}</label>
          <input {...field('email')} type="email" autoComplete="email" inputMode="email" required maxLength={CONTACT_LIMITS.email} className={inputClass} />
          {errorMsg('email')}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor={`${id}-message`} className="text-sm font-medium">{labels.message}</label>
          <span className="text-xs text-fg-muted tabular-nums" aria-hidden="true">
            {messageLength}/{CONTACT_LIMITS.message}
          </span>
        </div>
        <textarea
          {...field('message')}
          rows={6}
          required
          maxLength={CONTACT_LIMITS.message}
          onChange={(e) => setMessageLength(e.currentTarget.value.length)}
          className={`${inputClass} resize-y`}
        />
        {errorMsg('message')}
      </div>

      {/* Honeypot: fora da tela e fora da ordem de tabulação. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div ref={widgetRef} className="min-h-[65px]" />
        {errorMsg('captcha')}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex h-12 cursor-pointer items-center rounded-full bg-fg px-6 text-sm font-medium text-bg transition-opacity duration-200 hover:opacity-85 disabled:cursor-wait disabled:opacity-60"
        >
          {status === 'sending' ? labels.sending : labels.submit}
        </button>
        <p className="text-sm text-fg-muted">
          {labels.privacy}{' '}
          <a href={privacyHref} className="underline underline-offset-4 hover:text-fg">{labels.privacyLink}</a>
        </p>
      </div>

      <p role="status" aria-live="polite" className="text-sm">
        {status === 'success' && <span className="text-accent">{labels.success}</span>}
        {status === 'error' && <span className="text-red-600 dark:text-red-400">{labels.error}</span>}
      </p>
    </form>
  );
}
