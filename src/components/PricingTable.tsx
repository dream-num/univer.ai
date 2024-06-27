import { Tooltip } from '@radix-ui/themes'
import { useTranslation } from '@/lib/i18n'

export default function PricingTable() {
  const t = useTranslation({
    'en-US': {
      'header.community': 'Community',
      'header.trial': 'Trial',
      'header.enterprise': 'Enterprise',
      'row.development': 'Development',
      'row.development.community': 'Public npm packages & docker images for backend',
      'row.development.trial': 'Public npm packages & docker images for backend',
      'row.development.enterprise': 'Npm packages registry hosted by Univer & docker images for backend',
      'row.license': 'License',
      'row.license.community': 'No license required',
      'row.license.trial': '30-day trial License',
      'row.license.enterprise': 'Commercial license',
      'row.collaborative-editing': 'Collaborative Editing',
      'row.collaborative-editing.community': 'Max to 50 people and 100 documents',
      'row.collaborative-editing.trial': 'Unlimited users and documents',
      'row.collaborative-editing.enterprise': 'Unlimited',
      'row.collaborative-editing.limited-features': '(for limited features)',
      'row.collaborative-editing.features': 'Data validation / conditional formatting / filter are not supported.',
      'row.import-export': 'Import & Export',
      'row.import-export.community': 'Imported document\'s size is limited to 1MB',
      'row.import-export.community.2': 'Export max to 1000 cells for each document',
      'row.import-export.trial': 'Unlimited',
      'row.import-export.enterprise': 'Unlimited',
      'row.printing': 'Printing',
      'row.printing.community': 'Limited to 3 pages for each document',
      'row.printing.trial': 'Limited to 3 pages for each document',
      'row.printing.enterprise': 'Unlimited',
      'row.support': 'Support',
      'row.support.community': 'Community support',
      'row.support.trial': 'Service from Univer dev team',
      'row.support.enterprise': 'Service from Univer dev team',
    },
    'zh-CN': {
      'header.community': '社区版',
      'header.trial': '试用版',
      'header.enterprise': '企业版',
      'row.development': '开发',
      'row.development.community': '后端的公共 npm 包和 docker 镜像',
      'row.development.trial': '后端的公共 npm 包和 docker 镜像',
      'row.development.enterprise': 'Univer 内部的 npm 包和 docker 镜像',
      'row.license': '许可证',
      'row.license.community': '无需许可证',
      'row.license.trial': '30天试用',
      'row.license.enterprise': '商业许可证',
      'row.collaborative-editing': '协同编辑',
      'row.collaborative-editing.community': '最多50个用户和100个文档的限制',
      'row.collaborative-editing.trial': '无用户数与文档的上限',
      'row.collaborative-editing.enterprise': '无限制',
      'row.collaborative-editing.limited-features': '（有限的功能）',
      'row.collaborative-editing.features': '不支持数据验证 / 条件格式 / 筛选',
      'row.import-export': '导入和导出',
      'row.import-export.community': '导入文档的大小限制为1MB',
      'row.import-export.community.2': '每个文档最多导出1000个单元格',
      'row.import-export.trial': '无限制',
      'row.import-export.enterprise': '无限制',
      'row.printing': '打印',
      'row.printing.community': '每个文档限制为3页',
      'row.printing.trial': '每个文档限制为3页',
      'row.printing.enterprise': '无限制',
      'row.support': '支持',
      'row.support.community': '社区支持',
      'row.support.trial': '来自 Univer 团队的支持与服务',
      'row.support.enterprise': '来自 Univer 团队的支持与服务',
    },
  })

  const greenText = 'font-medium'

  const greenColorStyle = {
    color: '#0FCC65',
  }

  const limitedFeaturesText = (
    <Tooltip maxWidth="320px" content={<div className="text-center">{t('row.collaborative-editing.features')}</div>}>
      <span className="ml-[2px] text-[#2B4DFF]">
        <br />
        {t('row.collaborative-editing.limited-features')}
      </span>
    </Tooltip>
  )

  const separateTableClass = `
    w-full table-fixed border-spacing-x-[55px] text-left align-top mt-8

    lg:mt-[76px]

    [&_td]:py-[28px] [&_td]:align-top

    [&_th]:py-[28px]

    [&_tr]:border-b

    [&_tr>td:not(:nth-child(1))]:ml-[55px] [&_tr>td:nth-child(1)]:font-medium
    [&_tr>td:nth-child(1)]:text-neutral-950

    [&_tr>td]:text-[#474D57]
  `

  return (
    <>
      <table
        className={`
          hidden w-full table-fixed border-spacing-x-[55px] text-left align-top

          [&_td]:py-[28px] [&_td]:align-top

          [&_th]:py-[28px]

          [&_tr]:border-b

          [&_tr>td:not(:nth-child(1))]:ml-[55px] [&_tr>td:nth-child(1)]:font-medium
          [&_tr>td:nth-child(1)]:text-neutral-950

          [&_tr>td]:text-[#474D57]

          xl:table
        `}

        border={1}
      >
        <thead>
          <tr
            className={`
              border-b py-[28px] text-xl

              [&_th]:font-semibold
            `}
          >
            <th colSpan={1}></th>
            <th>{t('header.community')}</th>
            <th>{t('header.trial')}</th>
            <th>{t('header.enterprise')}</th>
          </tr>
        </thead>
        <tbody className="text-base">
          <tr>
            <td>{t('row.development')}</td>
            <td>{t('row.development.community')}</td>
            <td>{t('row.development.trial')}</td>
            <td className="text-[#0FCC65]">
              {t('row.development.enterprise')}
            </td>
          </tr>
          <tr>
            <td>{t('row.collaborative-editing')}</td>
            <td>
              {t('row.collaborative-editing.community')}
              {limitedFeaturesText}
            </td>
            <td>
              {t('row.collaborative-editing.trial')}
              {limitedFeaturesText}
            </td>
            <td className={greenText} style={greenColorStyle}>
              {t('row.collaborative-editing.enterprise')}
            </td>
          </tr>
          <tr>
            <td>{t('row.import-export')}</td>
            <td>
              {t('row.import-export.community')}
              <br></br>
              <br></br>
              {t('row.import-export.community.2')}
            </td>
            <td className={greenText} style={greenColorStyle}>{t('row.import-export.trial')}</td>
            <td className={greenText} style={greenColorStyle}>{t('row.import-export.enterprise')}</td>
          </tr>
          <tr>
            <td>{t('row.printing')}</td>
            <td>{t('row.printing.community')}</td>
            <td>{t('row.printing.trial')}</td>
            <td className={greenText} style={greenColorStyle}>{t('row.printing.enterprise')}</td>
          </tr>
          <tr>
            <td>{t('row.support')}</td>
            <td>{t('row.support.community')}</td>
            <td className={greenText} style={greenColorStyle}>{t('row.support.trial')}</td>
            <td className={greenText} style={greenColorStyle}>{t('row.support.enterprise')}</td>
          </tr>
        </tbody>
      </table>
      <div className="xl:hidden">
        <table
          className={separateTableClass}

          border={1}
        >
          <thead>
            <tr
              className={`
                border-b py-[28px] text-xl

                [&_th]:font-semibold
              `}
            >
              <th colSpan={1}></th>
              <th colSpan={2}>{t('header.community')}</th>
            </tr>
          </thead>
          <tbody className="text-base">
            <tr>
              <td>{t('row.development')}</td>
              <td colSpan={2}>{t('row.development.community')}</td>
            </tr>
            <tr>
              <td>{t('row.collaborative-editing')}</td>
              <td colSpan={2}>
                {t('row.collaborative-editing.community')}
                {limitedFeaturesText}
              </td>
            </tr>
            <tr>
              <td>{t('row.import-export')}</td>
              <td colSpan={2}>
                {t('row.import-export.community')}
                <br></br>
                <br></br>
                {t('row.import-export.community.2')}
              </td>
            </tr>
            <tr>
              <td>{t('row.printing')}</td>
              <td colSpan={2}>{t('row.printing.community')}</td>
            </tr>
            <tr>
              <td>{t('row.support')}</td>
              <td colSpan={2}>{t('row.support.community')}</td>
            </tr>
          </tbody>
        </table>
        <table className={separateTableClass} border={1}>
          <thead>
            <tr
              className={`
                border-b py-[28px] text-xl

                [&_th]:font-semibold
              `}
            >
              <th colSpan={1}></th>
              <th colSpan={2}>{t('header.trial')}</th>
            </tr>
          </thead>
          <tbody className="text-base">
            <tr>
              <td>{t('row.development')}</td>
              <td colSpan={2}>{t('row.development.trial')}</td>
            </tr>
            <tr>
              <td>{t('row.collaborative-editing')}</td>

              <td colSpan={2}>
                {t('row.collaborative-editing.trial')}
                {limitedFeaturesText}
              </td>

            </tr>
            <tr>
              <td>{t('row.import-export')}</td>
              <td colSpan={2} className={greenText} style={greenColorStyle}>{t('row.import-export.trial')}</td>
            </tr>
            <tr>
              <td>{t('row.printing')}</td>
              <td colSpan={2}>{t('row.printing.trial')}</td>
            </tr>
            <tr>
              <td>{t('row.support')}</td>
              <td colSpan={2}className={greenText} style={greenColorStyle}>{t('row.support.trial')}</td>
            </tr>
          </tbody>
        </table>
        <table className={separateTableClass} border={1}>
          <thead>
            <tr
              className={`
                border-b py-[28px] text-xl

                [&_th]:font-semibold
              `}
            >
              <th colSpan={1}></th>
              <th colSpan={2}>{t('header.enterprise')}</th>
            </tr>
          </thead>
          <tbody className="text-base">
            <tr>
              <td>{t('row.development')}</td>
              <td colSpan={2} className="text-[#0FCC65]">
                {t('row.development.enterprise')}
              </td>
            </tr>
            <tr>
              <td>{t('row.collaborative-editing')}</td>
              <td colSpan={2} className={greenText} style={greenColorStyle}>
                {t('row.collaborative-editing.enterprise')}
              </td>
            </tr>
            <tr>
              <td>{t('row.import-export')}</td>
              <td colSpan={2} className={greenText} style={greenColorStyle}>{t('row.import-export.enterprise')}</td>
            </tr>
            <tr>
              <td>{t('row.printing')}</td>
              <td colSpan={2} className={greenText} style={greenColorStyle}>{t('row.printing.enterprise')}</td>
            </tr>
            <tr>
              <td>{t('row.support')}</td>
              <td colSpan={2} className={greenText} style={greenColorStyle}>{t('row.support.enterprise')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
