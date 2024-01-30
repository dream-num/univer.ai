import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
import { defineConfig, squooshImageService } from 'astro/config'

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
  integrations: [
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
          label: '简体中文',
          lang: 'zh-CN',
        },
        'en-us': {
          label: 'English',
          lang: 'en-US',
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
            'en-US': 'Guides',
            'ja-JP': 'ガイド',
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
                'en-US': 'Getting Started',
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
                'ja-JP': 'トラブルシューティング',
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
          ],
        },
        {
          label: '💼 服务端私有部署',
          translations: {
            'en-US': 'Enterprise',
            'ja-JP': 'エンタープライズ',
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
  ],
})
