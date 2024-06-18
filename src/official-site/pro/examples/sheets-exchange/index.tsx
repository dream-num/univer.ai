'use client'

import { LocaleType, Univer, UniverInstanceType, UserManagerService } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import { UniverUIPlugin } from '@univerjs/ui'
import '@univerjs-pro/collaboration-client/lib/index.css'
import { useEffect, useRef } from 'react'
import { enUS, zhCN } from 'univer:locales'
import { UniverSheetsFindReplacePlugin } from '@univerjs/sheets-find-replace'
import { UniverSheetsConditionalFormattingUIPlugin } from '@univerjs/sheets-conditional-formatting-ui'
import { UniverDataValidationPlugin } from '@univerjs/data-validation'
import { UniverSheetsDataValidationPlugin } from '@univerjs/sheets-data-validation'
import { UniverSheetsFilterPlugin } from '@univerjs/sheets-filter'
import { UniverSheetsFilterUIPlugin } from '@univerjs/sheets-filter-ui'
import { UniverSheetsPrintPlugin } from '@univerjs-pro/sheets-print'
import { IThreadCommentMentionDataService } from '@univerjs/thread-comment-ui'
import { UniverSheetsThreadCommentPlugin } from '@univerjs/sheets-thread-comment'
import { GithubPlugin } from '../../../plugins/github-plugin'
import { workbookData } from './data'
import { ExchangeClientPlugin } from './plugins/exchange-client'

interface IProps {
  locale: string
}

export default function App(props: IProps) {
  const { locale } = props

  const univerRef = useRef(null)

  useEffect(() => {
    const currentLocale = locale.replace('-', '') as LocaleType
    const currentWorkbookData = workbookData[currentLocale]

    const univer = new Univer({
      theme: defaultTheme,
      locale: currentLocale,
      locales: {
        [LocaleType.EN_US]: enUS,
        [LocaleType.ZH_CN]: zhCN,
      },
    })

    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)
    univer.registerPlugin(UniverFormulaEnginePlugin)
    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container: univerRef.current!,
    })

    // sheet basic plugins
    univer.registerPlugin(UniverSheetsNumfmtPlugin)
    univer.registerPlugin(UniverSheetsPlugin)
    // univer.registerPlugin(UniverSheetsPlugin, {
    //     notExecuteFormula: true, // using web worker
    // });
    univer.registerPlugin(UniverSheetsUIPlugin)
    univer.registerPlugin(UniverSheetsFormulaPlugin)

    // web worker
    // univer.registerPlugin(UniverRPCMainThreadPlugin, {
    //     workerURL: './worker.js',
    // } as IUniverRPCMainThreadConfig);

    univer.registerPlugin(ExchangeClientPlugin)

    registerRichFeatures(univer)

    univer.createUnit(UniverInstanceType.UNIVER_SHEET, currentWorkbookData)

    function registerRichFeatures(univer: Univer) {
      const injector = univer.__getInjector()

      // zen editor
      univer.registerPlugin(UniverSheetsZenEditorPlugin)

      // find replace
      univer.registerPlugin(UniverSheetsFindReplacePlugin)

      // conditional formatting
      univer.registerPlugin(UniverSheetsConditionalFormattingUIPlugin)

      // data validation
      univer.registerPlugin(UniverDataValidationPlugin)
      univer.registerPlugin(UniverSheetsDataValidationPlugin)

      // filter
      univer.registerPlugin(UniverSheetsFilterPlugin)
      univer.registerPlugin(UniverSheetsFilterUIPlugin)

      // print
      univer.registerPlugin(UniverSheetsPrintPlugin)

      // comment
      const mockUser = {
        userID: 'mockId',
        name: 'MockUser',
        avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAInSURBVHgBtZU9TxtBEIbfWRzFSIdkikhBSqRQkJqkCKTCFkqVInSUSaT0wC8w/gXxD4gU2nRJkXQWhAZowDUUWKIwEgWWbEEB3mVmx3dn4DA2nB/ppNuPeWd29mMIPXDr+RxwtgRHeW6+guNPRxogqnL7Dwz9psJ27S4NShaeZTH3kwXy6I81dlRKcmRui88swdq9AcSFL7Buz1Vmlns64MiLsCjzwnIYHLH57tbfFbs7KRaXyEU8FVZofqccOfA5l7Q8LPIkGrwnb2RPNEXWFVMUF3L+kDCk0btDDAMzOm5YfAHDwp4tG74wnzAsiOYMnJ3GoDybA7IT98/jm5+JNnfiIzAS6LlqHQBN/i6b2t/cV1Hh6BfwYlHnHP4AXi5q/8kmMMpOs8+BixZw/Fd6xUEHEbnkgclvQP2fGp7uShRKnQ3G32rkjV1th8JhIGG7tR/JyjGteSOZELwGMmNqIIigRCLRh2OZIE6BjItdd7pCW6Uhm1zzkUtungSxwEUzNpQ+GQumtH1ej1MqgmNT6vwmhCq5yuwq56EYTbgeQUz3yvrpV1b4ok3nYJ+eYhgYmjRUqErx2EDq0Fr8FhG++iqVGqxlUJI/70Ar0UgJaWHj6hYVHJrfKssAHot1JfqwE9WVWzXZVd5z2Ws/4PnmtEjkXeKJDvxUecLbWOXH/DP6QQ4J72NS0adedp1aseBfXP8odlZFfPvBF7SN/8hky1TYuPOAXAEipMx15u5ToAAAAABJRU5ErkJggg==',
        anonymous: false,
        canBindAnonymous: false,
      }
      class CustomMentionDataService implements IThreadCommentMentionDataService {
        trigger: string = '@'

        async getMentions() {
          return [
            {
              id: mockUser.userID,
              label: mockUser.name,
              type: 'user',
              icon: mockUser.avatar,
            },
            {
              id: '2',
              label: 'User2',
              type: 'user',
              icon: mockUser.avatar,
            },
          ]
        }
      }

      univer.registerPlugin(UniverSheetsThreadCommentPlugin, {
        overrides: [[IThreadCommentMentionDataService, { useClass: CustomMentionDataService }]],
      })

      const userManagerService = injector.get(UserManagerService)
      userManagerService.setCurrentUser(mockUser)

      univer.registerPlugin(GithubPlugin, {
        link: '/pro/examples/sheets-exchange',
      })
    }
  }, [])

  return (
    <div ref={univerRef} style={{ height: 'calc(100vh - 68px)' }} />
  )
}
