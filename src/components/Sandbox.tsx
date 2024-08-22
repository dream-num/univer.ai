import { useTheme } from 'nextra-theme-docs'
import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import { CodeSingle } from '@univerjs/icons'
import { useState } from 'react'
import { clsx } from '@/lib/utils'

interface ISandboxProps {
  entryFile: string
  files?: Record<string, string>
}

const viteConfigTs = `import { defineConfig } from 'vite'
import { univerPlugin } from '@univerjs/vite-plugin'
  
export default defineConfig({
  plugins: [
    univerPlugin()
  ]
})`

const styleCss = `html, body {
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  height: calc(100% - 44px);
}`

const localesTs = `export { enUS, zhCN } from 'univer:locales'`

export default function Sandbox(props: ISandboxProps) {
  const { entryFile, files } = props

  const { resolvedTheme } = useTheme()

  const [visible, setVisible] = useState(false)

  return (
    <section className={`
      mt-6 overflow-hidden

      [&_.sp-bridge-frame]:opacity-0
    `}
    >
      <SandpackProvider
        customSetup={{
          dependencies: {
            '@univerjs/core': 'latest',
            '@univerjs/design': 'latest',
            '@univerjs/docs': 'latest',
            '@univerjs/docs-ui': 'latest',
            '@univerjs/docs-hyper-link': 'latest',
            '@univerjs/docs-hyper-link-ui': 'latest',
            '@univerjs/engine-formula': 'latest',
            '@univerjs/engine-render': 'latest',
            '@univerjs/engine-numfmt': 'latest',
            '@univerjs/facade': 'latest',
            '@univerjs/network': 'latest',
            '@univerjs/sheets': 'latest',
            '@univerjs/sheets-formula': 'latest',
            '@univerjs/sheets-hyper-link': 'latest',
            '@univerjs/sheets-hyper-link-ui': 'latest',
            '@univerjs/sheets-numfmt': 'latest',
            '@univerjs/sheets-filter': 'latest',
            '@univerjs/sheets-filter-ui': 'latest',
            '@univerjs/sheets-sort': 'latest',
            '@univerjs/sheets-sort-ui': 'latest',
            '@univerjs/sheets-ui': 'latest',
            '@univerjs/sheets-zen-editor': 'latest',
            '@univerjs/ui': 'latest',
            '@univerjs/slides': 'latest',
            '@univerjs/slides-ui': 'latest',
            '@univerjs/rpc': 'latest',
            '@univerjs-pro/engine-pivot': 'latest',
            '@univerjs-pro/sheets-pivot': 'latest',
            '@univerjs-pro/sheets-pivot-ui': 'latest',
            vue: 'latest',
            dayjs: 'latest',
            react: 'latest',
            'react-dom': 'latest',
            rxjs: 'latest',
            '@univerjs/icons': '^0.1.72',
            'react-beautiful-dnd': '^13.1.1',
          },
          devDependencies: {
            '@univerjs/vite-plugin': 'latest',
          },
        }}
        files={{
          'vite.config.ts': viteConfigTs,
          'style.css': styleCss,
          'locales.ts': localesTs,
          'index.js': entryFile,
          ...files,
        }}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        template="vite"
      >
        <SandpackLayout className={clsx('flex flex-col')}>
          <div className="relative max-w-full">
            <SandpackPreview style={{ height: '480px' }} />

            <div className="absolute bottom-0 left-0 flex h-[40px] w-[50%] items-center px-2">
              <a
                className={clsx(`
                  inline-flex cursor-pointer items-center gap-2 text-sm text-stone-500

                  hover:text-[#274FEE]
                `, {
                  'text-[#274fee]': visible,
                })}
                onClick={() => setVisible(!visible)}
              >
                <CodeSingle />
                Source Code
              </a>
            </div>
          </div>

          <div
            className={clsx('max-w-full', {
              hidden: !visible,
            })}
          >
            <SandpackCodeEditor style={{ height: '480px' }} showTabs />
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </section>
  )
}
