import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Univer Docs',
      logo: {
        light: './src/assets/logo-dark.svg',
        dark: './src/assets/logo-light.svg'
      },
      social: {
        github: 'https://github.com/dream-num/univer',
        discord: 'https://discord.gg/z3NKNT6D2f'
      },
      customCss: ['./src/styles/starlight.css'],
      defaultLocale: 'root',
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN'
        },
        'en-us': {
          label: 'English',
          lang: 'en-US'
        }
      },
      sidebar: [{
        label: '指南',
        autogenerate: {
          directory: 'guides/*.md'
        },
        items: [{
          label: 'Univer 介绍',
          link: 'guides/introduction'
        }, {
          label: '快速上手',
          link: 'guides/quick-start'
        }, {
          label: '功能一览',
          link: 'guides/features'
        }, {
          label: '国际化',
          link: 'guides/i18n'
        }, {
          label: 'FAQ',
          link: 'guides/faq'
        }, {
          label: '路线图',
          link: 'guides/roadmap'
        }, {
          label: '贡献指南',
          link: 'guides/contributing'
        }, {
          label: '架构',
          autogenerate: {
            directory: 'guides/architecture'
          }
        }, {
          label: '插件',
          autogenerate: {
            directory: 'guides/plugins'
          }
        }, {
          label: '扩展',
          autogenerate: {
            directory: 'guides/extend'
          }
        }]
      }, {
        label: '企业服务',
        autogenerate: {
          directory: 'enterprises'
        }
      }, {
        label: 'API reference',
        link: '/api/core'
      }, {
        label: 'Playground',
        autogenerate: {
          directory: 'playground'
        }
      }]
    }),
    react()
  ]
})
