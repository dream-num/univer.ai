import { useEffect, useRef } from 'react'
import styles from './index.module.less'

interface IProps {
  code: string
  hideEditor?: boolean
}

export default function Sandbox(props: IProps) {
  const { code, hideEditor = false } = props
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e.data === 'loaded') {
        iframeRef.current!.contentWindow?.postMessage(JSON.stringify({
          code,
          hideEditor,
        }), '*')
      }
    }, false)
  })

  return (
    <iframe ref={iframeRef} className={styles.sandbox} src="/sandbox" />
  )
}
