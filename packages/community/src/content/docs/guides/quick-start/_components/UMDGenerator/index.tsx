import { useState } from 'react'
import styles from './index.module.less'

export default function UMDGenerator() {
  const [result, setResult] = useState<{
    react: boolean
    rxjs: boolean
    facade: boolean
    type: 'doc' | 'sheet' | 'slide'
    additional: string[]
  }>({
    react: false,
    rxjs: false,
    facade: true,
    type: 'sheet',
    additional: [],
  })

  function handleGenerate() {
    const license = [
      '/**',
      ' * Copyright 2023-present DreamNum Inc.',
      ' *',
      ' * Licensed under the Apache License, Version 2.0 (the "License");',
      ' * you may not use this file except in compliance with the License.',
      ' * You may obtain a copy of the License at',
      ' *',
      ' *     http://www.apache.org/licenses/LICENSE-2.0',
      ' *',
      ' * Unless required by applicable law or agreed to in writing, software',
      ' * distributed under the License is distributed on an "AS IS" BASIS,',
      ' * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.',
      ' * See the License for the specific language governing permissions and',
      ' * limitations under the License.',
      ' */',
    ]

    const scripts: string[] = [
      'https://unpkg.com/clsx/dist/clsx.min.js',
    ]

    if (!result.react) {
      scripts.push('https://unpkg.com/react/umd/react.production.min.js')
      scripts.push('https://unpkg.com/react-dom/umd/react-dom.production.min.js')
    }

    if (!result.rxjs) {
      scripts.push('https://unpkg.com/rxjs@7.8.1/dist/bundles/rxjs.umd.min.js')
    }
    scripts.push(
      'https://unpkg.com/@wendellhu/redi/dist/redi.js',
      'https://unpkg.com/@wendellhu/redi/dist/react-bindings.js',

      'https://unpkg.com/@univerjs/protocol/lib/umd/index.js',
      'https://unpkg.com/@univerjs/core/lib/umd/index.js',
      'https://unpkg.com/@univerjs/design/lib/umd/index.js',

      'https://unpkg.com/@univerjs/engine-render/lib/umd/index.js',
      'https://unpkg.com/@univerjs/engine-numfmt/lib/umd/index.js',
      'https://unpkg.com/@univerjs/engine-formula/lib/umd/index.js',
      'https://unpkg.com/@univerjs/ui/lib/umd/index.js',

      'https://unpkg.com/@univerjs/docs/lib/umd/index.js',
      'https://unpkg.com/@univerjs/docs-ui/lib/umd/index.js',
    )

    if (result.type === 'sheet') {
      scripts.push(
        'https://unpkg.com/@univerjs/sheets/lib/umd/index.js',
        'https://unpkg.com/@univerjs/sheets-ui/lib/umd/index.js',
        'https://unpkg.com/@univerjs/sheets-formula/lib/umd/index.js',
        'https://unpkg.com/@univerjs/sheets-numfmt/lib/umd/index.js',
      )
    }

    result.additional.forEach((pkg) => {
      scripts.push(`https://unpkg.com/${pkg}/lib/umd/index.js`)
    })

    const styles: string[] = []

    const styleLibs = [
      '@univerjs/design',
      '@univerjs/ui',
      '@univerjs/docs-ui',
      '@univerjs/sheets-ui',
      '@univerjs/sheets-formula',
      '@univerjs/sheets-numfmt',
      '@univerjs/sheets-zen-editor',
      '@univerjs/sheets-conditional-formatting-ui',
      '@univerjs/uniscript',
    ]
    styleLibs.forEach((pkg) => {
      if (scripts.includes(`https://unpkg.com/${pkg}/lib/umd/index.js`)) {
        styles.push(`https://unpkg.com/${pkg}/lib/index.css`)
      }
    })

    Promise.all(
      styles.map(link => fetch(link, {
        headers: {
          'Content-Type': 'plain/text',
        },
      }).then(res => res.text())),
    ).then((texts) => {
      const result = texts.join('\n\n')
      const blob = new Blob([result], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'univer.umd.css'
      a.click()
    })

    Promise.all(
      scripts.map(link => fetch(link, {
        headers: {
          'Content-Type': 'plain/text',
        },
      }).then(res => res.text())),
    ).then((texts) => {
      const result = license.join('\n') + texts.join('\n\n')
      const blob = new Blob([result], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'univer.umd.js'
      a.click()
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked, value } = e.target

    if (name === 'type') {
      setResult({
        ...result,
        type: value as 'doc' | 'sheet' | 'slide',
        additional: [],
      })
    } else if (name === 'additional') {
      setResult({
        ...result,
        additional: checked
          ? [...result.additional, value]
          : result.additional.filter(pkg => pkg !== value),
      })
    } else {
      setResult({
        ...result,
        [name]: checked,
      })
    }
  }

  return (
    <section className={styles.umd}>
      <form>
        <fieldset>
          <legend>rxjs</legend>
          <div className={styles.item}>
            <input
              type="checkbox"
              id="rxjs"
              name="rxjs"
              value="rxjs"
              checked={result.rxjs}
              onChange={handleChange}
            />
            <label htmlFor="rxjs">Already using rxjs in your project?</label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Using react?</legend>
          <div className={styles.item}>
            <input
              type="checkbox"
              id="react"
              name="react"
              value="react"
              checked={result.react}
              onChange={handleChange}
            />
            <label htmlFor="react">Already using react in your project?</label>
          </div>
        </fieldset>

        <fieldset>
          <legend>@univerjs/facade</legend>
          <div className={styles.item}>
            <input
              type="checkbox"
              id="facade"
              name="facade"
              value="facade"
              checked={result.facade}
              onChange={handleChange}
            />
            <label htmlFor="facade">Want to use Univer easily with a facade API</label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Which type of document do you want to build?</legend>
          {['sheet', 'doc', 'slide'].map(type => (
            <div className={styles.item} key={type}>
              <input
                type="radio"
                id={type}
                name="type"
                value={type}
                checked={result.type === type}
                disabled={type === 'slide'}
                onChange={handleChange}
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </fieldset>

        <fieldset>
          <legend>Additional packages</legend>
          {[
            '@univerjs/network',
            '@univerjs/rpc',
            '@univerjs/facade',
            '@univerjs/uniscript',
            '@univerjs/find-replace',
            '@univerjs/data-validation',
          ].map(pkg => (
            <div className={styles.item} key={pkg}>
              <input
                type="checkbox"
                id={pkg}
                name="additional"
                value={pkg}
                checked={result.additional.includes(pkg)}
                onChange={handleChange}
              />
              <label htmlFor={pkg}>{pkg}</label>
            </div>
          ))}

          {result.type === 'doc'
            ? (
            <></>
              )
            : result.type === 'sheet'
              ? [
                  '@univerjs/sheets-find-replace',
                  '@univerjs/sheets-conditional-formatting-ui',
                  '@univerjs/sheets-data-validation',
                  '@univerjs/sheets-zen-editor',
                ].map(pkg => (
            <div className={styles.item} key={pkg}>
              <input
                type="checkbox"
                id={pkg}
                name="additional"
                value={pkg}
                checked={result.additional.includes(pkg)}
                onChange={handleChange}
              />
              <label htmlFor={pkg}>{pkg}</label>
            </div>
                ))
              : <></>}
        </fieldset>

        <footer>
          <a className={styles.btn} onClick={handleGenerate}>Confirm</a>
        </footer>
      </form>

    </section>
  )
}
