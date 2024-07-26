import type { IDisposable } from '@univerjs/core'
import { Disposable, toDisposable } from '@univerjs/core'
import type { MenuConfig } from '@univerjs/ui'
import type { editor } from 'monaco-editor'

export interface IExampleItem {
  label: string
  value: string
}

export interface IUniverUniscriptConfig {
  getWorkerUrl: (moduleID: string, label: string) => string
  menu: MenuConfig
  example: IExampleItem[]
}

/**
 * This service is for loading monaco editor and its resources. It also holds the
 * monaco editor instance so user can interact with the editor programmatically.
 */
export class ScriptEditorService extends Disposable {
  private _editorInstance: editor.IStandaloneCodeEditor | null = null

  constructor(private readonly _config: Partial<IUniverUniscriptConfig>) {
    super()
  }

  setEditorInstance(editor: editor.IStandaloneCodeEditor): IDisposable {
    this._editorInstance = editor
    return toDisposable(() => (this._editorInstance = null))
  }

  getEditorInstance(): editor.IStandaloneCodeEditor | null {
    return this._editorInstance
  }

  getExample() {
    return this._config.example
  }

  requireVscodeEditor(): void {
    if (!window.MonacoEnvironment) {
      window.MonacoEnvironment = {
        getWorkerUrl: this._config.getWorkerUrl,
      }
    }
  }
}
