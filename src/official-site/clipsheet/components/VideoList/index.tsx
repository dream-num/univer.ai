import { VideoPlayer } from '../VideoPlayer'

export interface IVideo {
  title: string | JSX.Element
  videoSrc: string
}

export function VideoList({ videos }: { videos: IVideo[] }) {
  return (
    <div className={`
      relative mx-auto mb-12

      xl:mb-[100px] xl:max-w-[1200px] xl:px-8
    `}
    >
      <div
        className={`
          grid gap-8

          xl:grid-cols-3
        `}
      >
        {videos.map((video, index) => (
          <div
            key={index + video.videoSrc}
            className="inline-flex flex-col items-start justify-start gap-2"
          >
            <div className={`
              relative w-full

              xl:w-[344px]
            `}
            >
              <VideoPlayer videoClassName="rounded-2xl" src={video.videoSrc} title={video.videoSrc} />
            </div>
            <h3 className={`
              text-center text-lg font-medium capitalize leading-7 text-slate-900
            `}
            >
              {video.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}
