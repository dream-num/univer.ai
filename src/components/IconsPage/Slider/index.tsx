import RcSlider from 'rc-slider'
import './rc-slider.css'

import styles from './index.module.less'

interface IProps {
  value: number
  onChange: (value: number) => void
}

export function Slider (props: IProps) {
  const { value, onChange } = props

  function handleChange (value: number | number[]) {
    if (Array.isArray(value)) return

    onChange(value)
  }

  return (
    <span className={styles.slider}>
      <RcSlider min={10} max={64} value={value} onChange={handleChange} />
      <span className={styles.value}>{value}px</span>
    </span>
  )
}
