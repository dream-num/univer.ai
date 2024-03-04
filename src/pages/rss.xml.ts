import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', entry => entry.data.lang === 'en-us'))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

  return rss({
    title: 'Univer Blog',
    description: 'The technical blog of Univer',
    site: context.site!,
    items: posts.map(post => ({
      ...post.data,
      pubDate: post.data.date,
      link: `${post.slug}/`,
    })) as any,
  })
}
