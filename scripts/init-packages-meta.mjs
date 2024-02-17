import { exec } from 'node:child_process'
import * as fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

// eslint-disable-next-line node/prefer-global/process
const univerPath = path.resolve(process.env.UNIVER_PATH || '../univer')

/** Get All Packages */
function getPackages(univerPath) {
  if (!fs.existsSync(univerPath)) {
    throw new Error(`univer path not found: ${univerPath}`)
  }

  const packagesDir = path.resolve(univerPath, 'packages')
  const dirs = fs.readdirSync(packagesDir)

  // traverse packages package.json
  // read package.json to get package name
  const packages = dirs.map((dir) => {
    const packagePath = path.resolve(packagesDir, dir)
    const packageJsonPath = path.resolve(packagePath, 'package.json')
    if (!fs.existsSync(packageJsonPath)) {
      return {
        path: packagePath,
        packageJson: null,
      }
    }
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
    return {
      path: packagePath,
      packageJson,
    }
  }).filter(({ packageJson }) => {
    return packageJson && packageJson.name.startsWith('@univer')
  })

  return packages
}

/** Get locale by locale dir */
function getLocalesByFile(fileName) {
  if (!fs.existsSync(fileName)) {
    return []
  }

  const sourceCode = fs.readFileSync(fileName, 'utf-8')

  const sourceFile = ts.createSourceFile(
    fileName,
    sourceCode,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  )

  // 提取 export 语句
  const languageInfo = []

  ts.forEachChild(sourceFile, (node) => {
    if (ts.isExportDeclaration(node)) {
      if (node.exportClause) {
        node.exportClause.elements.forEach((element) => {
          const exportName = element.name.getText()
          if (exportName !== 'ILocale') {
            languageInfo.push(exportName)
          }
        })
      }
    }
  })
  return languageInfo
}

/** Get assets by vite.config.js */
function getAssetsByViteConfig(fileName) {
  if (!fs.existsSync(fileName)) {
    return []
  }

  const sourceCode = fs.readFileSync(fileName, 'utf-8')

  const sourceFile = ts.createSourceFile(
    fileName,
    sourceCode,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  )

  let outDir = ''
  let assetFileNames = ''
  const AssetEntry = []

  const traverse = (node) => {
    if (ts.isPropertyAssignment(node)) {
      if (node.name.getText() === 'outDir') {
        if (node.parent.parent.name?.getText() === 'build') {
          outDir = node.initializer.getText().replace(/['"]/g, '')
        }
        // find Identifier assetFileNames
      } else if (node.name.getText() === 'assetFileNames') {
        assetFileNames = node.initializer.getText().replace(/['"]/g, '')
      } else {
        ts.forEachChild(node, traverse)
      }
    } else {
      ts.forEachChild(node, traverse)
    }
  }

  ts.forEachChild(sourceFile, (node) => {
    traverse(node)
  })

  if (outDir && assetFileNames) {
    AssetEntry.push(`${outDir}/${assetFileNames}`)
  }

  return AssetEntry
}

function jsonBeautify(json) {
  // 在文件顶部添加注释
  const comment = `/**\n * Do not manually modify this file.\n * This file is auto-generated. \n */\n\n`

  // 将JavaScript对象作为默认导出添加到TypeScript文件中
  const exportStatement = `export default ${JSON.stringify(json, null, 2)};`

  // 将注释和默认导出添加到文件内容的顶部
  const result = comment + exportStatement

  return result
}

const config = getPackages(univerPath).map(({ path: packagePath, packageJson }) => {
  const locales = getLocalesByFile(path.resolve(packagePath, 'src/locale/index.ts'))
  const assets = getAssetsByViteConfig(path.resolve(packagePath, 'vite.config.ts'))
  const packageConfig = {
    package: packageJson.name,
  }
  if (locales.length) {
    packageConfig.locales = locales
  }
  if (assets.length) {
    packageConfig.assets = assets
  }
  return packageConfig
})

const configName = new URL('./packages-meta.js', import.meta.url).pathname

fs.writeFileSync(configName, jsonBeautify(config))

async function fixFormat(filePath) {
  // eslint api not support esm module, so use npx eslint
  exec(`npx eslint --fix ${filePath}`, { cwd: new URL('../', import.meta.url).pathname }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`)
      return
    }
    console.log(`Done.\nFound packages count: ${config.length}.\nFile ${configName} updated.`)
  })
}

console.log('Fixing format...')
fixFormat(configName)
