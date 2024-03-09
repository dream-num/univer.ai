import fs from 'node:fs'
import path from 'node:path'
import yaml from 'yaml'
import type { IFile } from '../types/IFile'
import type { IMarkdownInfo } from '../types/IMarkdownInfo'
import { getDocsPath } from './config.js'
import { mdProcessor, mdxProcessor } from './mdProcessor.js'

export const defaultLang = 'en'
function getLangByDocsPath({ relativePath }: IFile) {
  const separator = path.sep === '/' ? '/' : '\\\\'
  const regex = new RegExp(`^([\\w-]+)${separator}guides${separator}plugins`)
  const lang = regex.exec(relativePath)?.[1] || defaultLang
  return lang
}
export function getLangByUniverPath({ relativePath }: IFile) {
  const lang = /README-(\w+)\.md/.exec(relativePath)?.[1] || defaultLang
  return lang
}
//  zh -> zh-cn
function getUnifyLangName(lang: string) {
  if (lang === 'zh') {
    return 'zh-cn'
  }
  return lang
}
function getLangPathByUnifyLangName(lang: string) {
  if (lang === 'en') {
    return ''
  }
  return lang
}
function genTargetPath(lang: string, name: string) {
  const realName = name.replace(/@univerjs\//, '')

  let category = 'common'

  if (name.includes('sheets')) {
    category = 'sheets'
  } else if (name.includes('docs')) {
    category = 'docs'
  } else if (name.includes('slides')) {
    category = 'slides'
  }

  return path.join(getLangPathByUnifyLangName(lang), 'guides', 'plugins', category, `${realName}.md`)
}
function genTargetPathByTarget(lang: string, target: IMarkdownInfo) {
  return path.join(getLangPathByUnifyLangName(lang), ...target.file.relativePath.split(path.sep).slice(1))
}
export function parseFile({ file, getLangByFilePath, getIdentify, getTitle }: {
  file: IFile
  getLangByFilePath: (file: IFile) => string
  getIdentify: (file: Partial<IMarkdownInfo>) => string
  getTitle: (file: Partial<IMarkdownInfo>) => string
}) {
  return new Promise<IMarkdownInfo>((resolve) => {
    const lang = getLangByFilePath(file)
    const isMdx = file.relativePath.endsWith('.mdx')

    fs.readFile(file.absolutePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        throw err
      }

      const processor = isMdx ? mdxProcessor : mdProcessor
      const ast = processor.parse(data)

      const yamlNode = ast.children.find(it => it.type === 'yaml')
      const meta = yamlNode ? yaml.parse((yamlNode as any).value as string) : {}

      const result: IMarkdownInfo = {
        file,
        content: data,
        ast,
        meta,
        isMdx,
        lang: getUnifyLangName(lang),
        name: '',
        identify: '',
      }
      result.name = getTitle(result)
      result.identify = getIdentify(result)
      resolve(result as IMarkdownInfo)
    })
  })
}
export function parseDocsInfo(file: IFile) {
  return parseFile({
    file,
    getLangByFilePath: getLangByDocsPath,
    getTitle: (info) => {
      return info.meta!.title
    },
    getIdentify: (info) => {
      return `${info.name}-${info.lang}`
    },
  })
}
export function getMappingTarget(source: IMarkdownInfo, targets: IMarkdownInfo[]) {
  return targets.find(target => source.identify === target.identify)
}
export function getAnyMappingTarget(source: IMarkdownInfo, targets: IMarkdownInfo[]) {
  return targets.find(target => source.meta.title === target.meta.title)
}

export async function initByTarget(source: IMarkdownInfo, otherTarget: IMarkdownInfo): Promise<IMarkdownInfo> {
  const relativePath = genTargetPathByTarget(source.lang, otherTarget)
  const absolutePath = path.resolve(getDocsPath(), relativePath)

  fs.mkdirSync(path.dirname(absolutePath), { recursive: true })
  const content = `---\n${
     yaml.stringify({
      title: source.meta.title,
    })
     }---\n`

  fs.writeFileSync(absolutePath, content, { encoding: 'utf-8' })

  const info = await parseDocsInfo({ relativePath, absolutePath })
  return info
}

export async function initBySource(source: IMarkdownInfo): Promise<IMarkdownInfo> {
  const relativePath = genTargetPath(source.lang, source.name)
  const absolutePath = path.resolve(getDocsPath(), relativePath)

  fs.mkdirSync(path.dirname(absolutePath), { recursive: true })

  fs.mkdirSync(path.dirname(absolutePath), { recursive: true })
  const content = `---\n${
     yaml.stringify({
      title: source.meta.title,
    })
     }---\n`

  fs.writeFileSync(absolutePath, content, { encoding: 'utf-8' })

  const info = await parseDocsInfo({ relativePath, absolutePath })
  return info
}

export function syncContent(source: IMarkdownInfo, target: IMarkdownInfo) {
  return new Promise((resolve) => {
    const newAst = target.ast!.children.filter(it => it.type === 'yaml')

    // if first node is heading 1, remove it
    const oldContent = [...source.ast!.children]
    if (oldContent[0].type === 'heading' && oldContent[0].depth === 1) {
      oldContent.shift()
    }

    newAst.push(...oldContent)

    const processor = target.isMdx ? mdxProcessor : mdProcessor
    const newContent = processor.stringify({
      type: 'root',
      children: newAst,
    })

    fs.writeFile(target.file.absolutePath, newContent, { encoding: 'utf-8' }, (err) => {
      if (err) {
        console.error(err)
      }
      resolve(void 0)
    })
  })
}
