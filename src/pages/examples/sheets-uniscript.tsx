'use client'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Univer = dynamic(
  () => import('@/examples/sheets-uniscript').then(module => module.default) as any,
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
