import { ICommandService } from '@univerjs/core'
import { Button } from '@univerjs/design'
import { useDependency } from '@wendellhu/redi/react-bindings'
import React, { } from 'react'
import { ToggleScriptPanelOperation } from '../../commands/operations/panel.operation'

export interface IToggleButtonProps {
  children?: React.ReactNode
}

export const ToggleButton: React.FC<IToggleButtonProps> = ({ children }) => {
  const commandService = useDependency(ICommandService)

  const handleClick = () => {
    commandService.executeCommand(ToggleScriptPanelOperation.id)
  }

  return (
    <div>
      <Button size="small" type="primary" onClick={handleClick}>{children}</Button>
    </div>
  )
}
