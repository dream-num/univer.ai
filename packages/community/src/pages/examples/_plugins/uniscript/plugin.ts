import { LocaleService, Plugin, UniverInstanceType } from '@univerjs/core'
import type { Dependency } from '@wendellhu/redi'
import { Inject, Injector } from '@wendellhu/redi'

import { UniscriptController } from './controllers/uniscript.controller'
import { zhCN } from './locale'
import type { IScriptEditorServiceConfig } from './services/script-editor.service'
import { ScriptEditorService } from './services/script-editor.service'
import { UniscriptExecutionService } from './services/script-execution.service'
import { ScriptPanelService } from './services/script-panel.service'

export interface IUniscriptConfig extends IScriptEditorServiceConfig { }

export class UniverUniscriptPlugin extends Plugin {
  static override type = UniverInstanceType.UNIVER_SHEET

  constructor(
    private readonly _config: IUniscriptConfig,
      @Inject(Injector) protected override _injector: Injector,
      @Inject(LocaleService) private readonly _localeService: LocaleService,
  ) {
    super()
  }

  override onStarting(injector: Injector): void {
    const dependencies: Dependency[] = [
      // controllers
      [UniscriptController],

      // services
      [ScriptEditorService, { useFactory: () => injector.createInstance(ScriptEditorService, this._config) }],
      [ScriptPanelService],
      [UniscriptExecutionService],
    ]

    dependencies.forEach(d => injector.add(d))

    this._localeService.load({
      zhCN,
    })
  }
}
