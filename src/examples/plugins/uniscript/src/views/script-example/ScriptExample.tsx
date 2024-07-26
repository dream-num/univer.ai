import React, { useState } from 'react'

import { Select } from '@univerjs/design'
import { LocaleService, useDependency } from '@univerjs/core'
import type { IExampleItem } from '../../services/script-editor.service'

export interface IScriptExampleProps {
  onChange: (value: string) => void
  options: IExampleItem[]
}

export function ScriptExample(props: IScriptExampleProps) {
  const { onChange, options } = props

  const allTypeValue = options[0].label
  const [typeSelected, setTypeSelected] = useState(allTypeValue)

  const localeService = useDependency(LocaleService)

  const example = localeService.t('script-panel.example')

  function handleSelectChange(value: string) {
    setTypeSelected(value)
    onChange(value)
  }

  return (
    <div className="mb-2">
      <span className="mr-2">{example}</span>
      <span>
        <Select value={typeSelected} options={options} onChange={handleSelectChange} />
      </span>
    </div>
  )
}
