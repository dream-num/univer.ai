import Link from 'next/link'

interface IProps {
  title: string
  href: string
}

export default function LinkItem(props: IProps) {
  const { href, title } = props

  return (
    <Link href={href}>
      {title}
    </Link>
  )
}
