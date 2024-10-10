import { Badge } from '@radix-ui/themes'
import Head from 'next/head'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n'
import { GitHubButton } from '@/components/GitHub'

function convertToColor(str: string): 'cyan' | 'orange' | 'grass' | 'yellow' | 'amber' | 'orange' | 'teal' | 'ruby' | 'indigo' | 'blue' {
  const color = ['cyan', 'orange', 'grass', 'yellow', 'amber', 'teal', 'tomato', 'ruby', 'indigo', 'blue']
  const index = str.charCodeAt(0) % color.length
  return color[index] as any
}

export default function Page() {
  const t = useTranslation({
    'en-US': {
      'examples.sheet.title': 'Spreadsheets',
      'examples.sheet.desc': 'The basic functions of spreadsheets, including editing, formatting, formulas, etc.',
      'examples.sheet-multi.title': 'Multi Instance',
      'examples.sheet-multi.desc': 'Univer Sheet supports multiple instances, allowing you to manage multiple tables in one unified view.',
      'examples.sheet-uniscript.title': 'Uniscript',
      'examples.sheet-uniscript.desc': 'Uniscript provides powerful scripting capabilities.',
      'examples.sheet-big-data.title': 'Big Data Rendering',
      'examples.sheet-big-data.desc': 'Render a table containing 10,000,000 cells of data.',
      'examples.sheet-vchart.title': 'Charts',
      'examples.sheet-vchart.desc': 'Visualize data using popular chart libraries.',
      'examples.sheet-collaboration.title': 'Collaborative Editing',
      'examples.sheet-collaboration.desc': 'Create and share spreadsheets with our Sheets feature.',
      'examples.sheet-collaboration-playground.title': 'Collaborative Editing Playground',
      'examples.sheet-collaboration-playground.desc': 'An interesting playground to demonstrate the process of Sheets Collaboration.',
      'examples.sheet-exchange.title': 'Import & Export',
      'examples.sheet-exchange.desc': 'Powerful import and export services, supporting xlsx files.',
      'examples.sheet-print.title': 'High Definition Printing',
      'examples.sheet-print.desc': 'Experience high-definition printing.',
      'examples.doc.title': 'Documents',
      'examples.doc.desc': 'The basic functions of documents, including editing, typesetting, superscript, and subscript.',
      'examples.doc-multi.title': 'Multi Instance',
      'examples.doc-multi.desc': 'Univer Doc supports multiple instances, allowing you to manage multiple documents in one unified view.',
      'examples.doc-uniscript.title': 'Uniscript',
      'examples.doc-uniscript.desc': 'Uniscript provides powerful scripting capabilities.',
      'examples.doc-big-data.title': 'Big Data Rendering',
      'examples.doc-big-data.desc': 'Render a document containing 1,000,000 characters.',
      'examples.doc-collaboration.title': 'Collaborative Editing',
      'examples.doc-collaboration.desc': 'Create and share documents with our Docs feature.',
      'examples.doc-collaboration-playground.title': 'Collaborative Editing Playground',
      'examples.doc-collaboration-playground.desc': 'An interesting playground to demonstrate the process of document collaboration.',
      'examples.doc-exchange.title': 'Import & Export',
      'examples.doc-exchange.desc': 'Powerful import and export services, supporting docx files.',
      'examples.slide.title': 'Presentations',
      'examples.slide.desc': 'The basic functions of presentations, including editing, typesetting, and slides.',
      'tags.community': 'Community Plugin 👨‍💻',
      'tags.server': 'Requires Univer Backend Service 🚀',
    },
    'zh-CN': {
      'examples.sheet.title': '基础电子表格',
      'examples.sheet.desc': '电子表格的基本功能，包括编辑、格式化、公式等。',
      'examples.sheet-multi.title': '多实例',
      'examples.sheet-multi.desc': 'Univer Sheet 支持多实例，可以在一个统一的视图中管理多个表格。',
      'examples.sheet-uniscript.title': 'Uniscript',
      'examples.sheet-uniscript.desc': 'Uniscript 提供强大的脚本功能。',
      'examples.sheet-big-data.title': '大数据渲染',
      'examples.sheet-big-data.desc': '渲染包含 10,000,000 个单元格数据的表格。',
      'examples.sheet-vchart.title': '图表',
      'examples.sheet-vchart.desc': '使用流行的图表库进行数据可视化。',
      'examples.sheet-collaboration.title': '协同编辑',
      'examples.sheet-collaboration.desc': '使用我们的 Sheets 功能创建和共享电子表格。',
      'examples.sheet-collaboration-playground.title': '协同编辑可视化',
      'examples.sheet-collaboration-playground.desc': '一个有趣的 Playground，演示 Sheets 协作的过程。',
      'examples.sheet-exchange.title': '导入 & 导出',
      'examples.sheet-exchange.desc': '强大的导入和导出服务，支持 xlsx 文件。',
      'examples.sheet-print.title': '高清打印',
      'examples.sheet-print.desc': '体验高清打印功能。',
      'examples.doc.title': '基础文档',
      'examples.doc.desc': '文档的基本功能，包括编辑、排版、上下标等。',
      'examples.doc-multi.title': '多实例',
      'examples.doc-multi.desc': 'Univer Doc 支持多实例，可以在一个统一的视图中管理多个文档。',
      'examples.doc-uniscript.title': 'Uniscript',
      'examples.doc-uniscript.desc': 'Uniscript 提供强大的脚本功能。',
      'examples.doc-big-data.title': '大数据渲染',
      'examples.doc-big-data.desc': '渲染包含 1,000,000 个字符的文档。',
      'examples.doc-collaboration.title': '协同编辑',
      'examples.doc-collaboration.desc': '使用我们的 Docs 功能创建和共享文档。',
      'examples.doc-collaboration-playground.title': '协同编辑可视化',
      'examples.doc-collaboration-playground.desc': '一个有趣的 Playground，用于演示文档协作的过程。',
      'examples.doc-exchange.title': '导入 & 导出',
      'examples.doc-exchange.desc': '强大的导入和导出服务，支持 docx 文件。',
      'examples.slide.title': '基础演示文稿',
      'examples.slide.desc': '演示文稿的基本功能，包括编辑、排版、幻灯片等。',
      'tags.community': '社区插件 👨‍💻',
      'tags.server': '依赖 Univer 后端服务 🚀',
    },
  })

  const examples = [{
    title: 'Univer Sheet',
    items: [{
      title: t('examples.sheet.title'),
      preview: '/images/univer/examples/sheets.gif',
      desc: t('examples.sheet.desc'),
      link: '/examples/sheets',
    }, {
      title: t('examples.sheet-multi.title'),
      preview: '/images/univer/examples/sheets-multi.gif',
      desc: t('examples.sheet-multi.desc'),
      link: '/examples/sheets-multi',
    }, {
      title: t('examples.sheet-uniscript.title'),
      preview: '/images/univer/examples/sheets-uniscript.gif',
      desc: t('examples.sheet-uniscript.desc'),
      link: '/examples/sheets-uniscript',
    }, {
      title: t('examples.sheet-big-data.title'),
      preview: '/images/univer/examples/sheets-big-data.gif',
      desc: t('examples.sheet-big-data.desc'),
      link: '/examples/sheets-big-data',
    }, {
      title: t('examples.sheet-vchart.title'),
      preview: '/images/univer/examples/sheets-vchart.gif',
      desc: t('examples.sheet-vchart.desc'),
      link: '/examples/sheets-vchart',
      tags: [t('tags.community')],
    }, {
      title: t('examples.sheet-collaboration.title'),
      preview: '/images/univer-pro/examples/sheets-collaboration.gif',
      desc: t('examples.sheet-collaboration.desc'),
      link: '/pro/examples/sheets-collaboration',
      tags: [t('tags.server')],
    }, {
      title: t('examples.sheet-collaboration-playground.title'),
      preview: '/images/univer-pro/examples/sheets-collaboration-playground.gif',
      desc: t('examples.sheet-collaboration-playground.desc'),
      link: '/pro/examples/sheets-collaboration-playground',
      tags: [t('tags.server')],
    }, {
      title: t('examples.sheet-exchange.title'),
      preview: '/images/univer-pro/examples/sheets-exchange.gif',
      desc: t('examples.sheet-exchange.desc'),
      link: '/pro/examples/sheets-exchange',
      tags: [t('tags.server')],
    }, {
      title: t('examples.sheet-print.title'),
      preview: '/images/univer-pro/examples/sheets-print.gif',
      desc: t('examples.sheet-print.desc'),
      link: '/pro/examples/sheets-print',
      tags: [t('tags.server')],
    }],
  }, {
    title: 'Univer Doc',
    items: [{
      title: t('examples.doc.title'),
      preview: '/images/univer/examples/docs.gif',
      desc: t('examples.doc.desc'),
      link: '/examples/docs',
    }, {
      title: t('examples.doc-multi.title'),
      preview: '/images/univer/examples/docs-multi.gif',
      desc: t('examples.doc-multi.desc'),
      link: '/examples/docs-multi',
    }, {
      title: t('examples.doc-uniscript.title'),
      preview: '/images/univer/examples/docs-uniscript.gif',
      desc: t('examples.doc-uniscript.desc'),
      link: '/examples/docs-uniscript',
    }, {
      title: t('examples.doc-big-data.title'),
      preview: '/images/univer/examples/docs-big-data.gif',
      desc: t('examples.doc-big-data.desc'),
      link: '/examples/docs-big-data',
    }, {
      title: t('examples.doc-collaboration.title'),
      preview: '/images/univer-pro/examples/docs-collaboration.gif',
      desc: t('examples.doc-collaboration.desc'),
      link: '/pro/examples/docs-collaboration',
      tags: [t('tags.server')],
    }, {
      title: t('examples.doc-collaboration-playground.title'),
      preview: '/images/univer-pro/examples/docs-collaboration-playground.gif',
      desc: t('examples.doc-collaboration-playground.desc'),
      link: '/pro/examples/docs-collaboration-playground',
      tags: [t('tags.server')],
    }, {
      title: t('examples.doc-exchange.title'),
      preview: '/images/univer-pro/examples/docs-exchange.gif',
      desc: t('examples.doc-exchange.desc'),
      link: '/pro/examples/docs-exchange',
      tags: [t('tags.server')],
    }],
  }, {
    title: 'Univer Slide',
    items: [{
      title: t('examples.slide.title'),
      preview: '/images/univer/examples/slides.gif',
      desc: t('examples.slide.desc'),
      link: '/examples/slides',
    }],
  }]

  return (
    <>
      <Head>
        <title>Examples - Univer</title>
      </Head>

      <main>
        <header
          className={`
            px-4 py-[60px]

            xl:py-[72px]
          `}
        >
          <h1
            className={`
              mb-6 text-center text-5xl font-bold

              xl:text-6xl
            `}
          >
            <span className="mr-4 italic">Univer Examples</span>
            🎮
          </h1>

          <p
            className={`
              mx-auto mb-7 text-center text-lg

              xl:w-[768px]
            `}
          >
            Rich examples and guidance demonstrate Univer's various powerful capabilities, helping you quickly find the functions you want.
          </p>

          <footer className="flex justify-center gap-6">
            <GitHubButton />
            <Link
              className={`
                inline-flex h-10 items-center rounded-full bg-slate-500 px-6 font-semibold
                text-white
              `}
              href="/guides/sheet/introduction"
            >
              Get Started
            </Link>
          </footer>
        </header>

        <div className={`
          mb-[100px] grid

          xl:gap-14
        `}
        >
          {examples.map(example => (
            <section key={example.title}>
              <h2 className="mb-10 mt-0 py-4 text-center text-[32px] font-semibold">
                {example.title}
              </h2>

              <section
                className={`
                  mx-auto grid max-w-[1200px] gap-9 border-[#E0E2E5] pb-12

                  xl:grid-cols-3 xl:gap-x-[52px] xl:gap-y-[60px] xl:border-b
                `}
              >
                {example.items.map(item => (

                  <div
                    key={item.title}
                    className={`
                      border-b border-[#E0E2E5] px-8 pb-9

                      xl:border-0 xl:pb-0
                    `}
                  >

                    <Link
                      className={`
                        transition-all

                        [&+a]:hover:text-[#287DEA]
                      `}
                      href={item.link}
                      locale={item.link.startsWith('/pro') ? false : undefined}
                    >
                      <div
                        className={`
                          mb-6 rounded-2xl
                          bg-[linear-gradient(320deg,#7E98FF_18.89%,#287DEA_39.58%,#29C5E3_59.87%,#6FD7C8_81.94%)]
                          p-2.5

                          xl:h-[204px] xl:w-[344px]
                        `}
                      >
                        <img
                          className="h-full w-full rounded-2xl object-cover"
                          src={item.preview}
                          alt={item.title}
                        />
                      </div>
                    </Link>

                    <Link
                      className={`
                        transition-all

                        hover:text-[#287DEA]
                      `}
                      href={item.link}
                      locale={item.link.startsWith('/pro') ? false : undefined}
                    >
                      <h3 className="mb-3 text-xl font-semibold">
                        {item.title}
                      </h3>
                    </Link>

                    <p className="mb-2">
                      {item.desc}
                    </p>

                    <footer>
                      {item.tags?.map(tag => (
                        <Badge
                          key={tag}
                          color={convertToColor(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </footer>
                  </div>
                ))}
              </section>
            </section>
          ))}
        </div>
      </main>
    </>
  )
}
