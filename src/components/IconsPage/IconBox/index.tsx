import { useState } from 'react'
import * as AllIcons from '@univerjs/icons/esm/icons'
import styles from './index.module.less'
import { SuccessSingle } from '@univerjs/icons'

interface IProps {
  iconKey: string
  name: string

  fontSize?: number
  color?: string
  colorChannel1?: string
}

export function IconBox (props: IProps) {
  const { iconKey, name, fontSize = 24, color, colorChannel1 } = props
  const [copying, setCopying] = useState(false)

  const Icon = (AllIcons as any)[name]

  function handleCopy () {
    setCopying(true)
    const code = `<${name} />`
    navigator.clipboard.writeText(code)
    setTimeout(() => {
      setCopying(false)
    }, 3000)
  }

  return (
    <div className={styles.box}>
      <div className={styles.block}>
        <Icon style={{ color, fontSize: `${fontSize}px` }} extend={{ colorChannel1 }} />

        <a onClick={handleCopy}>
          {copying ? (
            <span className={styles.copying}>
              <SuccessSingle  />
              已复制
            </span>
          ) : '复制代码'}
        </a>
      </div>
      <p className={styles.name}>{iconKey}</p>
    </div>
  )
}
