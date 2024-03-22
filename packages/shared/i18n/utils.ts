import { defaultLanguage, ui } from './ui'

export { languages } from './ui'

export function getLangFromUrl(url: URL) {
  const paths = url.pathname.split('/')
  const lang = paths[1] === 'pro' ? paths[2] : paths[1]

  if (lang in ui) {
    return lang as keyof typeof ui
  }
  return defaultLanguage
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLanguage]) {
    return ui[lang][key] || ui[defaultLanguage][key]
  }
}

export function useI18nUrl(lang: keyof typeof ui) {
  return function l(path: string) {
    if (lang === defaultLanguage) {
      return path
    }

    return `/${lang}${path}`
  }
}
