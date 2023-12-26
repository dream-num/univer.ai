import { useEffect, useState } from 'react'
import styles from './index.module.less'

interface IEmbedProps {
  title: string
  src: string
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

  const [activeDemo, setActiveDemo] = useState<IEmbedProps>()

  useEffect(() => {
    setActiveDemo(demo[0].children[0])
  }, [demo])

  function handleSelectDemo (item: IEmbedProps) {
    setActiveDemo(item)
  }

  return (
    <section className={styles.container}>
    <aside className={styles.menu}>
      <h2 className={styles.title}>Menu</h2>

      <input className={styles.search} placeholder="Search" />

      <ul data-demo={JSON.stringify(demo)}>
        {demo.map(group => (
          <li>
            <label>{group.title}</label>

            <ul>
              {group.children.map(item => {
                return (
                  <li>
                    <a className={item.src === activeDemo?.src ? styles.active : ''} onClick={() => handleSelectDemo(item)}>
                      {item.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ul>
    </aside>

    <main className={styles.main}>
      <iframe
        className={styles.iframe}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        title={activeDemo?.title}
        src={activeDemo?.src}
      />
    </main>
  </section>
  )
}
