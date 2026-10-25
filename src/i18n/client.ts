import { defaultLang, LANG_STORAGE_KEY, langs, type Lang } from './ui';

function isLang(value: unknown): value is Lang {
  return langs.includes(value as Lang);
}

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    return isLang(stored) ? stored : defaultLang;
  } catch {
    return defaultLang;
  }
}

/** Show `lang` everywhere: text via CSS on <html data-lang>, attributes and title via JS. */
function applyLang(lang: Lang) {
  const root = document.documentElement;
  root.dataset.lang = lang;
  root.lang = lang;

  document.querySelectorAll<HTMLElement>('[data-i18n-attrs]').forEach((el) => {
    const attrs = JSON.parse(el.dataset.i18nAttrs!) as Record<string, Record<Lang, string>>;
    for (const [name, values] of Object.entries(attrs)) {
      el.setAttribute(name, values[lang]);
    }
  });

  const titles = root.dataset.titles && JSON.parse(root.dataset.titles);
  if (titles) document.title = titles[lang];

  document.querySelectorAll<HTMLElement>('[data-set-lang]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.setLang === lang));
  });
}

applyLang(readStoredLang());

document.querySelectorAll<HTMLElement>('[data-set-lang]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.setLang;
    if (!isLang(lang)) return;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Private mode etc.: the switch still works for this page view.
    }
    applyLang(lang);
  });
});
