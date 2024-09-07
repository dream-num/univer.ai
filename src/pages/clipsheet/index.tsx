import Hero from '@/components/Hero'
import ShineBorder from '@/components/ShineBorder'
import Title from '@/components/Title'
import { useTranslation } from '@/lib/i18n'
import { clsx } from '@/lib/utils'
import { VideoPlayer } from '@/official-site/clipsheet/components/VideoPlayer'
// import { CheckMarkSingle, CrownSingle, GithubSingle40, IncreaseSingle, NextSingle } from '@univerjs/icons'
import { GithubSingle40, IncreaseSingle, NextSingle } from '@univerjs/icons'
import Head from 'next/head'

import Link from 'next/link'
import { useCallback, useState } from 'react'

export default function Page() {
  // const [paymentPlan, setPaymentPlan] = useState<'monthly' | 'yearly'>('yearly')
  const [collapsedIds, setCollapsedIds] = useState<number[]>([])

  const enUs = {
    'hero.ai-driven': 'AI-Driven',
    'hero.web-to-sheet': 'One-Click Web Scraping Solution',
    'videos.title-1': 'One-Click Web Scraping Solution',
    'faq.title-1': 'Where is the Univer community? How can I get help?',
    'faq.desc-1': (
      <span>
        Community group:
        {' '}
        <Link className="text-[#2B4DFF] hover:underline" href="https://discord.gg/FaHvP4DwyX">discord</Link>
      </span>
    ) as unknown as string,
    'faq.title-2': 'I used Univer ClipSheet to extract table data with hyperlinks, but I want to further extract data from these hyperlinks. How can I do that?',
    'faq.desc-2': (
      <span>
        You can use the data completion feature in Univer Sheet to achieve bulk extraction of detailed information.
        {' '}
        <Link className="text-[#2B4DFF] hover:underline" href="/clipsheet/tutorials/completion">Read more details.</Link>
      </span>
    ) as unknown as string,
    'faq.title-3': 'Do I need a ChatGPT/OpenAI account or API key to use Univer ClipSheet?',
    'faq.desc-3': 'No, you do not need a ChatGPT/OpenAI account. We select the most suitable AI engine to achieve the best data extraction results for you.',
    'faq.title-4': 'Is my data secure when using Univer ClipSheet?',
    'faq.desc-4': 'We guarantee that we will not use your collected data in any way. Your data security is our top priority.',
  }
  const t = useTranslation({
    'en-US': enUs,
    'zh-CN': enUs,
  })

  const faq = [{
    title: t('faq.title-1'),
    desc: t('faq.desc-1'),
  }, {
    title: t('faq.title-2'),
    desc: t('faq.desc-2'),
  }, {
    title: t('faq.title-3'),
    desc: t('faq.desc-3'),
  }, {
    title: t('faq.title-4'),
    desc: t('faq.desc-4'),
  }]

  const handleToggleCollapse = useCallback((id: number) => {
    return () => {
      setCollapsedIds((prev) => {
        if (prev.includes(id)) {
          return prev.filter(_id => _id !== id)
        } else {
          return [...prev, id]
        }
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Univer Clipsheet - AI-Driven One-Click Web Scraping Solution</title>
        <meta name="description" content="Effortlessly organize public information from e-commerce sites, social media, news, finance, and more into spreadsheets with Univer Clipsheet. No coding required." />
        <meta name="keywords" content="AI web scraping, data extraction, e-commerce data, social media scraping, news data, finance data, spreadsheet automation" />
        <link rel="canonical" href="https://univer.ai/clipsheet" />
        <meta property="og:title" content="Univer Clipsheet - AI-Driven One-Click Web Scraping Solution" />
        <meta property="og:description" content="Effortlessly organize public information from various websites into spreadsheets." />
        {/* <meta property="og:image" content="URL to your image" /> */}
        <meta property="og:url" content="https://univer.ai/clipsheet" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Univer Clipsheet - AI-Driven One-Click Web Scraping Solution" />
        <meta name="twitter:description" content="Organize web data into spreadsheets with a single click." />
        {/* <meta name="twitter:image" content="URL to your image" /> */}
      </Head>

      <main className="bg-[linear-gradient(180deg,#FFF_0.5%,#F6F9FF_100%)]">
        <Hero
          className={`
            mb-[36px] pb-[80px]

            xl:mb-[60px]
          `}
        >

          <div
            className={`
              mt-[60px]

              xl:mt-[72px]
            `}
          >

          </div>
          <div className="flex justify-center gap-6">
            <Link href="https://github.com/dream-num/univer" target="_blank" rel="noopener noreferrer">
              <ShineBorder
                className="mx-auto mb-7 px-4 py-1.5"
                color={['#0048FF', '#0C81ED', '#029DCE', '#00BBB0', '#00C5A8']}
                borderRadius={999}
                animate
              >
                <span className="inline-flex items-center gap-1 text-base font-medium">
                  Powered by Univer OSS
                  <NextSingle className="h-5 w-5" />
                  <GithubSingle40 className="h-6 w-6" />
                </span>
              </ShineBorder>
            </Link>
          </div>

          <div
            className={`
              mb-[20px]

              xl:mb-[28px]
            `}
          />

          <h1
            className={`
              mb-7 text-center text-5xl/tight font-bold italic leading-[68px] text-slate-900

              xl:mt-0 xl:text-6xl
            `}
          >
            {t('hero.ai-driven')}

            <br />
            <span
              className={`
                inline-block
                bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
                bg-clip-text px-4 py-2 text-transparent
              `}
            >
              {t('hero.web-to-sheet')}
            </span>
          </h1>

          <a
            className={`
              mx-auto flex h-10 w-[204px] items-center justify-center gap-2 rounded-full
              bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
              font-medium text-white
            `}
            href="https://chromewebstore.google.com/detail/univer-clipsheet-ai-drive/mbcpbomfebacllmjjefeifejbbibbope"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/univer-workspace/chrome-icon.svg" />
            Add To Chrome
          </a>
        </Hero>

        {/* Preview */}
        <section
          className={`
            mt-[-36px] px-4

            xl:mt-[-60px]
          `}
        >
          <div
            className={`
              relative mx-auto

              xl:w-[960px]
            `}
          >
            <VideoPlayer videoClassName="rounded-3xl" src="https://www.youtube.com/embed/E7-2S52dF0k?enablejsapi=1&si=aBiGTAGDNBWabFle" />
          </div>

          <div
            className={`
              mb-[48px]

              xl:mb-[100px]
            `}
          />
        </section>

        {/* Pricing */}
        {/* <section
          className={`
            px-4

            xl:mx-auto xl:max-w-[1200px]
          `}
        >
          <h2 className="mb-6 self-stretch text-center text-[48px] font-semibold">Pricing</h2>

          <div className="mb-10 flex justify-center">
            <div className="inline-flex items-center">
              <span className="mr-2 text-sm font-medium text-gray-900">
                Monthly
              </span>
              <label className="inline-flex cursor-pointer items-center">
                <input
                  className="peer sr-only"
                  type="checkbox"
                  checked={paymentPlan === 'yearly'}
                  onChange={() => setPaymentPlan(paymentPlan === 'yearly' ? 'monthly' : 'yearly')}
                />
                <div
                  className={`
                    peer relative h-4 w-7 rounded-full bg-gray-200

                    after:absolute after:start-[2px] after:top-[2px] after:h-3 after:w-3
                    after:rounded-full after:border after:border-gray-300 after:bg-white
                    after:transition-all after:content-['']

                    peer-checked:bg-blue-600 peer-checked:after:translate-x-full
                    peer-checked:after:border-white

                    peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300

                    rtl:peer-checked:after:-translate-x-full
                  `}
                />
                <span className="ml-2 text-sm font-medium text-gray-900">
                  Yearly

                  <span
                    className={`
                      ml-2
                      bg-[linear-gradient(130deg,_#0048FF_42.85%,_#0C81ED_55.24%,_#029DCE_67.39%,_#00BBB0_76.08%,_#00C5A8_80.61%)]
                      bg-clip-text text-center text-[16px] font-semibold text-transparent
                    `}
                  >
                    Save 25%
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div
            className={`
              mb-[100px] flex flex-col justify-center gap-[52px]

              xl:flex-row
            `}
          >
            <section
              className={`
                rounded-[24px] border bg-white p-6

                xl:w-[396px]
              `}
            >
              <header className="mb-7">
                <label className="mb-7 block text-[16px] font-medium">Free</label>
                <span className="text-center text-[40px] font-semibold leading-none tracking-[3px]">$0</span>
                <small className="text-center text-base text-[#474D57]">Free</small>
                <p className="mb-5 mt-3">Perfect plan for starters.</p>
                <a
                  className={`
                    flex h-[40px] items-center justify-center rounded-3xl bg-[#474D57] text-white
                  `}
                  href="https://chromewebstore.google.com/detail/univer-clipsheet-ai-drive/mbcpbomfebacllmjjefeifejbbibbope"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started
                </a>
              </header>

              <div>
                <div className="mb-5">
                  <label className="text-sm font-medium text-[#1E222B]">Web Table Extraction</label>
                  <div className="text-[#7A7A7A]">
                    <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                      <span>Extraction rate</span>
                      <span className="text-[#0FCC65]">30/Day</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                      <span>Server extraction history</span>
                      <span><CheckMarkSingle style={{ color: '#0FCC65' }} /></span>
                    </div>
                    <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                      <span>Tabs per extraction</span>
                      <span className="text-[#0FCC65]">3</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                      <span>Targeted extraction</span>
                      <span><CheckMarkSingle style={{ color: '#0FCC65' }} /></span>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="text-sm font-medium text-[#1E222B]">Search</label>
                  <div className="text-[#7A7A7A]">
                    <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                      <span>Standard search rate</span>
                      <span className="text-[#0FCC65]">Unlimited</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                      <span>Pro searchs rate</span>
                      <span className="text-[#0FCC65]">10/4 Hour</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                      <span>Available AI models</span>
                      <span className="text-[#0FCC65]">Standard AI</span>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="text-sm font-medium text-[#1E222B]">Drill-down Extraction</label>
                  <div className="text-[#7A7A7A]">
                    <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                      <span>Rows limited per extraction</span>
                      <span className="text-[#0FCC65]">100</span>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="text-sm font-medium text-[#1E222B]">Workspace</label>
                  <div className="text-[#7A7A7A]">
                    <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                      <span>File management</span>
                      <span><CheckMarkSingle style={{ color: '#0FCC65' }} /></span>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <label className="text-sm font-medium text-[#1E222B]">File storage</label>
                  <div className="text-[#7A7A7A]">
                    <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                      <span>File retention time(Day)</span>
                      <span className="text-[#0FCC65]">Unlimited</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#1E222B]">Univer Sheet Features</label>
                  <div className="text-[#7A7A7A]">
                    <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                      <span>Basic features</span>
                      <span><CheckMarkSingle style={{ color: '#0FCC65' }} /></span>
                    </div>
                    <div className="flex justify-between py-3 text-sm">
                      <span>History</span>
                      <span><CheckMarkSingle style={{ color: '#0FCC65' }} /></span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section
              className={`
                rounded-[24px] border
                bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
                p-[3px] shadow-[0_6px_48px_0_rgba(12,34,67,0.12)]
              `}
            >
              <div
                className={`
                  rounded-[20px] bg-white p-6

                  xl:w-[396px]
                `}
              >
                <header className="mb-7">
                  <label className="mb-7 flex gap-[6px] text-[16px] font-medium">
                    Plus
                    {paymentPlan === 'yearly'
                      ? (
                          <span
                            className={`
                              flex h-[24px] items-center justify-center gap-1 rounded-[6px] border
                              border-[rgba(15,204,101,0.08)] bg-[rgba(15,204,101,0.08)] p-0 px-2
                              text-xs text-[#0FCC65]
                            `}
                          >
                            <img src="/images/univer-workspace/save-icon.svg" />
                            Most popular Save 25%
                          </span>
                        )
                      : (
                          <span
                            className={`
                              flex h-[24px] items-center justify-center gap-1 rounded-[6px] border
                              bg-[rgba(39,79,238,0.08)] p-0 px-2 text-xs text-[#274FEE]
                            `}
                          >
                            <img src="/images/univer-workspace/hot-icon.svg" />
                            Limited-Time Offer
                          </span>
                        )}
                  </label>
                  <span className="flex text-[40px] font-semibold leading-none">
                    <span className="mr-[6px]">
                      <small
                        className={`
                          mr-1 text-xl font-medium text-[#474D57] line-through decoration-from-font
                        `}
                      >
                        $20
                      </small>
                      $
                      {paymentPlan === 'yearly' ? '14.99' : '7.99'}
                    </span>
                    {paymentPlan === 'yearly'
                      ? (
                          <small className="self-end text-base font-normal text-[#474D57]">/ month</small>
                        )
                      : (
                          <small className="text-sm font-normal text-[#474D57]">
                            First month, $20 for the next month
                          </small>
                        )}
                  </span>
                  <p className="mb-5 mt-3">Best for professionals.</p>
                  <a
                    className={`
                      flex h-[40px] items-center justify-center gap-2 rounded-3xl
                      bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
                      text-white
                    `}
                    href="https://space.univer.ai/settings/plans"
                  >
                    <CrownSingle />
                    Subscribe Now
                  </a>
                </header>

                <div>
                  <div className="mb-5">
                    <label className="text-sm font-medium text-[#1E222B]">Web Table Extraction</label>
                    <div className="text-[#7A7A7A]">
                      <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                        <span>Extraction rate</span>
                        <span className="text-[#0FCC65]">Unlimited</span>
                      </div>
                      <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                        <span>Server extraction history</span>
                        <span><CheckMarkSingle style={{ color: '#0FCC65' }} /></span>
                      </div>
                      <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                        <span>Tabs per extraction</span>
                        <span className="text-[#0FCC65]">Unlimited</span>
                      </div>
                      <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                        <span>Targeted extraction</span>
                        <span><CheckMarkSingle style={{ color: '#0FCC65' }} /></span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="text-sm font-medium text-[#1E222B]">Search</label>
                    <div className="text-[#7A7A7A]">
                      <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                        <span>Standard search rate</span>
                        <span className="text-[#0FCC65]">Unlimited</span>
                      </div>
                      <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                        <span>Pro searchs rate</span>
                        <span className="text-[#0FCC65]">200/Day</span>
                      </div>
                      <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                        <span>Available AI models</span>
                        <span className="text-right text-[#0FCC65]">Select your perfered AI models</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="text-sm font-medium text-[#1E222B]">Drill-down Extraction</label>
                    <div className="text-[#7A7A7A]">
                      <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                        <span>Rows limited per extraction</span>
                        <span className="text-[#0FCC65]">Unlimited</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="text-sm font-medium text-[#1E222B]">Workspace</label>
                    <div className="text-[#7A7A7A]">
                      <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                        <span>File management</span>
                        <span><CheckMarkSingle style={{ color: '#0FCC65' }} /></span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="text-sm font-medium text-[#1E222B]">File storage</label>
                    <div className="text-[#7A7A7A]">
                      <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                        <span>File retention time(Day)</span>
                        <span className="text-[#0FCC65]">Unlimited</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#1E222B]">Univer Sheet Features</label>
                    <div className="text-[#7A7A7A]">
                      <div className="flex justify-between border-b border-[#E5E5E5] py-3 text-sm">
                        <span>Basic features</span>
                        <span><CheckMarkSingle style={{ color: '#0FCC65' }} /></span>
                      </div>
                      <div className="flex justify-between py-3 text-sm">
                        <span>History</span>
                        <span><CheckMarkSingle style={{ color: '#0FCC65' }} /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section> */}

        {/* FAQ */}
        <section
          className={`
            relative mx-auto mb-[60px] px-4

            xl:mb-[100px] xl:max-w-[1200px] xl:px-8
          `}
        >
          <Title type="univer" label="FAQ" />

          <div
            className={`
              mx-auto grid gap-6 pb-[32px]

              xl:w-[770px] xl:pb-[100px]
            `}
          >
            {faq.map((item, index) => (
              <div
                key={item.title}
                className={`
                  rounded-2xl bg-white p-6 shadow-[0px_4px_12px_0px_rgba(128,152,165,0.16)]
                `}
              >
                <h3 className="flex items-center justify-between gap-4 py-2 text-xl font-medium">
                  {item.title}

                  <a
                    className={clsx(`
                      cursor-pointer text-[#2B4DFF] transition-all duration-300 ease-in-out
                    `, {
                      'rotate-45': collapsedIds.includes(index),
                    })}
                    onClick={handleToggleCollapse(index)}
                  >
                    <IncreaseSingle />
                  </a>
                </h3>
                <p
                  className={clsx(`
                    max-h-0 overflow-hidden leading-7 transition-[max-height] duration-500
                    ease-in-out
                  `, {
                    'max-h-screen': collapsedIds.includes(index),
                  })}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
