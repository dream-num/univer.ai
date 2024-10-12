import type { IConfigData } from './controllers/github-menu.controller'
import { ConfigService, Inject, Injector, Plugin, registerDependencies, touchDependencies, UniverInstanceType } from '@univerjs/core'
import { GithubMenuController } from './controllers/github-menu.controller'

export class GithubPlugin extends Plugin {
  static override type = UniverInstanceType.UNIVER_UNKNOWN
  static override pluginName = 'GITHUB_PLUGIN'

  constructor(
    private _config: IConfigData,
    @Inject(Injector) protected readonly _injector: Injector,
  ) {
    super()
  }

  override onStarting(): void {
    registerDependencies(this._injector, [
      [ConfigService],
      [GithubMenuController, {
        useFactory: () => this._injector.createInstance(GithubMenuController, this._config),
      }],
    ])
  }

  override onSteady(): void {
    touchDependencies(this._injector, [
      [GithubMenuController],
    ])
  }
}
