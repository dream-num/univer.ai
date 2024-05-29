import { Button } from '@univerjs/design'
import { useDependency } from '@wendellhu/redi/react-bindings'
import React, { } from 'react'
import { IExchangeService } from '../../services/exchange.service'

export interface IFileDownloadButtonProps {
  children?: React.ReactNode
}

export const FileDownloadButton: React.FC<IFileDownloadButtonProps> = ({ children }) => {
  const exchangeService = useDependency(IExchangeService)

  const handleClick = () => {
    exchangeService.downloadJson()
  }

  return (
    <div>
      <Button size="small" type="primary" onClick={handleClick}>{children}</Button>
    </div>
  )
}
