import type { IUniverUniscriptConfig } from '../services/script-editor.service'
import { connectInjector, Disposable, ICommandService, Inject, Injector, LifecycleStages, OnLifecycle } from '@univerjs/core'

import { BuiltInUIPart, ComponentManager, IMenuService, IUIPartsService } from '@univerjs/ui'
import { ScriptPanelComponentName, ToggleScriptPanelOperation } from '../commands/operations/panel.operation'
import { ScriptEditorPanel } from '../views/components/ScriptEditorPanel'
import { Operations } from '../views/operations/Operations'
import { UniscriptMenuItemFactory } from './menu'

export const DefaultUniscriptConfig = {}

@OnLifecycle(LifecycleStages.Steady, UniscriptController)
export class UniscriptController extends Disposable {
  constructor(
    private readonly _config: Partial<IUniverUniscriptConfig>,
        @Inject(Injector) private readonly _injector: Injector,
        @IMenuService private readonly _menuService: IMenuService,
        @ICommandService commandService: ICommandService,
        @Inject(ComponentManager) componentManager: ComponentManager,
        @IUIPartsService private readonly _uiController: IUIPartsService,
  ) {
    super()

    const { menu = {} } = this._config

    this.disposeWithMe(_menuService.addMenuItem(this._injector.invoke(UniscriptMenuItemFactory), menu))
    this.disposeWithMe(componentManager.register(ScriptPanelComponentName, ScriptEditorPanel))
    this.disposeWithMe(commandService.registerCommand(ToggleScriptPanelOperation))
    this._mountOperations()
  }

  private _mountOperations(): void {
    this.disposeWithMe(
      this._uiController.registerComponent(BuiltInUIPart.HEADER_MENU, () =>
        connectInjector(Operations, this._injector)),
    )
  }
}
