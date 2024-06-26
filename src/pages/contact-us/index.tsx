import Select, { SelectItem } from '@/official-site/Select'
import DiscordSvg from '@/official-site/clipsheet/components/icons/DiscordSvg'
import GithubSvg from '@/official-site/clipsheet/components/icons/GithubSvg'

export default function ContactUs() {
  return (
    <div className={`
      relative mx-auto px-[16px] pb-[100px] pt-[60px]

      xl:max-w-[1012px] xl:pt-[72.4px]
    `}
    >
      <style global jsx>
        {`
        .site-body {
          background: linear-gradient(91deg, #FCFCFF 0%, #F4F9FF 100%);
          min-height: 100vh;
                }
      `}
      </style>

      <div className={`
        flex flex-col items-start justify-start gap-[100px]

        xl:flex-row
      `}
      >
        <div className="inline-flex flex-col items-start justify-start gap-[68px]">
          <div className="flex flex-col items-start justify-start gap-4">
            <div className={`
              text-center text-italic text-5xl font-semibold leading-[52px] tracking-wide
              text-slate-900 font-italic
            `}
            >
              Contact Us
            </div>
            <div className={`
              text-base font-normal leading-7 text-zinc-600

              xl:w-[344px]
            `}
            >
              Do you have any suggestions or need help? Please contact us, we value your feedback and are happy to serve you.
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="text-xl font-medium leading-loose text-slate-900">Email</div>
            <div className="text-base font-normal leading-7 text-zinc-600">
              {/* <Link className="text-[#2B4DFF] hover:underline" href="mailto:developer@univer.ai">developer@univer.ai</Link> */}
              developer@univer.ai
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-3">
            <div className="text-xl font-medium leading-loose text-slate-900">Social account</div>
            <div className="inline-flex items-start justify-start gap-4">

              <div className="relative h-6 w-6 cursor-pointer">
                <DiscordSvg />
              </div>
              <div className="relative h-6 w-6 cursor-pointer">
                <GithubSvg />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-start gap-4">
          <div className={`
            flex w-full flex-col items-start justify-start gap-4 rounded-2xl bg-white px-6 pb-6 pt-5
            shadow shadow-[0px_4px_12px_0px_rgba(128,152,165,0.16)]
          `}
          >
            <div className="flex w-full flex-col items-start justify-start gap-1">
              <div className="flex h-[52px] flex-col items-start justify-start self-stretch">
                <div className="text-lg font-medium leading-7 text-slate-900">Issue Type</div>

                <div className="self-stretch text-base font-normal leading-normal text-gray-400">Please select the general category of the issue.</div>
              </div>
              <Select defaultValue="extension" placeholder="Please select the general category of the issue.">
                <SelectItem value="extension">Chrome extension</SelectItem>
                <SelectItem value="gpt">GPT extension</SelectItem>
                <SelectItem value="completion">Data completion</SelectItem>
              </Select>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-1">
              <div className="flex h-[52px] flex-col items-start justify-start self-stretch">
                <div className="text-lg font-medium leading-7 text-slate-900">Detailed information</div>
                <div className="self-stretch text-base font-normal leading-normal text-gray-400">Please describe your problem.</div>
              </div>
              <div className={`
                inline-flex w-full items-center justify-start rounded-lg border border-zinc-200
                bg-white px-3 py-2

                xl:w-[520px]
              `}
              >
                <textarea
                  placeholder="Please describe your problem"
                  className={`
                    h-36 shrink grow basis-0 text-base font-normal leading-normal outline-none
                  `}
                >
                </textarea>
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-1">
              <div className="flex h-[52px] flex-col items-start justify-start self-stretch">
                <div className="text-lg font-medium leading-7 text-slate-900">Email</div>
                <div className="self-stretch text-base font-normal leading-normal text-gray-400">Enter your email to receive issue updates.</div>
              </div>
              <div className={`
                inline-flex w-full items-center justify-start rounded-lg border border-zinc-200
                bg-white px-3 py-2

                xl:w-[520px]
              `}
              >
                <input
                  placeholder="Enter your email to receive issue updates"
                  type="email"
                  className="h-6 shrink grow basis-0 text-base font-normal leading-normal"
                />
              </div>
            </div>
          </div>
          <button className={`
            inline-flex items-center justify-center gap-2 self-stretch rounded-[32px]
            bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
            px-6

            active:bg-[#0249ff] active:bg-none

            data-[disabled]:cursor-not-allowed data-[disabled]:opacity-30

            hover:bg-[#0148ff] hover:bg-none
          `}
          >
            <span className="text-base font-semibold capitalize leading-10 text-slate-50">submit</span>
          </button>
        </div>
      </div>

    </div>
  )
}
