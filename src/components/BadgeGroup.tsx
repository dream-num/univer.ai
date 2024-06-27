import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { Badge } from '@radix-ui/themes'

export enum UniverTypes {
  GENERAL,
  SHEET,
  DOC,
  SLIDE,
}

interface IProps {
  value: UniverTypes
  values: UniverTypes[]
}

interface IUniverType {
  title: string
  key: string
  color: 'green' | 'blue' | 'crimson' | 'gray'
}

const univerTypeValues: Record<UniverTypes, IUniverType> = {
  [UniverTypes.GENERAL]: {
    title: '📊📝📽️ Univer General',
    key: 'general',
    color: 'gray',
  },
  [UniverTypes.SHEET]: {
    title: '📊 Univer Sheet',
    key: 'sheet',
    color: 'green',
  },
  [UniverTypes.DOC]: {
    title: '📝 Univer Doc',
    key: 'doc',
    color: 'blue',
  },
  [UniverTypes.SLIDE]: {
    title: '📽️ Univer Slide',
    key: 'slide',
    color: 'crimson',
  },
}

function Link({ type }: { type: IUniverType }) {
  const { pathname } = useRouter()

  const href = useCallback((item: string) => {
    const key = pathname.replace(/.*\/(sheet|doc|slide)\/.*/, '$1')

    return pathname.replace(`/${key}/`, `/${item.toLowerCase()}/`).replace(/\.(\w|-)+$/, '')
  }, [pathname])

  return (
    <a
      className=""
      href={href(type.key)}
    >
      {type.title}
    </a>
  )
}

export default function BadgeGroup(props: IProps) {
  const { values, value } = props

  return (
    <div className="mt-2 flex gap-2 text-sm font-normal">
      {values.map(item => (
        <Badge
          key={item}
          className="inline-flex h-full items-center"
          color={univerTypeValues[item].color}
          variant={item === value ? 'solid' : 'soft'}
        >
          {item === value ? univerTypeValues[item].title : <Link type={univerTypeValues[item]} />}
        </Badge>
      ))}
    </div>
  )
}
