import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DiscordSingle40, GithubSingle40, Loading } from '@univerjs/icons'
import Select, { SelectItem } from '@/components/Select'
import { useToast } from '@/components/Toast'
import { useLoadingState } from '@/official-site/hooks/useLoadingState'
import { IssueType, issueTypeOptions } from '@/official-site/config/issueTypes'

export default function ContactUs() {
  const router = useRouter()
  const { asPath } = router

  const { showToast, toastElement } = useToast()

  const { loading, withLoading } = useLoadingState()

  const [form, setForm] = useState({
    product: IssueType.clipsheet satisfies IssueType as IssueType,
    content: '',
    email: '',
  })

  type IFormData = typeof form

  const [errors, setErrors] = useState({
    product: '',
    content: '',
    email: '',
  } as Record<keyof IFormData, string>)

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash

      issueTypeOptions.forEach((item) => {
        if (hash === `#${item.value}`) {
          setForm(form => ({
            ...form,
            product: item.value,
          }))
        }
      })
    }

    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [asPath])

  const setField = (field: keyof IFormData, value: string) => {
    setForm({
      ...form,
      [field]: value,
    })
  }

  const resetForm = () => {
    setField('content', '')
  }

  const setError = (field: keyof IFormData, error: string) => {
    setErrors({
      ...errors,
      [field]: error,
    })
  }

  const resetError = (field: keyof IFormData) => {
    setError(field, '')
  }

  const submit = async () => {
    if (loading) return

    if (!form.content) {
      setError('content', 'Please fill in the content.')
      return
    }
    if (!form.email) {
      setError('email', 'Please fill in the email.')
      return
    }
    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(form.email)) {
      setError('email', 'Please fill in the correct email format.')
      return
    }
    const host = window.location.host
    const isSecure = window.location.protocol === 'https:'
    const httpProtocol = isSecure ? 'https' : 'http'

    try {
      await withLoading(
        fetch(`${httpProtocol}://${host}/universer-api/survey`, {
          method: 'POST',
          body: JSON.stringify(form),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(res => res.json()),
      )

      resetForm()
      showToast('Submitted successfully! We will give you feedback in time.', {
        duration: 6000,
      })
    } catch (e) {
      console.error(e)
      showToast('Submission failed, please try again later.', {
        type: 'error',
        duration: 6000,
      })
    }
  }

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
      {toastElement}

      <div className={`
        flex flex-col items-start justify-start gap-[32px]

        xl:flex-row xl:gap-[100px]
      `}
      >
        <div className={`
          inline-flex flex-col items-start justify-start gap-[32px]

          xl:gap-[68px]
        `}
        >
          <div className="flex flex-col items-start justify-start gap-4">
            <div className={`
              text-[28px] font-semibold italic leading-[52px] tracking-wide text-slate-900

              xl:text-5xl
            `}
            >
              Contact Us
            </div>
            <div className={`
              text-16px font-normal leading-7 text-[#474D57]

              xl:w-[344px] xl:text-base
            `}
            >
              Do you have any suggestions or need help? Please contact us, we value your feedback and are happy to serve you.
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="text-xl font-medium leading-loose text-slate-900">Email</div>
            <div className="text-base font-normal leading-7 text-[#474D57]">
              {/* <Link className="text-[#2B4DFF] hover:underline" href="mailto:developer@univer.ai">developer@univer.ai</Link> */}
              developer@univer.ai
            </div>
          </div>
          <div className="flex flex-col items-start justify-start gap-3">
            <div className="text-xl font-medium leading-loose text-slate-900">Social account</div>
            <div className="inline-flex items-start justify-start gap-4">
              <Link
                href="https://discord.gg/FaHvP4DwyX"
                className="relative h-6 w-6 cursor-pointer"
              >
                <DiscordSingle40 className="h-[24px] w-[24px] text-[#5765f2]" />
              </Link>
              <Link
                href="https://github.com/dream-num/univer/discussions"
                className="relative h-6 w-6 cursor-pointer"
              >
                <GithubSingle40 className="h-[24px] w-[24px] text-[[#0f172a]" />
              </Link>
            </div>
          </div>
        </div>
        <form
          className="flex w-full flex-col items-start justify-start gap-[16px]"
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
        >
          <div className={`
            flex w-full flex-col items-start justify-start gap-[16px] rounded-[16px] bg-white
            px-[24px] pb-[24px] pt-[20px] shadow shadow-[0px_4px_12px_0px_rgba(128,152,165,0.16)]
          `}
          >
            <div className="flex w-full flex-col items-start justify-start gap-1">
              <div className="flex flex-col items-start justify-start self-stretch">
                <div className="text-[18px] font-medium leading-7 text-slate-900">Issue Type</div>

                <div className="self-stretch text-base font-normal leading-normal text-gray-400">Please select the general category of the issue.</div>
              </div>
              <Select value={form.product} onValueChange={val => setField('product', val)}>
                {issueTypeOptions.map(item => (
                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
              </Select>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-1">
              <div className="flex flex-col items-start justify-start self-stretch">
                <div className="text-[18px] font-medium leading-7 text-slate-900">Detailed information</div>
                <div className="self-stretch text-base font-normal leading-normal text-gray-400">Please describe your problem.</div>
              </div>
              <div className={`
                inline-flex w-full items-center justify-start rounded-lg border border[#DEE1E5]
                bg-white px-3 py-2

                xl:w-[520px]
              `}
              >
                <textarea
                  value={form.content}
                  maxLength={1000}
                  className={`
                    h-36 shrink grow basis-0 text-base font-normal leading-normal outline-none
                  `}
                  onInput={(e) => {
                    setField('content', (e.target as HTMLTextAreaElement).value)
                    resetError('content')
                  }}
                >
                </textarea>
              </div>
              {errors.content && (
                <div className="mt-[4px] text-[13px] font-normal leading-none text-rose-500">
                  {errors.content}
                </div>
              )}
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-1">
              <div className="flex flex-col items-start justify-start self-stretch">
                <div className="text-[18px] font-medium leading-7 text-slate-900">Email</div>
                <div className="self-stretch text-base font-normal leading-normal text-gray-400">Enter your email to receive issue updates.</div>
              </div>
              <div className={`
                inline-flex w-full items-center justify-start rounded-lg border border[#DEE1E5]
                bg-white px-3 py-2

                xl:w-[520px]
              `}
              >
                <input
                  value={form.email}
                  maxLength={100}
                  type="email"
                  className="h-6 shrink grow basis-0 text-base font-normal leading-normal"
                  onInput={(e) => {
                    setField('email', (e.target as HTMLInputElement).value)
                    resetError('email')
                  }}
                />
              </div>
              {errors.email && (
                <div className="mt-[4px] text-[13px] font-normal leading-none text-rose-500">
                  {errors.email}
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`
              inline-flex items-center justify-center gap-2 self-stretch rounded-[32px]
              bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
              px-6

              active:bg-[#0249ff] active:bg-none

              data-[disabled]:cursor-not-allowed data-[disabled]:opacity-30
              data-[disabled]:hover:bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]

              hover:bg-[#0148ff] hover:bg-none
            `}
          >
            {loading && (<Loading className="h-[16px] w-[16px] animate-spin" />)}
            <span className="text-base font-semibold capitalize leading-10 text-slate-50">submit</span>
          </button>
        </form>
      </div>

    </div>
  )
}
