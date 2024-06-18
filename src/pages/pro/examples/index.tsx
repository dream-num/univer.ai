import Link from 'next/link'
import { GithubSingle24 } from '@univerjs/icons'
import Head from 'next/head'

export default function Page() {
  const examples = [{
    title: 'Univer Sheet',
    items: [{
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
  }]

  return (
    <>
      <Head>
        <title>Examples - Univer Pro</title>
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
            <span className="mr-4 italic">
              Univer
              <span
                className={`
                  inline-block bg-[linear-gradient(122deg,#E22FFF_22.52%,#602CFF_78.54%)]
                  bg-clip-text px-4 text-transparent
                `}
              >
                Pro
              </span>
              Examples
            </span>
            🎮
          </h1>

          <p
            className={`
              mx-auto mb-7 text-center text-lg

              xl:w-[768px]
            `}
          >
            Pro subscribers have access to advanced examples and guides that can be used as a starting point or inspiration for building node-based UIs.
          </p>

          <footer className="flex justify-center gap-6">
            <Link
              className={`
                inline-flex h-10 items-center rounded-full
                bg-[linear-gradient(122deg,#E22FFF_22.52%,#602CFF_78.54%)] px-6 font-semibold
                text-white
              `}
              href="/pro/guides/sheet/introduction"
            >
              Get started
            </Link>

            <Link
              className={`
                inline-flex h-10 items-center gap-2 rounded-full bg-[#474D57] px-6 font-semibold
                text-white
              `}
              href="https://github.com/dream-num/univer"
            >
              <GithubSingle24 className="text-2xl" />
              GitHub
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
                  mb-10 mt-0 bg-[linear-gradient(122deg,#E22FFF_22.52%,#602CFF_78.54%)] bg-clip-text
                  py-4 text-center text-[32px] font-semibold text-transparent
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

                    <p className="mb-2">
                      {item.desc}
                    </p>

                    <Link className="text-sm text-[#0019FE]" href={item.link}>
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
