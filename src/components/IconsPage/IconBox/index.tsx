import * as AllIcons from '@univerjs/icons/esm/icons'
import styles from './index.module.less'

interface IProps {
  iconKey: string
  name: string
}

export function IconBox (props: IProps) {
  const { iconKey, name } = props

  const Icon = (AllIcons as any)[name]

  return (
    <div className={styles.box}>
      <div className={styles.block}>
        <Icon />

        <a>复制代码</a>
      </div>
      <p className={styles.name}>{iconKey}</p>
    </div>
  )
}
