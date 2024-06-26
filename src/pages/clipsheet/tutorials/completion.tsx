import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from '@/official-site/utils/i18n'

// eslint-disable-next-line import/no-duplicates
import enUS from '@/official-site/clipsheet/tutorials/completion/completion.en-US.mdx'
// eslint-disable-next-line import/no-duplicates
import zhCN from '@/official-site/clipsheet/tutorials/completion/completion.en-US.mdx'
import { VideoPlayer } from '@/official-site/clipsheet/components/VideoPlayer'
import { ContactUs } from '@/official-site/clipsheet/components/ContactUs'

export default function Page() {
  const { locale } = useRouter()

  const Content = locale === 'zh-CN' ? zhCN : enUS

  const t = useTranslation({
    'en-US': {
      'hero.title': 'AI Data Completion',
      'hero.subtitle': 'In Univer Sheet',
      'hero.desc': 'Learn how to use AI to complete data from a web page into a worksheet with a video tutorial.',
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
      'hero.title': 'AI 驱动',
      'hero.subtitle': 'Spreadsheet',
      'hero.desc': '重新定义生产力',
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

  const previewVidio = 'https://www.youtube.com/embed/MxDMCKNx8P4?si=aBiGTAGDNBWabFle'

  return (
    <>
      <Head>
        <title>Univer</title>
      </Head>

      <style jsx>
        {`
      .content{
        ol > li {
          margin-left:1em;
          list-style-type: decimal;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 28px; 
          margin-bottom: 16px; 
          margin-top: 52px;
        }
      }
      `}
      </style>

      <main className="bg-[#fff]">
        <div
          className="flex px-[16px]"
        >
          <div className="relative mx-auto max-w[1200px]">
            <div className={`
              mt-[60px]

              xl:mt-[72px]
            `}
            >

            </div>

            <h1
              className={`
                text-center text-5xl font-bold italic leading-[60px] tracking-wide text-slate-900

                xl:mt-0 xl:h-[112px] xl:text-[56px] xl:leading-[56px]
              `}
            >
              <span
                className={`
                  bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
                  bg-clip-text text-transparent
                `}
              >
                {t('hero.title')}
              </span>
              <br />
              <span className="font-semibold tracking-wide text-slate-900">
                {t('hero.subtitle')}
              </span>
            </h1>
            <div className={`
              mt-[20px] max-w-[534px] text-center text-lg font-normal leading-7 text-slate-900
            `}
            >
              {t('hero.desc')}
            </div>

            <div className="mt-[32px]">
            </div>

          </div>

        </div>

        {/* Preview */}
        <section
          className="px-4"
        >
          <div className={`
            relative mx-auto

            xl:w-[832px]
          `}
          >
            <VideoPlayer videoClassName="rounded-3xl" src={previewVidio} />
          </div>

          <div className={`
            mb-[64px]

            xl:mb-[100px]
          `}
          >
          </div>
        </section>

        <div className={`
          content mx-auto px-[16px] pb-[48px]

          xl:w-[832px] xl:pb-[100px]
        `}
        >
          <Content />
        </div>
        <ContactUs />
        <div className={`
          mb-[48px]

          xl:mb-[100px]
        `}
        >
        </div>
      </main>
    </>
  )
}
