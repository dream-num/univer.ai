import { clsx } from '@/lib/utils'

interface IProps {
  className?: string

  children: React.ReactNode
}

export default function Hero(props: IProps) {
  const { className, children } = props

  return (
    <header
      className={clsx('relative flex items-center', className)}
      style={{
        backgroundImage: 'linear-gradient(0deg, transparent 24.5%, #E0E2E5 25%, #E0E2E5 25.5%, transparent 26%, transparent 74.5%, #E0E2E5 75%, #E0E2E5 75.5%, transparent 76%, transparent), linear-gradient(90deg, transparent 24.5%, #E0E2E5 25%, #E0E2E5 25.5%, transparent 26%, transparent 74.5%, #E0E2E5 75%, #E0E2E5 75.5%, transparent 76%, transparent)',
        backgroundSize: '80px 80px',
        backgroundPosition: 'center 20px',
      }}
    >
      <div
        className="absolute left-0 top-0 h-full w-full"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0) 10.52%, rgba(255, 255, 255, 0.8) 70%)',
        }}
      />

      <section className="relative mx-auto max-w-[1200px]">
        {children}
      </section>
    </header>
  )
}
