import { clsx } from '@/lib/utils'

interface IProps {
  type: 'univer' | 'univer-pro'
  children?: React.ReactNode
  label: string
}

export default function Title(props: IProps) {
  const { type, children, label } = props

  return (
    <header
      className={`
        mb-8 grid justify-center gap-5

        xl:mb-[52px]
      `}
    >
      <div
        className={clsx('mx-auto inline-block rounded-full p-[1px]', {
          'bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]': type === 'univer',
          'bg-[linear-gradient(122deg,#E22FFF_22.52%,#602CFF_78.54%)]': type === 'univer-pro',
        })}
      >
        <label className="flex gap-1 rounded-full bg-white px-4 py-1">
          <img src={`/images/${type}/star.svg`} alt={label} />
          <span
            className={clsx('bg-clip-text font-medium text-transparent', {
              'bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]': type === 'univer',
              'bg-[linear-gradient(122deg,#E22FFF_22.52%,#602CFF_78.54%)]': type === 'univer-pro',
            })}
          >
            {label}
          </span>
        </label>
      </div>

      {children && (
        <h2
          className={`
            text-center text-[28px]

            xl:text-[42px]
          `}
        >
          {children}
        </h2>
      )}
    </header>
  )
}
