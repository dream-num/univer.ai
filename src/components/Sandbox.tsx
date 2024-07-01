import { useTheme } from 'nextra-theme-docs'
import { SandpackCodeEditor, SandpackLayout, SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react'
import { CodeSingle } from '@univerjs/icons'
import { useState } from 'react'
import { clsx } from '@/lib/utils'

interface ISandboxProps {
  entryFile: string
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
  const { entryFile } = props

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
            '@univerjs/engine-formula': 'latest',
            '@univerjs/engine-render': 'latest',
            '@univerjs/engine-numfmt': 'latest',
            '@univerjs/facade': 'latest',
            '@univerjs/sheets': 'latest',
            '@univerjs/sheets-formula': 'latest',
            '@univerjs/sheets-ui': 'latest',
            '@univerjs/sheets-zen-editor': 'latest',
            '@univerjs/ui': 'latest',
            '@univerjs/slides': 'latest',
            '@univerjs/slides-ui': 'latest',
            '@univerjs/rpc': 'latest',
            vue: 'latest',
            dayjs: 'latest',
            react: 'latest',
            'react-dom': 'latest',
            rxjs: 'latest',
            '@wendellhu/redi': 'latest',
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
        }}
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        template="vite"
      >
        <SandpackLayout className="!grid">
          <div className="relative">
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
            className={clsx({
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
