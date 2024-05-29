import { IConfigService, IUniverInstanceService, LocaleService } from '@univerjs/core'
import { MessageType } from '@univerjs/design'
import type { IPostRequestParams, IRequestParams } from '@univerjs/network'
import { HTTPService } from '@univerjs/network'
import { ErrorCode } from '@univerjs/protocol'
import type { IError, UniverType } from '@univerjs/protocol'
import { IMessageService } from '@univerjs/ui'
import { Inject, createIdentifier } from '@wendellhu/redi'
import type { IDisposable } from '@wendellhu/redi'

import { Modal } from './utils/modal'
import type { ISheetBlockJson, ISnapshotJson } from './utils/snapshot'
import { replaceFileID, replaceTaskID, replaceType } from './utils/tool'

export const EXCHANGE_UPLOAD_FILE_SERVER_URL_KEY = 'EXCHANGE_UPLOAD_FILE_SERVER_URL_KEY'

const DEFAULT_EXCHANGE_UPLOAD_FILE_SERVER_URL_KEY = '/universer-api/stream/file/upload'

export const EXCHANGE_IMPORT_SERVER_URL_KEY = 'EXCHANGE_IMPORT_SERVER_URL_KEY'

const DEFAULT_EXCHANGE_IMPORT_SERVER_URL_KEY = '/universer-api/exchange/{type}/import'

export const EXCHANGE_EXPORT_SERVER_URL_KEY = 'EXCHANGE_EXPORT_SERVER_URL_KEY'

const DEFAULT_EXCHANGE_EXPORT_SERVER_URL_KEY = '/universer-api/exchange/{type}/export'

export const EXCHANGE_GET_TASK_SERVER_URL_KEY = 'EXCHANGE_GET_TASK_SERVER_URL_KEY'

const DEFAULT_EXCHANGE_GET_TASK_SERVER_URL_KEY = '/universer-api/exchange/task/{taskID}'

export const EXCHANGE_SIGN_URL_SERVER_URL_KEY = 'EXCHANGE_SIGN_URL_SERVER_URL_KEY'

const DEFAULT_EXCHANGE_SIGN_URL_SERVER_URL_KEY = '/universer-api/file/{fileID}/sign-url'

export const EXPORT_XLSX_SERVER_URL_KEY = 'EXPORT_XLSX_SERVER_URL_KEY'

const DEFAULT_EXPORT_XLSX_SERVER_URL = '/universer-api/export-xlsx'

interface IFileUploadResponse {
  FileId: string
  error: IError
}

// FIXME: import from protocol
export enum ImportOutputType {
  UNDEFINED = 0,
  /** UNIT - Import to univer unit, unit is store in the database */
  UNIT = 1,
  /** JSON - Import and convert to a json file which represents a univer unit, not store in the database */
  JSON = 2,
  UNRECOGNIZED = -1,
}

export interface IImportRequest {
  fileID: string
  type: UniverType
  outputType: ImportOutputType
  /** not supported yet */
  fileUrl: string
}

interface IImportResponse {
  taskID: string
  error: IError
}

export interface IExportRequest {
  /** if unitID is specified, the input is the unit in the database */
  unitID: string
  /** if jsonID is specified, the input is the json file which represents a univer unit */
  jsonID: string
  type: UniverType
}
export interface IExportResponse {
  error: IError | undefined
  taskID: string
}

export interface IGetTaskResponse {
  error: IError | undefined
  taskID: string
  status: string
  import?: IImportTaskResult | undefined
  export?: IExportTaskResult | undefined
}

export interface IImportTaskResult {
  outputType: ImportOutputType
  unitID: string
  jsonID: string
}

export interface IExportTaskResult {
  fileID: string
  fileUrl: string
}

export interface ISignUrlResponse {
  error: IError | undefined
  url: string
}

interface IFileDownloadResponse {
  message: Blob
  error: IError
}

export interface ISnapshotJsonResponse {
  snapshot: Partial<ISnapshotJson>
  sheetBlocks: ISheetBlockJson
}

export interface IRequestService {
  upload: (file: File | string) => Promise<IFileUploadResponse | null>

  import: (importRequest: IImportRequest) => Promise<IImportResponse | null>

  export: (exportRequest: IExportRequest) => Promise<IExportResponse | null>

  getTask: (taskID: string) => Promise<IGetTaskResponse | null>

  signUrl: (fileID: string) => Promise<ISignUrlResponse | null>

  getUrlContent: (url: string) => Promise<string | null>

  openModal: (content: string) => void

  closeModal: () => void
}

// eslint-disable-next-line ts/no-redeclare
export const IRequestService = createIdentifier<IRequestService>('exchange-client.request-service')

export class RequestService implements IRequestService, IDisposable {
  private _modal: Modal
  constructor(
        @IConfigService private readonly _configService: IConfigService,
        @Inject(HTTPService) private readonly _httpService: HTTPService,
        @Inject(IUniverInstanceService) private _univerInstanceService: IUniverInstanceService,
        @IMessageService private readonly _messageService: IMessageService,
        @Inject(LocaleService) private readonly _localeService: LocaleService,
  ) {
    this._modal = new Modal()
  }

  dispose(): void { }

  openModal(content: string) {
    this._modal.open(content)
  }

  closeModal() {
    this._modal.close()
  }

  /**
   * upload file to server
   * @param file
   */
  async upload(file: File | string, size: number = 0, flate: boolean = false) {
    if (typeof file === 'string') {
      const remoteFile = await this._parseFileURL(file)
      if (!remoteFile) return null

      file = remoteFile
    }

    size = size || file.size

    const formData = new FormData()
    formData.append('file', file)

    try {
      const url = `${this._getUploadFileURL()}?size=${size}&flate=${flate}`

      // const options: IPostRequestParams = {
      //     body: formData,
      //     headers: {
      //         'Content-Type': 'multipart/form-data',
      //     },
      // };

      // FIXME: need to fix Content-Type error: "request Content-Type isn't multipart/form-data"
      // const response = await this._httpService.post<IFileUploadResponse>(url, options);
      // const data = response.body;

      const response = await fetch(url, { method: 'POST', body: formData })
      const data: IFileUploadResponse = await response.json()

      if (typeof data.FileId === 'string') {
        return data
      }

      this._modal.close()
      return this._showNetworkError(data)
    } catch (error) {
      this._modal.close()
      return this._showNetworkError()
    }
  }

  async import(importRequest: IImportRequest) {
    const { fileID, type, outputType } = importRequest

    try {
      const url = replaceType(this._getImportURL(), `${type}`)

      const options: IPostRequestParams = {
        body: {
          fileID,
          outputType,
        },
      }

      const response = await this._httpService.post<IImportResponse>(url, options)
      const data = response.body

      if (data.error && data.error.code === ErrorCode.OK) {
        return data
      }

      this._modal.close()
      return this._showNetworkError(data)
    } catch (error) {
      this._modal.close()
      return this._showNetworkError()
    }
  }

  async export(exportRequest: IExportRequest) {
    const { unitID, jsonID, type } = exportRequest

    try {
      const url = replaceType(this._getExportURL(), `${type}`)

      const options: IPostRequestParams = {
        body: {
          unitID,
          jsonID,
          type,
        },
      }

      const response = await this._httpService.post<IImportResponse>(url, options)
      const data = response.body

      if (data.error && data.error.code === ErrorCode.OK) {
        return data
      }

      this._modal.close()
      return this._showNetworkError(data)
    } catch (error) {
      this._modal.close()
      return this._showNetworkError()
    }
  }

  async getTask(taskID: string): Promise<IGetTaskResponse | null> {
    return new Promise<IGetTaskResponse | null>((resolve, reject) => {
      try {
        let totalTime = 0 // Total time spent tracking polling
        const url = replaceTaskID(this._getTaskURL(), `${taskID}`)

        const poll = async () => {
          const response = await this._httpService.get<IGetTaskResponse>(url)
          const data = response.body

          if (data.error && data.error.code === ErrorCode.OK) {
            if (data.status === 'done') {
              resolve(data) // Task completed, resolve Promise
            } else if (data.status === 'pending') {
              // Adjust the next polling interval based on the total time
              let nextPollInterval = 1000 // Default 1 second
              if (totalTime >= 60000) {
                this._modal.close()
                reject(this._showNetworkError(data)) // Stop polling after 60 seconds
                return
              } else if (totalTime >= 30000) {
                nextPollInterval = 5000 // Change to 5 seconds polling after 30 seconds
              }

              totalTime += nextPollInterval
              setTimeout(poll, nextPollInterval) // Schedule next poll
            } else { // status is failed
              this._modal.close()
              reject(this._showNetworkError(data)) // An error occurred, Promise rejected
            }
          } else {
            this._modal.close()
            reject(this._showNetworkError(data)) // An error occurred, Promise rejected
          }
        }

        poll() // Start first poll
      } catch (error) {
        this._modal.close()
        reject(this._showNetworkError()) // Exception caught, Promise rejected
      }
    })
  }

  async signUrl(fileID: string) {
    try {
      const url = replaceFileID(this._getSignURL(), `${fileID}`)
      const response = await this._httpService.get<ISignUrlResponse>(url)
      const data = response.body

      if (data.error && data.error.code === ErrorCode.OK) {
        return data
      }

      this._modal.close()
      return this._showNetworkError(data)
    } catch (error) {
      this._modal.close()
      return this._showNetworkError()
    }
  }

  async getUrlContent(url: string) {
    try {
      const options: IRequestParams = {
        responseType: 'blob',
      }
      const response = await this._httpService.get<string>(url, options)
      const data = response.body

      if (typeof data === 'string') {
        return data
      }

      this._modal.close()
      return this._showNetworkError()
    } catch (error) {
      this._modal.close()
      return this._showNetworkError()
    }
  }

  private async _parseFileURL(url: string) {
    try {
      const response = await fetch(url)
      const data = await response.blob()
      const filename = url.split('/').pop() || 'download.xlsx'
      const file = new File([data], filename, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

      return file
    } catch (error) {
      this._modal.close()
      return this._showNetworkError()
    }
  }

  private _getUploadFileURL(): string {
    return this._configService.getConfig(EXCHANGE_UPLOAD_FILE_SERVER_URL_KEY) ?? DEFAULT_EXCHANGE_UPLOAD_FILE_SERVER_URL_KEY
  }

  private _getImportURL(): string {
    return this._configService.getConfig(EXCHANGE_IMPORT_SERVER_URL_KEY) ?? DEFAULT_EXCHANGE_IMPORT_SERVER_URL_KEY
  }

  private _getExportURL(): string {
    return this._configService.getConfig(EXCHANGE_EXPORT_SERVER_URL_KEY) ?? DEFAULT_EXCHANGE_EXPORT_SERVER_URL_KEY
  }

  private _getTaskURL(): string {
    return this._configService.getConfig(EXCHANGE_GET_TASK_SERVER_URL_KEY) ?? DEFAULT_EXCHANGE_GET_TASK_SERVER_URL_KEY
  }

  private _getSignURL(): string {
    return this._configService.getConfig(EXCHANGE_SIGN_URL_SERVER_URL_KEY) ?? DEFAULT_EXCHANGE_SIGN_URL_SERVER_URL_KEY
  }

  private _getDownloadURL(): string {
    return this._configService.getConfig(EXPORT_XLSX_SERVER_URL_KEY) ?? DEFAULT_EXPORT_XLSX_SERVER_URL
  }

  private _showNetworkError(data?: IFileUploadResponse | IImportResponse | IGetTaskResponse | ISignUrlResponse | IFileDownloadResponse) {
    if (data && data.error) {
      const { code } = data.error

      switch (code) {
        case ErrorCode.CONNECTOR_DATA_TOO_LARGE:
          this._messageService.show({
            type: MessageType.Error,
            content: this._localeService.t('exchange.tooLarge'),
          })
          break
        case ErrorCode.INTERNAL_ERROR:
          this._messageService.show({
            type: MessageType.Error,
            content: this._localeService.t('exchange.internalError'),
          })
          break

        default:
          break
      }

      return null
    }

    this._messageService.show({
      type: MessageType.Error,
      content: this._localeService.t('exchange.networkError'),
    })
    return null
  }
}
