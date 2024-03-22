import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { ApiGenerator } from './plugin-doc-generator.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function main() {
  const cloneRoot = resolve(__dirname, './node_modules/.univer')

  const api = new ApiGenerator(cloneRoot)

  const readmeRoot = resolve(__dirname, '../src/content/docs/api')
  const readmeZhRoot = resolve(__dirname, '../src/content/docs/zh-cn/api')
  api.generatePluginsReadme({
    outputRoot: readmeRoot,
    outputRootZh: readmeZhRoot,
  })
}

main()
