import { LocaleType, Tools, Univer } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverUIPlugin } from '@univerjs/ui'
import { useEffect } from 'react'
import { Mosaic, MosaicWindow } from 'react-mosaic-component'
import 'react-mosaic-component/react-mosaic-component.css'
import { ALL_FEATURES_DOCUMENT_DATA } from '../../../_data/docs/features'
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
    univer.registerPlugin(UniverFormulaEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container: id,
      header: true,
    })
    // docs plugin
    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)

    // create univer sheet instance
    univer.createUniverDoc(Tools.deepClone(ALL_FEATURES_DOCUMENT_DATA))

    univers.push(univer)
  }

  const TITLE_MAP: Record<ViewId, string> = {
    a: 'Doc 1',
    b: 'Doc 2',
    c: 'Doc 3',
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
