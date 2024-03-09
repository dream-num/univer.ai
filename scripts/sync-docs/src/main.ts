import path from 'node:path'
import url from 'node:url'
import { globSync } from 'glob'
import { toString } from 'mdast-util-to-string'
import { setDocsPath } from './utils/config.js'
import { getLastCommitMessage, syncRepo } from './utils/git.js'
import { getAnyMappingTarget, getLangByUniverPath, getMappingTarget, initBySource, initByTarget, parseDocsInfo, parseFile, syncContent } from './utils/parseFile.js'

const dirname = `${path.dirname(url.fileURLToPath(import.meta.url))}`
const workspace = path.resolve(dirname, '../../../')
const docsPath = path.resolve(workspace, './src/content/docs')
setDocsPath(docsPath)
const univerRepoPath = path.resolve(workspace, './node_modules/.univer/repo')

const startTime = new Date()
console.log('workspace:', workspace)
console.log('docsPath:', docsPath)
console.log('univerRepoPath:', univerRepoPath)
console.log('now', startTime.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }))

syncRepo(univerRepoPath)
console.log('commit:', getLastCommitMessage(univerRepoPath))

const sourcesPathList = globSync('packages/*/README*.md', { cwd: univerRepoPath })
const targetsPathList = globSync('**/guides/plugins/**/*.md*', { cwd: docsPath })

console.log('find sources count:', sourcesPathList.length)
console.log('find targets count:', targetsPathList.length)

const sources = await Promise.all(sourcesPathList.map(async (relativePath) => {
  const absolutePath = path.resolve(univerRepoPath, relativePath)
  const source = await parseFile({
    file: { relativePath, absolutePath },
    getLangByFilePath: getLangByUniverPath,
    getTitle: (info) => {
      return toString(info.ast!.children.find(it => it.type === 'heading'))
    },
    getIdentify: (info) => {
      return `${info.name}-${info.lang}`
    },
  })
  source.meta.title = toString(source.ast!.children.find(it => it.type === 'heading'))
  return source
}))

const targets = await Promise.all(targetsPathList.map((relativePath) => {
  const absolutePath = path.resolve(docsPath, relativePath)
  return parseDocsInfo ({ relativePath, absolutePath })
}))

await Promise.all(sources.map(async (source) => {
  let target = getMappingTarget(source, targets)
  if (!target) {
    const anyTarget = getAnyMappingTarget(source, targets)
    if (anyTarget) {
      target = await initByTarget(source, anyTarget)
      console.error(`Can't find target for ${source.file.relativePath}`, `created: ${target.file.relativePath}`)
    } else {
      target = await initBySource(source)
      console.error(`Can't find target for ${source.file.relativePath}`, `created: ${target.file.relativePath}`)
    }
  }
  await syncContent(source, target)

  source.sync = true
  target.sync = true

  console.log(`sync ${source.file.relativePath} to ${target.file.relativePath}`)
}))

const endTime = new Date()
console.log('now', startTime.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }), 'cost', (endTime.getTime() - startTime.getTime()), 'ms')
console.log('sync done:', sources.filter(it => it.sync).length, 'files ')
console.log('sync fail:', sources.filter(it => !it.sync).length, 'files ')

targets.filter(it => !it.sync).forEach((it) => {
  console.warn(`Can't find source for ${it.file.relativePath}`)
})
