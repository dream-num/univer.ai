import { useState } from 'react'
import clsx from 'clsx'
import LogoImg from '@/assets/logo.svg'
import HeroImg from './hero.png'
import { SearchSingle28 } from '@univerjs/icons'
import pkg from '@univerjs/icons/package.json'
import { Tabs } from '@/components/Tabs'

import styles from './index.module.less'

const tabs = [{
  label: '全部',
  value: 'all',
}, {
  label: '可变单色',
  value: 'single',
}, {
  label: '可变多色',
  value: 'binary',
}, {
  label: '不可变色',
  value: 'other',
}]

export function IconsPage () {
  const [category, setCategory] = useState('all')

  return (
    <>
      <header className={styles.hero}>
        <div className={styles.materials}>
          <div className={clsx(styles.shadow, styles['shadow-1'])} />
          <div className={clsx(styles.shadow, styles['shadow-2'])} />
          <div className={clsx(styles.shadow, styles['shadow-3'])} />
          <img src={HeroImg.src} alt="hero" />
        </div>

        <section className={styles.wrapper}>
          <nav>
            <h1>
              <a href="/">
                <img src={LogoImg.src} alt="logo" />
                Univer Icon
                </a>
            </h1>

            <label>
              v{pkg.version}
            </label>
          </nav>

          <section className={styles.content}>
            <label>
              <span>基于 SVG</span>
              <span>·</span>
              <span>组件化</span>
              <span>·</span>
              <span>按需使用</span>
            </label>

            <h2>一款针对办公产品定制的<wbr />图标库</h2>

            <footer>
              <a>
                获取 Figma 文件
              </a>
            </footer>
          </section>
        </section>
      </header>

      <search className={styles.search}> 
        <section className={styles.wrapper}>
          <div className={styles.input}>
            <SearchSingle28 className={styles.icon} />
            <input placeholder="搜索" />
          </div>

          <div>select</div>
        </section>
      </search>

      <main className={styles.main}>
        <section className={styles.wrapper}>
            <header>
              <Tabs tabs={tabs} value={category} onChange={setCategory} />
            </header>
        </section>
      </main>
    </>
  )
}
