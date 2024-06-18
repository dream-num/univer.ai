import { useRouter } from 'next/router'
import Link from 'next/link'
import pkg from './package.json'

export default {
  logo: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useRouter()
    const isPro = pathname.startsWith('/pro')

    return (
      <span className="inline-flex items-center gap-2">
        <img src="/images/univer.svg" alt="Univer" className="size-8" />
        <span className="text-xl">
          Univer
          {isPro ? ' Pro' : ''}
        </span>
      </span>
    )
  },
  project: {
    link: 'https://github.com/dream-num/univer',
  },
  chat: {
    link: 'https://discord.gg/XPGnMBmpd6',
  },
  i18n: [
    { locale: 'en-US', text: 'English' },
    { locale: 'zh-CN', text: '简体中文' },
  ],
  docsRepositoryBase: 'https://github.com/dream-num/univer.ai/tree/main',
  head: null,
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Univer',
      description: 'Univer is an open-source alternative to Google Sheets, Slides, and Docs',
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://univer.ai',
        site_name: 'Univer',
        images: [
          {
            url: 'https://univer.ai/images/og.png',
            alt: 'Univer',
          },
        ],
      },
      twitter: {
        handle: '@univerhq',
        site: '@univerhq',
        cardType: 'summary_large_image',
      },
    }
  },
  banner: {
    dismissible: true,
    key: pkg.version,
    text: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { locale } = useRouter()

      const message = {
        'zh-CN': `🎉 v${pkg.version} 版本已发布。查看详情 →`,
        'en-US': `🎉 v${pkg.version} is released. Read more →`,
      }

      return (
        <a href={`https://github.com/dream-num/univer/releases/tag/v${pkg.version}`} target="_blank">
          {message[locale]}
        </a>
      )
    },
  },
  primaryHue: 200,
  sidebar: {
    toggleButton: true,
    titleComponent({ title }) {
      const apiTitles = [
        'classes',
        'type-aliases',
        'interfaces',
        'variables',
        'functions',
        'namespaces',
        'enumerations',
      ]

      if (apiTitles.includes(title)) {
        const initial = title.charAt(0).toUpperCase()
        return (
          <span className="flex gap-2 items-center">
            <span className="font-semibold border-2 border-stone-700 rounded-md size-6 flex items-center justify-center">
              {initial}
            </span>
            <span>
              {initial}
              {title.slice(1)}
            </span>
          </span>
        )
      }
      else if (title.startsWith('@univerjs')) {
        return <span className="font-semibold">{title}</span>
      }
      else {
        return title
      }
    },
  },
  toc: {
    title: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { locale } = useRouter()

      const message = {
        'zh-CN': '目录',
        'en-US': 'Contents',
      }

      return message[locale]
    },
    backToTop: true,
  },
  feedback: {
    content: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { locale } = useRouter()

      const message = {
        'zh-CN': '有问题？给我们反馈 ↗',
        'en-US': 'Question? Give us feedback ↗',
      }

      return message[locale]
    },
  },
  editLink: {
    component: ({ className, filePath }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { locale } = useRouter()

      const message = {
        'zh-CN': '在 GitHub 上编辑此页 ↗',
        'en-US': 'Edit this page on GitHub ↗',
      }
      const uri = filePath.replace('src/pages', '')

      const generalDocs = [
        '/guides/sheet/advanced',
        '/guides/doc/advanced',
        '/guides/slide/advanced',
        '/guides/sheet/architecture',
        '/guides/doc/architecture',
        '/guides/slide/architecture',
        '/guides/sheet/facade/facade',
        '/guides/doc/facade/facade',
        '/guides/slide/facade/facade',
        '/guides/sheet/features/facade',
        '/guides/doc/features/facade',
        // '/guides/slide/features/facade',
        '/guides/sheet/contributing',
        '/guides/doc/contributing',
        '/guides/slide/contributing',
      ]
      const isGeneralDoc = generalDocs.some(doc => uri.startsWith(doc))

      const href = `https://github.com/dream-num/univer.ai/tree/main${isGeneralDoc ? uri.replace(/(sheet|doc|slide)/, 'general') : uri}`

      return (
        <Link className={className} href={href} target="_blank" rel="noopener noreferrer">
          {message[locale]}
        </Link>
      )
    },
  },
  footer: {
    text: (
      <span>
        Copyright &copy; 2021-2024 DreamNum Co,Ltd. All Rights Reserved.
      </span>
    ),
  },
}
