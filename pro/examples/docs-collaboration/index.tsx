'use client'

import { IAuthzIoService, IConfigService, IUndoRedoService, LocaleType, Univer, UniverInstanceType } from '@univerjs/core'
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
  SEND_CHANGESET_TIMEOUT_KEY,
  SNAPSHOT_SERVER_URL_KEY,
} from '@univerjs-pro/collaboration-client'
import type { ICollaborationClientPluginConfig } from '@univerjs-pro/collaboration-client'
import { useEffect, useRef } from 'react'
import { enUS, zhCN } from 'univer:locales'
import { GithubPlugin } from '../../../plugins/github-plugin'

interface IProps {
  locale: string
}

export default function App(props: IProps) {
  const { locale } = props

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

      configService.setConfig(SEND_CHANGESET_TIMEOUT_KEY, 200)

      // core plugins
      univer.registerPlugin(UniverRenderEnginePlugin)
      univer.registerPlugin(UniverUIPlugin, {
        container: univerRef.current!,
        footer: false,
      })
      univer.registerPlugin(UniverDocsPlugin)
      univer.registerPlugin(UniverDocsUIPlugin)

      univer.registerPlugin(UniverFormulaEnginePlugin)

      // collaboration plugins
      univer.registerPlugin(UniverCollaborationPlugin)
      univer.registerPlugin(UniverCollaborationClientPlugin, {
        enableOfflineEditing: true,
        enableSingleActiveInstanceLock: true,
        collaborationUniverTypes: [UniverInstanceType.UNIVER_DOC],
      } as ICollaborationClientPluginConfig)

      univer.registerPlugin(GithubPlugin, {
        link: '/pro/examples/docs-collaboration',
      })
    }

    const url = new URL(window.location.href)
    const unit = url.searchParams.get('unit')

    if (unit) {
      main()
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
        .then((res) => {
          if (!res.ok) throw new Error('create unit failed')
          return res.json()
        })
        .then((res) => {
          if (!res.unitID) throw new Error('create unit failed')

          url.searchParams.set('unit', res.unitID)
          url.searchParams.set('type', '1')
          window.location.href = url.toString()
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [])

  return (
    <div ref={univerRef} style={{ height: 'calc(100vh - 68px)' }} />
  )
}
