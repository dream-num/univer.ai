import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { ContentSingle20, GithubSingle24, SearchSingle28 } from '@univerjs/icons'
import pkg from '@univerjs/icons/package.json'
import * as manifest from '@univerjs/icons/esm/manifest'
import { Tabs } from '@/components/Tabs'
import { IconBox } from './IconBox'
import LogoImg from '@/assets/logo.svg'
import HeroImg from './hero.png'

import styles from './index.module.less'

const tabs = [{
  label: '可变单色',
  value: 'single',
}, {
  label: '可变多色',
  value: 'binary',
}, {
  label: '不可变色',
  value: 'other',
}]

const excludeList = ['outdate']

export const groups = tabs.map((tab) => ({
  name: tab.value,
  items: Object.keys(manifest)
    .filter((item) => {
      const itemLowerCase = item.toLowerCase()
      if (itemLowerCase.search(tab.value) < 0) {
        return false
      }
      const hasExclude = excludeList.some((excludeItem) => {
        return itemLowerCase.search(excludeItem) >= 0
      })
      if (hasExclude) return false
      return true
    })
    .map((item) => ({
      groupName: item.replace('Manifest', '').replace(tab.value, ''),
      // @ts-ignore
      groupItem: manifest[item]
    }))
}))

export function IconsPage () {
  const [category, setCategory] = useState('single')
  const [keyword, setKeyword] = useState('')

  function handleSearch (e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value)
  }

  const activeGroup = useMemo(() => groups.find((group) => group.name === category), [category])!

  // const iconsGroup = useMemo(() => {
  //   return manifest
  // }, [keyword])

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
                <ContentSingle20 />
                API 文档
              </a>
              <a href="https://github.com/dream-num/univer-icons">
                <GithubSingle24 />
                Github
              </a>
            </footer>
          </section>
        </section>
      </header>

      <search className={styles.search}> 
        <section className={styles.wrapper}>
          <div className={styles.input}>
            <SearchSingle28 className={styles.icon} />
            <input value={keyword} onChange={handleSearch} placeholder="搜索" />
          </div>
        </section>
      </search>

      <main className={styles.main}>
        <section className={styles.wrapper}>
            <header>
              <Tabs tabs={tabs} value={category} onChange={setCategory} />
            </header>

            <div>
              {activeGroup.items.map((item) => (
                <div key={item.groupName}>
                  <h4>{item.groupName}</h4>

                  <div className={styles.container}>
                    {item.groupItem.map((icon: any) => (
                      <IconBox key={icon.stem} name={icon.icon} iconKey={icon.stem} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
        </section>
      </main>
    </>
  )
}
