import { zone } from 'mdast-zone'
import packagesMeta from '../scripts/packages-meta'
import { getLangByVFile } from './util'

const i18n = {
  'zh-cn': {
    'Asset Files': '资源文件',
    'Using this plugin requires the introduction of the following additional files:': '使用此插件需要引入以下额外文件:',
  },
  'ja-jp': {
    'Asset Files': 'アセットファイル',
    'Using this plugin requires the introduction of the following additional files:': 'このプラグインを使用するには、以下の追加ファイルの導入が必要です:',
  },
}

const createI18N = lang => key => i18n[lang]?.[key] || key

const packagesMetaDict = packagesMeta.reduce((dict, meta) => {
  dict[meta.package] = meta
  return dict
}, {})

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
export function packageAssetsPlugin() {
  return function (tree, vFile) {
    const title = vFile.data.astro.frontmatter.title
    const _$ = createI18N(getLangByVFile(vFile))
    const config = packagesMetaDict[title]
    if (config && config.assets) {
      zone(tree, 'package-assets', (start, nodes, end) => {
        return [
          start,
          ...createTipAST(config.assets, _$),
          end,
        ]
      })
    }
  }
}

function createTipAST(assets, _$) {
  return [
    {
      type: 'heading',
      depth: 2,
      children: [{ type: 'text', value: _$('Asset Files') }],
    },
    {
      type: 'paragraph',
      children: [
        {
          type: 'text',
          value: _$('Using this plugin requires the introduction of the following additional files:'),
        },
      ],
    },
    {
      type: 'list',
      children: assets.map(asset => ({
        type: 'listItem',
        children: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'inlineCode',
                value: asset,
              },
            ],
          },
        ],
      })),
    },
  ]
}
