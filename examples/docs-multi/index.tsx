'use client'

import { LocaleType, Tools, Univer, UniverInstanceType } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverUIPlugin } from '@univerjs/ui'
import { useEffect } from 'react'
import { Mosaic, MosaicWindow } from 'react-mosaic-component'
import 'react-mosaic-component/react-mosaic-component.css'
import { enUS, zhCN } from 'univer:locales'
import { ALL_FEATURES_DOCUMENT_DATA } from './data'

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
    univer.registerPlugin(UniverFormulaEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container: id,
      footer: false,
    })

    // docs plugin
    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)

    // create univer sheet instance
    univer.createUnit(UniverInstanceType.UNIVER_DOC, Tools.deepClone(ALL_FEATURES_DOCUMENT_DATA))

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
