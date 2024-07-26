'use client'

import { LocaleService, useDependency } from '@univerjs/core'

import { ToggleButton } from '../toggle-button/ToggleButton'

export function Operations(): JSX.Element {
  const localeService = useDependency(LocaleService)

  return (
    <div className="flex w-screen justify-center gap-4 text-sm">
      <ToggleButton>{localeService.t('script-panel.tooltip.menu-button')}</ToggleButton>
    </div>
  )
}
