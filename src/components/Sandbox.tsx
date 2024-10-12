import { clsx } from '@/lib/utils'
import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import { CodeSingle } from '@univerjs/icons'
import { useTheme } from 'nextra-theme-docs'
import { useState } from 'react'

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
            '@univerjs/core': '0.3.0',
            '@univerjs/design': '0.3.0',
            '@univerjs/docs': '0.3.0',
            '@univerjs/docs-ui': '0.3.0',
            '@univerjs/docs-hyper-link': '0.3.0',
            '@univerjs/docs-hyper-link-ui': '0.3.0',
            '@univerjs/engine-formula': '0.3.0',
            '@univerjs/engine-render': '0.3.0',
            '@univerjs/engine-numfmt': '0.3.0',
            '@univerjs/facade': '0.3.0',
            '@univerjs/network': '0.3.0',
            '@univerjs/sheets': '0.3.0',
            '@univerjs/sheets-formula': '0.3.0',
            '@univerjs/sheets-hyper-link': '0.3.0',
            '@univerjs/sheets-hyper-link-ui': '0.3.0',
            '@univerjs/sheets-numfmt': '0.3.0',
            '@univerjs/sheets-filter': '0.3.0',
            '@univerjs/sheets-filter-ui': '0.3.0',
            '@univerjs/sheets-sort': '0.3.0',
            '@univerjs/sheets-sort-ui': '0.3.0',
            '@univerjs/sheets-ui': '0.3.0',
            '@univerjs/sheets-zen-editor': '0.3.0',
            '@univerjs/ui': '0.3.0',
            '@univerjs/slides': '0.3.0',
            '@univerjs/slides-ui': '0.3.0',
            '@univerjs/rpc': '0.3.0',
            '@univerjs/data-validation': '0.3.0',
            '@univerjs/sheets-data-validation': '0.3.0',
            '@univerjs-pro/engine-pivot': '0.3.0',
            '@univerjs-pro/sheets-pivot': '0.3.0',
            '@univerjs-pro/sheets-pivot-ui': '0.3.0',
            '@univerjs/sheets-crosshair-highlight': '0.3.0',
            '@univerjs-pro/exchange-client': '0.3.0',
            '@univerjs-pro/facade': '0.3.0',
            vue: 'latest',
            dayjs: 'latest',
            react: 'latest',
            'react-dom': 'latest',
            rxjs: 'latest',
            '@univerjs/icons': 'latest',
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
