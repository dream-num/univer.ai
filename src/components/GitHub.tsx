import { GithubSingle24 } from '@univerjs/icons'
import Link from 'next/link'

export function GitHubButton() {
  return (
    <Link
      className="flex h-10 items-center rounded-full bg-[#171515] px-6 font-semibold text-white"
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/dream-num/univer"
    >
      <span className="mr-2 text-xl">
        <GithubSingle24 />
      </span>
      GitHub
    </Link>
  )
}
