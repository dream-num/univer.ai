import clsx from 'clsx'
import styles from './index.module.less'

interface ITabItem {
  label: string
  value: string
}

interface IProps {
  value: string
  tabs: ITabItem[]
  onChange: (value: string) => void
}

export function Tabs(props: IProps) {
  const { value, tabs, onChange } = props

  const handleChangeTab = (value: string) => {
    onChange(value)
  }

  return (
    <div className={styles.tabs}>
      {
        tabs.map((tab, index) => (
          <a
            key={index}
            className={clsx(styles.item, { [styles.active]: tab.value === value })}
            onClick={() => handleChangeTab(tab.value)}
          >
            {tab.label}
          </a>
        ))
      }
    </div>
  )
}
