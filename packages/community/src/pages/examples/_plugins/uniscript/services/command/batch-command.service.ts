import type { CommandListener, ICommand, ICommandService, IExecutionOptions } from '@univerjs/core'
import type { IDisposable } from '@wendellhu/redi'

export class BatchCommandService implements ICommandService {
  hasCommand(_commandId: string): boolean {
    throw new Error('Method not implemented.')
  }

  beforeCommandExecuted(_listener: CommandListener): IDisposable {
    throw new Error('Method not implemented.')
  }

  registerCommand(_command: ICommand<object, boolean>): IDisposable {
    throw new Error('Method not implemented.')
  }

  registerMultipleCommand(_command: ICommand<object, boolean>): IDisposable {
    throw new Error('Method not implemented.')
  }

  executeCommand<P extends object = object, R = boolean>(
    _id: string,
    _params?: P | undefined,
    _options?: IExecutionOptions | undefined,
  ): Promise<R> {
    throw new Error('Method not implemented.')
  }

  syncExecuteCommand<P extends object = object, R = boolean>(
    _id: string,
    _params?: P | undefined,
    _options?: IExecutionOptions | undefined,
  ): R {
    throw new Error('Method not implemented.')
  }

  onCommandExecuted(_listener: CommandListener): IDisposable {
    throw new Error('Method not implemented.')
  }
}

// TODO: @wzhudev: the facade injector should register this command service to implement command batching
// for performance reasons, and undo redo experience.
