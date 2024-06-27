import Link from 'next/link'

export default function UniverActions() {
  return (
    <Link
      className={`
        flex h-9 w-full items-center justify-center rounded-full
        bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
        px-6 text-sm font-bold text-white

        md:w-auto
      `}
      href="/guides/sheet/introduction"
    >
      Get started
    </Link>
  )
}
