'use client'

import { LocaleType, Tools, Univer, UniverInstanceType } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'

import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverUIPlugin } from '@univerjs/ui'
import { DocHyperLinkModel, UniverDocsHyperLinkPlugin } from '@univerjs/docs-hyper-link'
import { UniverDocsHyperLinkUIPlugin } from '@univerjs/docs-hyper-link-ui'

import { UniverDrawingPlugin } from '@univerjs/drawing'
import { UniverDrawingUIPlugin } from '@univerjs/drawing-ui'
import { UniverDocsDrawingPlugin } from '@univerjs/docs-drawing'
import { UniverDocsDrawingUIPlugin } from '@univerjs/docs-drawing-ui'

import DocsHyperLinkUIZhCN from '@univerjs/docs-hyper-link-ui/lib/locale/zh-CN.json'
import DocsHyperLinkUIEnUS from '@univerjs/docs-hyper-link-ui/lib/locale/en-US.json'
import DrawingUIZhCN from '@univerjs/drawing-ui/lib/locale/zh-CN.json'
import DrawingUIEnUS from '@univerjs/drawing-ui/lib/locale/en-US.json'

import DocsDrawingUIZhCN from '@univerjs/docs-drawing-ui/lib/locale/zh-CN.json'
import DocsDrawingUIEnUS from '@univerjs/docs-drawing-ui/lib/locale/en-US.json'

import { useEffect, useRef } from 'react'
import { enUS, zhCN } from 'univer:locales'
import { ALL_FEATURES_DOCUMENT_DATA } from './data'
import { GithubPlugin } from '@/examples/plugins/github-plugin'

interface IProps {
  locale: string
}

export default function App(props: IProps) {
  const { locale } = props

  const univerRef = useRef(null)

  useEffect(() => {
    const univer = new Univer({
      theme: defaultTheme,
      locale: locale.replace('-', '') as LocaleType,
      locales: {
        [LocaleType.EN_US]: Tools.deepMerge(
          enUS,
          DocsHyperLinkUIEnUS,
          DrawingUIEnUS,
          DocsDrawingUIEnUS,
        ),
        [LocaleType.ZH_CN]: Tools.deepMerge(
          zhCN,
          DocsHyperLinkUIZhCN,
          DrawingUIZhCN,
          DocsDrawingUIZhCN,
        ),
      },
    })

    // core plugins
    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverFormulaEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container: univerRef.current!,
      footer: false,
    })
    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)

    // HyperLink Plugin
    univer.registerPlugin(UniverDocsHyperLinkPlugin)
    univer.registerPlugin(UniverDocsHyperLinkUIPlugin)

    // Floating Drawing Plugin
    univer.registerPlugin(UniverDrawingPlugin)
    univer.registerPlugin(UniverDrawingUIPlugin)
    univer.registerPlugin(UniverDocsDrawingPlugin)
    univer.registerPlugin(UniverDocsDrawingUIPlugin)

    // create univer sheet instance
    univer.createUnit(UniverInstanceType.UNIVER_DOC, ALL_FEATURES_DOCUMENT_DATA)

    univer.registerPlugin(GithubPlugin, {
      link: '/src/examples/docs',
    })
    window.univer = univer
    window.DocHyperLinkModel = univer.__getInjector().get(DocHyperLinkModel)
  }, [])

  return (
    <div ref={univerRef} style={{ height: 'calc(100vh - 68px)' }} />
  )
}
