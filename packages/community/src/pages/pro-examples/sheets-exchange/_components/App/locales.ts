import { LocaleType } from '@univerjs/core'

import { enUS, zhCN } from 'univer:locales'
import { enUS as UniverSheetsExchangeEnUS } from './plugins/exchange-client'

export const locales = {
  [LocaleType.ZH_CN]: zhCN,
  [LocaleType.EN_US]: {
    ...enUS,
    ...UniverSheetsExchangeEnUS,
  },
}
