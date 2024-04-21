import { LocaleType } from '@univerjs/core'

import { enUS as UniverSheetUiEnUS } from '@univerjs/sheets-ui'
import { enUS, zhCN } from 'univer:locales'

export const locales = {
  [LocaleType.ZH_CN]: zhCN,
  [LocaleType.EN_US]: {
    ...enUS,
    ...UniverSheetUiEnUS,
  },
}
