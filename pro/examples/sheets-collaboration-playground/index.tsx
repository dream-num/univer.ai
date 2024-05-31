'use client'

import { IConfigService, LifecycleService, LifecycleStages, LocaleType, Univer } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'

import { UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverUIPlugin } from '@univerjs/ui'
import { CollaborationPlugin } from '@univerjs-pro/collaboration'
import {
  COLLAB_SUBMIT_CHANGESET_URL_KEY,
  COLLAB_WEB_SOCKET_URL_KEY,
  CollaborationClientPlugin,
  ICollaborationSocketService,
  SEND_CHANGESET_TIMEOUT_KEY,
  SNAPSHOT_SERVER_URL_KEY,
} from '@univerjs-pro/collaboration-client'
import type { ICollaborationClientPluginConfig } from '@univerjs-pro/collaboration-client'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Mosaic, MosaicWindow } from 'react-mosaic-component'
import 'react-mosaic-component/react-mosaic-component.css'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverSheetsPlugin } from '@univerjs/sheets'
import { UniverSheetsUIPlugin } from '@univerjs/sheets-ui'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import type { Subscription } from 'rxjs'
import { combineLatest } from 'rxjs'
import { enUS, zhCN } from 'univer:locales'
import type { IManualCollaborationSocketService } from './services/collaboration-session/manual-collaboration-session.service'
import { ManualCollaborationSocketService } from './services/collaboration-session/manual-collaboration-session.service'
import { CollaborationControlPanel } from './components/CollabControlPanel'
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

    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)
    univer.registerPlugin(UniverFormulaEnginePlugin)
    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container: containerID,
    })

    // sheet basic plugins
    univer.registerPlugin(UniverSheetsNumfmtPlugin)
    univer.registerPlugin(UniverSheetsPlugin)
    // univer.registerPlugin(UniverSheetsPlugin, {
    //     notExecuteFormula: true, // using web worker
    // });
    univer.registerPlugin(UniverSheetsUIPlugin)
    univer.registerPlugin(UniverSheetsFormulaPlugin)
    univer.registerPlugin(UniverSheetsZenEditorPlugin)

    // collaboration plugins
    univer.registerPlugin(CollaborationPlugin)
    univer.registerPlugin(CollaborationClientPlugin, {
      enableOfflineEditing: false,
      enableSingleActiveInstanceLock: false,
      socketService: ManualCollaborationSocketService, // register custom socket service
    } as ICollaborationClientPluginConfig)

    univer.registerPlugin(GithubPlugin, {
      link: '/pro/examples/sheets-collaboration-playground',
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
      fetch(`${httpProtocol}://${host}/universer-api/snapshot/2/unit/-/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 2,
          name: 'New Sheet By Univer',
          creator: 'user',
        }),
      })
        .then(res => res.json())
        .then((res) => {
          url.searchParams.set('unit', res.unitID)
          url.searchParams.set('type', '2')

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
