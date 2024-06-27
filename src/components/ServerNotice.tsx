import { Callout } from '@radix-ui/themes'
import { useTranslation } from '@/lib/i18n'

export default function BusinessPlanNotice() {
  const t = useTranslation({
    'en-US': {
      notice: 'This feature depends on the Univer backend service. Please make sure you have read the ',
      doc: 'related documentation',
      deploy: ' and completed the deployment before using it.',
    },
    'zh-CN': {
      notice: '本功能依赖 Univer 后端服务，在使用前请先确保你已经阅读了',
      doc: '相关文档',
      deploy: '，并完成了部署。',
    },
  })

  return (
    <Callout.Root className="mt-6" color="plum" variant="soft">
      <Callout.Icon>
        💻
      </Callout.Icon>
      <Callout.Text>
        {t('notice')}
        <a className="rounded-none border-b border-current font-semibold" href="/guides/sheet/server/overview">{t('doc')}</a>
        {t('deploy')}
      </Callout.Text>
    </Callout.Root>
  )
}
