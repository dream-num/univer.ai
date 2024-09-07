'use client'
import { GithubPlugin } from '@/examples/plugins/github-plugin'
import { LocaleType, Univer, UniverInstanceType, UserManagerService } from '@univerjs/core'

import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsDrawingUIPlugin } from '@univerjs/docs-drawing-ui'
import { UniverDocsHyperLinkUIPlugin } from '@univerjs/docs-hyper-link-ui'

import { UniverDocsThreadCommentUIPlugin } from '@univerjs/docs-thread-comment-ui'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverUIPlugin } from '@univerjs/ui'
import { useEffect, useRef } from 'react'

import { enUS, zhCN } from 'univer:locales'
import { ALL_FEATURES_DOCUMENT_DATA } from './data'
import '@univerjs/drawing-ui/lib/index.css'
import '@univerjs/thread-comment-ui/lib/index.css'

interface IProps {
  locale: string
}

export default function App(props: IProps) {
  const { locale } = props

  const univerRef = useRef(null)

  useEffect(() => {
    const univer = new Univer({
      theme: defaultTheme,
      locale: locale.replace('-', '') as LocaleType,
      locales: {
        [LocaleType.EN_US]: enUS,
        [LocaleType.ZH_CN]: zhCN,
      },
    })

    // core plugins
    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverFormulaEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container: univerRef.current!,
      footer: false,
    })
    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)

    // HyperLink Plugin
    univer.registerPlugin(UniverDocsHyperLinkUIPlugin)

    // Floating Drawing Plugin
    univer.registerPlugin(UniverDocsDrawingUIPlugin)

    // Thread Comment Plugin
    univer.registerPlugin(UniverDocsThreadCommentUIPlugin)
    // univer.registerPlugin(UniverDocsMentionUIPlugin);

    // create univer sheet instance
    univer.createUnit(UniverInstanceType.UNIVER_DOC, ALL_FEATURES_DOCUMENT_DATA)

    univer.registerPlugin(GithubPlugin, {
      link: '/src/examples/docs',
    })

    const injector = univer.__getInjector()
    const userManagerService = injector.get(UserManagerService)

    const mockUser = {
      userID: 'Owner_qxVnhPbQ',
      name: 'Owner',
      avatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAInSURBVHgBtZU9TxtBEIbfWRzFSIdkikhBSqRQkJqkCKTCFkqVInSUSaT0wC8w/gXxD4gU2nRJkXQWhAZowDUUWKIwEgWWbEEB3mVmx3dn4DA2nB/ppNuPeWd29mMIPXDr+RxwtgRHeW6+guNPRxogqnL7Dwz9psJ27S4NShaeZTH3kwXy6I81dlRKcmRui88swdq9AcSFL7Buz1Vmlns64MiLsCjzwnIYHLH57tbfFbs7KRaXyEU8FVZofqccOfA5l7Q8LPIkGrwnb2RPNEXWFVMUF3L+kDCk0btDDAMzOm5YfAHDwp4tG74wnzAsiOYMnJ3GoDybA7IT98/jm5+JNnfiIzAS6LlqHQBN/i6b2t/cV1Hh6BfwYlHnHP4AXi5q/8kmMMpOs8+BixZw/Fd6xUEHEbnkgclvQP2fGp7uShRKnQ3G32rkjV1th8JhIGG7tR/JyjGteSOZELwGMmNqIIigRCLRh2OZIE6BjItdd7pCW6Uhm1zzkUtungSxwEUzNpQ+GQumtH1ej1MqgmNT6vwmhCq5yuwq56EYTbgeQUz3yvrpV1b4ok3nYJ+eYhgYmjRUqErx2EDq0Fr8FhG++iqVGqxlUJI/70Ar0UgJaWHj6hYVHJrfKssAHot1JfqwE9WVWzXZVd5z2Ws/4PnmtEjkXeKJDvxUecLbWOXH/DP6QQ4J72NS0adedp1aseBfXP8odlZFfPvBF7SN/8hky1TYuPOAXAEipMx15u5ToAAAAABJRU5ErkJggg==',
      anonymous: false,
      canBindAnonymous: false,
    }
    userManagerService.setCurrentUser(mockUser)
  }, [])

  return (
    <div ref={univerRef} style={{ height: 'calc(100vh - 68px)' }} />
  )
}
