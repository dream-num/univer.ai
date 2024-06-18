import { useRouter } from 'next/router'
import React from 'react'
import UniverActions from '../components/Actions/Univer'

export function useProduct() {
  const { pathname } = useRouter()

  const key = pathname === '/' ? 'univer' : null

  if (key === 'univer') {
    return {
      title: 'Univer',
      logo: '/images/univer/logo.svg',
      actions: <UniverActions />,
    }
  } else {
    return {
      title: 'Univer',
      logo: '/images/univer/logo.svg',
      actions: null,
    }
  }
}
