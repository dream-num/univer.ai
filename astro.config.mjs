import { defineConfig, squooshImageService } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	site: 'https://univer.ai',
  server: {
    host: '0.0.0.0'
  },
  vite: {
    ssr: {
      noExternal: ["@univerjs/*"],
    }
  },
  image: {
    service: squooshImageService()
  },
  integrations: [
		sitemap(),
    starlight({
      title: "Univer Docs",
      logo: {
        light: "./src/assets/logo-dark.svg",
        dark: "./src/assets/logo-light.svg",
      },
      social: {
        github: "https://github.com/dream-num/univer",
        discord: "https://discord.gg/z3NKNT6D2f",
      },
      components: {
        Sidebar: './src/components/Sidebar/index.astro',
      },
      customCss: ["./src/styles/starlight.css"],
      defaultLocale: "root",
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN",
        },
        "en-us": {
          label: "English",
          lang: "en-US",
        },
        "ja-jp": {
          label: "日本語",
          lang: "ja-JP",
        },
      },
      sidebar: [
        {
          label: "🔰 指南",
          autogenerate: {
            directory: "guides/*.md",
          },
          items: [
            {
              label: "Univer 介绍",
              link: "guides/introduction",
            },
            {
              label: "快速上手",
              autogenerate: {
                directory: "guides/quick-start",
              },
            },
            {
              label: "简单使用 Univer",
              autogenerate: {
                directory: "guides/facade",
              },
            },
            {
              label: "功能一览",
              link: "guides/features",
            },
            {
              label: "其他发行版",
              link: "guides/release",
            },
            {
              label: "FAQ",
              link: "guides/faq",
            },
            {
              label: "路线图",
              link: "guides/roadmap",
            },
            {
              label: "贡献指南",
              link: "guides/contributing",
            },
            {
              label: "架构",
              autogenerate: {
                directory: "guides/architecture",
              },
            },
            {
              label: "插件",
              autogenerate: {
                directory: "guides/plugins",
              },
            },
            {
              label: "扩展",
              autogenerate: {
                directory: "guides/extend",
              },
            },
          ],
        },
        {
          label: "💼 服务端私有部署",
          items: [
            {
              label: "功能介绍",
              link: "enterprises/",
            },
            {
              label: "部署指南",
              link: "enterprises/trial-version",
            },
          ],
        },
        {
          label: "🔌 API Reference",
          link: "../api",
        },
        {
          label: "🧩 Playground",
          link: "../playground",
        },
      ],
    }),
    react(),
  ],
});
