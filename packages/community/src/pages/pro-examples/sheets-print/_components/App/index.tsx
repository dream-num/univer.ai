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

import '@univerjs-pro/collaboration-client/lib/index.css'
import { SheetsPrintPlugin } from '@univerjs-pro/sheets-print'
import { useEffect, useRef } from 'react'

import { workbookData } from './data'
import { locales } from './locales'
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
    univer.registerPlugin(UniverSheetsPlugin, {
      // notExecuteFormula: true, // using web worker
    })
    univer.registerPlugin(UniverSheetsUIPlugin)
    univer.registerPlugin(UniverSheetsFormulaPlugin)
    univer.registerPlugin(UniverSheetsZenEditorPlugin)

    // web worker
    // univer.registerPlugin(UniverRPCMainThreadPlugin, {
    //   workerURL: './worker.js',
    // } as IUniverRPCMainThreadConfig)

    // collaboration plugins
    // univer.registerPlugin(CollaborationPlugin)
    // univer.registerPlugin(CollaborationClientPlugin, {
    //   enableOfflineEditing: true,
    //   enableSingleActiveInstanceLock: true,
    //   enableAuthServer: true,
    // } as ICollaborationClientPluginConfig)

    univer.registerPlugin(SheetsPrintPlugin)

    univer.createUnit(UniverInstanceType.UNIVER_SHEET, workbookData)
  }, [])

  return (
  <div ref={univerRef} style={{ height: '100vh' }} />
  )
}
