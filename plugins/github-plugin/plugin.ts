import { ConfigService, Plugin, UniverInstanceType } from "@univerjs/core";
import { Dependency, Inject, Injector } from "@wendellhu/redi";
import { GithubMenuController, IConfigData } from "./controllers/github-menu.controller";

export class GithubPlugin extends Plugin {
  static override type = UniverInstanceType.UNIVER_UNKNOWN
  static override pluginName = 'GITHUB_PLUGIN';

  constructor(
    private _config: IConfigData,
    @Inject(Injector) protected readonly _injector: Injector
  ) {
    super();
  }

  override onStarting(injector: Injector): void {
    ([
      [ConfigService],
      [GithubMenuController,  {
        useFactory: () => this._injector.createInstance(GithubMenuController, this._config),
    }],
    ] as Dependency[]).forEach((d) => injector.add(d));
  }
}
