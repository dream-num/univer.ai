import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import solidJs from "@astrojs/solid-js"

// https://astro.build/config
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  integrations: [
    UnoCSS({
      injectReset: true
    }),
    solidJs()
  ]
})
