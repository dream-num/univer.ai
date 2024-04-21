import { IConfigService, ILogService, LocaleType, LogLevel, Univer, UniverInstanceType } from '@univerjs/core'
import { greenTheme } from '@univerjs/design'
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
import '@univerjs-pro/collaboration-client/lib/index.css'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Mosaic, MosaicWindow } from 'react-mosaic-component'
import 'react-mosaic-component/react-mosaic-component.css'
import { CollaborationControlPanel } from './components/CollabControlPanel'
import { locales } from './locales'
import { ManualCollaborationSocketService } from './services/collaboration-session/manual-collaboration-session.service'
import type { IManualCollaborationSocketService } from './services/collaboration-session/manual-collaboration-session.service'
import './style.css'

export default function App() {
  // IMPORTANT
  // visit http://localhost:3010/?unit=${unitID}&type=2 for testing loading documentation from the server.
  const host = window.location.host
  const isSecure = window.location.protocol === 'https:'
  const httpProtocol = isSecure ? 'https' : 'http'
  const wsProtocol = isSecure ? 'wss' : 'ws'

  const instances: Univer[] = []

  function factory(containerID: string) {
    const univer = new Univer({
      theme: greenTheme,
      locale: LocaleType.EN_US,
      locales,
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

    const logService = univer.__getInjector().get(ILogService)
    logService.setLogLevel(LogLevel.VERBOSE)

    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverUIPlugin, {
      container: containerID,
      header: true,
    })
    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)

    univer.registerPlugin(UniverFormulaEnginePlugin)

    // collaboration plugins
    univer.registerPlugin(CollaborationPlugin)
    univer.registerPlugin(CollaborationClientPlugin, {
      enableOfflineEditing: false,
      enableSingleActiveInstanceLock: false,
      collaborationUniverTypes: [UniverInstanceType.DOC],
      socketService: ManualCollaborationSocketService, // register custom socket service
    } as ICollaborationClientPluginConfig)

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
    if (unit) {
      createCollabControlPanel()
      factory('app-b')
      factory('app-c')
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
  }, [])

  const _Mocaic = Mosaic as any
  const _MosaicWindow = MosaicWindow as any

  return (
    <div style={{ height: '100vh' }}>
      <_Mocaic<ViewId>
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
