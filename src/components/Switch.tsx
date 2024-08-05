import React, { useEffect, useState } from 'react'

function Switch({ intailValue, value, leftIcon, rightIcon, leftLabel, rightLabel, isDisabled, onChange }: {

  intailValue?: 'left' | 'right'
  value?: 'left' | 'right'
  leftIcon: JSX.Element
  rightIcon: JSX.Element
  leftLabel: string
  rightLabel: string
  isDisabled?: boolean
  onChange?: (value: 'left' | 'right') => void

}) {
  const [selected, setSelected] = useState(intailValue || 'left')

  useEffect(() => {
    if (value) {
      setSelected(value)
    }
  }, [value])

  const handleToggle = (option: 'left' | 'right') => {
    if (!isDisabled) {
      setSelected(option)
      onChange && onChange(option)
    }
  }

  return (
    <div className={`
      inline-flex gap-[4px] rounded-[32px] p-[4px] text-sm font-normal capitalize leading-none
      text-neutral-800

      xl:text-[16px] xl:text-slate-900

      ${isDisabled
        ? `cursor-not-allowed opacity-50`
        : `cursor-pointer`}

      bg-blue-600 bg-opacity-5
    `}
    >
      <div
        className={`
          flex items-center rounded-[32px] px-[16px] py-[8px] transition-all duration-300

          hover:bg-[#fcfdff]

          xl:px-[20px] xl:py-[10px]

          ${selected === 'left'
            ? `bg-white shadow-md`
            : ''}
        `}
        onClick={() => handleToggle('left')}
      >
        <span
          className={`
            mr-2 text-[16px]

            xl:text-[20px]
          `}
        >
          {leftIcon}
        </span>
        <span className={isDisabled ? 'text-gray-400' : ''}>{leftLabel}</span>
      </div>
      <div
        className={`
          flex items-center rounded-[32px] px-[16px] py-[8px] transition-all duration-300

          hover:bg-[#fcfdff]

          xl:px-[20px] xl:py-[10px]

          ${selected === 'right'
            ? `bg-white shadow-md`
            : ''}
        `}
        onClick={() => handleToggle('right')}
      >
        <span
          className={`
            mr-2 text-[16px]

            xl:text-[20px]
          `}
        >
          {rightIcon}
        </span>
        <span className={isDisabled ? 'text-gray-400' : ''}>{rightLabel}</span>
      </div>
    </div>
  )
}

export default Switch
