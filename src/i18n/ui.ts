import { languageKey as languageKeyEnUs, languageName as languageNameEnUs, locales as localesEnUs } from './locales/en-us'
import { languageKey as languageKeyJaJp, languageName as languageNameJaJp, locales as localesJaJp } from './locales/ja-jp'
import { languageKey as languageKeyZhCn, languageName as languageNameZhCn, locales as localesZhCn } from './locales/zh-cn'

export const defaultLanguage = languageKeyEnUs

export const languages = {
  [languageKeyZhCn]: languageNameZhCn,
  [languageKeyEnUs]: languageNameEnUs,
  [languageKeyJaJp]: languageNameJaJp,
}

export const ui = {
  [languageKeyZhCn]: localesZhCn,
  [languageKeyEnUs]: localesEnUs,
  [languageKeyJaJp]: localesJaJp,
} as const
