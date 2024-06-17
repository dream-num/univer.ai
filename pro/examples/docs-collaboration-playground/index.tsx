'use client'

import { IAuthzIoService, IConfigService, IUndoRedoService, LifecycleService, LifecycleStages, LocaleType, Univer, UniverInstanceType } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'

import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverUIPlugin } from '@univerjs/ui'
import { UniverCollaborationPlugin } from '@univerjs-pro/collaboration'
import {
  COLLAB_SUBMIT_CHANGESET_URL_KEY,
  COLLAB_WEB_SOCKET_URL_KEY,
  UniverCollaborationClientPlugin,
  ICollaborationSocketService,
  SEND_CHANGESET_TIMEOUT_KEY,
  SNAPSHOT_SERVER_URL_KEY,
} from '@univerjs-pro/collaboration-client'
import type { ICollaborationClientPluginConfig } from '@univerjs-pro/collaboration-client'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Mosaic, MosaicWindow } from 'react-mosaic-component'
import 'react-mosaic-component/react-mosaic-component.css'
import { enUS, zhCN } from 'univer:locales'

import type { Subscription } from 'rxjs'
import { combineLatest } from 'rxjs'
import type { IManualCollaborationSocketService } from '../sheets-collaboration-playground/services/collaboration-session/manual-collaboration-session.service'
import { ManualCollaborationSocketService } from '../sheets-collaboration-playground/services/collaboration-session/manual-collaboration-session.service'
import { CollaborationControlPanel } from '../sheets-collaboration-playground/components/CollabControlPanel'
import { GithubPlugin } from '../../../plugins/github-plugin'

interface IProps {
  locale: string
}

export default function App(props: IProps) {
  const { locale } = props

  // IMPORTANT
  // visit http://localhost:3010/?unit=${unitID}&type=2 for testing loading documentation from the server.
  const host = window.location.host
  const isSecure = window.location.protocol === 'https:'
  const httpProtocol = isSecure ? 'https' : 'http'
  const wsProtocol = isSecure ? 'wss' : 'ws'

  const instances: Univer[] = []

  function createUniverInstance(containerID: string) {
    const univer = new Univer({
      theme: defaultTheme,
      locale: locale.replace('-', '') as LocaleType,
      locales: {
        [LocaleType.EN_US]: enUS,
        [LocaleType.ZH_CN]: zhCN,
      },
      // When enabling the collaboration plugin, set the built-in implementation to `null`.
      // This avoids double injection issues since the plugin injects its own implementation.
      // Failure to do so will result in conflicts and errors.
      override: [
        [IAuthzIoService, null],
        [IUndoRedoService, null],
      ],
    })

    const injector = univer.__getInjector()
    const configService = injector.get(IConfigService)

    // debug via stage environment
    // configService.setConfig(SNAPSHOT_SERVER_URL_KEY, 'http://${host}/universer-api/snapshot');
    // configService.setConfig(COLLAB_SUBMIT_CHANGESET_URL_KEY, 'http://${host}/universer-api/comb');
    // configService.setConfig(COLLAB_WEB_SOCKET_URL_KEY, 'wss://staging.univer.plus/universer-api/comb/connect');

    // debug via frp
    // configService.setConfig(SNAPSHOT_SERVER_URL_KEY, 'http://localhost:8000/universer-api/snapshot');
    // configService.setConfig(COLLAB_SUBMIT_CHANGESET_URL_KEY, 'http://localhost:8000/universer-api/comb');
    // configService.setConfig(COLLAB_WEB_SOCKET_URL_KEY, 'ws://localhost:8000/universer-api/comb/connect');

    // debug via reverse proxy
    configService.setConfig(SNAPSHOT_SERVER_URL_KEY, `${httpProtocol}://${host}/universer-api/snapshot`)
    configService.setConfig(COLLAB_SUBMIT_CHANGESET_URL_KEY, `${httpProtocol}://${host}/universer-api/comb`)
    configService.setConfig(COLLAB_WEB_SOCKET_URL_KEY, `${wsProtocol}://${host}/universer-api/comb/connect`)
    configService.setConfig(SEND_CHANGESET_TIMEOUT_KEY, 200)

    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container: containerID,
      footer: false,
    })
    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)

    univer.registerPlugin(UniverFormulaEnginePlugin)

    // collaboration plugins
    univer.registerPlugin(UniverCollaborationPlugin)
    univer.registerPlugin(UniverCollaborationClientPlugin, {
      enableOfflineEditing: false,
      enableSingleActiveInstanceLock: false,
      collaborationUniverTypes: [UniverInstanceType.UNIVER_DOC],
      socketService: ManualCollaborationSocketService, // register custom socket service
    } as ICollaborationClientPluginConfig)

    univer.registerPlugin(GithubPlugin, {
      link: '/pro/examples/docs-collaboration-playground',
    })

    instances.push(univer)
  }

  function createCollabControlPanel() {
    const [serviceAlice, serviceBob] = instances.map(univer =>
      univer.__getInjector().get(ICollaborationSocketService),
    ) as IManualCollaborationSocketService[]

    const root = createRoot(document.getElementById('app-a')!)
    root.render(
      <CollaborationControlPanel serviceAlice={serviceAlice} serviceBob={serviceBob} />,
    )
  }

  const url = new URL(window.location.href)
  const unit = url.searchParams.get('unit')

  type ViewId = 'a' | 'b' | 'c'

  const TITLE_MAP: Record<ViewId, string> = {
    a: 'Control Panel',
    b: 'Alice',
    c: 'Bob',
  }

  useEffect(() => {
    let combined: Subscription
    if (unit) {
      setTimeout(() => {
        // init two documents in the two columns
        createUniverInstance('app-b')
        createUniverInstance('app-c')

        const lifecycleB = instances[0].__getInjector().get(LifecycleService).lifecycle$
        const lifecycleC = instances[1].__getInjector().get(LifecycleService).lifecycle$

        combined = combineLatest([lifecycleB, lifecycleC]).subscribe(([b, c]) => {
          if (b === LifecycleStages.Steady && c === LifecycleStages.Steady) {
            createCollabControlPanel()
          }
        })
      }, 0)
    } else {
      fetch(`${httpProtocol}://${host}/universer-api/snapshot/1/unit/-/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 1,
          name: 'New Doc By Univer',
          creator: 'user',
        }),
      })
        .then(res => res.json())
        .then((res) => {
          url.searchParams.set('unit', res.unitID)
          url.searchParams.set('type', '1')

          // refresh the page and will fall into the first if branch
          window.location.href = url.toString()
        })
    }

    return () => {
      combined?.unsubscribe()
    }
  }, [])

  const _Mosaic = Mosaic as any
  const _MosaicWindow = MosaicWindow as any

  return (
    <div style={{ height: 'calc(100vh - 68px)' }}>
      <_Mosaic<ViewId>
        renderTile={(id: ViewId, path: string) => (
          <_MosaicWindow<ViewId>
            path={path}
            title={TITLE_MAP[id]}
            toolbarControls={<div />}
          >
            <div id={`app-${id}`} style={{ height: '100%' }}>
              {TITLE_MAP[id]}
            </div>
          </_MosaicWindow>
        )}
        initialValue={{
          direction: 'column',
          first: 'a',
          splitPercentage: 20,
          second: {
            direction: 'row',
            first: 'b',
            second: 'c',
          },
        }}
      />
    </div>
  )
}
