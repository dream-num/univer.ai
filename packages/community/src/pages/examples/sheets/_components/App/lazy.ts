import type { Plugin, PluginCtor } from '@univerjs/core'
import { UniverUniscriptPlugin } from '../plugins/uniscript/plugin'

export default function getLazyPlugins(): Array<[PluginCtor<Plugin>] | [PluginCtor<Plugin>, unknown]> {
  return [
    [
      UniverUniscriptPlugin,
      {
        getWorkerUrl(moduleID: string, label: string) {
          if (label === 'typescript' || label === 'javascript') {
            return './vs/language/typescript/ts.worker.js'
          }

          return './vs/editor/editor.worker.js'
        },
      },
    ],
  ]
}
