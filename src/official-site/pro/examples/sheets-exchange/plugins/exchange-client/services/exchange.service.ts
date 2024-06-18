import type { IWorkbookData, Workbook } from '@univerjs/core'
import { ILogService, IUniverInstanceService, LocaleService, UniverInstanceType, textEncoder } from '@univerjs/core'
import { MessageType } from '@univerjs/design'
import { UniverType } from '@univerjs/protocol'
import { IMessageService } from '@univerjs/ui'
import { Inject, createIdentifier } from '@wendellhu/redi'
import type { IDisposable } from '@wendellhu/redi'
import pako from 'pako'
import { IRequestService, ImportOutputType } from './request.service'
import type { ISnapshotJsonResponse, RequestService } from './request.service'
import { transformSnapshotJsonToWorkbookData, transformWorkbookDataToSnapshotJson } from './utils/snapshot'
import { downloadFile, jsonStringToFile } from './utils/tool'

export interface IExchangeService {
  upload: (file: File | string) => Promise<void>
  uploadJson: (file: File | string) => Promise<void>
  download: () => Promise<void>
  downloadJson: () => Promise<void>
}

// eslint-disable-next-line ts/no-redeclare
export const IExchangeService = createIdentifier<IExchangeService>('exchange-client.exchange-service')

export class ExchangeService implements IExchangeService, IDisposable {
  constructor(
    @Inject(IUniverInstanceService) private _univerInstanceService: IUniverInstanceService,
    @IMessageService private readonly _messageService: IMessageService,
    @Inject(LocaleService) private readonly _localeService: LocaleService,
    @Inject(IRequestService) private readonly _requestService: RequestService,
    @ILogService protected readonly _logService: ILogService,
  ) { }

  dispose(): void { }

  /**
   * upload file to server, get unitId and open unit
   * @param file
   */
  async upload(file: File | string) {
    this._requestService.openModal(this._localeService.t('exchange.uploading'))

    const uploadResponse = await this._requestService.upload(file)

    if (!uploadResponse) return

    const fileID = uploadResponse.FileId

    const importRequest = {
      fileID,
      type: UniverType.UNIVER_SHEET,
      outputType: ImportOutputType.UNIT,
      fileUrl: '',
    }

    const importResponse = await this._requestService.import(importRequest)

    if (!importResponse) return

    const taskID = importResponse.taskID

    const taskResponse = await this._requestService.getTask(taskID)

    if (!taskResponse) return

    const importOutputType = taskResponse.import?.outputType
    const unitID = taskResponse.import?.unitID || ''

    if (importOutputType !== ImportOutputType.UNIT) {
      this._logService.error('[ExchangeService]: Get outputType error!')
      return
    }

    if (unitID.length === 0) {
      this._logService.error('[ExchangeService]: Failed to get unitID from task!')
      return
    }

    this._requestService.closeModal()
    this._messageService.show({
      type: MessageType.Success,
      content: this._localeService.t('exchange.uploadSuccess'),
    })

    this._openUnit(unitID, UniverType.UNIVER_SHEET)
  }

  /**
   * upload file to server,get json
   * @param file
   */
  async uploadJson(file: File | string) {
    this._requestService.openModal(this._localeService.t('exchange.uploading'))

    const uploadResponse = await this._requestService.upload(file)

    if (!uploadResponse) return

    const fileID = uploadResponse.FileId

    const importRequest = {
      fileID,
      type: UniverType.UNIVER_SHEET,
      outputType: ImportOutputType.JSON,
      fileUrl: '',
    }

    const importResponse = await this._requestService.import(importRequest)

    if (!importResponse) return

    const taskID = importResponse.taskID

    const taskResponse = await this._requestService.getTask(taskID)

    if (!taskResponse) return

    const importOutputType = taskResponse.import?.outputType
    const jsonID = taskResponse.import?.jsonID || ''

    if (importOutputType !== ImportOutputType.JSON) {
      this._logService.error('[ExchangeService]: Get outputType error!')
      return
    }

    if (jsonID.length === 0) {
      this._logService.error('[ExchangeService]: Failed to get jsonID from task!')
      return
    }

    const signUrlResponse = await this._requestService.signUrl(jsonID)

    if (!signUrlResponse) return

    const url = signUrlResponse.url

    if (url.length === 0) {
      this._logService.error('[ExchangeService]: Failed to get url from task!')
      return
    }

    const str = await this._requestService.getUrlContent(url)

    if (!str) return

    const json = JSON.parse(str)

    const workbookData = transformSnapshotJsonToWorkbookData(json.snapshot, json.sheetBlocks)

    if (!workbookData) return

    this._requestService.closeModal()
    this._messageService.show({
      type: MessageType.Success,
      content: this._localeService.t('exchange.uploadSuccess'),
    })

    this._refresh(workbookData)
  }

  /**
   * upload file to server
   * @param file
   */
  async download() {
    this._requestService.openModal(this._localeService.t('exchange.downloading'))

    const exportResponse = await this._requestService.export({
      unitID: this._getUnitID(),
      jsonID: '',
      type: UniverType.UNIVER_SHEET,

    })

    if (!exportResponse) return

    const taskID = exportResponse.taskID

    const taskResponse = await this._requestService.getTask(taskID)

    if (!taskResponse) return

    const fileID = taskResponse.export?.fileID || ''

    if (fileID.length === 0) {
      this._logService.error('[ExchangeService]: Failed to get fileID from task!')
      return
    }

    const signUrlResponse = await this._requestService.signUrl(fileID)

    if (!signUrlResponse) return

    const url = signUrlResponse.url

    if (url.length === 0) {
      this._logService.error('[ExchangeService]: Failed to get url from task!')
      return
    }

    this._requestService.closeModal()
    this._messageService.show({
      type: MessageType.Success,
      content: this._localeService.t('exchange.downloadSuccess'),
    })

    downloadFile(url, this._getUnitName())
    // const blob = await this._requestService.getUrlBlob(url);

    // if (!blob) return;

    // downloadBlob(blob, this._getUnitName());
    // this._messageService.show({
    //     type: MessageType.Success,
    //     content: this._localeService.t('exchange.downloadSuccess'),
    // });
  }

  async downloadJson() {
    this._requestService.openModal(this._localeService.t('exchange.downloading'))

    const unitJson = await this._getUnitJson()

    const jsonString = JSON.stringify(unitJson)

    const compressedString = pako.deflateRaw(jsonString)

    const size = textEncoder.encode(jsonString).length

    // @ts-expect-error
    const file = jsonStringToFile(compressedString)

    const uploadResponse = await this._requestService.upload(file, size, true)

    if (!uploadResponse) return

    const jsonID = uploadResponse.FileId

    const exportResponse = await this._requestService.export({
      unitID: '',
      jsonID,
      type: UniverType.UNIVER_SHEET,

    })

    if (!exportResponse) return

    const taskID = exportResponse.taskID

    const taskResponse = await this._requestService.getTask(taskID)

    if (!taskResponse) return

    const fileID = taskResponse.export?.fileID || ''

    if (fileID.length === 0) {
      this._logService.error('[ExchangeService]: Failed to get fileID from task!')
      return
    }

    const signUrlResponse = await this._requestService.signUrl(fileID)

    if (!signUrlResponse) return

    const url = signUrlResponse.url

    if (url.length === 0) {
      this._logService.error('[ExchangeService]: Failed to get url from task!')
      return
    }

    this._requestService.closeModal()
    this._messageService.show({
      type: MessageType.Success,
      content: this._localeService.t('exchange.downloadSuccess'),
    })

    downloadFile(url, this._getUnitName())
  }

  private _getUnitID(): string {
    return this._univerInstanceService.getCurrentUnitForType<Workbook>(UniverInstanceType.UNIVER_SHEET)!.getUnitId()
  }

  private _getUnitName(): string {
    return this._univerInstanceService.getCurrentUnitForType<Workbook>(UniverInstanceType.UNIVER_SHEET)!.getActiveSpreadsheet().getName() || document.title
  }

  private async _getUnitJson(): Promise<ISnapshotJsonResponse> {
    const univerInstance = this._univerInstanceService.getCurrentUnitForType<Workbook>(UniverInstanceType.UNIVER_SHEET)!
    const workbookData = univerInstance.getSnapshot()
    const snapshotJson = await transformWorkbookDataToSnapshotJson(workbookData)
    return snapshotJson
  }

  private _refresh(workbookData: IWorkbookData) {
    const unitID = this._univerInstanceService.getCurrentUnitForType<Workbook>(UniverInstanceType.UNIVER_SHEET)!.getUnitId()
    this._univerInstanceService.disposeUnit(unitID)
    this._univerInstanceService.createUnit(UniverInstanceType.UNIVER_SHEET, workbookData)
  }

  /**
   * refresh current tab with /?unit={unitID}&type=2
   * @param unitID
   * @param type
   */
  private _openUnit(unitID: string, type: number) {
    const url = new URL(window.location.href)
    url.searchParams.set('unit', unitID)
    url.searchParams.set('type', `${type}`)
    window.location.href = url.toString()
  }
}
