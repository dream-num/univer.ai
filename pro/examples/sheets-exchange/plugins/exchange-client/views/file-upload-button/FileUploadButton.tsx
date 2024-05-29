import { Button } from '@univerjs/design'
import { useDependency } from '@wendellhu/redi/react-bindings'
import React, { useRef } from 'react'
import { IExchangeService } from '../../services/exchange.service'

export interface IFileUploadButtonProps {
  children?: React.ReactNode
}

export const FileUploadButton: React.FC<IFileUploadButtonProps> = ({ children }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const exchangeService = useDependency(IExchangeService)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0]) {
      exchangeService.uploadJson(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <input
        type="file"
        accept=".xlsx"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Button size="small" type="primary" onClick={handleClick}>{children}</Button>
    </div>
  )
}
