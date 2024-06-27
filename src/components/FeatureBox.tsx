interface IProps {
  features: {
    title: string
    description: string
  }[]
}

export default function FeatureBox(props: IProps) {
  const { features } = props

  return (
    <ul className={`
      mt-6 grid grid-cols-1 gap-x-4 gap-y-6

      md:grid-cols-3
    `}
    >
      {features.map(feature => (
        <li key={feature.title}>
          <strong className="mb-2 block text-base font-semibold">{feature.title}</strong>
          <p className="text-sm leading-relaxed">{feature.description}</p>
        </li>
      ))}
    </ul>
  )
}
