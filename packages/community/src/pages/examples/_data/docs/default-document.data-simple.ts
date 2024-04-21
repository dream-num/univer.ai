import type { IDocumentData } from '@univerjs/core'
import { BooleanNumber } from '@univerjs/core'

export const DEFAULT_DOCUMENT_DATA_SIMPLE: IDocumentData = {
  id: 'default-document-id',
  body: {
    dataStream: '荷塘月色\r作者：朱自清\r\n',
    textRuns: [
      {
        st: 0,
        ed: 4,
        ts: {
          fs: 24,
          ff: 'Microsoft YaHei',
          cl: {
            rgb: 'rgb(0, 0, 0)',
          },
          bl: BooleanNumber.TRUE,
        },
      },
      {
        st: 5,
        ed: 11,
        ts: {
          fs: 18,
          ff: 'Microsoft YaHei',
          cl: {
            rgb: 'rgb(30, 30, 30)',
          },
          bl: BooleanNumber.FALSE,
        },
      },
    ],
    paragraphs: [
      {
        startIndex: 4,
        paragraphStyle: {
          spaceAbove: 10,
          lineSpacing: 2,
          spaceBelow: 0,
        },
      },
      {
        startIndex: 11,
        paragraphStyle: {
          spaceAbove: 10,
          lineSpacing: 2,
          spaceBelow: 0,
        },
      },
    ],
    sectionBreaks: [
      {
        startIndex: 12,
        // columnProperties: [
        //     {
        //         width: 250,
        //         paddingEnd: 15,
        //     },
        // ],
        // columnSeparatorType: ColumnSeparatorType.NONE,
        // sectionType: SectionType.SECTION_TYPE_UNSPECIFIED,
        // textDirection: textDirectionDocument,
        // contentDirection: textDirection!,
      },
    ],
  },
  documentStyle: {
    pageSize: {
      width: 595,
      height: 842,
    },
    marginTop: 50,
    marginBottom: 50,
    marginRight: 40,
    marginLeft: 40,
    renderConfig: {
      vertexAngle: 0,
      centerAngle: 0,
    },
  },
}
