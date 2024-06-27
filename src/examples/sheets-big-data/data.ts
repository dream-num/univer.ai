import { BooleanNumber, type ICellData, type IObjectMatrixPrimitiveType, type IWorkbookData } from '@univerjs/core'

export function generateWorkbookData(row: number, col: number) {
  const cellData: IObjectMatrixPrimitiveType<ICellData> = {}

  for (let i = 0; i < row; i++) {
    if (cellData[i] === undefined) {
      cellData[i] = {}
    }

    for (let j = 0; j < col; j++) {
      cellData[i][j] = {
        v: `${i},${j}`,
      }
    }
  }

  const workbookData: Partial<IWorkbookData> = {
    id: 'workbook-01',
    name: 'universheet',
    sheetOrder: ['sheet-01'],
    sheets: {
      'sheet-01': {
        id: 'sheet-01',
        cellData,
        name: 'Sheet1',
        hidden: BooleanNumber.FALSE,
        rowCount: row,
        columnCount: col,
      },
    },
  }
  return workbookData
}
