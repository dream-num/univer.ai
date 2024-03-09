import type { Root } from 'mdast'
import type { IFile } from '../types/IFile'

export interface IMarkdownInfo {
  file: IFile
  content: string
  ast: Root | null
  meta: Record<string, any>
  isMdx: boolean
  lang: string

  name: string
  //  name and lang to identify the file
  //  mapping to the target file
  identify: string
  sync?: boolean
}
