import Link from 'next/link'
import Head from 'next/head'
import { GithubSingle40, IncreaseSingle, NextSingle } from '@univerjs/icons'
import { useCallback, useState } from 'react'
import { clsx } from '@/lib/utils'
import Hero from '@/components/Hero'
import Title from '@/components/Title'
import { useTranslation } from '@/lib/i18n'
import ShineBorder from '@/components/ShineBorder'
import PricingTable from '@/components/PricingTable'
import PricingSection from '@/components/PricingSection'

export default function Page() {
  const [collapsedIds, setCollapsedIds] = useState<number[]>([])

  const t = useTranslation({
    'en-US': {
      'hero.office-suite': 'Office Suite',
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
      'faq.title-1': 'What is Univer and what features does it include?',
      'faq.desc-1': 'Univer is an alternative to the Office suite, including spreadsheets, documents, and slides. Currently, it provides functions such as formulas, number formats, conditional formats, data validation, and graphic-text mixing. You can integrate Univer into your system and develop personalized business requirements based on Univer.',
      'faq.title-2': 'Is Univer free? Is there a paid version? What is the difference between different versions?',
      'faq.desc-2': 'Univer includes OSS (Open Source Software) parts and closed-source parts that need to interact with the server. Univer OSS is open-source based on the Apache-2.0 license, and both open-source and closed-source parts can be used for free for commercial purposes. Some enterprises and organizations have higher requirements, and the official also provides subscription services for the business version.',
      'faq.title-3': 'Can Univer be extended to meet my needs?',
      'faq.desc-3': 'Yes, Univer is highly extensible. Its command system and plugin architecture allow developers to create custom plugins or tailor Univer as needed. The default behavior of Univer can also be modified through various configuration options.',
      'faq.title-4': 'Which operating systems and devices does Univer support? Does it support mobile devices?',
      'faq.desc-4': 'Univer supports various modern desktop browsers and plans to support mobile devices.',
      'faq.title-5': 'Does Univer provide customer support and technical maintenance? How should users seek help if they encounter problems?',
      'faq.desc-5': 'Univer provides online documentation and community support, and users can submit issues or pull requests on GitHub. Enterprise users who subscribe to the business version can receive official technical support.',
      'plan.title': 'Start Experiencing Univer',
      'plan.desc': 'The free edition requires no development license and can be deployed to your production environment.',
      'plan.trial': 'The business version is free for 30 days.',
    },
    'zh-CN': {
      'hero.office-suite': 'Office 办公套件',
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
      'faq.title': '有疑问？我们有解答。',
      'faq.title-1': '什么是 Univer，它包含哪些功能？',
      'faq.desc-1': 'Univer 是 Office 系列办公套件的替代品，包括电子表格、文档和幻灯片。目前提供公式、数字格式、条件格式、数据验证、图文混排等功能。你可以将 Univer 集成到你的系统当中，并基于 Univer 开发个性化的业务需求。',
      'faq.title-2': 'Univer 是否免费？是否有付费版本？不同版本之间有什么区别?',
      'faq.desc-2': 'Univer 包含开源的 OSS（Open Source Software）部分以及需要与服务端交互的闭源部分。Univer OSS 基于 Apache-2.0 协议开源，无论开源部分还是闭源部分均可免费商业使用。部分企业和组织具有更高的需求，官方也提供了商业版的订阅服务。',
      'faq.title-3': 'Univer 可以扩展以满足我的需求吗？',
      'faq.desc-3': '是的，Univer 具有高度的可扩展性。它的命令系统和插件架构允许开发者创建自定义插件，或根据需要对 Univer 进行裁剪。Univer 的默认行为也可以通过各种配置项来修改。',
      'faq.title-4': 'Univer 支持哪些操作系统和设备？是否支持移动端？',
      'faq.desc-4': 'Univer 支持各种现代桌面端浏览器，也计划支持移动端。',
      'faq.title-5': 'Univer 是否提供客户支持和技术维护？如果遇到问题，用户应该如何寻求帮助？',
      'faq.desc-5': 'Univer 提供了在线文档和社区支持，用户可以在 GitHub 上提交 Issue 或者 Pull Request。订阅了商业版的企业用户可以获得官方技术支持。',
      'plan.title': '开始体验 Univer',
      'plan.desc': '免费版无需开发许可费，可部署到生产环境。',
      'plan.trial': '商业版可免费试用 30 天。',
    },
  })

  const [activeProduct] = useState(1)
  const products = [{
    icon: '/images/univer/doc-icon.svg',
    title: 'Univer Doc',
  }, {
    icon: '/images/univer/sheet-icon.svg',
    title: 'Univer Sheet',
  }, {
    icon: '/images/univer/slide-icon.svg',
    title: 'Univer Slide',
  }]

  const spotlights = [{
    icon: '/images/univer/spotlight-1.svg',
    title: t('spotlights.title-1'),
    desc: t('spotlights.desc-1'),
  }, {
    icon: '/images/univer/spotlight-2.svg',
    title: t('spotlights.title-2'),
    desc: t('spotlights.desc-2'),
  }, {
    icon: '/images/univer/spotlight-3.svg',
    title: t('spotlights.title-3'),
    desc: t('spotlights.desc-3'),
  }, {
    icon: '/images/univer/spotlight-4.svg',
    title: t('spotlights.title-4'),
    desc: t('spotlights.desc-4'),
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

      <main>
        <Hero
          className={`
            my-7

            xl:mb-0 xl:mt-0 xl:h-[468px]
          `}
        >
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

          <h1
            className={`
              mb-7 mt-[60px] text-center text-5xl/tight font-bold

              xl:mt-0 xl:text-6xl/tight
            `}
          >
            <span
              className={`
                inline-block
                bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
                bg-clip-text px-4 text-transparent
              `}
            >
              {t('hero.office-suite')}
            </span>
            <br></br>
            {t('hero.next-generation')}
          </h1>

          <div className="flex justify-center gap-6">
            <a
              className={`
                flex h-10 items-center rounded-full
                bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
                px-6 font-semibold text-white
              `}
              href="#pricing"
            >
              Start Experiencing
            </a>
            <Link
              className={`
                flex h-10 items-center rounded-full bg-slate-500 px-6 font-semibold text-white
              `}
              href="/examples"
            >
              Live demos
            </Link>

          </div>
        </Hero>

        {/* Preview */}
        <section
          className={`
            mb-12 px-4

            xl:mb-[100px]
          `}
        >
          <div
            className={`
              relative mx-auto

              xl:w-[936px]
            `}
          >
            <div
              className={`
                absolute left-0 top-0 h-full w-full rounded-2xl bg-gradient-to-r
                from-[rgba(83,87,237,0.22)] to-[rgba(64,185,255,0.22)] blur-[50px]
              `}
            />
            <div
              className={`
                absolute left-0 top-0 h-full w-full rounded-2xl border border-white
                backdrop-blur-[2px]
              `}
            />
            <img
              className="relative block w-full rounded-xl"
              src="/images/univer/sheet-hero.png"
              alt="Univer Sheet Preview"
            />
          </div>
        </section>

        <nav
          className={`
            mb-7 flex justify-around

            xl:mb-[100px] xl:justify-center
          `}
        >
          {products.map((product, index) => (
            <a
              key={product.title}
              className={`
                grid w-[104px] items-end justify-center gap-2

                xl:w-[250px] xl:gap-3
              `}
            >
              <img
                className={clsx(`mx-auto`, {
                  'w-16 xl:w-[92px]': activeProduct === index,
                  'w-12 xl:w-[60px]': activeProduct !== index,
                })}
                src={product.icon}
                alt={product.title}
              />
              <span
                className={clsx(`
                  text-base font-medium

                  xl:text-2xl
                `, {
                  'inline-block bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)] bg-clip-text text-transparent xl:px-4 xl:text-2xl': activeProduct === index,
                })}
              >
                {product.title}
              </span>
            </a>
          ))}
        </nav>

        {/* Spotlights */}
        <section className={`
          relative mx-auto mb-12 px-4

          xl:mb-[100px] xl:mt-[100px] xl:max-w-[1200px] xl:px-8
        `}
        >
          <Title type="univer" label="Highlights">
            {/* {t('spotlights.title')} */}
          </Title>

          <div
            className={`
              grid gap-8

              xl:grid-cols-2
            `}
          >
            {spotlights.map(spotlight => (
              <div
                key={spotlight.title}
                className={`
                  rounded-2xl bg-white px-7 py-8 shadow-[0px_4px_12px_0px_rgba(128,152,165,0.16)]
                `}
              >
                <img className="mb-6" src={spotlight.icon} alt={spotlight.title} />
                <h3 className="mb-3 text-xl font-medium">{spotlight.title}</h3>
                <p className="leading-7">{spotlight.desc}</p>
              </div>
            ))}
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
            mx-auto grid gap-6

            xl:w-[770px]
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

        {/* Pricing */}
        <section className={`
          relative mx-auto mb-12 bg-[linear-gradient(180deg,#F5F9FF_0%,#F7FCFF_100%)] px-4 pb-[60px]
          pt-[48px]

          xl:mb-[100px] xl:pb-[100px] xl:pt-[88px]
        `}
        >
          <div
            className={`
              mx-auto

              lg:px-8

              xl:max-w-[1200px] xl:px-4
            `}
          >
            {/* Pricing section */}
            <section
              className={`
                mb-7

                md:mb-[88px]
              `}
            >
              <h2
                id="pricing"
                className={`
                  mb-6 text-center text-[28px] font-semibold

                  md:text-5xl
                `}
                style={{
                  scrollMarginTop: '92px',
                }}
              >
                {t('plan.title')}
              </h2>

              <p
                className={`
                  text-center text-lg text-[#474D57]

                  md:mb-[88px]
                `}
              >
                {t('plan.desc')}
                <br />
                {t('plan.trial')}
              </p>
            </section>

            <PricingSection className="mb-[88px]" />

            <PricingTable />
          </div>
        </section>
      </main>
    </>
  )
}
