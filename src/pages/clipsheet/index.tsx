import Head from 'next/head'
import { IncreaseSingle } from '@univerjs/icons'
import { useCallback, useState } from 'react'
import { GitHubButton } from '../../official-site/components/GitHubPlus/GitHub'
import { clsx } from '@/lib/utils'
import Hero from '@/official-site/components/Hero'
import Title from '@/official-site/components/Title'
import { useTranslation } from '@/official-site/utils/i18n'
import Switch from '@/official-site/components/Switch'

import google from '@/official-site/images/google.svg'
import chatgpt from '@/official-site/images/chatgpt.svg'

export default function Page() {
  const [collapsedIds, setCollapsedIds] = useState<number[]>([])

  const t = useTranslation({
    'en-US': {
      'hero.ai-driven': 'AI-Driven',
      'hero.web-to-sheet': 'Spreadsheet',
      'hero.next-generation': 'of the Next Generation',
      'spotlights.title': 'Spotlights',
      'spotlights.title-1': 'Highly extensible command system',
      'spotlights.desc-1': 'All actions on Univer are executed through the command system, which makes operations on Univer traceable and recordable. Advanced features such as collaborative editing, real-time sharing, and scripting are supported on top of command system.',
      'spotlights.title-2': 'Plugin oriented architecture',
      'spotlights.desc-2': 'Features in Univer are divided into multiple plugins. Developers can combine plugins according to their needs, or develop custom plugins to meet personalized requirements without modifying the Univer core code.',
      'spotlights.title-3': 'Unified rendering engine',
      'spotlights.desc-3': 'A high-performance graphics rendering engine based on Canvas, supporting documents, sheets, and slides, providing a seamless user experience. Advanced typesetting capabilities are supported.',
      'spotlights.title-4': 'High-performance formula engine',
      'spotlights.desc-4': 'Supports inverted indexing, lambda expressions, and more. A powerful RPC mechanism supports Web Worker computing and even server-side computing, providing excellent performance.',
      'faq.title': 'Got Questions? We\'ve Got Answers.',
      'faq.title-1': 'What is Univer and what features does it provide?',
      'faq.desc-1': 'Univer is an open-source office suite alternative that includes spreadsheets, documents, and slides. It currently provides features such as formulas, number formats, conditional formatting, data validation, and rich text. You can integrate Univer into your system and develop personalized business requirements based on Univer.',
      'faq.title-2': 'Is Univer free? Are there paid or enterprise versions? What are the differences between these versions?',
      'faq.desc-2': 'Univer is open-source under the Apache-2.0 license and can be used for free in commercial applications. The official Univer Pro enterprise solutions, based on Univer, provides features such as collaborative editing, printing, import/export, and enterprise-level technical support.',
      'faq.title-3': 'Can Univer be customized or extended to meet specific needs?',
      'faq.desc-3': 'Yes. Univer is highly extensible. Its command system and plugin architecture allow developers to create custom plugins or tailor Univer as needed. Univer\'s default behavior can also be modified through various configuration options.',
      'faq.title-4': 'What operating systems and devices does Univer support? Are mobile applications provided?',
      'faq.desc-4': 'Univer supports various modern desktop browsers, with plans to support mobile browsers in the future.',
      'faq.title-5': 'Does Univer provide customer support and technical maintenance? How should users seek help if they encounter problems?',
      'faq.desc-5': 'Univer provides online documentation and community support. Users can submit issues or pull requests on GitHub. Paid users of Univer Pro can get official technical support.',
      'footer.checkout': 'Looking for advanced solutions? Checkout',
      'footer.and': '&',
    },
    'zh-CN': {
      'hero.ai-driven': 'AI 驱动',
      'hero.web-to-sheet': 'Spreadsheet',
      'hero.next-generation': '重新定义生产力',
      'spotlights.title': '技术解密',
      'spotlights.title-1': '强大的命令系统',
      'spotlights.desc-1': '用户在 Univer 上的操作都通过命令系统执行，一切对 Univer 的操作都可记录，可追踪。基于命令系统可实现协同编辑、协同光标、实时分享、脚本生成等高级功能。',
      'spotlights.title-2': '插件化架构',
      'spotlights.desc-2': 'Univer 功能被划分到多个插件当中，开发者可根据自己的需要组合插件，也可以自己开发插件满足个性化需要，无需修改 Univer 内核代码。',
      'spotlights.title-3': '统一渲染引擎',
      'spotlights.desc-3': '自研基于 Canvas 的高性能图形渲染引擎，支持文档、表格和幻灯片，带来无缝的使用体验。支持图文混排、单元格内富文本等高级排版能力。',
      'spotlights.title-4': '自研高性能公式引擎',
      'spotlights.desc-4': '支持倒排索引、lambda 表达式等高级特性。强大的 RPC 机制支持了 Web Worker 计算甚至是服务端计算，提供优异的性能表现。',
      'faq.title': '有疑问?我们有解答。',
      'faq.title-1': '什么是 Univer，它包含哪些功能？',
      'faq.desc-1': 'Univer 是 Office 系列办公套件的开源替代品，包括电子表格、文档和幻灯片。目前提供公式、数字格式、条件格式、数据验证、图文混排等功能。你可以将 Univer 集成到你的系统当中，并基于 Univer 开发个性化的业务需求。',
      'faq.title-2': 'Univer 是否免费？是否有付费版本或企业版本？不同版本之间有什么区别?',
      'faq.desc-2': 'Univer 基于 Apache-2.0 协议开源，可以免费商业使用。官方也提供基于 Univer 开发的企业级文档解决方案 Univer Pro，提供了诸如协同编辑、打印、导入导出等功能以及企业级的技术支持。',
      'faq.title-3': 'Univer 可以扩展以满足我的需求吗？',
      'faq.desc-3': '是的，Univer 具有高度的可扩展性。它的命令系统和插件架构允许开发者创建自定义插件，或根据需要对 Univer 进行裁剪。Univer 的默认行为也可以通过各种配置项来修改。',
      'faq.title-4': 'Univer 支持哪些操作系统和设备？是否支持移动端？',
      'faq.desc-4': 'Univer 支持各种现代桌面端浏览器，未来计划支持移动端。',
      'faq.title-5': 'Univer 是否提供客户支持和技术维护？如果遇到问题，用户应该如何寻求帮助？',
      'faq.desc-5': 'Univer 提供了在线文档和社区支持，用户可以在 GitHub 上提交 Issue 或者 Pull Request。Univer Pro 的付费用户可以得到官方的技术支持。',
      'footer.checkout': '查看 Univer 官方提供的进阶解决方案',
      'footer.and': '和',
    },
  })

  const intailValue = 'left'
  const [heroVideoFlag, setHeroVideoFlag] = useState(intailValue)
  const [_videosFlag, setVideosFlag] = useState(intailValue)

  const spotlights = [{
    icon: '/images/univer/spotlight-1.svg',
    title: t('spotlights.title-1'),
  }, {
    icon: '/images/univer/spotlight-2.svg',
    title: t('spotlights.title-2'),
  }, {
    icon: '/images/univer/spotlight-3.svg',
    title: t('spotlights.title-3'),
  }, {
    icon: '/images/univer/spotlight-4.svg',
    title: t('spotlights.title-4'),
  }, {
    icon: '/images/univer/spotlight-4.svg',
    title: t('spotlights.title-4'),
  }, {
    icon: '/images/univer/spotlight-4.svg',
    title: t('spotlights.title-4'),
  }, {
    icon: '/images/univer/spotlight-4.svg',
    title: t('spotlights.title-4'),
  }, {
    icon: '/images/univer/spotlight-4.svg',
    title: t('spotlights.title-4'),
  }, {
    icon: '/images/univer/spotlight-4.svg',
    title: t('spotlights.title-4'),
  }, {
    icon: '/images/univer/spotlight-4.svg',
    title: t('spotlights.title-4'),
  }, {
    icon: '/images/univer/spotlight-4.svg',
    title: t('spotlights.title-4'),
  }, {
    icon: '/images/univer/spotlight-4.svg',
    title: t('spotlights.title-4'),
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
  }, {
    title: t('faq.title-5'),
    desc: t('faq.desc-5'),
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
            {/* Call of actions: GitHub link. Links to Documentation. OnlineExamples. */}
            <GitHubButton />
          </div>

          <div className={`
            mb-[20px]

            xl:mb-[28px]
          `}
          >

          </div>

          <h1
            className={`
              text-center font-['Poppins'] text-5xl/tight font-bold italic leading-[68px]
              text-slate-900

              xl:mt-0 xl:text-6xl
            `}
          >
            {t('hero.ai-driven')}

            <br></br>
            <span
              className={`
                inline-block
                h-[68px]
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

            xl:w-[936px]
          `}
          >
            <div className={`
              absolute left-0 top-0 h-full w-full rounded-2xl bg-gradient-to-r
              from-[rgba(83,87,237,0.22)] to-[rgba(64,185,255,0.22)] blur-[50px]
            `}
            />
            <div className={`
              absolute left-0 top-0 h-full w-full rounded-2xl border border-white
              backdrop-blur-[2px]
            `}
            />

            <iframe
              className={`
                relative block h-[193px] w-full rounded-3xl

                xl:h-[540px] xl:w-[960px]
              `}
              src={
              heroVideoFlag === 'left' ? 'https://www.youtube.com/embed/kpV0MvQuFZA?si=7PtEF9HCOp3zPkmM' : 'https://www.youtube-nocookie.com/embed/n0i3rvEmfVg?si=htcqrq6OWRjMt1yl'
            }
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            >
            </iframe>
          </div>
          <div className="mt-[48px]"></div>
          <div className="flex justify-center">
            <Switch
              leftIcon={google.src}
              rightIcon={chatgpt.src}
              leftLabel="Chrome Extension"
              rightLabel="ChatGPT"
              intailValue={intailValue}
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

        <section
          className="mb-12 bg-[#f5f9fe] px-4"
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
                font-['Poppins'] text-[28px] font-semibold leading-[52px] text-slate-900

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
              {spotlights.map(spotlight => (
                <div
                  key={spotlight.title}
                  className={`
                inline-flex flex-col items-start justify-start gap-2
                `}
                >
                  {/* className="relative block w-full xl:h-[520px] xl:w-[960px] rounded-3xl"  */}
                  <iframe
                    className={`
                      relative h-[193px] w-full rounded-2xl

                      xl:w-[344px]
                    `}
                    src="https://www.youtube.com/embed/kpV0MvQuFZA?si=7PtEF9HCOp3zPkmM"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  >
                  </iframe>

                  <h3 className={`
                    text-center font-['Poppins'] text-lg font-medium capitalize leading-7
                    text-slate-900
                  `}
                  >
                    {spotlight.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

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
