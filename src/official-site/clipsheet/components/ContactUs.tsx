import type { IssueType } from '@/official-site/config/issueTypes'
import Link from 'next/link'

export function ContactUs({ type }: { type: IssueType }) {
  return (
    <section
      className="bg-[#f6faff] px-4"
    >
      <div className={`
        mx-auto flex flex-col items-center justify-start gap-6 py-[28px]

        xl:py-[88px]
      `}
      >
        <div className={`
          text-center text-[28px] font-semibold leading-9 text-slate-900

          xl:text-5xl xl:leading-[52px]
        `}
        >
          Can't find what you're looking for?
        </div>
        <div className="text-center text-lg font-normal leading-7 text-slate-900">
          You can submit feedback to us for support.
        </div>
        <Link
          href={`/contact-us#${type}`}
          className={`
            inline-flex items-center justify-center gap-2 rounded-[32px]
            bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
            px-6
          `}
        >
          <div className="text-base font-semibold capitalize leading-10 text-slate-50">
            Contact us
          </div>
        </Link>
      </div>
    </section>
  )
}
