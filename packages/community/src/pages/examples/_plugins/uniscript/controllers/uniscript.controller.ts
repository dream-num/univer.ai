import { Disposable, ICommandService, LifecycleStages, OnLifecycle } from '@univerjs/core'
import { ComponentManager, IMenuService } from '@univerjs/ui'
import { Inject, Injector } from '@wendellhu/redi'

import { ScriptPanelComponentName, ToggleScriptPanelOperation } from '../commands/operations/panel.operation'
import { ScriptEditorPanel } from '../views/script-editor-panel/ScriptEditorPanel'
import { UniscriptMenuItemFactory } from './menu'

@OnLifecycle(LifecycleStages.Steady, UniscriptController)
export class UniscriptController extends Disposable {
  constructor(
        @Inject(Injector) private readonly _injector: Injector,
        @IMenuService menuService: IMenuService,
        @ICommandService commandService: ICommandService,
        @Inject(ComponentManager) componentManager: ComponentManager,
  ) {
    super()

    this.disposeWithMe(menuService.addMenuItem(this._injector.invoke(UniscriptMenuItemFactory)))
    this.disposeWithMe(componentManager.register(ScriptPanelComponentName, ScriptEditorPanel))
    this.disposeWithMe(commandService.registerCommand(ToggleScriptPanelOperation))
    this.disposeWithMe(commandService.syncExecuteCommand(ToggleScriptPanelOperation.id))
  }
}
