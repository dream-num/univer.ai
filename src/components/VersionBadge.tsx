import { Badge } from '@radix-ui/themes'

interface IProps {
  version: string
}

export default function VersionBadge(props: IProps) {
  const { version } = props

  return (
    <Badge color="gray" variant="solid" highContrast>
      {version}
    </Badge>
  )
}
