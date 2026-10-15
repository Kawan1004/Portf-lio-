import { defaultLang, languages, ui, type Lang, type UIKey } from './ui';

export function getLang(currentLocale: string | undefined): Lang {
  return currentLocale && currentLocale in languages ? (currentLocale as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key];
}

/** Caminho localizado: `localePath('en', '/privacidade')` → `/en/privacidade`. */
export function localePath(lang: Lang, path = '/'): string {
  const clean = path === '/' ? '' : path;
  return lang === defaultLang ? clean || '/' : `/${lang}${clean}`;
}

/** Remove o prefixo de idioma para obter o caminho equivalente no outro idioma. */
export function stripLang(pathname: string): string {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, '');
  return stripped || '/';
}

/** Formata 'YYYY-MM' no idioma; placeholders como '[PREENCHER]' passam inalterados. */
export function formatMonth(lang: Lang, value: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return value;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1));
  return new Intl.DateTimeFormat(languages[lang].htmlLang, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
}
