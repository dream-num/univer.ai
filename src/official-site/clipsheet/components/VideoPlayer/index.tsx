import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import YouTubePlayer from 'youtube-player'

export function VideoPlayer({ src, className, title, videoClassName, enableMask }: { src?: string, className?: string, title?: string, videoClassName?: string, enableMask?: boolean }) {
  const el = useRef<HTMLIFrameElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!typeof window) return
    if (!el.current) return
    if (!enableMask) return

    // subscribe to iframe message events
    const player = YouTubePlayer(el.current)

    player.on('stateChange', (e) => {
      // palying
      if (e.data === 1) {
        setIsPlaying(true)
        // paused
      } else if (e.data === 2) {
        setIsPlaying(false)
      }
    })
  }, [el, enableMask])

  return (
    <>
      <style jsx>
        {`
      .player-box:hover{
        .mask{
          display: none !important;
        }
      }
    `}
      </style>
      <div className={clsx('player-box relative w-full pt-[56.25%]', className)}>
        {enableMask && (
          <div
            className={`
              mask pointer-events-none absolute left-0 top-0 z-[1] h-full w-full rounded-[20px]
              bg-black opacity-40
            `}
            style={{
              display: isPlaying ? 'none' : 'block',
            }}
          >
          </div>
        )}
        <iframe
          ref={el}
          // eslint-disable-next-line react-dom/no-unsafe-iframe-sandbox
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
    </>
  )
}
