import type { ISnapshotServerService } from '@univerjs/core'
import type { IGetSheetBlockRequest, ISheetBlock, ISnapshot } from '@univerjs/protocol'
import { UniverType } from '@univerjs/protocol'

/**
 * Get sheet blocks from snapshot
 * @param snapshot
 * @param snapshotService
 * @returns
 */
export async function getSheetBlocksFromSnapshot(snapshot: ISnapshot, snapshotService: ISnapshotServerService) {
  const workbookMeta = snapshot.workbook

  if (!workbookMeta) {
    throw new Error('Workbook metadata is not available')
  }

  const blocks: ISheetBlock[] = []
  const promises: Promise<void>[] = []

  Object.entries(workbookMeta.blockMeta).forEach(([_sheetID, blocksOfSheet]) => {
    const blockPromises = blocksOfSheet.blocks.map(async (blockID) => {
      const params: IGetSheetBlockRequest = {
        unitID: workbookMeta.unitID,
        type: UniverType.UNIVER_SHEET,
        blockID,
      }
      const { block } = await snapshotService.getSheetBlock({}, params)
      if (block) {
        blocks.push(block)
      } else {
        throw new Error('Block not found')
      }
    })
    promises.push(...blockPromises)
  })

  await Promise.all(promises)
  return blocks
}
