import { execSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import TypeDoc from 'typedoc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const __packageDir = resolve(__dirname, './node_modules/.univer')

const __packages = resolve(__packageDir, './packages')

const __output = resolve(__dirname, './api')

function cleanOutput() {
  if (existsSync(__output)) {
    rmdirSync(__output, { recursive: true })
  } else {
    mkdirSync(__output)
  }
}

function fetchUniver() {
  const workPath = resolve(__packageDir, '../')
  if (!existsSync(workPath)) {
    mkdirSync(workPath, { recursive: true })
  }

  if (existsSync(__packageDir)) {
    execSync('git pull', { cwd: __packageDir })
  } else {
    // const branch = 'main'
    const branch = 'dev'
    execSync(`git clone --depth 1 -b ${branch} https://github.com/dream-num/univer.git ${__packageDir}`)
  }

  execSync('pnpm install', { cwd: __packageDir })
}

async function generateDocs() {
  const __packageJson = JSON.parse(readFileSync(resolve(__packageDir, './package.json'), 'utf8'))
  const __version = __packageJson.version

  const packages = readdirSync(__packages)
    .filter((pkg) => {
      const pkgJson = readFileSync(resolve(__packages, pkg, './package.json'), 'utf8')
      const pkgJsonParsed = JSON.parse(pkgJson)

      return !pkgJsonParsed.private
    })

  for (const pkg of packages) {
    const app = await TypeDoc.Application.bootstrapWithPlugins({
      entryPoints: resolve(__packages, pkg, 'src/index.ts'),
      tsconfig: resolve(__packages, pkg, 'tsconfig.json'),
      externalPattern: [
        '**/node_modules/univer/node_modules/**',
        '**/.pnpm/**',
      ],
      excludeExternals: true,
      excludeInternal: true,
      excludePrivate: true,
      excludeProtected: true,
      disableGit: true,
      disableSources: false,
      customCss: './style.css',
      name: `@univerjs/${pkg}`,
      readme: resolve(__packages, pkg, 'README.md'),
      hideGenerator: true,
      includeVersion: true,
      basePath: resolve(__packageDir),
      sourceLinkTemplate: `https://github.com/dream-num/univer/blob/v${__version}/{path}#L{line}`,
    })

    const project = await app.convert()

    if (project) {
      const outputDir = resolve(__output, pkg)
      await app.generateDocs(project, outputDir)
    }
  }
}

function copyToDist() {
  const dist = resolve(__dirname, '../dist/api')
  if (existsSync(dist)) {
    copyFileSync(__output, dist)
  }
}

function main() {
  copyToDist()
  cleanOutput()
  fetchUniver()
  generateDocs()
}

main()
