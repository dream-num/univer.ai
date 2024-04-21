import { LocaleType } from '@univerjs/core'

import { enUS, zhCN } from 'univer:locales'
import { enUS as UniverUiscriptEnUS } from '../../../_plugins/uniscript'

export const locales = {
  [LocaleType.ZH_CN]: zhCN,
  [LocaleType.EN_US]: {
    ...enUS,
    ...UniverUiscriptEnUS,
  },
}
