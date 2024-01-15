import { defineConfig, squooshImageService } from "astro/config";
import starlight from "@astrojs/starlight";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
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
          label: "💼 企业服务",
          items: [
            {
              label: "商业版介绍",
              link: "enterprises/",
            },
            {
              label: "试用商业版",
              link: "enterprises/trial-version",
            },
            {
              label: "mac",
              link: "enterprises/version/mac"
            },
            {
              label: "windows",
              link: "enterprises/version/win"
            },
            {
              label: "linux",
              link: "enterprises/version/linux"
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
