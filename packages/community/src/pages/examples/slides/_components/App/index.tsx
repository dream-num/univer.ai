import { LocaleType, Univer, UniverInstanceType } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverSlidesPlugin } from '@univerjs/slides'
import { UniverSlidesUIPlugin } from '@univerjs/slides-ui'
import { UniverUIPlugin } from '@univerjs/ui'
import { useEffect, useRef } from 'react'

import { DEFAULT_SLIDE_DATA } from '../../../_data'
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

    // base-render
    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container: univerRef.current!,
      header: true,
      footer: true,
    })
    univer.registerPlugin(UniverSlidesPlugin)
    univer.registerPlugin(UniverSlidesUIPlugin)

    univer.createUnit(UniverInstanceType.UNIVER_SLIDE, DEFAULT_SLIDE_DATA)
  }, [])

  return (
    <div ref={univerRef} style={{ height: '100vh' }} />
  )
}
