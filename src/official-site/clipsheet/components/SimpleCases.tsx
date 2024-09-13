import type { IVideo } from '@/official-site/clipsheet/components/VideoList'
import { LearnMore } from '@/official-site/clipsheet/components/LearnMore'
import { VideoList } from '@/official-site/clipsheet/components/VideoList'

export function SimpleCases({ videos }: { videos: IVideo[] }) {
  return (
    <section
      className={`
        bg-[#f5f9fe] px-[16px] pb-[32px] pt-[28px]

        xl:py-[88px]
      `}
    >

      <div className="relative">
        <div className={`
          mx-auto flex flex-col items-center gap-9

          xl:w-[1136px] xl:flex-row xl:justify-between
        `}
        >
          <div className="text-[28px] font-semibold leading-9 text-slate-900">Simple Cases</div>
          <LearnMore href="/clipsheet#gpt" />
        </div>

      </div>

      <div className={`
        mb-[32px]

        xl:mb-[60px]
      `}
      >
      </div>

      <VideoList videos={videos} />

    </section>
  )
}
