import { SearchSingle16 } from '@univerjs/icons'
import * as manifest from '@univerjs/icons/esm/manifest'
import { useMemo, useState } from 'react'
import { ColorPicker } from './ColorPicker'
import { Hero } from './Hero'
import { IconBox } from './IconBox'

import styles from './index.module.less'
import { Slider } from './Slider'
import { Tabs } from '@/components/Tabs'

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

export const groups = tabs.map(tab => ({
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
      if (hasExclude) {
        return false
      }
      return true
    })
    .map(item => ({
      groupName: item.replace('Manifest', '').replace(tab.value, ''),
      groupItem: manifest[item as keyof typeof manifest],
    })),
}))

export function IconsPage() {
  const [category, setCategory] = useState('single')
  const [keyword, setKeyword] = useState('')
  const [fontSize, setFontSize] = useState(24)
  const [color, setColor] = useState('#1e222b')
  const [colorChannel1, setColorChannel1] = useState('#274fee')

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value)
  }

  const activeGroup = useMemo(() => {
    const result = groups.find((group) => {
      return group.name === category
    })!

    if (!keyword) {
      return result
    }

    return {
      ...result,
      items: result.items.map((item) => {
        return {
          ...item,
          groupItem: item.groupItem.filter((icon: any) => {
            return icon.icon.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
          }),
        }
      }).filter(item => item.groupItem.length > 0),
    }
  }, [category, keyword])!

  return (
    <>
      <Hero />

      <search className={styles.search}>
        <section className={styles.wrapper}>
          <div className={styles.input}>
            <SearchSingle16 className={styles.icon} />
            <input value={keyword} onChange={handleSearch} placeholder="搜索" />
          </div>

          <section className={styles.config}>
            <Slider value={fontSize} onChange={setFontSize} />
            <span className={styles.picker}>
              通道 1：
              <ColorPicker value={color} onChange={setColor} />
            </span>
            <span className={styles.picker}>
              通道 2：
              <ColorPicker value={colorChannel1} onChange={setColorChannel1} />
            </span>
          </section>
        </section>
      </search>

      <main className={styles.main}>
        <section className={styles.wrapper}>
          <header>
            <Tabs tabs={tabs} value={category} onChange={setCategory} />
          </header>

          <div>
            {activeGroup.items.map(item => (
              <div key={item.groupName}>
                <h4>{item.groupName}</h4>

                <div className={styles.container}>
                  {item.groupItem.map((icon: any) => (
                    <IconBox
                      key={icon.stem}
                      name={icon.icon}
                      iconKey={icon.stem}
                      fontSize={fontSize}
                      color={color}
                      colorChannel1={colorChannel1}
                    />
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
