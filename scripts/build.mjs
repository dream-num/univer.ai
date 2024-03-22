import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function main() {
  const target = resolve(__dirname, '../dist')

  if (!existsSync(target)) {
    mkdirSync(target, { recursive: true })
  }

  const packagesRoot = resolve(__dirname, '../packages')

  const communityRoot = resolve(packagesRoot, './community')
  const apiRoot = resolve(packagesRoot, './api')
  const proRoot = resolve(packagesRoot, './pro')

  cpSync(resolve(communityRoot, 'dist'), target, { recursive: true })
  cpSync(resolve(apiRoot, 'dist'), resolve(target, './api'), { recursive: true })

  const proAstroRoot = resolve(proRoot, './dist/_astro')
  const proPagefindRoot = resolve(proRoot, './dist/pagefind')
  cpSync(proAstroRoot, resolve(target, './_astro'), { recursive: true })
  cpSync(proPagefindRoot, resolve(target, './pagefind'), { recursive: true })

  const proTarget = resolve(__dirname, '../dist/pro')

  if (!existsSync(proTarget)) {
    mkdirSync(proTarget, { recursive: true })
  }

  cpSync(resolve(proRoot, 'dist'), proTarget, { recursive: true })
}

main()
