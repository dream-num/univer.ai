import { useRouter } from 'next/router'

type LangType = 'en-US' | 'zh-CN'

export function useTranslation(locales: Record<LangType, Record<string, string>>) {
  const { locale } = useRouter()

  const t = (key: string) => {
    return locales[locale as LangType][key]
  }

  return t
}
