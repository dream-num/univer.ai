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
      noExternal: ['@univerjs/*', '@antv/*'],
    },
  },
  image: {
    service: squooshImageService(),
  },
  integrations: [
    sitemap(),
    starlight({
      title: 'Univer',
      logo: {
        light: './src/assets/logo-dark.svg',
        dark: './src/assets/logo-light.svg',
      },
      social: {
        github: 'https://github.com/dream-num/univer',
      },
      components: {
        Header: './src/components/Starlight/Header.astro',
        Sidebar: './src/components/Starlight/Sidebar.astro',
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
              label: '简介',
              translations: {
                'en-US': 'Introduction',
                'ja-JP': 'はじめに',
              },
              autogenerate: {
                directory: 'guides/introduction',
              },
            },
            {
              label: '快速上手',
              translations: {
                'en-US': 'Quickstart',
                'ja-JP': 'クイックスタート',
              },
              autogenerate: {
                directory: 'guides/quick-start',
              },
            },
            {
              label: '新手入门',
              translations: {
                'en-US': 'Getting Started',
                'ja-JP': 'はじめる',
              },
              autogenerate: {
                directory: 'guides/getting-started',
              },
            },
            {
              label: '扩展 Univer',
              translations: {
                'en-US': 'Customizing Univer',
                'ja-JP': 'カスタマイズ',
              },
              autogenerate: {
                directory: 'guides/customizing',
              },
            },
            {
              label: '进阶使用',
              translations: {
                'en-US': 'Advanced Use',
                'ja-JP': 'アドバンスド',
              },
              autogenerate: {
                directory: 'guides/advanced-use',
              },
            },
            {
              label: '教程',
              translations: {
                'en-US': 'Tutorials',
                'ja-JP': 'チュートリアル',
              },
              autogenerate: {
                directory: 'guides/tutorials',
              },
            },
            {
              label: '概念与架构',
              translations: {
                'en-US': 'Concepts & Architecture',
                'ja-JP': 'アーキテクチャ & コンセプト',
              },
              autogenerate: {
                directory: 'guides/concepts-and-architecture',
              },
            },
            {
              label: '常见问题',
              translations: {
                'en-US': 'Troubleshooting',
                'ja-JP': 'よくある質問',
              },
              autogenerate: {
                directory: 'guides/troubleshooting',
              },
            },
          ],
        },
        {
          label: '💼 服务端私有部署',
          translations: {
            'en-US': '💼 Enterprise',
            'ja-JP': '💼 エンタープライズ',
          },
          autogenerate: {
            directory: 'enterprises',
          },
        },
      ],
    }),
    react(),
  ],
})
