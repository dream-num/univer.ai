import { MoreDownSingle } from '@univerjs/icons'
import { useEffect, useState } from 'react'

import styles from './index.module.less'

interface Iprops {
  lang: string
  currentPath: string
}

export function Locale(props: Iprops) {
  const { lang, currentPath } = props

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleHide = () => {
      setVisible(false)
    }

    document.addEventListener('click', handleHide)

    return () => {
      document.removeEventListener('click', handleHide)
    }
  }, [])

  const handleToggleVisible = (e: React.MouseEvent) => {
    e.stopPropagation()

    setVisible(!visible)
  }

  return (
    <div className={styles.locale}>
      <a onClick={handleToggleVisible}>
        {lang}
        <MoreDownSingle />
      </a>

      <ul className={visible ? styles.visible : ''}>
        <li>
          <a href={`${currentPath}`}>简体中文</a>
        </li>
        <li>
          <a href={`/en-us${currentPath}`}>English</a>
        </li>
        <li>
          <a href={`/ja-jp${currentPath}`}>日本語</a>
        </li>
      </ul>
    </div>
  )
}
