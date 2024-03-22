import { useEffect, useRef } from 'react'
import styles from './index.module.less'

export interface ISandboxProps {
  height?: string
  locale?: string
  code: string
  hideEditor?: boolean
}

export default function Sandbox(props: ISandboxProps) {
  const { height = '460px', locale, code, hideEditor = false } = props
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.data === 'loaded') {
        iframeRef.current!.contentWindow?.postMessage(JSON.stringify({
          locale,
          code,
          hideEditor,
        }), '*')
      }
    }, false)
  })

  return (
    <iframe ref={iframeRef} className={styles.sandbox} style={{ height }} src="/sandbox" />
  )
}
