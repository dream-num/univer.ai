import { Callout } from '@radix-ui/themes'
import { useTranslation } from '@/lib/i18n'

export default function BusinessPlanNotice() {
  const t = useTranslation({
    'en-US': {
      notice: 'This feature contains closed-source code, allowing any user to use it for free. It also includes an optional business upgrade plan that provides richer features and services.',
    },
    'zh-CN': {
      notice: '本功能包含闭源代码，允许任何用户免费商用。此外也包含了可选的商业升级计划，可提供更丰富的功能和服务。',
    },
  })

  return (
    <Callout.Root className="mt-6" color="gray" variant="soft" highContrast>
      <Callout.Icon>
        🏆
      </Callout.Icon>
      <Callout.Text>
        {t('notice')}
      </Callout.Text>
    </Callout.Root>
  )
}
