import { Disposable, toDisposable } from '@univerjs/core'
import type { IDisposable } from '@wendellhu/redi'
import type { editor } from 'monaco-editor'

export interface IExampleItem {
  label: string
  value: string
}

export interface IScriptEditorServiceConfig {
  getWorkerUrl: (moduleID: string, label: string) => string
  example: IExampleItem[]
}

/**
 * This service is for loading monaco editor and its resources. It also holds the
 * monaco editor instance so user can interact with the editor programmatically.
 */
export class ScriptEditorService extends Disposable {
  private _editorInstance: editor.IStandaloneCodeEditor | null = null

  constructor(private readonly _config: IScriptEditorServiceConfig) {
    super()
  }

  setEditorInstance(editor: editor.IStandaloneCodeEditor): IDisposable {
    this._editorInstance = editor
    return toDisposable(() => (this._editorInstance = null))
  }

  getEditorInstance(): editor.IStandaloneCodeEditor | null {
    return this._editorInstance
  }

  requireVscodeEditor(): void {
    if (!window.MonacoEnvironment) {
      window.MonacoEnvironment = {
        getWorkerUrl: this._config.getWorkerUrl,
      }
    }
  }

  getExample() {
    return this._config.example
  }
}
