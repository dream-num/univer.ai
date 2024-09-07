import { ConfigService, Inject, Injector, Plugin, UniverInstanceType } from '@univerjs/core'
import type { Dependency } from '@univerjs/core'
import { GithubMenuController } from './controllers/github-menu.controller'
import type { IConfigData } from './controllers/github-menu.controller'

export class GithubPlugin extends Plugin {
  static override type = UniverInstanceType.UNIVER_UNKNOWN
  static override pluginName = 'GITHUB_PLUGIN'

  constructor(
    private _config: IConfigData,
    @Inject(Injector) protected readonly _injector: Injector,
  ) {
    super()
  }

  override onStarting(injector: Injector): void {
    ([
      [ConfigService],
      [GithubMenuController, {
        useFactory: () => this._injector.createInstance(GithubMenuController, this._config),
      }],
    ] as Dependency[]).forEach(d => injector.add(d))
  }
}
