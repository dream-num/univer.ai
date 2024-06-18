import enUS from './en-US'
import zhCN from './zh-CN'
import { useTranslation } from '@/official-site/utils/i18n'

export default function Footer() {
  const t = useTranslation({
    'en-US': enUS,
    'zh-CN': zhCN,
  })

  const navs = [{
    title: t('resources'),
    items: [{
      title: t('blog'),
      href: '/blog/post/this-is-univer',
    }, {
      title: t('icons'),
      href: '/icons',
    }],
  }, {
    title: t('univer'),
    items: [{
      title: t('guides'),
      href: '/guides/sheet/introduction',
    }, {
      title: t('examples'),
      href: '/examples',
    }],
  }, {
    title: t('univer-pro'),
    items: [{
      title: t('guides'),
      href: '/pro/guides/sheet/introduction',
    }, {
      title: t('examples'),
      href: '/pro/examples',
    }],
  }, {
    title: t('community'),
    items: [{
      title: t('github'),
      href: 'https://github.com/dream-num/univer/discussions',
    }, {
      title: t('discord'),
      href: 'https://discord.gg/FaHvP4DwyX',
    }],
  }, {
    title: t('legal'),
    items: [{
      title: t('privacy-policy'),
      href: '/legal/privacy-policy',
    }, {
      title: t('terms & conditions'),
      href: '/legal/terms-conditions',
    }],
  }]

  return (
    <footer
      className={`
        px-4 pb-9

        xl:pb-[80px]
      `}
    >
      {/* Navigation */}
      <section
        className={`
          mb-8 grid gap-6

          md:mb-[40px] md:flex md:justify-center md:gap-[100px]
        `}
      >
        {navs.map(nav => (
          <div key={nav.title}>
            <h3 className="mb-5 cursor-default font-bold">{nav.title}</h3>
            <ul className="grid gap-5">
              {nav.items.map(item => (
                <li
                  key={item.title}
                  className={`
                    text-sm

                    hover:underline
                  `}
                >
                  <a className="text-[#474D57]" href={item.href}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Copyright */}
      <p className="text-center text-sm text-[#474D57]">
        Copyright &copy; 2021-2024 DreamNum Co,Ltd. All Rights Reserved.
      </p>
    </footer>
  )
}
