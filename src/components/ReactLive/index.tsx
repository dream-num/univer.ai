'use client'

import { useTranslation } from '@/lib/i18n'
import { Loading } from '@univerjs/icons'
import dynamic from 'next/dynamic'
import React from 'react'

function LoadingSkeleton() {
  const t = useTranslation({
    'en-US': {
      'loading.text': 'Loading example...',
    },
    'zh-CN': {
      'loading.text': '示例加载中...',
    },
  })

  return (
    <div className={`
      mt-6 flex h-[512px] animate-pulse flex-col items-center justify-center overflow-hidden
      rounded-xl bg-gray-200 shadow
    `}
    >
      <Loading className="h-8 w-8 animate-spin text-gray-500" />
      <p className="mt-2 text-gray-600">{t('loading.text')}</p>
    </div>
  )
}

export default dynamic(
  () => import('./ReactLive').then(module => module.default),
  {
    ssr: false,
    loading: () => <LoadingSkeleton />,
  },
)
