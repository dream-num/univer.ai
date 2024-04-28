import { ILogService, LocaleType, LogLevel, Univer, UniverInstanceType } from '@univerjs/core'
import { greenTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import { UniverUIPlugin } from '@univerjs/ui'

import { useEffect, useRef } from 'react'
import { locales } from './locales'
import { ExchangeClientPlugin } from './plugins/exchange-client'
import './style.css'

export default function App() {
  const univerRef = useRef(null)

  useEffect(() => {
    const univer = new Univer({
      theme: greenTheme,
      locale: LocaleType.EN_US,
      locales,
    })

    const logService = univer.__getInjector().get(ILogService)
    logService.setLogLevel(LogLevel.VERBOSE)

    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)
    univer.registerPlugin(UniverFormulaEnginePlugin)
    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container: univerRef.current!,
      header: true,
      footer: true,
    })

    // sheet basic plugins
    univer.registerPlugin(UniverSheetsNumfmtPlugin)
    univer.registerPlugin(UniverSheetsPlugin)
    // univer.registerPlugin(UniverSheetsPlugin, {
    //     notExecuteFormula: true, // using web worker
    // });
    univer.registerPlugin(UniverSheetsUIPlugin)
    univer.registerPlugin(UniverSheetsFormulaPlugin)
    univer.registerPlugin(UniverSheetsZenEditorPlugin)

    // web worker
    // univer.registerPlugin(UniverRPCMainThreadPlugin, {
    //     workerURL: './worker.js',
    // } as IUniverRPCMainThreadConfig);

    univer.registerPlugin(ExchangeClientPlugin)

    univer.createUnit(UniverInstanceType.UNIVER_SHEET, {})
  }, [])

  return (
    <div ref={univerRef} style={{ height: '100vh' }} />
  )
}
