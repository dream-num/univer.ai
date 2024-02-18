import { zone } from 'mdast-zone'
import packagesMeta from '../scripts/packages-meta'
import { getLangByVFile } from './util'

const i18n = {
  'zh-cn': {
    'The following locales are available in this package:': '这个包支持以下语言:',
    zhCN: '简体中文',
    enUS: 'English',
    jaJP: '日本語',
    Language: '语言',
    Name: '名称',
    'Language Support': '语言支持',
  },
  'en-us': {
    zhCN: 'Chinese(Simplified)',
    enUS: 'English',
    jaJP: 'Japanese',
  },
  'ja-jp': {
    'The following locales are available in this package:': 'このパッケージは以下のロケールをサポートしています:',
    zhCN: 'Chinese',
    enUS: 'English',
    jaJP: '日本語',
    Language: '言語',
    Name: '名前',
    'Language Support': '言語サポート',
  },
}

const createI18N = lang => key => i18n[lang]?.[key] || key

const packagesMetaDict = packagesMeta.reduce((dict, meta) => {
  dict[meta.package] = meta
  return dict
}, {})

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
export function packageLocalesPlugin() {
  return function (tree, vFile) {
    const title = vFile.data.astro.frontmatter.title
    const _$ = createI18N(getLangByVFile(vFile))
    const config = packagesMetaDict[title]
    if (config && config.locales) {
      zone(tree, 'package-locales', (start, nodes, end) => {
        return [
          start,
          ...createTipAST(_$),
          createTableAST(config.locales, _$),
          end,
        ]
      })
    }
  }
}

function createTipAST(_$) {
  return [
    {
      type: 'heading',
      depth: 2,
      children: [{ type: 'text', value: _$('Language Support') }],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: _$('The following locales are available in this package:'),
        },
      ],
    },
  ]
}

function createTableAST(locales, _$) {
  return {
    type: 'table',
    align: ['left', 'left'],
    children: [
      {
        type: 'tableRow',
        children: [
          { type: 'tableCell', children: [{ type: 'text', value: _$('Language') }] },
          { type: 'tableCell', children: [{ type: 'text', value: _$('Name') }] },
        ],
      },
      ...locales.map(locale => ({
        type: 'tableRow',
        children: [
          { type: 'tableCell', children: [{ type: 'text', value: _$(locale) }] },
          { type: 'tableCell', children: [{ type: 'text', value: locale }] },
        ],
      })),
    ],
  }
}
