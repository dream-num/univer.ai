import type { IWorkbookData } from '@univerjs/core'
import { ILogService, LocaleType, LogLevel, Univer } from '@univerjs/core'
import { greenTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import type { IUniverRPCMainThreadConfig } from '@univerjs/rpc'
import { UniverRPCMainThreadPlugin } from '@univerjs/rpc'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import { UniverUIPlugin } from '@univerjs/ui'
import { locales } from '../../../../locales'
import { ExchangeClientPlugin } from '../../exchange-plugin'

export function createUniver(workbookData: IWorkbookData) {
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
    container: 'app',
    header: true,
    footer: true,
  })

  // sheet basic plugins
  univer.registerPlugin(UniverSheetsNumfmtPlugin)
  univer.registerPlugin(UniverSheetsPlugin, {
    notExecuteFormula: true, // using web worker
  })
  univer.registerPlugin(UniverSheetsUIPlugin)
  univer.registerPlugin(UniverSheetsFormulaPlugin)
  univer.registerPlugin(UniverSheetsZenEditorPlugin)

  // web worker
  univer.registerPlugin(UniverRPCMainThreadPlugin, {
    workerURL: './worker.js',
  } as IUniverRPCMainThreadConfig)

  univer.registerPlugin(ExchangeClientPlugin)

  univer.createUniverSheet(workbookData)

  window.univer = univer
}
