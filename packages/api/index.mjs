import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { ApiGenerator } from './api-generator.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function main() {
  const cloneRoot = resolve(__dirname, './node_modules/.univer')
  const outputRoot = resolve(__dirname, './dist')

  ApiGenerator.cleanOutput(outputRoot)

  const api = new ApiGenerator(cloneRoot)

  await api.generateDocs(outputRoot)
}

main()
