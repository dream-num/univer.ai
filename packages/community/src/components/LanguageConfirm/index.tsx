import { Confirm } from '@univerjs/design'
import { useEffect, useState } from 'react'

export default function LanguageConfirm() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isChinese = navigator.language.toLowerCase().includes('zh')
    const language = localStorage.getItem('language')

    if (language) {
      const [, time] = language.split('/')
      const diff = Date.now() - Number(time)
      if (diff > 7 * 24 * 60 * 60 * 1000) {
        setVisible(true)
        localStorage.setItem('language', `zh-cn/${Date.now()}`)
      }
    } else if (isChinese && !language) {
      setVisible(true)
      localStorage.setItem('language', `zh-cn/${Date.now()}`)
    }
  }, [])

  return (
    <Confirm
      visible={visible}
      title="提示"
      confirmText="确认"
      cancelText="取消"
      onConfirm={() => {
        window.location.href = '/zh-cn'
      }}
      onClose={() => {
        setVisible(false)
      }}
    >
      检测到您的语言是中文,是否跳转到中文页面?
    </Confirm>
  )
}
