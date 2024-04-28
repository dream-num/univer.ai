import { IConfigService, ILogService, LocaleType, LogLevel, Univer } from '@univerjs/core'
import { greenTheme } from '@univerjs/design'
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
import { UniverUniscriptPlugin } from '@univerjs/uniscript'
import { CollaborationPlugin } from '@univerjs-pro/collaboration'
import type { ICollaborationClientPluginConfig } from '@univerjs-pro/collaboration-client'
import {
  COLLAB_SUBMIT_CHANGESET_URL_KEY,
  COLLAB_WEB_SOCKET_URL_KEY,
  CollaborationClientPlugin,
  LOGIN_URL_KEY,
  SEND_CHANGESET_TIMEOUT_KEY,
  SNAPSHOT_SERVER_URL_KEY,
} from '@univerjs-pro/collaboration-client'
import '@univerjs-pro/collaboration-client/lib/index.css'
import { LiveSharePlugin } from '@univerjs-pro/live-share'
import { UniverSheetsDataConnectorPlugin } from '@univerjs-pro/sheets-data-connector'
import { SheetsPrintPlugin } from '@univerjs-pro/sheets-print'
import { useEffect, useRef } from 'react'

import { locales } from './locales'
import './style.css'

// import { UNISCRIT_WORKBOOK_DATA_DEMO } from "./data";

export default function App() {
  const univerRef = useRef(null)

  useEffect(() => {
    // IMPORTANT
    // visit http://localhost:3010/?unit=${unitID}&type=2 for testing loading documentation from the server.
    const host = window.location.host
    const isSecure = window.location.protocol === 'https:'
    const httpProtocol = isSecure ? 'https' : 'http'
    const wsProtocol = isSecure ? 'wss' : 'ws'

    function main() {
      const univer = new Univer({
        theme: greenTheme,
        locale: LocaleType.EN_US,
        locales,
      })

      const configService = univer.__getInjector().get(IConfigService)

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
      configService.setConfig(LOGIN_URL_KEY, `${httpProtocol}://${host}/universer-api/oidc/authpage`)

      configService.setConfig(SEND_CHANGESET_TIMEOUT_KEY, 200)

      const logService = univer.__getInjector().get(ILogService)
      logService.setLogLevel(LogLevel.VERBOSE)

      univer.registerPlugin(UniverDocsPlugin)
      univer.registerPlugin(UniverDocsUIPlugin)
      univer.registerPlugin(UniverFormulaEnginePlugin)
      // univer.registerPlugin(UniverFormulaEnginePlugin, {
      //     notExecuteFormula: true,
      // });
      univer.registerPlugin(UniverRenderEnginePlugin)
      univer.registerPlugin(UniverUIPlugin, {
        container: univerRef.current!,
        header: true,
        footer: true,
      })

      // sheet basic plugins
      univer.registerPlugin(UniverSheetsNumfmtPlugin)
      univer.registerPlugin(UniverSheetsPlugin)
      // univer.registerPlugin(UniverSheetsPlugin,{
      //   notExecuteFormula: true,
      // });
      univer.registerPlugin(UniverSheetsUIPlugin)
      univer.registerPlugin(UniverSheetsFormulaPlugin)
      univer.registerPlugin(UniverSheetsZenEditorPlugin)

      // univer.registerPlugin(UniverRPCMainThreadPlugin, {
      //   workerURL: './worker.js',
      //   unsyncMutations: new Set([RichTextEditingMutation.id]),
      // } as IUniverRPCMainThreadConfig);

      univer.registerPlugin(UniverSheetsDataConnectorPlugin, {
        url: {
          dataTree: `${httpProtocol}://${host}/universer-api/connectors/displayers/last`,
          previewDataForm: `${httpProtocol}://${host}/universer-api/connectors/views/{viewID}/preview`,
          dataForm: `${httpProtocol}://${host}/universer-api/connectors/views/{viewID}/dataform`,
        },
      })

      // collaboration plugins
      univer.registerPlugin(CollaborationPlugin)
      univer.registerPlugin(CollaborationClientPlugin, {
        enableOfflineEditing: true,
        enableSingleActiveInstanceLock: true,
        enableAuthServer: true,
      } as ICollaborationClientPluginConfig)
      univer.registerPlugin(LiveSharePlugin)

      // uniscript
      univer.registerPlugin(UniverUniscriptPlugin, {
        getWorkerUrl(moduleID: string, label: string) {
          if (label === 'typescript' || label === 'javascript') {
            return './vs/language/typescript/ts.worker.js'
          }

          return './vs/editor/editor.worker.js'
        },
      })

      univer.registerPlugin(SheetsPrintPlugin)
    }

    const url = new URL(window.location.href)
    const unit = url.searchParams.get('unit')

    if (unit) {
      main()
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
        .then((res) => {
          if (!res.ok) throw new Error('create unit failed')
          return res.json()
        })
        .then((res) => {
          if (!res.unitID) throw new Error('create unit failed')

          url.searchParams.set('unit', res.unitID)
          url.searchParams.set('type', '2')
          window.location.href = url.toString()
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [])

  return (
    <div ref={univerRef} style={{ height: '100vh' }} />
  )
}
