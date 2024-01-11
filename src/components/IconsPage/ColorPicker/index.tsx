import { useEffect, useState } from 'react'
import clsx from 'clsx'
import RcColorPicker, { type Color } from '@rc-component/color-picker'
import './rc-color-picker.css'

import styles from './index.module.less'

interface IProps {
  value: string
  onChange: (value: string) => void
}

export function ColorPicker (props: IProps) {
  const { value, onChange } = props

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleHide () {
      setVisible(false)
    }

    document.addEventListener('click', handleHide)

    return () => {
      document.removeEventListener('click', handleHide)
    }
  }, [])

  function handleChangeVisible (e: React.MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation()

    setVisible((prev) => !prev)
  }

  function handleChange (color: Color) {
    onChange(color.toHexString())
  }

  function stopPropagation (e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
  }

  return (
    <span className={styles.picker}>
      <a
        className={styles.block}
        style={{
          backgroundColor: value
        }}
        onClick={handleChangeVisible}
      />
      <div className={clsx(styles.dropdown, { [styles.visible]: visible })} onClick={stopPropagation}>
        <RcColorPicker value={value} onChange={handleChange} disabledAlpha />
      </div>
    </span>
  )
}
