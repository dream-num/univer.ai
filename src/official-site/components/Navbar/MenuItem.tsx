import { Box, Flex, Grid, Separator, Text } from '@radix-ui/themes'
import { MoreSingle } from '@univerjs/icons'
import Link from 'next/link'
import Dropdown from '@/official-site/components/Dropdown'

interface IProps {
  title: string
  desc?: string
  href?: string
  icon?: string
  items: {
    title: string
    desc: string
    href: string
    icon: string
  }[]
}

export function MenuItem(props: IProps) {
  const { title, desc, href, icon, items } = props

  return (
    <Dropdown
      overlay={(
        <section className="grid w-[340px] gap-2">
          {href && (
            <>
              <Link href={href}>
                <Box
                  className={`
                    rounded px-3 py-2 transition-all

                    hover:bg-blue-50
                  `}
                >
                  <img className="mb-1 h-8" src={icon} alt={title} />
                  <p className="pl-10">{desc}</p>
                </Box>
              </Link>

              <Separator my="2" size="4" />
            </>
          )}

          <Grid gap="1">
            {items.map(item => (
              <Link key={item.title} href={item.href}>
                <Flex
                  className={`
                    gap-4 rounded px-3 py-2

                    hover:bg-blue-50
                  `}
                  align="center"
                >
                  <img className="h-6" src={item.icon} alt={item.title} />
                  <Flex direction="column">
                    <Text weight="medium">{item.title}</Text>
                    <p className="text-gray-400">{item.desc}</p>
                  </Flex>
                </Flex>
              </Link>
            ))}
          </Grid>
        </section>
      )}
    >
      <a className="flex cursor-pointer items-center gap-2">
        {title}
        <MoreSingle className="rotate-90" />
      </a>
    </Dropdown>
  )
}
