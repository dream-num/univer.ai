import React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import clsx from 'clsx'
import { CheckMarkSingle, MoreDownSingle } from '@univerjs/icons'

export const SelectItem = React.forwardRef<HTMLDivElement, SelectPrimitive.SelectItemProps>(({ children, className, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item
      className={clsx(
        `
          relative flex cursor-pointer select-none items-center rounded-[8px] py-[8px] pl-[36px]
          pr-[35px] text-[16px] leading-[24px] text-[#0F172A]

          data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none

          data-[highlighted]:bg-[#f5f9fe] data-[highlighted]:text-[#0F172A]
          data-[highlighted]:outline-none
        `,
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className={`
        absolute left-0 inline-flex w-[25px] items-center justify-center text-[20px]
      `}
      >
        <CheckMarkSingle className="text-[#264fee]" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
})

export const Select = React.forwardRef<HTMLButtonElement, SelectPrimitive.SelectProps & { placeholder?: string }>(
  ({ children, placeholder, ...props }, forwardedRef) => {
    return (
      <SelectPrimitive.Root {...props}>
        <SelectPrimitive.Trigger
          ref={forwardedRef}
          className={`
            flex w-full items-center justify-between gap-2 rounded-[8px] border border-[#DEE1E5]
            bg-white px-[12px] py-[8px]

            xl:w-[520px]
          `}
        >
          <SelectPrimitive.Value
            className={`
              h-[24px] shrink grow basis-0 text-[16px] font-normal leading-[24px] text-slate-900
            `}
            placeholder={placeholder}
          />
          <SelectPrimitive.Icon className="text-[24px] text-[#0F172A]">
            <MoreDownSingle />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            className={`
              mt-[2px] w-[--radix-select-trigger-width] overflow-hidden rounded-[10px] rounded-md
              border border-[#DEE1E5] bg-white bg-white
              shadow-[0px_4px_16px_0px_rgba(30,34,43,0.08)]
            `}
          >
            <SelectPrimitive.Viewport className="w-full gap-[1px] p-[8px]">
              {children}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    )
  },
)

export default Select
