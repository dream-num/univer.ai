import { LocaleType, Univer, UniverInstanceType } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'

import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverUIPlugin } from '@univerjs/ui'
import { useEffect, useRef } from 'react'
import { ALL_FEATURES_DOCUMENT_DATA } from '../../../_data/docs/features'
import { locales } from './locales'

import './style.css'

export default function App() {
  const univerRef = useRef(null)

  useEffect(() => {
    // univer
    const univer = new Univer({
      theme: defaultTheme,
      locale: LocaleType.EN_US,
      locales,
    })

    // core plugins
    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverFormulaEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container: univerRef.current!,
      header: true,
    })
    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)

    univer.createUnit(UniverInstanceType.UNIVER_DOC, ALL_FEATURES_DOCUMENT_DATA)
  }, [])

  return (
    <div ref={univerRef} style={{ height: '100vh' }} />
  )
}
