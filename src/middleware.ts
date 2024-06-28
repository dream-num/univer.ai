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

// Fix: Error handling upgrade request TypeError: Cannot read properties of undefined (reading 'bind'), https://github.com/vercel/next.js/issues/55802
export const config = {
  matcher: [
    /*
     * Match all request paths except for the api starting with universer-api
     */
    '/((?!universer-api).*)',
  ],
}
