import { langs, ui, type Lang, type UIKey } from './ui';

/** One string per language. Pages render every language and CSS shows the chosen one. */
export type Bilingual = Record<Lang, string>;

/** Translate a UI key into one language, falling back to English per key. */
export function t(lang: Lang, key: UIKey, vars: Record<string, string | number> = {}): string {
  const template = ui[lang][key] || ui.en[key]!;
  return template.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`));
}

/** Build a Bilingual by running fn once per language. */
export function both(fn: (lang: Lang) => string): Bilingual {
  return Object.fromEntries(langs.map((lang) => [lang, fn(lang)])) as Bilingual;
}

/** A UI key in every language. */
export function tt(key: UIKey, vars?: Record<string, string | number>): Bilingual {
  return both((lang) => t(lang, key, vars));
}

/**
 * Attributes (alt, aria-label, …) can't hold two languages at once, so render the
 * default language and let the client script swap them: spread onto an element.
 */
export function i18nAttrs(attrs: Record<string, Bilingual>): Record<string, string> {
  return {
    ...Object.fromEntries(Object.entries(attrs).map(([name, value]) => [name, value.et])),
    'data-i18n-attrs': JSON.stringify(attrs),
  };
}
