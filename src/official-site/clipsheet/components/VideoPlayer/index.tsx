import clsx from 'clsx'

export function VideoPlayer({ src, className, title, videoClassName }: { src: string, className?: string, title?: string, videoClassName?: string }) {
  return (
    <div className={clsx('relative w-full pt-[56.25%]', className)}>
      <iframe
        sandbox="allow-scripts allow-same-origin allow-presentation"
        className={clsx(`absolute left-0 top-0 block h-full w-full border-0`, videoClassName)}
        src={src}
        title={title || 'Univer Video Player'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      >
      </iframe>
    </div>
  )
}
