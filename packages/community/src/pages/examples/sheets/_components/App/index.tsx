import { LocaleType, Univer } from '@univerjs/core'
import { UniverDataValidationPlugin } from '@univerjs/data-validation'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverFindReplacePlugin } from '@univerjs/find-replace'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsConditionalFormattingUIPlugin } from '@univerjs/sheets-conditional-formatting-ui'
import { UniverSheetsDataValidationPlugin } from '@univerjs/sheets-data-validation'
import { UniverSheetsFindReplacePlugin } from '@univerjs/sheets-find-replace'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import { UniverUIPlugin } from '@univerjs/ui'
import { useEffect, useRef } from 'react'
import { ALL_FEATURES_WORKBOOK_DATA } from '../../../_data/sheets/demo/features'
import { locales } from './locales'
// import { IUniverRPCMainThreadConfig, UniverRPCMainThreadPlugin } from "@univerjs/rpc";
import './style.css'

export default function App() {
  const univerRef = useRef(null)

  useEffect(() => {
    const univer = new Univer({
      theme: defaultTheme,
      locale: LocaleType.EN_US,
      locales,
    })

    // core plugins
    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container: univerRef.current!,
      header: true,
      footer: true,
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
    univer.registerPlugin(UniverDataValidationPlugin)
    univer.registerPlugin(UniverSheetsDataValidationPlugin)
    univer.registerPlugin(UniverSheetsFindReplacePlugin)

    // sheet condition formatting

    // create univer sheet instance
    univer.createUniverSheet(ALL_FEATURES_WORKBOOK_DATA)

    univer.registerPlugin(UniverSheetsConditionalFormattingUIPlugin)
  }, [])

  return (
    <div ref={univerRef} style={{ height: '100vh' }} />
  )
}
