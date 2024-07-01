'use client'

import { LocaleType, Univer, UniverInstanceType } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'

import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverUIPlugin } from '@univerjs/ui'
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
        [LocaleType.EN_US]: enUS,
        [LocaleType.ZH_CN]: zhCN,
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
    // create univer sheet instance
    univer.createUnit(UniverInstanceType.UNIVER_DOC, ALL_FEATURES_DOCUMENT_DATA)

    univer.registerPlugin(GithubPlugin, {
      link: '/src/examples/docs',
    })
  }, [])

  return (
    <div ref={univerRef} style={{ height: 'calc(100vh - 68px)' }} />
  )
}
