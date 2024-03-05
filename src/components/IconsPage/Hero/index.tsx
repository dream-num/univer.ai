import { GithubSingle24 } from '@univerjs/icons'
import clsx from 'clsx'
import HeroImg from './hero.png'

import styles from './index.module.less'

export function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.materials}>
        <div className={clsx(styles.shadow, styles['shadow-1'])} />
        <div className={clsx(styles.shadow, styles['shadow-2'])} />
        <div className={clsx(styles.shadow, styles['shadow-3'])} />
        <img src={HeroImg.src} alt="hero" />
      </div>

      <section className={styles.wrapper}>
        <section className={styles.content}>
          <label>
            <span>基于 SVG</span>
            <span>·</span>
            <span>组件化</span>
            <span>·</span>
            <span>按需使用</span>
          </label>

          <h2>
            一款针对办公产品定制的
            <wbr />
            图标库
          </h2>

          <footer>
            <a href="https://github.com/dream-num/univer-icons">
              <GithubSingle24 />
              Github
            </a>
          </footer>
        </section>
      </section>
    </header>
  )
}
