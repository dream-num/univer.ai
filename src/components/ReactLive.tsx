import { LocaleType, Univer, UniverInstanceType } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { FUniver } from '@univerjs/facade'
import { CodeSingle, CreateCopySingle, SuccessSingle } from '@univerjs/icons'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import { UniverUIPlugin } from '@univerjs/ui'
import { UniverSlidesPlugin } from '@univerjs/slides'
import { UniverSlidesUIPlugin } from '@univerjs/slides-ui'
import { enUS, zhCN } from 'univer:locales'

import { themes } from 'prism-react-renderer'
import { useCallback, useEffect, useRef, useState } from 'react'

import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import { clsx } from '@/lib/utils'

interface IProps {
  code: string
  hideEditor?: boolean
}

export default function ReactLive(props: IProps) {
  const scope = {
    Univer,
    UniverInstanceType,

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
    UniverSlidesPlugin,
    UniverSlidesUIPlugin,
    FUniver,

    LocaleType,
    enUS,
    zhCN,

    useEffect,
    useRef,
  }

  const { code, hideEditor = true } = props

  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(!hideEditor)

  const transformCode = useCallback((value: string) => {
    return `function Demo () {
      const univerRef = useRef(null);

      useEffect(() => {
        ${value.replace('\'app\'', 'univerRef.current')}

        return () => {
          univer.dispose();
        }
      }, []);

      return (
        <div ref={univerRef} style={{ height: '480px' }} />
      );
    }`
  }, [])

  function handleCopy() {
    navigator.clipboard.writeText(code)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return code && (
    <LiveProvider code={code} transformCode={transformCode} scope={scope}>
      <section className="mt-6 overflow-hidden rounded-xl shadow">
        <div onFocus={e => e.preventDefault()}>
          <LiveError className="bg-red-100 py-x py-4 text-red-800" />
          <LivePreview />
        </div>

        {!hideEditor && (
          <div className="font-mono text-sm">
            <div className="flex justify-end gap-2 px-4 py-2">
              <a
                className={`
                  cursor-pointer text-base

                  hover:text-[#274FEE]
                `}
                onClick={handleCopy}
              >
                {copied ? <SuccessSingle className="text-[#409F11]" /> : <CreateCopySingle />}
              </a>
              <a
                className={`
                  cursor-pointer text-base

                  hover:text-[#274FEE]
                `}
                onClick={() => setVisible(!visible)}
              >
                <CodeSingle />
              </a>
            </div>

            <div
              className={clsx({
                hidden: !visible,
              })}
            >
              <LiveEditor theme={themes.github} />
            </div>
          </div>
        )}
      </section>
    </LiveProvider>
  )
}
