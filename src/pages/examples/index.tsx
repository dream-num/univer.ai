import Link from 'next/link'
import Head from 'next/head'
import { GitHubButton } from '@/components/GitHub'

export default function Page() {
  const examples = [{
    title: 'Univer Sheet',
    items: [{
      title: 'Sheets',
      preview: '/images/univer/examples/sheets.gif',
      desc: 'Create and edit spreadsheets with our Sheets feature.',
      link: '/examples/sheets',
    }, {
      title: 'Sheets Multi',
      preview: '/images/univer/examples/sheets-multi.gif',
      desc: 'Manage multiple sheets in one unified view with Sheets Multi.',
      link: '/examples/sheets-multi',
    }, {
      title: 'Sheets Uniscript',
      preview: '/images/univer/examples/sheets-uniscript.gif',
      desc: 'Powerful scripting capabilities with Sheets Uniscript.',
      link: '/examples/sheets-uniscript',
    }, {
      title: 'Sheets Big Data',
      preview: '/images/univer/examples/sheets-big-data.gif',
      desc: 'Large data volume Univer Sheets, a table containing 10,000,000 cell data.',
      link: '/examples/sheets-big-data',
    }, {
      title: 'Sheets VChart',
      preview: '/images/univer/examples/sheets-vchart.gif',
      desc: 'Data visualization capabilities with popular chart library.',
      link: '/examples/sheets-vchart',
      isCommunity: true,
    }, {
      title: 'Sheets Collaboration',
      preview: '/images/univer-pro/examples/sheets-collaboration.gif',
      desc: 'Create and share spreadsheets with our Sheets feature.',
      link: '/pro/examples/sheets-collaboration',
    }, {
      title: 'Sheets Collaboration Playground',
      preview: '/images/univer-pro/examples/sheets-collaboration-playground.gif',
      desc: 'An interesting playground to demonstrate the process of Sheets Collaboration.',
      link: '/pro/examples/sheets-collaboration-playground',
    }, {
      title: 'Sheets Import/Export',
      preview: '/images/univer-pro/examples/sheets-exchange.gif',
      desc: 'Powerful import and export service, supports xlsx files.',
      link: '/pro/examples/sheets-exchange',
    }, {
      title: 'Sheets Print',
      preview: '/images/univer-pro/examples/sheets-print.gif',
      desc: 'Experience high-definition printing capabilities.',
      link: '/pro/examples/sheets-print',
    }],
  }, {
    title: 'Univer Doc',
    items: [{
      title: 'Docs',
      preview: '/images/univer/examples/docs.gif',
      desc: 'Create and edit documents with our Docs feature.',
      link: '/examples/docs',
    }, {
      title: 'Docs Multi',
      preview: '/images/univer/examples/docs-multi.gif',
      desc: 'Manage multiple docs in one unified view with Docs Multi.',
      link: '/examples/docs-multi',
    }, {
      title: 'Docs Uniscript',
      preview: '/images/univer/examples/docs-uniscript.gif',
      desc: 'Powerful scripting capabilities with Docs Uniscript.',
      link: '/examples/docs-uniscript',
    }, {
      title: 'Docs Big Data',
      preview: '/images/univer/examples/docs-big-data.gif',
      desc: 'Large data volume Univer Docs, a document containing 1,000,000 characters.',
      link: '/examples/docs-big-data',
    }, {
      title: 'Docs Collaboration',
      preview: '/images/univer-pro/examples/docs-collaboration.gif',
      desc: 'Create and share documents with our Docs feature.',
      link: '/pro/examples/docs-collaboration',
    }, {
      title: 'Docs Collaboration Playground',
      preview: '/images/univer-pro/examples/docs-collaboration-playground.gif',
      desc: 'An interesting playground to demonstrate the process of Docs Collaboration.',
      link: '/pro/examples/docs-collaboration-playground',
    }],
  }, {
    title: 'Univer Slide',
    items: [{
      title: 'Slides',
      preview: '/images/univer/examples/slides.gif',
      desc: 'Create and edit presentations with our Slides feature.',
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
              <h2
                className={`
                  mb-10 mt-0
                  bg-[linear-gradient(121deg,#0048FF_18.89%,#0C81ED_39.58%,#029DCE_59.87%,#00BBB0_74.37%,#00C5A8_81.94%)]
                  bg-clip-text py-4 text-center text-[32px] font-semibold text-transparent
                `}
              >
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
                    <div
                      className={`
                        mb-6 rounded-2xl bg-[#676EBC] p-2.5

                        xl:h-[204px] xl:w-[344px]
                      `}
                    >
                      <img
                        className="h-full w-full rounded-2xl object-cover"
                        src={item.preview}
                        alt={item.title}
                      />
                    </div>

                    <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>

                    {item.isCommunity && (
                      <div className={`
                        inline-flex h-7 w-48 items-center justify-center gap-2.5 rounded-3xl
                        bg-indigo-600/10 px-2 py-1.5
                      `}
                      >
                        <div className="text-xs font-medium leading-none text-indigo-600">
                          Community Contribution 👨‍💻
                        </div>
                      </div>
                    )}

                    <p className="mb-2">
                      {item.desc}
                    </p>

                    <Link className="text-sm text-[#0019FE]" href={item.link} locale={false}>
                      View Example →
                    </Link>
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
