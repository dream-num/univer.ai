import { LocaleType, Univer } from '@univerjs/core'
import { enUS as UniverDesignEnUS, defaultTheme } from '@univerjs/design'
import '@univerjs/design/lib/index.css'
import { UniverDocsPlugin } from '@univerjs/docs'
import { enUS as UniverDocsUIEnUS, UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { FUniver } from '@univerjs/facade'
import { enUS as UniverSheetsEnUS, UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import '@univerjs/sheets-formula/lib/index.css'
import { enUS as UniverSheetsUIEnUS, UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import '@univerjs/sheets-ui/lib/index.css'
import { enUS as UniverSheetsZenEditorEnUS, UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import '@univerjs/sheets-zen-editor/lib/index.css'
import { enUS as UniverUIEnUS, UniverUIPlugin } from '@univerjs/ui'
import '@univerjs/ui/lib/index.css'

import { themes } from 'prism-react-renderer'
import { useEffect, useRef, useState } from 'react'

import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'

import type { ISandboxProps } from '../index'

import styles from './index.module.less'

const scope = {
  Univer,
  defaultTheme,
  UniverDocsPlugin,
  UniverDocsUIPlugin,
  UniverFormulaEnginePlugin,
  UniverRenderEnginePlugin,
  UniverSheetsPlugin,
  UniverSheetsFormulaPlugin,
  UniverSheetsUIPlugin,
  UniverUIPlugin,
  UniverSheetsZenEditorPlugin,
  FUniver,

  LocaleType,
  UniverDesignEnUS,
  UniverDocsUIEnUS,
  UniverSheetsEnUS,
  UniverSheetsUIEnUS,
  UniverSheetsZenEditorEnUS,
  UniverUIEnUS,

  useEffect,
  useRef,
}

export default function Sheet() {
  const [code, setCode] = useState('')
  const [hideEditor, setHideEditor] = useState(false)

  useEffect(() => {
    window.parent.postMessage('loaded', '*')

    window.addEventListener('message', (e) => {
      try {
        const { code, hideEditor = false } = JSON.parse(e.data) as ISandboxProps

        setCode(code)
        setHideEditor(hideEditor)
      } catch (e) {}
    }, false)
  }, [])

  function transformCode(value: string) {
    return `function UniverSheet () {
      const univerRef = useRef(null);

      useEffect(() => {
        ${value.replace('\'app\'', 'univerRef.current')}
      }, []);

      return (
        <div ref={univerRef} style={{ height: '100%' }} />
      )
    }`
  }

  return code && (
    <LiveProvider code={code} transformCode={transformCode} scope={scope}>
      <div className={styles.playground}>
        {!hideEditor && (
          <div className={styles.editor}>
            <LiveEditor theme={themes.github} />
          </div>
        )}
        <div className={styles.result}>
          <LiveError />
          <LivePreview />
        </div>
      </div>
    </LiveProvider>
  )
}
