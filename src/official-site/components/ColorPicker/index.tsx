import RcColorPicker, { type Color } from '@rc-component/color-picker'
import { useEffect, useState } from 'react'
import { clsx } from '@/lib/utils'

interface IProps {
  value: string
  onChange: (value: string) => void
}

export function ColorPicker(props: IProps) {
  const { value, onChange } = props

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleHide() {
      setVisible(false)
    }

    document.addEventListener('click', handleHide)

    return () => {
      document.removeEventListener('click', handleHide)
    }
  }, [])

  function handleChangeVisible(e: React.MouseEvent<HTMLAnchorElement>) {
    e.stopPropagation()

    setVisible(prev => !prev)
  }

  function handleChange(color: Color) {
    onChange(color.toHexString())
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
  }

  return (
    <span className="relative">
      <a
        className="block h-6 w-6 cursor-pointer rounded border border-[#ECECEC]"
        style={{
          backgroundColor: value,
        }}
        onClick={handleChangeVisible}
      />
      <div
        className={clsx(`
          absolute right-0 h-0 w-0 overflow-hidden shadow-[0px_2px_12px_0px_rgba(30,34,43,0.06)]
        `, {
          'h-auto w-auto': visible,
        })}
        onClick={stopPropagation}
      >
        <RcColorPicker value={value} onChange={handleChange} disabledAlpha />
      </div>
    </span>
  )
}
