import type { OpenOptions } from '@stackblitz/sdk'
import { clsx } from '@/lib/utils'
import sdk from '@stackblitz/sdk'
import { GithubSingle24, MenuSingle } from '@univerjs/icons'
import Head from 'next/head'
import { useEffect, useState } from 'react'

interface IEmbedProps {
  title: string
  type: 'StackBlitz' | 'CodeSandbox'
  src?: string
  repoPath?: string
  openOptions?: OpenOptions
}

const demo: { title: string, items: IEmbedProps[] }[] = [
  {
    title: 'Sheets',
    items: [
      {
        title: 'Vite',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/sheets-vite-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'Multi Instance',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/sheets-multi-instance-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'Uniscript',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/sheets-uniscript-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'Webpack 4',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/sheets-webpack4-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'UMD',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/sheets-umd-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'Custom Function',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/sheets-custom-function-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'Custom Menu',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/custom-menu',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'Vue 2',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/sheets-vue2-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'Vue 2 with Vite',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/sheets-vue2-vite-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'Vue 3',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/sheets-vue3-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'React',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/sheets-react-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'React and Facade API',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/sheets-react-facade-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'Web Worker',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/sheets-web-worker-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'CSV Import Plugin',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/csv-import-plugin-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'Render Extension',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/sheets-render-extension-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'Migrate Luckysheet',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/migrate-luckysheet',
        openOptions: {
          openFile: 'README.md',
        },
      },
      {
        title: 'Permission Control',
        type: 'StackBlitz',
        repoPath: 'awesome-univer/sheets-permission-demo',
        openOptions: {
          openFile: 'README.md',
        },
      },
    ],
  },
]

export default function Page() {
  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState(demo[0].items[0])

  const embedDomId = 'embed-playground'

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('title')

    if (query) {
      const activeDemo = demo.flatMap(cate => cate.items).find(item => item.title === query)
      if (activeDemo) {
        setSelected(activeDemo)
      }
    } else {
      setSelected(demo[0].items[0])
    }
  }, [])

  useEffect(() => {
    if (selected?.type === 'StackBlitz') {
      sdk.embedGithubProject(embedDomId, selected.repoPath!, {
        ...selected.openOptions,
      })
    }
  }, [selected])

  function handleSelect(item: IEmbedProps) {
    setSelected(item)

    const url = new URL(window.location.href)
    url.searchParams.set('title', item.title)
    window.history.pushState({}, '', url.toString())
  }

  return (
    <>
      <Head>
        <title>Playground - Univer</title>
      </Head>

      <section className="flex h-[calc(100vh-68px)] overflow-hidden">
        <aside
          className={clsx(`
            relative grid h-full overflow-y-auto overflow-x-hidden border-r border-gray-200 bg-white
            pb-12
          `, {
            'w-14 px-2': collapsed,
            'w-64 px-6': !collapsed,
          })}
        >
          {demo.map(cate => (
            <section key={cate.title} className="py-4">
              <label className="mb-2 text-xs font-semibold leading-6 text-gray-400">
                {cate.title}
              </label>

              <ul>
                {cate.items.map(item => (
                  <li key={item.title}>
                    <span
                      className={clsx(`
                        group flex cursor-pointer items-center justify-between rounded-md p-2
                        text-sm font-medium transition-all

                        hover:bg-gray-100 hover:text-[#274FEE]
                      `, {
                        'bg-gray-100 text-[#274FEE]': selected.title === item.title,
                        'text-gray-700': selected.title !== item.title,
                      })}
                      onClick={() => handleSelect(item)}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={clsx(`
                            flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border
                            bg-white text-[0.625rem] font-medium

                            group-hover:border-indigo-600 group-hover:text-indigo-600
                          `, {
                            'border-[#274FEE] text-[#274FEE]': selected.title === item.title,
                            'border-gray-200 text-gray-400': selected.title !== item.title,
                          })}
                        >
                          {item.title[0]}
                        </span>
                        <span className={clsx({ hidden: collapsed })}>{item.title}</span>
                      </span>

                      <a
                        className={clsx(`
                          cursor-pointer text-lg text-[#656565]

                          hover:text-[#274FEE]
                        `, {
                          hidden: collapsed,
                        })}
                        href={`https://github.com/${item.repoPath}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <GithubSingle24 />
                      </a>
                    </span>
                  </li>

                ))}
              </ul>
            </section>
          ))}

          <footer
            className={clsx('fixed bottom-0 left-0 flex bg-white py-4', {
              'w-14 justify-center px-2': collapsed,
              'w-64 justify-end px-6': !collapsed,
            })}
          >
            <a
              className="cursor-pointer text-lg text-[#656565]"
              onClick={() => setCollapsed(!collapsed)}
            >
              <MenuSingle className={clsx({
                'rotate-180 transform': collapsed,
              })}
              />
            </a>
          </footer>
        </aside>

        <section className="h-full flex-1">
          <iframe
            id={embedDomId}
            className="h-full"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            title={selected?.title}
            src={selected?.src}
          />
        </section>
      </section>
    </>
  )
}
