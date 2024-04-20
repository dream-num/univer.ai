import { LocaleService } from '@univerjs/core'
import { useDependency } from '@wendellhu/redi/react-bindings'

import { FileDownloadButton } from '../file-download-button/FileDownloadButton'
import { FileSelect } from '../file-select/FileSelect'
import { FileUploadButton } from '../file-upload-button/FileUploadButton'
import styles from './index.module.less'

export interface IOperationsProps {

}

export function Operations(_props: Readonly<IOperationsProps>): JSX.Element {
  const localeService = useDependency(LocaleService)

  return (
    <div className={styles.exchange}>
      <FileUploadButton>{localeService.t('exchange.import')}</FileUploadButton>
      <FileSelect label={localeService.t('exchange.load')} />
      <FileDownloadButton>{localeService.t('exchange.download')}</FileDownloadButton>
    </div>
  )
}
