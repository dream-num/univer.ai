import DocSearch from '@/components/DocSearch'
import Logo from '@/components/Logo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import pkg from './package.json'

export default {
  logo: Logo,
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
  search: {
    component: () => (
      <DocSearch />
    ),
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
  sidebar: {
    defaultMenuCollapseLevel: 3,
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
        'zh-CN': '文档有问题？给我们反馈 ↗',
        'en-US': 'Found a mistake in the docs? Let us know ↗',
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
        '/guides/sheet/introduction',
        '/guides/doc/introduction',
        '/guides/slide/introduction',

        '/guides/sheet/getting-started/univer-plugins',
        '/guides/doc/getting-started/univer-plugins',
        '/guides/slide/getting-started/univer-plugins',

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
        '/guides/slide/features/facade',

        '/guides/sheet/server',
        '/guides/doc/server',
        '/guides/slide/server',

        '/guides/sheet/tutorials/find-the-command-id',
        '/guides/doc/tutorials/find-the-command-id',
        '/guides/slide/tutorials/find-the-command-id',

        '/guides/sheet/contributing',
        '/guides/doc/contributing',
        '/guides/slide/contributing',
      ]
      const isGeneralDoc = generalDocs.some(doc => uri.startsWith(doc))

      const href = `https://github.com/dream-num/univer.ai/tree/main/src/docs${isGeneralDoc ? uri.replace(/(sheet|doc|slide)/, 'general') : uri}`

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
