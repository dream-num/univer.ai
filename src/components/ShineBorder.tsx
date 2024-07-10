'use client'

import { clsx } from '@/lib/utils'

type TColorProp = `#${string}` | `#${string}`[]
interface IShineBorderProps {
  borderRadius?: number
  borderWidth?: number
  duration?: number
  color?: TColorProp
  className?: string
  animate?: boolean
  children: React.ReactNode
}

/**
 * @name Shine Border
 * @description It is an animated background border effect component with easy to use and configurable props.
 * @param borderRadius defines the radius of the border.
 * @param borderWidth defines the width of the border.
 * @param duration defines the animation duration to be applied on the shining border
 * @param color a string or string array to define border color.
 * @param className defines the class name to be applied to the component
 * @param children contains react node elements.
 */
export default function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = '#fff',
  className,
  animate,
  children,
}: IShineBorderProps) {
  return (
    <div
      style={
        {
          '--border-radius': `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={clsx(
        `relative w-fit place-items-center rounded-[--border-radius] bg-white text-black`,
        className,
      )}
    >
      <div
        style={
          {
            '--border-width': `${borderWidth}px`,
            '--border-radius': `${borderRadius}px`,
            '--border-radius-child': `${borderRadius * 0.2}px`,
            '--shine-pulse-duration': `${duration}s`,
            '--mask-linear-gradient': `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            '--background-radial-gradient': animate ? `radial-gradient(transparent,transparent, ${!(Array.isArray(color)) ? color : color.join(',')},transparent,transparent)` : `radial-gradient(transparent,transparent, ${!(Array.isArray(color)) ? color : color.join(',')})`,
          } as React.CSSProperties
        }
        // eslint-disable-next-line readable-tailwind/multiline
        className={`
          before:bg-shine-size before:absolute before:inset-[0] before:aspect-square before:h-full
          before:w-full before:rounded-[--border-radius] before:p-[--border-width]
          before:will-change-[background-position] before:content-[""]
          before:![-webkit-mask-composite:xor]
          before:[background-image:var(--background-radial-gradient)]
          before:[background-size:300%_300%] before:![mask-composite:exclude]
          before:[mask:var(--mask-linear-gradient)]

          motion-safe:before:animate-[shine-pulse_var(--shine-pulse-duration)_infinite_linear]
        `}
      >
      </div>
      <div className="z-[1] h-full w-full rounded-[--border-radius-child]">
        {children}
      </div>
    </div>
  )
}
