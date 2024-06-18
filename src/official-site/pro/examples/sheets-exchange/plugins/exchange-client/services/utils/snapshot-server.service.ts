import type { ILogContext, ISnapshotServerService } from '@univerjs/core'
import {
  ErrorCode,
  UniverType,
} from '@univerjs/protocol'
import type {
  IFetchMissingChangesetsRequest,
  IFetchMissingChangesetsResponse,
  IGetResourcesRequest,
  IGetResourcesResponse,
  IGetSheetBlockRequest,
  IGetSheetBlockResponse,
  IGetUnitOnRevRequest,
  IGetUnitOnRevResponse,
  ISaveChangesetRequest,
  ISaveChangesetResponse,
  ISaveSheetBlockRequest,
  ISaveSheetBlockResponse,
  ISaveSnapshotRequest,
  ISaveSnapshotResponse,
  ISheetBlock,
} from '@univerjs/protocol'

/**
 * The server needs to fully implement all interfaces, but when used by the client, use saveSheetBlock to cache the sheet block locally, and use getSheetBlock to obtain the sheet block.
 */
export class ClientSnapshotServerService implements ISnapshotServerService {
  private _sheetBlockCache: Map<string, ISheetBlock> = new Map()

  /** Load snapshot from a database. */
  getUnitOnRev(_context: ILogContext, _params: IGetUnitOnRevRequest): Promise<IGetUnitOnRevResponse> {
    return Promise.resolve({
      snapshot: {
        unitID: '',
        type: UniverType.UNIVER_SHEET,
        rev: 0,
        workbook: undefined,
        doc: undefined,
      },
      changesets: [],
      error: {
        code: ErrorCode.OK,
        message: '',
      },
    })
  }

  /** Load sheet block from a database.  */
  getSheetBlock(context: ILogContext, params: IGetSheetBlockRequest): Promise<IGetSheetBlockResponse> {
    // get block from cache
    const block = this._sheetBlockCache.get(params.blockID)

    return Promise.resolve({
      block,
      error: {
        code: ErrorCode.OK,
        message: '',
      },
    })
  }

  /** Fetch missing changeset */
  fetchMissingChangesets(
    _context: ILogContext,
    _params: IFetchMissingChangesetsRequest,
  ): Promise<IFetchMissingChangesetsResponse> {
    return Promise.resolve({
      changesets: [],
      error: {
        code: ErrorCode.OK,
        message: '',
      },
    })
  }

  getResourcesRequest(_context: ILogContext, _params: IGetResourcesRequest): Promise<IGetResourcesResponse> {
    return Promise.resolve({
      resources: {},
      error: {
        code: ErrorCode.OK,
        message: '',
      },
    })
  }

  /** Save snapshot to a database. */
  saveSnapshot(_context: ILogContext, _params: ISaveSnapshotRequest): Promise<ISaveSnapshotResponse> {
    return Promise.resolve({
      error: {
        code: ErrorCode.OK,
        message: '',
      },
    })
  }

  /** Save sheet block to a database. */
  saveSheetBlock(context: ILogContext, params: ISaveSheetBlockRequest): Promise<ISaveSheetBlockResponse> {
    const { block } = params

    if (!block) {
      return Promise.resolve({
        error: {
          code: ErrorCode.UNDEFINED,
          message: 'block is required',
        },
        blockID: '',
      })
    }

    // save block to cache
    this._sheetBlockCache.set(block.id, block)

    return Promise.resolve({
      error: {
        code: ErrorCode.OK,
        message: '',
      },
      blockID: block.id,
    })
  }

  /** Save changeset to a database. */
  saveChangeset(_context: ILogContext, _params: ISaveChangesetRequest): Promise<ISaveChangesetResponse> {
    return Promise.resolve({
      error: {
        code: ErrorCode.OK,
        message: '',
      },
      concurrent: [],
    })
  }
}
