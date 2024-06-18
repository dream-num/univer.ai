import RcSlider from 'rc-slider'

interface IProps {
  value: number
  onChange: (value: number) => void
}

export function Slider(props: IProps) {
  const { value, onChange } = props

  function handleChange(value: number | number[]) {
    if (Array.isArray(value)) {
      return
    }

    onChange(value)
  }

  return (
    <span className="inline-flex w-40 flex-shrink-0 items-center gap-4">
      <RcSlider min={10} max={64} value={value} onChange={handleChange} />
      <span className="text-sm">
        {value}
        px
      </span>
    </span>
  )
}
