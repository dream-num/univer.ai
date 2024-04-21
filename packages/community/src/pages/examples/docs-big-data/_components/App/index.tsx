import { LocaleType, Univer } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverUIPlugin } from '@univerjs/ui'
import { useEffect, useRef } from 'react'

import { DOCS_BIG_DATA } from '../../../_data/docs/docs-big-data'
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

    // @ts-expect-error
    univer.createUniverDoc(DOCS_BIG_DATA)

    // add read only tip
    setTimeout(() => {
      document.body.insertAdjacentHTML('afterend', '<div class="header-tip" style="position: fixed; top: 0; right: 10px; height: 32px; line-height: 32px; color: rgba(32, 32, 32, .8); font-size: 14px; font-family: sans-serif; z-index: 1000; pointer-events: none;">Read Only</div>')
    }, 3000)
  }, [])

  return (
    <div ref={univerRef} style={{ height: '100vh' }} />
  )
}
