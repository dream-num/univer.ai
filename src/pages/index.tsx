import Link from 'next/link'
import Head from 'next/head'
import { GithubSingle40, NextSingle } from '@univerjs/icons'
import { useState } from 'react'
import { GitHubButton } from '@/components/GitHub'
import { clsx } from '@/lib/utils'
import Hero from '@/components/Hero'
import Title from '@/components/Title'
import { useTranslation } from '@/lib/i18n'
import ShineBorder from '@/components/ShineBorder'
import PricingTable from '@/components/PricingTable'
import PricingSection from '@/components/PricingSection'

export default function Page() {
  const t = useTranslation({
    'en-US': {
      'hero.office-suite': 'Office Suite',
      'hero.next-generation': 'of the Next Generation',
      'feature-1.title': 'Collaborative Editing',
      'feature-1.desc': 'Work together in real time. We also provide storage and loading services for Univer documents. History records is coming soon.',
      'feature-2.title': 'Import and Export',
      'feature-2.desc': 'Univer supports the import and export of Excel files. Docx and PPT will also be supported in the future.',
      'feature-3.title': 'Printing',
      'feature-3.desc': 'Supports high-precision printing. Or export documents as PDF files.',
      'feature-4.title': 'Live Share',
      'feature-4.desc': 'Present your work to your colleagues online. They can follow your view in real time, and pause or resume at any time.',
      'plan.title': 'Start experiencing Univer',
      'plan.desc': 'The free edition requires no development license and can be deployed to your production environment.',
      'plan.trial': 'The business version is free for 30 days.',
    },
    'zh-CN': {
      'hero.office-suite': 'Office 办公套件',
      'hero.next-generation': '重新定义生产力',
      'feature-1.title': '协同编辑',
      'feature-1.desc': '与同事同时编辑同一份文档，我们同时提供 Univer 文档的存储和加载服务，未来将支持历史记录等功能',
      'feature-2.title': '导入导出',
      'feature-2.desc': 'Univer 支持导入和导出 Excel 文件',
      'feature-3.title': '打印',
      'feature-3.desc': '支持高保真打印，你可以通过打印机打印，或输出为 PDF 文件',
      'feature-4.title': '实时分享',
      'feature-4.desc': '在线将文档演示给同事，他们可以跟随你的视角实时查看你的操作，并可以随时暂停或继续跟随',
      'plan.title': '开始体验 Univer',
      'plan.desc': '免费版无需开发许可费，可部署到生产环境。',
      'plan.trial': '商业版可免费试用 30 天。',
    },
  })

  const features = [{
    title: t('feature-1.title'),
    desc: t('feature-1.desc'),
    preview: '/images/univer-pro/feature-1.png',
  }, {
    title: t('feature-2.title'),
    desc: t('feature-2.desc'),
    preview: '/images/univer-pro/feature-2.png',
  }, {
    title: t('feature-3.title'),
    desc: t('feature-3.desc'),
    preview: '/images/univer-pro/feature-3.png',
  }, {
    title: t('feature-4.title'),
    desc: t('feature-4.desc'),
    preview: '/images/univer-pro/feature-4.png',
  }]

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

  return (
    <>
      <Head>
        <title>Univer</title>
      </Head>

      <main>
        <Hero
          className={`
            mb-7

            xl:mb-0 xl:h-[468px]
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
              mb-7 mt-[60px] text-center text-5xl/tight font-bold italic

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
            {/* Call of actions: GitHub link. Links to Documentation. OnlineExamples. */}
            <GitHubButton />
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

        <section
          className={`
            relative mx-auto mb-12 px-4

            lg:px-8

            xl:mb-[100px] xl:max-w-[1200px] xl:px-8
          `}
        >
          <Title type="univer" label="Feature" />

          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={clsx(`
                mb-7 flex flex-col gap-6

                xl:mb-[100px] xl:flex-row xl:gap-24
              `, {
                'xl:flex-row-reverse': index % 2 === 1,
              })}
            >
              <img className="xl:h-[400px] xl:w-[640px]" src={feature.preview} alt={feature.title} />
              <div className="flex flex-col justify-center gap-4">
                <h3 className="text-[28px] font-medium">{feature.title}</h3>
                <p className="leading-7">{feature.desc}</p>
              </div>
            </div>
          ))}
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
                className={`
                  mb-6 text-center text-[28px] font-semibold

                  md:text-5xl
                `}
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
