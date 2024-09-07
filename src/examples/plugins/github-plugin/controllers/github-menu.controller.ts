import { ConfigService, Disposable, ICommandService, Inject, Injector, LifecycleStages, OnLifecycle } from '@univerjs/core'
import { GithubSingle24 } from '@univerjs/icons'
import { ComponentManager, IMenuService } from '@univerjs/ui'
import type { IMenuItemFactory } from '@univerjs/ui'
import { GithubButtonOperation } from '../commands/operations/github-button.operation'
import { GithubButtonFactory } from './menu'

export interface IConfigData {
  link: string
}

export const CONFIG_KEY = 'github-plugin'

@OnLifecycle(LifecycleStages.Steady, GithubMenuController)
export class GithubMenuController extends Disposable {
  constructor(
    private readonly _config: IConfigData,
    @Inject(Injector) private readonly _injector: Injector,
    @ICommandService private readonly _commandService: ICommandService,
    @IMenuService private readonly _menuService: IMenuService,
    @Inject(ConfigService) protected readonly _configService: ConfigService,
    @Inject(ComponentManager) private readonly _componentManager: ComponentManager,
  ) {
    super()

    this._configService.setConfig(CONFIG_KEY, this._config)

    this._initCommands()
    this._registerComponents()
    this._initMenus()
  }

  /**
   * register commands
   */
  private _initCommands(): void {
    [
      GithubButtonOperation,
    ].forEach((c) => {
      this.disposeWithMe(this._commandService.registerCommand(c))
    })
  }

  /**
   * register icon components
   */
  private _registerComponents(): void {
    this.disposeWithMe(this._componentManager.register('GithubSingle24', GithubSingle24))
  }

  /**
   * register menu items
   */
  private _initMenus(): void {
    (
      [
        GithubButtonFactory,
      ] as IMenuItemFactory[]
    ).forEach((factory) => {
      this.disposeWithMe(this._menuService.addMenuItem(this._injector.invoke(factory), {}))
    })
  }
}
