import { useTranslation } from '@/lib/i18n'

export default function PricingTable() {
  const t = useTranslation({
    'en-US': {
      'header.free': 'Free',
      'header.business': 'Business',
      'row.development': 'Development',
      'row.development.free': 'There is no development license fee, and after the project is launched, consider whether to upgrade the business version as needed',
      'row.development.business': 'No development licensing fees, low deployment costs, cost reduction and efficiency',
      'row.collaborative-editing': 'Collaborative Editing',
      'row.collaborative-editing.free': 'Max 50 people or 100 documents',
      'row.collaborative-editing.free.limited-features': '(Limited features)',
      'row.collaborative-editing.business': 'Unlimited',
      'row.import-export': 'Import & Export',
      'row.import-export.free.size-limit': 'Imported documents\' size limited to 1MB',
      'row.import-export.free.cell-limit': 'Export max to 10000 cells each time',
      'row.import-export.business': 'Unlimited',
      'row.printing': 'Printing',
      'row.printing.free': 'Limited to 3 pages each time',
      'row.printing.business': 'Unlimited',
      'row.support': 'Support',
      'row.support.free': 'Community support',
      'row.support.business': 'Service from Univer dev team',
    },
    'zh-CN': {
      'header.free': '免费版',
      'header.business': '商业版',
      'row.development': '开发',
      'row.development.free': '无需开发许可费，后续根据需要考虑是否升级商业版',
      'row.development.business': '无需开发许可费，极低的部署成本，降本增效',
      'row.collaborative-editing': '协同编辑',
      'row.collaborative-editing.free': '最多 50 个用户和 100 篇文档',
      'row.collaborative-editing.free.limited-features': '（有限的功能）',
      'row.collaborative-editing.business': '无限制',
      'row.import-export': '导入 & 导出',
      'row.import-export.free.size-limit': '导入文档的大小上限为 1MB',
      'row.import-export.free.cell-limit': '导出每次最多 10000 个单元格',
      'row.import-export.business': '无限制',
      'row.printing': '打印',
      'row.printing.free': '每篇文档上限 3 页',
      'row.printing.business': '无限制',
      'row.support': '服务支持',
      'row.support.free': '社区支持',
      'row.support.business': '来自 Univer 团队的支持与服务',
    },
  })

  const rowClassName = 'grid grid-cols-12 gap-x-8 border-b border-[#E6E8EB] pb-7 leading-7'

  return (
    <>
      {/* desktop */}
      <section
        className={`
          hidden gap-y-7

          xl:grid
        `}
      >
        <div className={rowClassName}>
          <div className="col-span-4" />
          <div className="col-span-4 text-xl font-semibold">{t('header.free')}</div>
          <div className="col-span-4 text-xl font-semibold">{t('header.business')}</div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.development')}</div>
          <div className="col-span-4">{t('row.development.free')}</div>
          <div className="col-span-4">{t('row.development.business')}</div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.collaborative-editing')}</div>
          <div className="col-span-4">
            {t('row.collaborative-editing.free')}
            <br />
            <span className="text-[#2B4DFF]">{t('row.collaborative-editing.free.limited-features')}</span>
          </div>
          <div className="col-span-4 font-medium text-[#0FCC65]">{t('row.collaborative-editing.business')}</div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.import-export')}</div>
          <div className="col-span-4">
            {t('row.import-export.free.size-limit')}
            <br />
            {t('row.import-export.free.cell-limit')}
          </div>
          <div className="col-span-4 font-medium text-[#0FCC65]">{t('row.import-export.business')}</div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.printing')}</div>
          <div className="col-span-4">{t('row.printing.free')}</div>
          <div className="col-span-4 font-medium text-[#0FCC65]">{t('row.printing.business')}</div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.support')}</div>
          <div className="col-span-4">{t('row.support.free')}</div>
          <div className="col-span-4 font-medium text-[#0FCC65]">{t('row.support.business')}</div>
        </div>
      </section>

      {/* mobile */}
      <section
        className={`
          grid gap-y-7

          xl:hidden
        `}
      >
        {/* Free */}
        <div className={rowClassName}>
          <div className="col-span-12 text-center text-xl font-semibold">{t('header.free')}</div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.development')}</div>
          <div className="col-span-8">{t('row.development.free')}</div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.collaborative-editing')}</div>
          <div className="col-span-8">
            {t('row.collaborative-editing.free')}
            <br />
            <span className="text-[#2B4DFF]">{t('row.collaborative-editing.free.limited-features')}</span>
          </div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.import-export')}</div>
          <div className="col-span-8">
            {t('row.import-export.free.size-limit')}
            <br />
            {t('row.import-export.free.cell-limit')}
          </div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.printing')}</div>
          <div className="col-span-8">{t('row.printing.free')}</div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.support')}</div>
          <div className="col-span-8">{t('row.support.free')}</div>
        </div>

        {/* Business */}
        <div className={rowClassName}>
          <div className="col-span-12 text-center text-xl font-semibold">{t('header.business')}</div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.development')}</div>
          <div className="col-span-8">{t('row.development.business')}</div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.collaborative-editing')}</div>
          <div className="col-span-8 font-medium text-[#0FCC65]">{t('row.collaborative-editing.business')}</div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.import-export')}</div>
          <div className="col-span-8 font-medium text-[#0FCC65]">{t('row.import-export.business')}</div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.printing')}</div>
          <div className="col-span-8 font-medium text-[#0FCC65]">{t('row.printing.business')}</div>
        </div>

        <div className={rowClassName}>
          <div className="col-span-4 font-medium">{t('row.support')}</div>
          <div className="col-span-8 font-medium text-[#0FCC65]">{t('row.support.business')}</div>
        </div>
      </section>
    </>
  )
}
