import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { ApiGenerator } from '@univerjs/web-api'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function main() {
  const cloneRoot = resolve(__dirname, '../node_modules/.univer')
  const outputRoot = resolve(__dirname, '../api')

  ApiGenerator.cleanOutput(outputRoot)

  const api = new ApiGenerator(cloneRoot)

  const readmeRoot = resolve(__dirname, '../src/content/docs/api')
  api.generatePluginsReadme(readmeRoot)

  await api.generateDocs(outputRoot)
}

main()
