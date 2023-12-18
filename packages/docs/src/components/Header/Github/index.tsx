import { useEffect, useState } from 'react'
import StarIcon from '@/components/Icons/Star'

import styles from './index.module.less'

export const Github = () => {
  const [count, setCount] = useState(0)


  useEffect(() => {
    fetch('https://api.github.com/repos/dream-num/univer')
      .then(resp => resp.json())
      .then(data => {
        setCount(data.stargazers_count)
      })
  })

  return (
    <span className={styles.github}>
      <span className={styles.star}>
        <StarIcon />
        Star
      </span>

      <span className={styles.tooltip}>
        {count}
      </span>
    </span>
  )
}
