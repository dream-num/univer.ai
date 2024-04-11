import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import starlight from '@astrojs/starlight'
import { defineConfig, squooshImageService } from 'astro/config'

const starlightConfig = {
  title: 'Univer Pro',
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
        directory: 'enterprises',
      },
    },
  ],
}

// https://astro.build/config
export default defineConfig({
  site: 'https://univer.ai',
  base: '/pro',
  outDir: './dist/pro',
  server: {
    host: '0.0.0.0',
    port: 4322,
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
    starlight(starlightConfig),
    react(),
  ],
})
