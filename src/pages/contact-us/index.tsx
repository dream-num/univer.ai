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
              text-slate-900
            `}
            >
              Contact Us
            </div>
            <div className="w-[344px] text-base font-normal leading-7 text-zinc-600">Do you have any suggestions or need help? Please contact us, we value your feedback and are happy to serve you.</div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="text-xl font-medium leading-loose text-slate-900">Email</div>
            <div className="w-[344px] text-base font-normal leading-7 text-zinc-600">developer@univer.ai</div>
          </div>
          <div className="flex flex-col items-start justify-start gap-3">
            <div className="text-xl font-medium leading-loose text-slate-900">Social account</div>
            <div className="inline-flex items-start justify-start gap-4">
              <div className="relative h-6 w-6">
                <div className="absolute left-0 top-0 h-6 w-6 bg-zinc-300" />
              </div>
              <div className="relative h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="inline-flex flex-col items-start justify-start gap-4">
          <div className={`
            flex flex-col items-start justify-start gap-4 rounded-2xl bg-white px-6 pb-6 pt-5 shadow
            shadow-[0px_4px_12px_0px_rgba(128,152,165,0.16)]
          `}
          >
            <div className="flex flex-col items-start justify-start gap-1">
              <div className="flex h-[52px] flex-col items-start justify-start self-stretch">
                <div className="text-lg font-medium leading-7 text-slate-900">Issue Type</div>
                <div className="self-stretch text-base font-normal leading-normal text-gray-400">Please select the general category of the issue.</div>
              </div>
              <div className={`
                inline-flex w-[520px] items-center justify-start gap-2 rounded-lg border
                border-zinc-200 bg-white px-3 py-2
              `}
              >
                <div className={`
                  h-6 shrink grow basis-0 text-base font-normal leading-normal text-slate-900
                `}
                >
                  Chrome extension
                </div>
                <div className="relative h-6 w-6" />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <div className="flex h-[52px] flex-col items-start justify-start self-stretch">
                <div className="text-lg font-medium leading-7 text-slate-900">Detailed information</div>
                <div className="self-stretch text-base font-normal leading-normal text-gray-400">Please describe your problem.</div>
              </div>
              <div className={`
                inline-flex w-[520px] items-center justify-start rounded-lg border border-zinc-200
                bg-white px-3 py-2
              `}
              >
                <div className="h-36 shrink grow basis-0 text-base font-normal leading-normal">Please describe your problem</div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <div className="flex h-[52px] flex-col items-start justify-start self-stretch">
                <div className="text-lg font-medium leading-7 text-slate-900">Email</div>
                <div className="self-stretch text-base font-normal leading-normal text-gray-400">Enter your email to receive issue updates.</div>
              </div>
              <div className={`
                inline-flex w-[520px] items-center justify-start rounded-lg border border-zinc-200
                bg-white px-3 py-2
              `}
              >
                <div className="h-6 shrink grow basis-0 text-base font-normal leading-normal">Enter your email to receive issue updates</div>
              </div>
            </div>
          </div>
          <div className={`
            inline-flex items-center justify-center gap-2 self-stretch rounded-[32px]
            bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
            px-6
          `}
          >
            <div className="text-base font-semibold capitalize leading-10 text-slate-50">submit</div>
          </div>
        </div>
      </div>

    </div>
  )
}
