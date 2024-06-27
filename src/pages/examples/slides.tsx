'use client'

import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const Univer = dynamic(
  () => import('@/examples/slides').then(module => module.default) as any,
  { ssr: false },
) as any

export default function Page() {
  const { locale } = useRouter()

  return (
    <>
      <Head>
        <title>Examples - Univer</title>
      </Head>

      <main>
        {!!Univer && <Univer key={locale} locale={locale} />}
      </main>
    </>
  )
}
