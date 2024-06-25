export interface IVideo {
  title: string
  videoSrc: string
}

export function VideoList({ videos }: { videos: IVideo[] }) {
  return (
    <div className={`
      relative mx-auto mb-12 px-4

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
            <iframe
              className={`
                relative h-[193px] w-full rounded-2xl border-0

                xl:w-[344px]
              `}
              src={video.videoSrc || 'about:blank'}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            >
            </iframe>

            <h3 className={`
              text-center font-['Poppins'] text-lg font-medium capitalize leading-7 text-slate-900
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
