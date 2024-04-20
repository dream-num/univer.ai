import { ISnapshotPersistenceService, LocaleService, Plugin, PluginType } from '@univerjs/core'
import { HTTPService, IHTTPImplementation, XHRHTTPImplementation } from '@univerjs/network'
import type { Dependency } from '@wendellhu/redi'
import { Inject, Injector } from '@wendellhu/redi'

import { ExchangeController } from './controllers/exchange.controller'
import enUS from './locale/en-US'
import zhCN from './locale/zh-CN'
import { ExchangeService, IExchangeService } from './services/exchange.service'
import { IRequestService, RequestService } from './services/request.service'

export interface IExchangeClientPluginConfig {}

export class ExchangeClientPlugin extends Plugin {
  static override type = PluginType.Sheet

  constructor(
    config: IExchangeClientPluginConfig,
        @Inject(Injector) override readonly _injector: Injector,
        @Inject(LocaleService) private readonly _localeService: LocaleService,
  ) {
    super('exchange-client')
  }

  initialize(): void {
    this._localeService.load({
      zhCN,
      enUS,
    })

    const dependencies: Dependency[] = [
      [ExchangeController],
      [HTTPService],
      [IHTTPImplementation, { useClass: XHRHTTPImplementation }],
      [IExchangeService, { useClass: ExchangeService }],
      [IRequestService, { useClass: RequestService }],
    ] as Dependency[]

    dependencies.forEach(dependency => this._injector.add(dependency))
  }

  override onReady(): void {
    this.initialize()
  }

  override onDestroy(): void {}
}
