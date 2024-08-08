import { DropdownMenu, ScrollArea } from '@radix-ui/themes'
import { CloseSingle, GithubSingle24, LanguageSingle, MenuSingle24, MoreSingle } from '@univerjs/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import LinkItem from './LinkItem'
import { MenuItem } from './MenuItem'
import enUS from './en-US'
import zhCN from './zh-CN'
import { clsx } from '@/lib/utils'
import { useTranslation } from '@/lib/i18n'
import Dropdown from '@/components/Dropdown'
import Action from '@/components/Action'

type NavType = {
  title: string
  type: 'menu'
  desc: string
  href: string
  icon: string
  items: {
    title: string
    desc: string
    href: string
    icon: string
  }[]
} | {
  title: string
  type: 'link'
  href: string
} | {
  title: string
  type: 'dropdown'
  items: {
    title: string
    desc: string
    href: string
    icon: string
  }[]
}

export default function Navbar() {
  const router = useRouter()
  const { pathname } = router

  const secondSeparatorIdx = pathname.indexOf('/', 1)
  const rootPath = secondSeparatorIdx < 0 ? pathname : pathname.slice(0, secondSeparatorIdx)

  const [collapsed, setCollapsed] = useState(true)

  const t = useTranslation({
    'en-US': enUS,
    'zh-CN': zhCN,
  })

  const navs: NavType[] = [{
    title: 'Univer',
    type: 'menu',
    desc: t('univer.description'),
    href: '/',
    icon: '/images/univer/logo.svg',
    items: [{
      title: t('univer.guides.title'),
      desc: t('univer.guides.desc'),
      href: '/guides/sheet/introduction',
      icon: '/images/univer/guides-icon.svg',
    }, {
      title: t('univer.examples.title'),
      desc: t('univer.examples.desc'),
      href: '/examples',
      icon: '/images/univer/examples-icon.svg',
    }, {
      title: t('univer.playground.title'),
      desc: t('univer.playground.desc'),
      href: '/playground',
      icon: '/images/univer/playground-icon.svg',
    }],
  }, {
    title: 'Univer Workspace',
    type: 'link',
    href: 'https://space.univer.ai',
  }, {
    title: t('clipSheet.title'),
    type: 'link',
    href: '/clipsheet',
  }, {
    title: t('ecosystem.title'),
    type: 'dropdown',
    items: [{
      title: t('ecosystem.icons.title'),
      desc: t('ecosystem.icons.desc'),
      href: '/icons',
      icon: '/images/univer-icons/icons-icon.svg',
    }],
  }, {
    title: t('blog.title'),
    type: 'link',
    href: '/blog/post/this-is-univer',
  }]

  function renderNav(nav: NavType) {
    if (nav.type === 'menu') {
      return (
        <MenuItem title={nav.title} desc={nav.desc} href={nav.href} icon={nav.icon} items={nav.items} />
      )
    } else if (nav.type === 'dropdown') {
      return (
        <MenuItem title={nav.title} items={nav.items} />
      )
    } else {
      return (
        <LinkItem title={nav.title} href={nav.href} />
      )
    }
  }

  return (
    <section
      className={clsx(`
        sticky left-0 top-0 z-10 w-full overflow-hidden border-b border-[#eceded] bg-white/60
        shadow-[0_4px_24px_0_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all

        xl:h-[68px]
      `, {
        'h-[68px]': collapsed,
        'h-[100vh]': !collapsed,
      })}
    >
      <header
        className={`
          flex h-[68px] justify-between px-4

          xl:px-6
        `}
      >
        {/* Logo & title */}
        <div className="h-full">
          <Link className="flex h-full items-center" locale={router.locale} href={rootPath.includes('examples') ? '/' : rootPath}>
            <img src="/images/univer/logo.svg" alt="Univer" draggable={false} />
          </Link>
        </div>

        {/* Desktop: Menu */}
        <div
          className={`
            hidden h-full items-center gap-8

            xl:flex
          `}
        >
          {/* Navgation */}
          <nav className="h-full">
            <ul className="flex h-full items-center gap-8">
              {navs.map(nav => (
                <li key={nav.title}>
                  {renderNav(nav)}
                </li>
              ))}
            </ul>
          </nav>

          {/* Internationalize */}
          <Dropdown
            overlay={(
              <div>
                <Link
                  className={`
                    block rounded-xl px-3 py-2 leading-normal text-[#0F172A] transition-all

                    hover:bg-[rgba(83,145,238,0.06)]
                  `}
                  href={pathname}
                  locale="en-US"
                >
                  English
                </Link>
                <Link
                  className={`
                    block rounded-xl px-3 py-2 leading-normal text-[#0F172A] transition-all

                    hover:bg-[rgba(83,145,238,0.06)]
                  `}
                  href={pathname}
                  locale="zh-CN"
                >
                  简体中文
                </Link>
              </div>
            )}
          >
            <span className="flex gap-2">
              <LanguageSingle />
              <MoreSingle className="rotate-90" />
            </span>
          </Dropdown>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              className="text-2xl"
              href="https://github.com/dream-num/univer"
            >
              <GithubSingle24 />
            </Link>

            <Action />
          </div>
        </div>

        {/* Mobile: Menu */}
        <div className={`
          flex items-center

          xl:hidden
        `}
        >
          <a className="text-2xl" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuSingle24 /> : <CloseSingle />}
          </a>
        </div>
      </header>

      {/* Mobile: Menu */}
      <ScrollArea style={{ height: 'calc(100vh - 68px)' }}>
        <nav className="flex h-full flex-col justify-between px-6">
          <div>
            <ul className="grid gap-6 py-6">
              {navs.map(nav => (
                <li key={nav.title} className="grid gap-6">
                  {nav.type !== 'dropdown'
                    ? (<Link className="font-semibold" href={nav.href} onClick={() => setCollapsed(!collapsed)}>{nav.title}</Link>)
                    : (
                        <a className="font-semibold">
                          {nav.title}
                        </a>
                      )}

                  {nav.type !== 'link' && (
                    <ul className="grid gap-6">
                      {nav.items.map(item => (
                        <li key={item.title}>
                          <Link className="text-[#474D57]" href={item.href} onClick={() => setCollapsed(!collapsed)}>
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div>
              <Action />
            </div>
          </div>

          <footer className="flex items-center justify-end gap-4 py-7">
            <Link
              className="text-2xl"
              href="https://github.com/dream-num/univer"
            >
              <GithubSingle24 />
            </Link>

            {/* Internationalize */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <a className="flex cursor-pointer items-center gap-2">
                  <LanguageSingle />
                  <MoreSingle className="rotate-90" />
                </a>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item asChild>
                  <Link href={pathname} locale="en-US">English</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link href={pathname} locale="zh-CN">简体中文</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </footer>
        </nav>
      </ScrollArea>
    </section>
  )
}
