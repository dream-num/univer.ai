import process from 'node:process'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
import { defineConfig, squooshImageService } from 'astro/config'
import { packageAssetsPlugin } from './plugins/packageAssetsPlugin.js'
import { packageLocalesPlugin } from './plugins/packageLocalesPlugin.js'

const isProd = process.env.APP_MODE === 'production'

function i18nEditor() {
  return {
    name: 'i18n-editor',
    hooks: {
      'astro:config:setup': function ({ injectRoute }) {
        injectRoute({
          pattern: '/i18n-editor',
          entrypoint: './src/i18n-editor/index.astro',
        })
        injectRoute({
          pattern: '/i18n-editor/editor',
          entrypoint: './src/i18n-editor/editor.astro',
        })
      },
      'astro:server:start': function ({ address }) {
        const gray = '\x1B[90m'
        const cyan = '\x1B[36m'
        const reset = '\x1B[0m'

        // eslint-disable-next-line no-console
        console.log(`${gray}┃ ${reset}🌐 i18n editor is running at ${cyan} http://localhost:${address.port}/i18n-editor ${reset}`)
      },
    },
  }
}

const integrations = [
  sitemap(),
  starlight({
    title: 'Univer Docs',
    logo: {
      light: './src/assets/logo-dark.svg',
      dark: './src/assets/logo-light.svg',
    },
    social: {
      github: 'https://github.com/dream-num/univer',
      discord: 'https://discord.gg/z3NKNT6D2f',
    },
    components: {
      Sidebar: './src/components/Sidebar/index.astro',
    },
    customCss: ['./src/styles/starlight.css'],
    defaultLocale: 'root',
    locales: {
      root: {
        label: 'English',
        lang: 'en-US',
      },
      'zh-cn': {
        label: '简体中文',
        lang: 'zh-CN',
      },
      'ja-jp': {
        label: '日本語',
        lang: 'ja-JP',
      },
    },
    sidebar: [
      {
        label: '🔰 指南',
        translations: {
          'en-US': '🔰 Guides',
          'ja-JP': '🔰 ガイド',
        },
        autogenerate: {
          directory: 'guides/*.md',
        },
        items: [
          {
            label: 'Univer 介绍',
            translations: {
              'en-US': 'Introduction',
              'ja-JP': 'はじめに',
            },
            link: 'guides/introduction',
          },
          {
            label: '快速上手',
            translations: {
              'en-US': 'Quick Start',
              'ja-JP': 'クイックスタート',
            },
            autogenerate: {
              directory: 'guides/quick-start',
            },
          },
          {
            label: '简单使用 Univer',
            translations: {
              'en-US': 'Use with Ease',
              'ja-JP': 'はじめる',
            },
            autogenerate: {
              directory: 'guides/facade',
            },
          },
          {
            label: '功能一览',
            translations: {
              'en-US': 'Features',
              'ja-JP': '機能',
            },
            link: 'guides/features',
          },
          {
            label: '其他发行版',
            translations: {
              'en-US': 'Releases',
              'ja-JP': 'リリース',
            },
            link: 'guides/release',
          },
          {
            label: '常见问题',
            translations: {
              'en-US': 'Troubleshooting',
              'ja-JP': 'よくある質問',
            },
            link: 'guides/troubleshooting',
          },
          {
            label: '路线图',
            translations: {
              'en-US': 'Roadmap',
              'ja-JP': 'ロードマップ',
            },
            link: 'guides/roadmap',
          },
          {
            label: '贡献指南',
            translations: {
              'en-US': 'Contributing',
              'ja-JP': 'コントリビュート',
            },
            link: 'guides/contributing',
          },
          {
            label: '架构',
            translations: {
              'en-US': 'Architecture',
              'ja-JP': 'アーキテクチャ',
            },
            autogenerate: {
              directory: 'guides/architecture',
            },
          },
          {
            label: '插件',
            translations: {
              'en-US': 'Plugins',
              'ja-JP': 'プラグイン',
            },
            autogenerate: {
              directory: 'guides/plugins',
            },
          },
          {
            label: '扩展',
            translations: {
              'en-US': 'Extend',
              'ja-JP': '拡張',
            },
            autogenerate: {
              directory: 'guides/extend',
            },
          },
          {
            label: '源码阅读指引',
            link: 'guides/read-source',
          },
        ],
      },
      {
        label: '💼 服务端私有部署',
        translations: {
          'en-US': '💼 Enterprise',
          'ja-JP': '💼 エンタープライズ',
        },
        items: [
          {
            label: '功能介绍',
            translations: {
              'en-US': 'Features',
              'ja-JP': '機能',
            },
            link: 'enterprises/',
          },
          {
            label: '部署指南',
            translations: {
              'en-US': 'Deployment',
              'ja-JP': 'デプロイ',
            },
            link: 'enterprises/trial-version',
          },
        ],
      },
      {
        label: '🔌 API Reference',
        link: '../api',
      },
      {
        label: '🧩 Playground',
        link: '../playground',
      },
    ],
  }),
  react(),
]

if (!isProd) {
  integrations.push(i18nEditor())
}

// https://astro.build/config
export default defineConfig({
  site: 'https://univer.ai',
  server: {
    host: '0.0.0.0',
  },
  vite: {
    ssr: {
      noExternal: ['@univerjs/*'],
    },
  },
  image: {
    service: squooshImageService(),
  },
  output: isProd ? 'static' : 'server',
  integrations,
  markdown: {
    remarkPlugins: [
      packageAssetsPlugin,
      packageLocalesPlugin,
    ],
  },
})
