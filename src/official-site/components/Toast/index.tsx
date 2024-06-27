import * as React from 'react'
import * as Toast from '@radix-ui/react-toast'
import { useCallback, useState } from 'react'
import { ErrorSingle, ResolvedSingle } from '@univerjs/icons'

export function useToast() {
  const [toasts, setToasts] = useState<{ id: string, message: string, type: 'success' | 'error' | 'warning' }[]>([])

  const showToast = useCallback((msg: string, options?: {
    type?: 'success' | 'error' | 'warning'
    duration?: number
  }) => {
    const msgType = options?.type || 'success'
    const duration = options?.duration || 3000

    setToasts(prevToasts => [...prevToasts, {
      id: Math.random().toString(36).substring(2, 9) + Date.now(),
      message: msg,
      type: msgType,
    }])

    setTimeout(() => {
      setToasts(prevToasts => prevToasts.slice(1))
    }, duration)
  }, [])

  return {
    showToast,
    toastElement: (
      <Toast.Provider swipeDirection="right">
        {toasts.map((toast, index) => (
          <Toast.Root
            key={toast.id}
            open
            style={{
              top: `${80 + index * 60}px`,
            }}
            className={`
              fixed left-1/2 -translate-x-1/2 translate-y-0 transform opacity-100 transition-all
              duration-500 ease-in-out
            `}
          >
            <div className={`
              inline-flex items-center justify-start gap-1.5 rounded-lg bg-white px-3 py-2 shadow
            `}
            >
              {toast.type === 'success' && (
                <ResolvedSingle className="relative h-[16px] w-[16px] text-[#0fcc65]" />
              )}
              {toast.type === 'error' && (
                <ErrorSingle className="relative h-[16px] w-[16px] text-red-500" />
              )}
              <div className="flex-1 text-sm font-normal text-[#0F172A]">{toast.message}</div>
            </div>
          </Toast.Root>
        ))}
        <Toast.Viewport />
      </Toast.Provider>
    ),
  }
}
