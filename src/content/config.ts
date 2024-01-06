import { defineCollection, z } from 'astro:content'
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema'

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    desc: z.string(),
    tags: z.array(z.string()),
    cover: image(),
    date: z.date(),
    author: z.string().default('Anonymous'),
    lang: z.enum(['zh-cn', 'en-us', 'ja-jp'])
  }),
})

export const collections = {
  docs: defineCollection({ schema: docsSchema() }),
  i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
  blog: blogCollection,
}
