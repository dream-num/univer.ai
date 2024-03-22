import { execSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

export class ApiGenerator {
  cloneRoot = ''
  repoRoot = ''

  packagesPath = ''
  packages = []

  constructor(cloneRoot) {
    this.cloneRoot = cloneRoot

    if (existsSync(this.cloneRoot)) {
      execSync('git pull', { cwd: this.cloneRoot })
    } else {
      // const branch = 'main'
      const branch = 'dev'
      execSync(`git clone --depth 1 -b ${branch} https://github.com/dream-num/univer.git ${this.cloneRoot}`)
    }

    execSync('pnpm install', { cwd: this.cloneRoot })

    this.packagesPath = resolve(this.cloneRoot, './packages')
    this.packages = readdirSync(this.packagesPath)
      .filter((pkg) => {
        const pkgJson = readFileSync(resolve(this.packagesPath, pkg, './package.json'), 'utf8')
        const pkgJsonParsed = JSON.parse(pkgJson)

        return !pkgJsonParsed.private
      })
  }

  generatePluginsReadme({ outputRoot, outputRootZh }) {
    const packagesPath = resolve(this.cloneRoot, './packages')

    for (const pkg of this.packages) {
      const readme = resolve(packagesPath, pkg, 'README.md')
      const readmeZh = resolve(packagesPath, pkg, 'README-zh.md')
      const assets = resolve(packagesPath, pkg, 'assets')

      const generateReadme = (readmePath, outputPath) => {
        if (existsSync(readmePath)) {
          const outputDir = resolve(outputPath, pkg)
          if (!existsSync(outputDir)) {
            mkdirSync(outputDir, { recursive: true })
          }

          if (existsSync(assets)) {
            cpSync(assets, resolve(outputDir, 'assets'), { recursive: true })
          }

          const content = readFileSync(readmePath, 'utf8')
            .replace(
              `# @univerjs/${pkg}`,
              `---\ntitle: '@univerjs/${pkg}'\n---\n[![notice](/api/api-banner.svg)](/api/${pkg}/detail.html)`,
            )

          writeFileSync(resolve(outputDir, 'index.md'), content)
        }
      }

      generateReadme(readme, outputRoot)
      generateReadme(readmeZh, outputRootZh)
    }
  }
}
