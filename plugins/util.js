/** Get Markdown Language */
export function getLangByVFile(VFile) {
  if (VFile.path.includes('en-us')) {
    return 'en-us'
  } else if (VFile.path.includes('ja-jp')) {
    return 'ja-jp'
  } else {
    return 'zh-cn'
  }
}
