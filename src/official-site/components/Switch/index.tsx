import React, { useState } from 'react'

function Switch({ intailValue, leftIcon, rightIcon, leftLabel, rightLabel, isDisabled, onChange }: {

  intailValue?: 'left' | 'right'
  leftIcon: string
  rightIcon: string
  leftLabel: string
  rightLabel: string
  isDisabled?: boolean
  onChange?: (value: 'left' | 'right') => void

}) {
  const [selected, setSelected] = useState(intailValue || 'left')

  const handleToggle = (option: 'left' | 'right') => {
    if (!isDisabled) {
      setSelected(option)
      onChange && onChange(option)
    }
  }

  return (
    <div className={`
      inline-flex rounded-[32px] p-[4px] font-['Poppins'] text-sm font-normal capitalize
      leading-none text-neutral-800

      xl:text-base xl:text-slate-900

      ${isDisabled
? `cursor-not-allowed opacity-50`
: `cursor-pointer`}

      bg-blue-600 bg-opacity-5
    `}
    >
      <div
        className={`
          flex items-center rounded-[32px] px-[20px] py-[10px] transition-all duration-300

          hover:bg-[#fcfdff]

          ${selected === 'left'
? `bg-white shadow-md`
: ''}
        `}
        onClick={() => handleToggle('left')}
      >
        {leftIcon && <img src={leftIcon} alt="left icon" className="mr-2 h-[20px] w-[20px]" />}
        <span className={isDisabled ? 'text-gray-400' : ''}>{leftLabel}</span>
      </div>
      <div
        className={`
          flex items-center rounded-[32px] px-[20px] py-[10px] transition-all duration-300

          hover:bg-[#fcfdff]

          ${selected === 'right'
? `bg-white shadow-md`
: ''}
        `}
        onClick={() => handleToggle('right')}
      >
        {rightIcon && <img src={rightIcon} alt="right icon" className="mr-2 h-[20px] w-[20px]" />}
        <span className={isDisabled ? 'text-gray-400' : ''}>{rightLabel}</span>
      </div>
    </div>
  )
}

export default Switch
