import { LocaleType, Tools, Univer } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
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
import { useEffect } from 'react'
import { Mosaic, MosaicWindow } from 'react-mosaic-component'
import 'react-mosaic-component/react-mosaic-component.css'
import { ALL_FEATURES_WORKBOOK_DATA } from '../../../_data/sheets/demo/features'
import './index.css'
import { locales } from './locales'

export default function App() {
  const univers: Univer[] = []

  function factory(id: string) {
    const univer = new Univer({
      theme: defaultTheme,
      locale: LocaleType.EN_US,
      locales,
    })

    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container: id,
      header: true,
      footer: true,
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

    // create univer sheet instance
    univer.createUniverSheet(Tools.deepClone(ALL_FEATURES_WORKBOOK_DATA))

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

  const _Mocaic = Mosaic as any
  const _MosaicWindow = MosaicWindow as any

  return (
    <div style={{ height: '100vh' }}>
      <_Mocaic<ViewId>
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