import { LearnMore } from '@/official-site/clipsheet/components/LearnMore'
import { VideoPlayer } from '@/official-site/clipsheet/components/VideoPlayer'

export function ExtendedReading({ previewVidio }: { previewVidio: string }) {
  return (
    <section
      className={`
        px-[16px] py-[48px]

        xl:py-[100px]
      `}
    >
      <div className="mx-auto flex flex-col items-center justify-start gap-[32px]">
        <div className={`
          flex flex-col items-center justify-center gap-[20px] self-stretch

          xl:gap-[24px]
        `}
        >
          <div className={`
            text-center text-[28px] font-semibold leading-[52px] text-slate-900

            xl:text-5xl
          `}
          >
            Extended Reading
          </div>
          <div className={`
            flex flex-col items-center justify-center

            xl:[16px] xl:flex-row xl:gap-[8px]
          `}
          >
            <div className="text-center text-lg font-normal leading-7 text-slate-900">
              How to Batch Collect Data from Existing Hyperlinks in a Spreadsheet.
            </div>
            <LearnMore href="/clipsheet/tutorials/completion" />
          </div>
        </div>

        <div className={`
          relative w-full

          xl:w-[832px]
        `}
        >
          <VideoPlayer videoClassName="rounded-3xl" src={previewVidio} />
        </div>

      </div>
    </section>
  )
}
