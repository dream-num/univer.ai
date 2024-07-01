import Image from 'next/image'

interface IProps {
  src: string
  alt: string
  width: number
  height: number
}

export default function ImageComponent(props: IProps) {
  const { src, alt, width, height } = props

  return (
    <Image
      className="mx-auto mt-6"
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  )
}
