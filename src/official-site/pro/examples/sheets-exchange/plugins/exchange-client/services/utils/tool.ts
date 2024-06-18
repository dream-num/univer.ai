export function downloadBlob(blob: Blob, filename: string = 'download') {
  // Create blob object URL
  const url = window.URL.createObjectURL(blob)

  downloadFile(url, filename)

  window.URL.revokeObjectURL(url)
}

export function downloadFile(url: string, filename: string) {
  const a = document.createElement('a')
  a.href = url
  a.style.display = 'none'

  // set the filename
  a.download = `${filename}.xlsx`

  // trigger download
  document.body.appendChild(a)
  a.click()

  // clean up
  document.body.removeChild(a)
}

export function getUploadXlsxFile() {
  return new Promise((resolve: (file: File | null) => void) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

    input.addEventListener('change', (evt) => {
      const element = evt.currentTarget as HTMLInputElement

      if (!element.files || element.files.length === 0) {
        throw new Error('No file selected')
      }

      resolve(element.files[0])
    })

    input.click()
  })
}

export function blobToString(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsText(blob)
  })
}

export function jsonStringToFile(str: string): File {
  const blob = new Blob([str], { type: 'plain/text' })
  return new File([blob], 'file.text')
}

export function replaceType(path: string, type: string): string {
  return path.replace('{type}', type)
}

export function replaceTaskID(path: string, taskID: string): string {
  return path.replace('{taskID}', taskID)
}

export function replaceFileID(path: string, fileID: string): string {
  return path.replace('{fileID}', fileID)
}
