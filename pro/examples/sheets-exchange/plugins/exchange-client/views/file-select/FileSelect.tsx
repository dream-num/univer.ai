'use client'

import { Select } from '@univerjs/design'
import { useDependency } from '@wendellhu/redi/react-bindings'
import React, { useState } from 'react'
import { IExchangeService } from '../../services/exchange.service'

export interface IFileSelectProps {
  label: string
}

function isLocalhost(): boolean {
  if (typeof window === 'undefined') return false
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
}

const urlsCN = [
  'https://minio.cnbabylon.com/public/luckysheet/money-manager-2.xlsx',
  'https://minio.cnbabylon.com/public/luckysheet/Activity%20costs%20tracker.xlsx',
  'https://minio.cnbabylon.com/public/luckysheet/House%20cleaning%20checklist.xlsx',
  'https://minio.cnbabylon.com/public/luckysheet/Student%20assignment%20planner.xlsx',
  'https://minio.cnbabylon.com/public/luckysheet/Credit%20card%20tracker.xlsx',
  'https://minio.cnbabylon.com/public/luckysheet/Blue%20timesheet.xlsx',
  'https://minio.cnbabylon.com/public/luckysheet/Student%20calendar%20%28Mon%29.xlsx',
  'https://minio.cnbabylon.com/public/luckysheet/Blue%20mileage%20and%20expense%20report.xlsx',
]

const remoteOrigin = 'https://release-univer.oss-cn-shenzhen.aliyuncs.com'

const urlsEN = typeof window !== 'undefined'
  ? [
  `${remoteOrigin}/_0224xlsx/money-manager-2.xlsx`,
  `${remoteOrigin}/_0224xlsx/Activity%20costs%20tracker.xlsx`,
  `${remoteOrigin}/_0224xlsx/House%20cleaning%20checklist.xlsx`,
  `${remoteOrigin}/_0224xlsx/Student%20assignment%20planner.xlsx`,
  `${remoteOrigin}/_0224xlsx/Credit%20card%20tracker.xlsx`,
  `${remoteOrigin}/_0224xlsx/Blue%20timesheet.xlsx`,
  `${remoteOrigin}/_0224xlsx/Student%20calendar%20(Mon).xlsx`,
  `${remoteOrigin}/_0224xlsx/Blue%20mileage%20and%20expense%20report.xlsx`,
    ]
  : []

function decodeFileNameFromURL(url: string): string {
  // match string like /xxxx.xlsx
  const regex = /\/([^\/]+)(?=\.xlsx)/
  const match = url.match(regex)

  if (match && match[1]) {
    // use decodeURIComponent to decode the file name
    return decodeURIComponent(match[1])
  } else {
    // if no match, return empty string
    return ''
  }
}

const urls = isLocalhost() ? urlsCN : urlsEN

export const FileSelect: React.FC<IFileSelectProps> = ({ label }) => {
  const [selectedUrl, setSelectedUrl] = useState<string>('')
  const exchangeService = useDependency(IExchangeService)

  const options = urls.map(url => ({ value: url, label: decodeFileNameFromURL(url) }))
  options.unshift({ value: '', label: 'Select a file' })

  const handleDownloadClick = async (url: string) => {
    exchangeService.uploadJson(url)
  }

  const handleSelectChange = (value: string) => {
    setSelectedUrl(value)
    handleDownloadClick(value)
  }

  return (
    <div>
      <span className="text-sm">{label}</span>

      <Select value={selectedUrl} options={options} onChange={handleSelectChange} />
    </div>
  )
}
