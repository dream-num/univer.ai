'use client'

import { GithubPlugin } from '@/examples/plugins/github-plugin'
import { LocaleType, Univer, UniverInstanceType } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'

import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverUIPlugin } from '@univerjs/ui'
import { UniverUniscriptPlugin } from '@univerjs/uniscript'
import { useEffect, useRef } from 'react'
import { enUS, zhCN } from 'univer:locales'
import { ALL_FEATURES_DOCUMENT_DATA } from './data'

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
    })
    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)

    univer.registerPlugin(UniverUniscriptPlugin, {
      getWorkerUrl(moduleID: string, label: string) {
        if (label === 'typescript' || label === 'javascript') {
          return './vs/language/typescript/ts.worker.js'
        }

        return './vs/editor/editor.worker.js'
      },
    })

    // create univer sheet instance
    univer.createUnit(UniverInstanceType.UNIVER_DOC, ALL_FEATURES_DOCUMENT_DATA)

    univer.registerPlugin(GithubPlugin, {
      link: '/src/examples/docs-uniscript',
    })
  }, [])

  return (
    <div ref={univerRef} style={{ height: 'calc(100vh - 68px)' }} />
  )
}
