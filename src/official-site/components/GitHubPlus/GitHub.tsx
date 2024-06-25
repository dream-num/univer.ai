import { GithubSingle24 } from '@univerjs/icons'
import Link from 'next/link'
import clsx from 'clsx'
import guideSingle from '@/official-site/images/guide-single.svg'

type TColorProp = `#${string}` | `#${string}`[]
interface ShineBorderProps {
  borderRadius?: number
  borderWidth?: number
  duration?: number
  color?: TColorProp
  className?: string
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
export function GitHubButtonBase({
  borderRadius = 32,
  borderWidth = 1,
  duration = 14,
  color = '#fff',
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          '--border-radius': `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={clsx(
        // "relative grid min-h-[60px] w-fit min-w-[300px] place-items-center rounded-[--border-radius]  bg-white p-3 text-black dark:bg-black dark:text-white",
        'relative rounded-[--border-radius]',
        `
          flex h-[36px] items-center justify-center bg-[#fff] pl-[16px] pr-[12px] font-semibold
          text-blank shadow items-centerinline-flex
        `,

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
            '--background-radial-gradient': `radial-gradient(transparent,transparent, ${!(Array.isArray(color)) ? color : color.join(',')},transparent,transparent)`,
          } as React.CSSProperties
        }
        className={`
          before:bg-shine-size before:absolute before:inset-[0] before:aspect-square before:h-full
          before:w-full before:rounded-[--border-radius] before:p-[--border-width]
          before:will-change-[background-position] before:![-webkit-mask-composite:xor]
          before:[background-image:var(--background-radial-gradient)]
          before:[background-size:300%_300%] before:![mask-composite:exclude]
          before:[mask:var(--mask-linear-gradient)]

          motion-safe:before:animate-[shine-pulse_var(--shine-pulse-duration)_infinite_linear]
        `}
      >
      </div>
      <div className="z-[1] flex h-full w-full items-center gap-1">
        {children}
      </div>
    </div>
  )
}

export function GitHubButton() {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/dream-num/univer"
    >
      <GitHubButtonBase
        color={['#3b42fd', '#2fa1c8', '#28c5a8']}
      >
        Power by Univer GitHub
        <img className="h-[20px] w-[20px]" src={guideSingle.src} />
        <span className="text-[24px]">
          <GithubSingle24 />
        </span>
      </GitHubButtonBase>
    </Link>
  )
}
