import { useEffect, useState } from 'react'
import StarIcon from '@/components/Icons/Star'

import styles from './index.module.less'

export const Github = () => {
  const [count, setCount] = useState('　')

  useEffect(() => {
    fetch('https://api.github.com/repos/dream-num/univer')
      .then(resp => resp.json())
      .then(data => {
        const count = data.stargazers_count > 1000
          ? `${(data.stargazers_count / 1000).toFixed(1)}k`
          : data.stargazers_count

        setCount(count)
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
