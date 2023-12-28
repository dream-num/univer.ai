import { ui, defaultLanguage } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLanguage;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLanguage]) {
    return ui[lang][key] || ui[defaultLanguage][key];
  }
}

export function useI18nUrl(lang: keyof typeof ui) {
  return function l(path: string) {
    if (lang === defaultLanguage) return path;

    return `/${lang}${path}`;
  }
}
