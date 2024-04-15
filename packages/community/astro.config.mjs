import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
import { defineConfig, squooshImageService } from 'astro/config'

const starlightConfig = {
  title: 'Univer',
  logo: {
    light: '@web/shared/assets/logo-dark.svg',
    dark: '@web/shared/assets/logo-light.svg',
  },
  social: {
    github: 'https://github.com/dream-num/univer',
  },
  components: {
    Header: '@web/shared/components/Header.astro',
    Sidebar: '@web/shared/components/Sidebar.astro',
    ThemeSelect: '@web/shared/components/ThemeSelect.astro',
  },
  expressiveCode: {
    themes: ['synthwave-84', 'catppuccin-latte'],
  },
  customCss: ['@web/shared/styles/starlight.css'],
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
      label: '📃 简介',
      translations: {
        'en-US': '📃 Introduction',
        'ja-JP': '📃 はじめに',
      },
      autogenerate: {
        directory: 'guides/introduction',
      },
    },
    {
      label: '🚀 快速上手',
      translations: {
        'en-US': '🚀 Quickstart',
        'ja-JP': '🚀 クイックスタート',
      },
      autogenerate: {
        directory: 'guides/quick-start',
      },
    },
    {
      label: '⚙️ 配置',
      translations: {
        'en-US': '⚙️ Configuration',
        'ja-JP': '⚙️ 設定',
      },
      autogenerate: {
        directory: 'guides/configuration',
      },
    },
    {
      label: '🔌 Facade API',
      translations: {
        'en-US': '🔌 Facade API',
        'ja-JP': '🔌 ファサード API',
      },
      autogenerate: {
        directory: 'guides/facade',
      },
    },
    {
      label: '🏗️ 进阶使用',
      translations: {
        'en-US': '🏗️ Advanced Usage',
        'ja-JP': '🏗️ アドバンスド',
      },
      autogenerate: {
        directory: 'guides/advanced-use',
      },
    },
    {
      label: '📚 教程',
      translations: {
        'en-US': '📚 Tutorials',
        'ja-JP': '📚 チュートリアル',
      },
      autogenerate: {
        directory: 'guides/tutorials',
      },
    },
    {
      label: '🧱 概念与架构',
      translations: {
        'en-US': '🧱 Concepts & Architecture',
        'ja-JP': '🧱 アーキテクチャ & コンセプト',
      },
      autogenerate: {
        directory: 'guides/concepts-and-architecture',
      },
    },
    {
      label: '🪄 扩展 Univer',
      translations: {
        'en-US': '🪄 Customizing Univer',
        'ja-JP': '🪄 カスタマイズ',
      },
      autogenerate: {
        directory: 'guides/customization',
      },
    },
    {
      label: '🔧 常见问题',
      translations: {
        'en-US': '🔧 Troubleshooting',
        'ja-JP': '🔧 よくある質問',
      },
      link: 'guides/troubleshooting',
    },
    {
      label: '🗺️ 贡献指南',
      translations: {
        'en-US': '🗺️ Contributing Guides',
        'ja-JP': '🗺️ コントリビューションガイドライン',
      },
      link: 'guides/contributing',
    },
  ],
}

// https://astro.build/config
export default defineConfig({
  site: 'https://univer.ai',
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  vite: {
    ssr: {
      noExternal: ['@univerjs/*', '@wendellhu/redi', '@antv/*'],
    },
  },
  image: {
    service: squooshImageService(),
  },
  integrations: [
    sitemap(),
    starlight(starlightConfig),
    react(),
  ],
})
