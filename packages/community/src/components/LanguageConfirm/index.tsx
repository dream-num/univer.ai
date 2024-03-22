import { Confirm } from '@univerjs/design'
import { useEffect, useState } from 'react'

export default function LanguageConfirm() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isChinese = navigator.language.toLowerCase().includes('zh')
    const language = sessionStorage.getItem('language')

    if (isChinese && !language) {
      setVisible(true)
      sessionStorage.setItem('language', 'zh-cn')
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
