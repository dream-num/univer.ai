'use client'

import { LocaleType, Univer, UniverInstanceType } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverFindReplacePlugin } from '@univerjs/find-replace'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsConditionalFormattingUIPlugin } from '@univerjs/sheets-conditional-formatting-ui'
import { UniverSheetsFindReplacePlugin } from '@univerjs/sheets-find-replace'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import { UniverUIPlugin } from '@univerjs/ui'
import { useEffect, useRef } from 'react'
import { enUS, zhCN } from 'univer:locales'
import { generateWorkbookData } from './data'
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
    univer.registerPlugin(UniverUIPlugin, {
      container: univerRef.current!,
    })
    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)
    univer.registerPlugin(UniverSheetsPlugin)
    univer.registerPlugin(UniverSheetsUIPlugin)

    // sheet feature plugins
    univer.registerPlugin(UniverSheetsNumfmtPlugin)
    univer.registerPlugin(UniverFormulaEnginePlugin)
    // univer.registerPlugin(UniverFormulaEnginePlugin, {
    //   notExecuteFormula: true,
    // });
    univer.registerPlugin(UniverSheetsFormulaPlugin)
    // univer.registerPlugin(UniverRPCMainThreadPlugin, {
    //   workerURL: './worker.js',
    // } as IUniverRPCMainThreadConfig);
    univer.registerPlugin(UniverSheetsZenEditorPlugin)

    // find replace
    univer.registerPlugin(UniverFindReplacePlugin)

    // data validation
    univer.registerPlugin(UniverSheetsFindReplacePlugin)

    // sheet condition formatting
    univer.registerPlugin(UniverSheetsConditionalFormattingUIPlugin)

    // create univer sheet instance
    univer.createUnit(UniverInstanceType.UNIVER_SHEET, generateWorkbookData(1000000, 10))

    univer.registerPlugin(GithubPlugin, {
      link: '/examples/sheets-big-data',
    })
  }, [])

  return (
    <div ref={univerRef} style={{ height: 'calc(100vh - 68px)' }} />
  )
}
