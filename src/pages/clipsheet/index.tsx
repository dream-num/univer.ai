import Head from 'next/head'
import { GithubSingle40, IncreaseSingle, NextSingle } from '@univerjs/icons'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { clsx } from '@/lib/utils'
import Hero from '@/components/Hero'
import Title from '@/components/Title'
import { useTranslation } from '@/lib/i18n'
import Switch from '@/components/Switch'

import google from '@/official-site/images/google.svg'
import chatgpt from '@/official-site/images/chatgpt.svg'
import type { IVideo } from '@/official-site/clipsheet/components/VideoList'
import { VideoList } from '@/official-site/clipsheet/components/VideoList'
import { VideoPlayer } from '@/official-site/clipsheet/components/VideoPlayer'
import ShineBorder from '@/components/ShineBorder'

export default function Page() {
  const [collapsedIds, setCollapsedIds] = useState<number[]>([])

  const router = useRouter()
  const { asPath } = router

  const enUs = {
    'hero.ai-driven': 'AI-Driven',
    'hero.web-to-sheet': 'Web to Spreadsheet',
    'hero.next-generation': 'of the Next Generation',
    'videos.title-1': 'AI-Driven Web to Spreadsheet',
    'faq.title-1': 'Where is the Univer community? How can I get help?',
    'faq.desc-1': (
      <span>
        Community group:
        <Link className="text-[#2B4DFF] hover:underline" href="https://discord.gg/FaHvP4DwyX">discord</Link>
      </span>
    ) as unknown as string,
    'faq.title-2': 'I used Univer ClipSheet to extract table data with hyperlinks, but I want to further extract data from these hyperlinks. How can I do that?',
    'faq.desc-2': (
      <span>
        You can use the data completion feature in Univer Sheet to achieve bulk extraction of detailed information.
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

  const intailValue = 'left'
  const [heroVideoFlag, setHeroVideoFlag] = useState<'left' | 'right'>(intailValue)
  const [videoListFlag, setVideosFlag] = useState<'left' | 'right'>(intailValue)

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#gpt') {
        setHeroVideoFlag('right')
        setVideosFlag('right')
      }
    }

    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [asPath])

  const previewVidio = heroVideoFlag === 'left' ? 'https://www.youtube.com/embed/MxDMCKNx8P4?enablejsapi=1&si=aBiGTAGDNBWabFle' : 'https://www.youtube-nocookie.com/embed/n0i3rvEmfVg?enablejsapi=1&si=htcqrq6OWRjMt1yl'
  const defaultVideo = videoListFlag === 'left' ? 'https://www.youtube.com/embed/MxDMCKNx8P4?enablejsapi=1&si=aBiGTAGDNBWabFle' : 'https://www.youtube-nocookie.com/embed/n0i3rvEmfVg?enablejsapi=1&si=htcqrq6OWRjMt1yl'

  const videos: IVideo[] = [{
    videoSrc: defaultVideo,
    title: t('videos.title-1'),
  }, {
    videoSrc: defaultVideo,
    title: t('videos.title-1'),
  }, {
    videoSrc: defaultVideo,
    title: t('videos.title-1'),
  }, {
    videoSrc: defaultVideo,
    title: t('videos.title-1'),
  }, {
    videoSrc: defaultVideo,
    title: t('videos.title-1'),
  }, {
    videoSrc: defaultVideo,
    title: t('videos.title-1'),
  }, {
    videoSrc: defaultVideo,
    title: t('videos.title-1'),
  }, {
    videoSrc: defaultVideo,
    title: t('videos.title-1'),
  }, {
    videoSrc: defaultVideo,
    title: t('videos.title-1'),
  }, {
    videoSrc: defaultVideo,
    title: t('videos.title-1'),
  }, {
    videoSrc: defaultVideo,
    title: t('videos.title-1'),
  }, {
    videoSrc: defaultVideo,
    title: t('videos.title-1'),
  }]

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
        <title>Univer</title>
      </Head>

      <main className="bg-[linear-gradient(180deg,#FFF_0.5%,#F6F9FF_100%)]">
        <Hero
          className="pb-[80px]"
        >

          <div className={`
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

          <div className={`
            mb-[20px]

            xl:mb-[28px]
          `}
          >

          </div>

          <h1
            className={`
              text-center text-5xl/tight font-bold italic leading-[68px] text-slate-900

              xl:mt-0 xl:text-6xl
            `}
          >
            {t('hero.ai-driven')}

            <br></br>
            <span
              className={`
                inline-block
                bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
                bg-clip-text px-4 text-transparent
              `}
            >
              {t('hero.web-to-sheet')}
            </span>
          </h1>

          <div className={`
            mt-[36px]

            xl:mt-[60px]
          `}
          >
          </div>

        </Hero>

        {/* Preview */}
        <section
          className={`
            mt-[-36px] px-4

            xl:mt-[-60px]
          `}
        >
          <div className={`
            relative mx-auto

            xl:w-[960px]
          `}
          >
            <VideoPlayer videoClassName="rounded-3xl" src={previewVidio} />
          </div>
          <div className="mt-[48px]"></div>
          <div className="flex justify-center">
            <Switch
              leftIcon={google.src}
              rightIcon={chatgpt.src}
              leftLabel="Chrome Extension"
              rightLabel="ChatGPT"
              intailValue={intailValue}
              value={heroVideoFlag}
              onChange={value => setHeroVideoFlag(value)}
            />
          </div>
          <div className={`
            mb-[48px]

            xl:mb-[100px]
          `}
          >
          </div>
        </section>

        {/* Simple Cases */}
        <section
          className="bg-[#f5f9fe] px-4"
        >
          <div className={`
            pb-[28px]

            xl:pb-[88px]
          `}
          >
          </div>

          <div className={`
            relative mx-auto

            xl:w-[936px]
          `}
          >
            <div className="inline-flex w-full flex-col items-center justify-start gap-9">
              <div className={`
                text-[28px] font-semibold leading-[52px] text-slate-900

                xl:text-5xl
              `}
              >
                Simple Cases
              </div>

            </div>
            <div className={`
              mt-[20px]

              xl:mt-[36px]
            `}
            >
            </div>
            <div className="flex justify-center">
              <Switch
                leftIcon={google.src}
                rightIcon={chatgpt.src}
                leftLabel="Chrome Extension"
                rightLabel="ChatGPT"
                intailValue={intailValue}
                value={videoListFlag}
                onChange={value => setVideosFlag(value)}
              />
            </div>

          </div>

          <div className={`
            mb-[32px]

            xl:mb-[64px]
          `}
          >
          </div>

          <VideoList videos={videos} className="xl:pb-[100px]" />

        </section>

        {/* FAQ */}
        <section
          className={`
            relative mx-auto mb-[60px] px-4

            xl:mb-[100px] xl:max-w-[1200px] xl:px-8
          `}
        >
          <Title type="univer" label="FAQ">
            {/* {t('faq.title')} */}
          </Title>

          <div className={`
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
