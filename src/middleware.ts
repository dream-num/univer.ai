import { type NextRequest, NextResponse } from 'next/server'
import { locales } from 'nextra/locales'

const nextraRoutes = [
  '/guides',
  '/pro/guides',
  '/blog/post',
]

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  if (nextraRoutes.find(m => path.startsWith(m))) {
    return locales(req)
  }

  return NextResponse.next()
}
