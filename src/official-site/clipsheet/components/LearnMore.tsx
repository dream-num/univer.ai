import RightArrow from '@/official-site/clipsheet/components/RightArrow'
import clsx from 'clsx'
import Link from 'next/link'

export function LearnMore({ href, className }: { href: string, className?: string }) {
  return (
    <Link
      className={
        clsx(`
          inline-flex items-center gap-[8px] fill-[#2B4DFF] text-center text-lg font-normal
          leading-7 text-[#2B4DFF]

          hover:underline
        `, className)
      }
      href={href}
    >
      Learn more
      {/* <img className="h-[20px] w-[20px]" src={guideSingle.src} /> */}
      <RightArrow />
    </Link>
  )
}
