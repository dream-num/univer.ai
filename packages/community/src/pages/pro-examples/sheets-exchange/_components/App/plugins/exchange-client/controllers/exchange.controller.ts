import { Disposable, LifecycleStages, OnLifecycle } from '@univerjs/core'
import type { IDesktopUIController } from '@univerjs/ui'
import { DesktopUIPart, IUIController } from '@univerjs/ui'
import { Inject, Injector } from '@wendellhu/redi'

import { connectInjector } from '@wendellhu/redi/react-bindings'

import { IExchangeService } from '../services/exchange.service'
import { FileDropper } from '../services/utils/file-dropper'
import { Operations } from '../views/operations/Operations'

// Remove the 'isolatedModules' flag from the TypeScript configuration to fix the 'Cannot access ambient const enums' error.
@OnLifecycle(LifecycleStages.Steady, ExchangeController)
export class ExchangeController extends Disposable {
  constructor(
    @Inject(Injector) private readonly _injector: Injector,
    @IUIController private readonly _uiController: IDesktopUIController,
    @IExchangeService private readonly _exchangeService: IExchangeService,
  ) {
    super()
    this._mountOperations()
    this._mountFileDropper()
  }

  private _mountOperations(): void {
    this.disposeWithMe(
      this._uiController.registerComponent(DesktopUIPart.HEADER_MENU, () =>
        connectInjector(Operations, this._injector)),
    )
  }

  private _mountFileDropper(): void {
    const container = document.querySelector('.univer-app-layout')

    if (!container) {
      throw new Error('Container not found')
    }

    // eslint-disable-next-line no-new
    new FileDropper(container as HTMLElement, (file: File) => {
      this._exchangeService.uploadJson(file)
    })
  }
}
