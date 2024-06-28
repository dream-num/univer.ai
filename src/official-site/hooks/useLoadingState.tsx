import { useState } from 'react'

export const useLoadingState = function () {
  const [loading, setLoading] = useState(false)

  const start = () => {
    setLoading(true)
  }
  const end = () => {
    setLoading(false)
  }

  const withLoading = (fn: Promise<any>) => {
    start()
    return fn.finally(() => {
      end()
    })
  }

  return {
    loading,
    withLoading,
  }
}
