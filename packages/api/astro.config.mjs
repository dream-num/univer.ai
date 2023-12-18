import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightRc from './starlight.config.mjs'

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3210
  },
  integrations: [
    starlight(starlightRc)
  ]
})
