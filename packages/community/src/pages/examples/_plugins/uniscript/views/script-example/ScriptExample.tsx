import { LocaleService } from '@univerjs/core'
import { Select } from '@univerjs/design'
import { useDependency } from '@wendellhu/redi/react-bindings'
import React, { useState } from 'react'

import type { IExampleItem } from '../../services/script-editor.service'
import styles from './index.module.less'

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
    <div className={styles.scriptExample}>
      <span className={styles.scriptExampleLabel}>{example}</span>
      <span className={styles.scriptExampleSelect}>
        <Select value={typeSelected} options={options} onChange={handleSelectChange} />
      </span>
    </div>
  )
}
