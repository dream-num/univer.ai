/**
 * Copyright 2023-present DreamNum Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Disposable, ICommandService, LifecycleStages, OnLifecycle } from '@univerjs/core'
import { BuiltInUIPart, ComponentManager, IMenuService, IUIPartsService } from '@univerjs/ui'
import { Inject, Injector } from '@wendellhu/redi'

import { connectInjector } from '@wendellhu/redi/react-bindings'
import { ScriptPanelComponentName, ToggleScriptPanelOperation } from '../commands/operations/panel.operation'
import { ScriptEditorPanel } from '../views/components/ScriptEditorPanel'
import type { IUniverUniscriptConfig } from '../services/script-editor.service'
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
