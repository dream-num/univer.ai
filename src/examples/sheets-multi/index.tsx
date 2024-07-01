'use client'

import { LocaleType, Tools, Univer, UniverInstanceType } from '@univerjs/core'
import { UniverDataValidationPlugin } from '@univerjs/data-validation'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsConditionalFormattingUIPlugin } from '@univerjs/sheets-conditional-formatting-ui'
import { UniverSheetsDataValidationPlugin } from '@univerjs/sheets-data-validation'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import { UniverUIPlugin } from '@univerjs/ui'
import { useEffect } from 'react'
import { Mosaic, MosaicWindow } from 'react-mosaic-component'
import 'react-mosaic-component/react-mosaic-component.css'
import { enUS, zhCN } from 'univer:locales'
import { ALL_FEATURES_WORKBOOK_DATA } from './data'
import { GithubPlugin } from '@/examples/plugins/github-plugin'

interface IProps {
  locale: string
}

export default function App(props: IProps) {
  const { locale } = props

  const univers: Univer[] = []

  function factory(id: string) {
    const univer = new Univer({
      theme: defaultTheme,
      locale: locale.replace('-', '') as LocaleType,
      locales: {
        [LocaleType.EN_US]: enUS,
        [LocaleType.ZH_CN]: zhCN,
      },
    })

    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container: id,
    })
    // docs plugin
    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)
    // sheets plugin
    univer.registerPlugin(UniverSheetsPlugin)
    univer.registerPlugin(UniverSheetsUIPlugin)

    // sheet feature plugins
    univer.registerPlugin(UniverSheetsNumfmtPlugin)
    univer.registerPlugin(UniverFormulaEnginePlugin)
    univer.registerPlugin(UniverSheetsFormulaPlugin)
    univer.registerPlugin(UniverSheetsZenEditorPlugin)

    // data validation
    univer.registerPlugin(UniverDataValidationPlugin)
    univer.registerPlugin(UniverSheetsDataValidationPlugin)

    // sheet condition formatting
    univer.registerPlugin(UniverSheetsConditionalFormattingUIPlugin)

    // create univer sheet instance
    univer.createUnit(UniverInstanceType.UNIVER_SHEET, Tools.deepClone(ALL_FEATURES_WORKBOOK_DATA))

    univer.registerPlugin(GithubPlugin, {
      link: '/src/examples/sheets-multi',
    })

    univers.push(univer)
  }

  const TITLE_MAP: Record<ViewId, string> = {
    a: 'Sheet 1',
    b: 'Sheet 2',
    c: 'Sheet 3',
  }

  type ViewId = 'a' | 'b' | 'c'

  useEffect(() => {
    factory('app-a')
    factory('app-b')
    factory('app-c')
  }, [])

  const _Mosaic = Mosaic as any
  const _MosaicWindow = MosaicWindow as any

  return (
    <div style={{ height: 'calc(100vh - 68px)' }}>
      <_Mosaic<ViewId>
        renderTile={(id: ViewId, path: string) => (
          <_MosaicWindow<ViewId>
            path={path}
            title={TITLE_MAP[id]}
            toolbarControls={<div />}
          >
            <div id={`app-${id}`} style={{ height: '100%' }}>
              {TITLE_MAP[id]}
            </div>
          </_MosaicWindow>
        )}
        initialValue={{
          direction: 'row',
          first: 'a',
          second: {
            direction: 'column',
            first: 'b',
            second: 'c',
          },
        }}
      />
    </div>
  )
}
