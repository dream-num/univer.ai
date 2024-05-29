import { PageElementType, PresetListType } from '@univerjs/core'

export const PAGE3_RICHTEXT_2 = {
  id: 'detailContent2',
  zIndex: 3,
  left: 334,
  top: 363,
  width: 273,
  height: 120,
  title: 'detailContent2',
  description: '',
  type: PageElementType.TEXT,
  richText: {
    rich: {
      id: 'd',
      body: {
        dataStream: 'combine SaaS, PaaS and IaaS with tailored\rprovides a curated set of tools, capabilities and processes that are packaged for easy consumption by developers and end users\r\n',
        textRuns: [
          {
            st: 0,
            ed: 40,
            ts: {
              fs: 12,
            },
          },
          {
            st: 42,
            ed: 167,
            ts: {
              fs: 12,
            },
          },
        ],
        paragraphs: [
          {
            startIndex: 41,
            bullet: {
              listType: PresetListType.ORDER_LIST,
              listId: 'orderList',
              nestingLevel: 0,
              textStyle: {
                fs: 20,
              },
            },
            paragraphStyle: {
              spaceBelow: 15,
            },
          },
          {
            startIndex: 168,
            bullet: {
              listType: PresetListType.ORDER_LIST,
              listId: 'orderList',
              nestingLevel: 0,
              textStyle: {
                fs: 20,
              },
            },
          },
        ],
      },
      documentStyle: {
        pageSize: {
          width: undefined,
          height: undefined,
        },
        marginTop: 2,
        marginBottom: 2,
        marginRight: 0,
        marginLeft: 0,
      },
    },
  },
}
