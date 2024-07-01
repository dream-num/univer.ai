import Nextra from 'nextra'
import { UniverPlugin } from '@univerjs/webpack-plugin'
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin'

const withNextra = Nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
})
/** @type {import('next').NextConfig} */
const nextConfig = {
  // swcMinify: false,
  reactStrictMode: false,

  transpilePackages: ['monaco-editor'],

  output: 'standalone',

  i18n: {
    locales: ['en-US', 'zh-CN'],
    defaultLocale: 'en-US',
    localeDetection: false,
  },

  webpack: (config, { isServer }) => {
    config.plugins.push(new UniverPlugin())
    config.module.rules.push({
      test: /\.txt$/i,
      use: 'raw-loader',
    })

    if (!isServer) {
      // https://github.com/vercel/next.js/issues/31692
      config.plugins.push(
        new MonacoWebpackPlugin({
          languages: ['typescript'],
          filename: 'static/[name].worker.js',
        }),
      )

      config.optimization.minimize = false
    }

    return config
  },
}

export default withNextra(nextConfig)
