'use client'

import { LocaleType, Univer, UniverInstanceType } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverUIPlugin } from '@univerjs/ui'
import { UniverSheetsPrintPlugin } from '@univerjs-pro/sheets-print'
import { useEffect, useRef } from 'react'
import { enUS, zhCN } from 'univer:locales'
import { workbookData } from './data'
import { GithubPlugin } from '../../../plugins/github-plugin'

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
    univer.registerPlugin(UniverFormulaEnginePlugin)
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
    univer.registerPlugin(UniverSheetsUIPlugin)
    univer.registerPlugin(UniverSheetsFormulaPlugin)
    univer.registerPlugin(UniverSheetsPrintPlugin)

    // create univer sheet instance
    univer.createUnit(UniverInstanceType.UNIVER_SHEET, workbookData)

    univer.registerPlugin(GithubPlugin, {
      link: '/pro/examples/sheets-print'
    })
  }, [])

  return (
    <div ref={univerRef} style={{ height: 'calc(100vh - 68px)' }} />
  )
}
