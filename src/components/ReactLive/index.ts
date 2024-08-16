'use client'

import dynamic from 'next/dynamic'

export default dynamic(
  () => import('./ReactLive').then(module => module.default) as any,
  { ssr: false },
) as any
