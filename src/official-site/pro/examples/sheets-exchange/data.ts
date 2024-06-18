import { type IWorkbookData, LocaleType } from '@univerjs/core'

const workbookDataZH: Partial<IWorkbookData> = {
  id: 'workbook-01',
  sheets: {
    'sheet-01': {
      name: 'Sheet 1',
      id: 'sheet-01',
      mergeData: [
        {
          startRow: 1,
          startColumn: 1,
          endRow: 1,
          endColumn: 6,
          rangeType: 0,
        },
      ],
      cellData: {
        1: {
          1: {
            p: {
              id: 'p1',
              documentStyle: {
                pageSize: {
                  width: 514.8308258056641,
                },
                marginTop: 25.266666666666666,
                marginBottom: 1,
                marginRight: 2,
                marginLeft: 2,
                renderConfig: {
                  horizontalAlign: 1,
                  verticalAlign: 2,
                  centerAngle: 0,
                  vertexAngle: 0,
                  wrapStrategy: 1,
                },
              },
              body: {
                dataStream: '在线 Demo 做了限制\r\r导入文档的大小限制为 1MB\r每个文档最多导出 1000 个单元格\r\r如果想体验完整功能，请访问 https://univer.ai/pro 开始30天免费试用！\r\n',
                textRuns: [
                  {
                    st: 0,
                    ed: 95,
                    ts: {
                      cl: {
                        rgb: 'rgb(49, 72, 61)',
                      },
                      bg: {
                        rgb: 'rgb(215,234,218)',
                      },
                      fs: 12,
                      bl: 0,
                      it: 0,
                      ff: '"Microsoft YaHei UI", sans-serif',
                    },
                  },
                ],
                paragraphs: [
                  {
                    startIndex: 12,
                    paragraphStyle: {
                      horizontalAlign: 1,
                    },
                  },
                  {
                    startIndex: 13,
                    paragraphStyle: {
                      horizontalAlign: 1,
                    },
                  },
                  {
                    startIndex: 28,
                    paragraphStyle: {
                      horizontalAlign: 1,
                    },
                  },
                  {
                    startIndex: 47,
                    paragraphStyle: {
                      horizontalAlign: 1,
                    },
                  },
                  {
                    startIndex: 48,
                    paragraphStyle: {
                      horizontalAlign: 1,
                    },
                  },
                  {
                    startIndex: 95,
                    paragraphStyle: {
                      horizontalAlign: 1,
                    },
                  },
                ],
              },
              settings: {
                zoomRatio: 1,
              },
            },
            s: {
              bg: {
                rgb: 'rgb(215,234,218)',
              },
              vt: 2,
            },
          },
        },
      },
      rowData: {
        1: {
          hd: 0,
          h: 128,
          ia: 0,
        },
      },
    },
  },
}
const workbookDataEN: Partial<IWorkbookData> = {
  id: 'workbook-01',
  sheets: {
    'sheet-01': {
      name: 'Sheet 1',
      id: 'sheet-01',
      mergeData: [
        {
          startRow: 1,
          startColumn: 1,
          endRow: 1,
          endColumn: 6,
        },
      ],
      cellData: {
        1: {
          1: {
            s: {
              bg: {
                rgb: 'rgb(215,234,218)',
              },
              vt: 2,
            },
            p: {
              id: 'p1',
              documentStyle: {
                pageSize: {
                  width: 380.4493408203125,
                },
                marginTop: 12.5,
                marginBottom: 1,
                marginRight: 2,
                marginLeft: 2,
                renderConfig: {
                  horizontalAlign: 0,
                  verticalAlign: 2,
                  centerAngle: 0,
                  vertexAngle: 0,
                  wrapStrategy: 0,
                },
              },
              body: {
                dataStream: 'Online Demo has restrictions\r\rImported document\'s size is limited to 1MB\rExport max to 1000 cells for each document\r\rIf you want to experience the full functionality, \rplease visit https://univer.ai/pro to start a 30-day free trial!\r\n',
                textRuns: [
                  {
                    st: 0,
                    ed: 232,
                    ts: {
                      cl: {
                        rgb: 'rgb(49, 72, 61)',
                      },
                      bg: {
                        rgb: 'rgb(215,234,218)',
                      },
                      fs: 12,
                      bl: 0,
                      it: 0,
                      ff: '"Microsoft YaHei UI", sans-serif',
                    },
                  },
                ],
                paragraphs: [
                  {
                    startIndex: 28,
                    paragraphStyle: {
                      horizontalAlign: 0,
                    },
                  },
                  {
                    startIndex: 29,
                    paragraphStyle: {
                      horizontalAlign: 0,
                    },
                  },
                  {
                    startIndex: 72,
                    paragraphStyle: {
                      horizontalAlign: 0,
                    },
                  },
                  {
                    startIndex: 115,
                    paragraphStyle: {
                      horizontalAlign: 0,
                    },
                  },
                  {
                    startIndex: 116,
                    paragraphStyle: {
                      horizontalAlign: 0,
                    },
                  },
                  {
                    startIndex: 167,
                    paragraphStyle: {
                      horizontalAlign: 0,
                    },
                  },
                  {
                    startIndex: 232,
                    paragraphStyle: {
                      horizontalAlign: 0,
                    },
                  },
                ],
              },
              settings: {
                zoomRatio: 1,
              },
            },
          },
        },
      },
      rowData: {
        1: {
          hd: 0,
          h: 137,
          ia: 0,
        },
      },
    },

  },
}

export const workbookData = {
  [LocaleType.ZH_CN]: workbookDataZH,
  [LocaleType.EN_US]: workbookDataEN,
  [LocaleType.RU_RU]: workbookDataEN,
}
