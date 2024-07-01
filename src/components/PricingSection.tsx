import { SuccessSingle } from '@univerjs/icons'
import Link from 'next/link'
import { clsx } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n'
import ShineBorder from '@/components/ShineBorder'

interface IProps {
  className?: string
}

export default function PricingSection(props: IProps) {
  const { className } = props

  const t = useTranslation({
    'en-US': {
      'free.title': 'free',
      'free.desc': 'Suitable for small businesses.',
      'free.price': '$0',
      'free.features.0': 'No development license.',
      'free.features.1': 'Free to use in production environment.',
      'free.features.2': 'Upgrade to the business edition with one click.',
      'free.btn': 'Start Using',
      'free.btn.link': '/guides/sheet/getting-started/quickstart#integrated-server-template',
      'business.title': 'Business',
      'business.desc': 'Suitable for medium and large enterprises that need stable services.',
      'business.price': 'Apply for a 30-day free trial with one click',
      'business.features.0': 'After the trial period is over, the system is automatically downgraded to the free version, which does not affect the production environment.',
      'business.btn': 'One-click trial',
    },
    'zh-CN': {
      'free.title': '免费版',
      'free.desc': '适合小型企业使用。',
      'free.price': '¥0',
      'free.features.0': '无需开发许可费。',
      'free.features.1': '免费在生产环境中使用。',
      'free.features.2': '一键升级到商业版。',
      'free.btn': '开始使用',
      'free.btn.link': '/guides/sheet/getting-started/quickstart#集成服务端的模板',
      'business.title': '商业版',
      'business.desc': '适合需要稳定服务的中大型企业。',
      'business.price': '一键申请 30 天免费试用',
      'business.features.0': '试用期结束后，系统自动恢复为免费版，不影响生产环境。',
      'business.btn': '一键试用',
    },
  })

  return (
    <section
      className={clsx(`
        flex flex-col items-end justify-center gap-7

        md:flex-row md:gap-[52px]
      `, className)}
    >
      <div
        className={`
          flex h-[464px] w-full flex-col justify-between rounded-[24px] border border-[#DEE1E5]
          bg-white p-7 text-[#0F172A]

          md:w-[396px]
        `}
      >
        <div>
          <h3 className="mb-5 text-2xl font-semibold">{t('free.title')}</h3>

          <p className="mb-5">{t('free.desc')}</p>

          <p className="mb-6 text-4xl font-semibold">{t('free.price')}</p>

          <ul className="grid gap-2">
            <li className="flex gap-2 text-[#474D57]">
              <SuccessSingle className="relative top-[2px] h-5 w-5 flex-shrink-0 text-[#0FCC65]" />
              {t('free.features.0')}
            </li>
            <li className="flex gap-2 text-[#474D57]">
              <SuccessSingle className="relative top-[2px] h-5 w-5 flex-shrink-0 text-[#0FCC65]" />
              {t('free.features.1')}
            </li>
            <li className="flex gap-2 text-[#474D57]">
              <SuccessSingle className="relative top-[2px] h-5 w-5 flex-shrink-0 text-[#0FCC65]" />
              {t('free.features.2')}
            </li>
          </ul>
        </div>

        <Link
          className={`
            h-10 w-full rounded-full bg-[#474D57] text-center font-medium leading-10 text-white
          `}
          href={t('free.btn.link')}
        >
          {t('free.btn')}
        </Link>
      </div>

      <ShineBorder
        className={`
          h-[508px] w-full rounded-[24px] shadow-[0_6px_48px_0_rgba(12,34,67,0.12)]

          md:w-[396px]
        `}
        animate={false}
        color={['#0048FF', '#0C81ED', '#029DCE', '#00BBB0', '#00C5A8']}
        borderWidth={2}
        borderRadius={24}
        duration={0}
      >
        <div className="relative z-1 flex h-full flex-col justify-between p-7 text-[#0F172A]">
          <div>
            <h3 className="mb-5 text-2xl font-semibold">{t('business.title')}</h3>

            <p className="mb-5">{t('business.desc')}</p>

            <p className="mb-6 text-2xl/10 font-semibold">{t('business.price')}</p>

            <ul>
              <li className="flex gap-2 text-[#474D57]">
                <SuccessSingle className="relative top-[2px] h-5 w-5 flex-shrink-0 text-[#0FCC65]" />
                {t('business.features.0')}
              </li>
            </ul>
          </div>

          <Link
            className={`
              h-10 w-full rounded-full
              bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
              text-center font-medium leading-10 text-white
            `}
            locale={false}
            href="/pro/license"
          >
            {t('business.btn')}
          </Link>
        </div>
      </ShineBorder>
    </section>
  )
}
