import type { OpenOptions } from '@stackblitz/sdk'
import sdk from '@stackblitz/sdk'
import { useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'

export interface IEmbedProps {
  title: string
  type: 'StackBlitz' | 'CodeSandbox'
  src?: string
  repoPath?: string
  openOptions?: OpenOptions
}

interface IDemo {
  title: string
  children: IEmbedProps[]
}

interface IProps {
  demo: IDemo[]
}

export function Demo(props: IProps) {
  const { demo } = props

  const [keyword, setKeyword] = useState('')
  const [activeDemo, setActiveDemo] = useState<IEmbedProps>()
  const embedDomId = 'embed-playground'

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('title')

    if (query) {
      const item = demo.find(group => group.children.some(item => item.title === query))
      if (item) {
        setActiveDemo(item.children.find(item => item.title === query))
      }
    } else {
      setActiveDemo(demo[0].children[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (activeDemo?.type === 'StackBlitz') {
      sdk.embedGithubProject(embedDomId, activeDemo.repoPath!, {
        ...activeDemo.openOptions,
      })
    }
  }, [activeDemo])

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value
    setKeyword(value)
  }

  const filteredDemo = useMemo(() => {
    if (!keyword) {
      return demo
    }

    return demo.map(group => ({
      ...group,
      children: group.children.filter(item => item.title.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())),
    })).filter(group => group.children.length)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  return (
    <section className={styles.container}>
      <aside className={styles.menu}>
        <h2 className={styles.title}>Menu</h2>

        <input
          className={styles.search}
          placeholder="Search"
          value={keyword}
          onInput={handleSearch}
        />

        <ul>
          {filteredDemo.map(group => (
            <li key={group.title}>
              <label>{group.title}</label>

              <ul>
                {group.children.map(item => (
                  <li key={item.title}>
                    <a
                      className={item.title === activeDemo?.title ? styles.active : ''}
                      href={`?title=${item.title}`}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.main}>
        {
          activeDemo?.type === 'StackBlitz'
            ? (
              <iframe id={embedDomId} className={styles.iframe} src="about:blank"></iframe>
              )
            : (
              <iframe
                className={styles.iframe}
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                title={activeDemo?.title}
                src={activeDemo?.src}
              />
              )
        }
      </main>
    </section>
  )
}
