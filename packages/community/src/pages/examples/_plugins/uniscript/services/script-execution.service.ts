import { Disposable, ILogService } from '@univerjs/core'
import { FUniver } from '@univerjs/facade'
import { Inject, Injector } from '@wendellhu/redi'

/**
 * This service is to
 */
export class UniscriptExecutionService extends Disposable {
  constructor(
        @ILogService private readonly _logService: ILogService,
        @Inject(Injector) private readonly _injector: Injector,
  ) {
    super()
  }

  async execute(code: string): Promise<boolean> {
    this._logService.log('[UniscriptExecutionService]', 'executing Uniscript...')

    const apiInstance = FUniver.newAPI(this._injector)
    // eslint-disable-next-line no-new-func
    const scriptFunction = new Function('univerAPI', `(() => {${code}})()`)

    try {
      scriptFunction(apiInstance)
      return true
    } catch (e) {
      this._logService.error(e)
      return false
    }
  }
}
