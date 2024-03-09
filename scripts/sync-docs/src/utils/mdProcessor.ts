import { remark } from 'remark'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdx from 'remark-mdx'

export const mdProcessor = remark().use(remarkFrontmatter)
export const mdxProcessor = remark().use(remarkFrontmatter).use(remarkMdx)
