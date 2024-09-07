import { LifecycleService, LifecycleStages, LocaleService, LocaleType, Univer, UniverInstanceType } from '@univerjs/core'
import { defaultTheme } from '@univerjs/design'
import { UniverDocsPlugin } from '@univerjs/docs'
import { UniverDocsUIPlugin } from '@univerjs/docs-ui'
import { IFunctionService, UniverFormulaEnginePlugin } from '@univerjs/engine-formula'
import { UniverRenderEnginePlugin } from '@univerjs/engine-render'
import { UniverSheetsFormulaPlugin } from '@univerjs/sheets-formula'
import { UniverSheetsNumfmtPlugin } from '@univerjs/sheets-numfmt'
import { UniverUIPlugin } from '@univerjs/ui'
import React, { useEffect, useState } from 'react'
import { enUS, zhCN } from 'univer:locales'
import type { IFunctionNames } from '@univerjs/engine-formula'

interface IProps {
  locale: LocaleType
}

interface IFunctionItem {
  name: IFunctionNames
  desc: string
}

export default function FormulaList(props: IProps) {
  const { locale } = props

  const [functions, setFunctions] = useState<IFunctionItem[]>([])

  useEffect(() => {
    const univer = new Univer({
      theme: defaultTheme,
      locale,
      locales: {
        [LocaleType.EN_US]: enUS,
        [LocaleType.ZH_CN]: zhCN,
      },
    })

    univer.registerPlugin(UniverRenderEnginePlugin)
    univer.registerPlugin(UniverFormulaEnginePlugin)

    univer.registerPlugin(UniverUIPlugin, {
      container: 'app',
      disableAutoFocus: true,
    })

    univer.registerPlugin(UniverDocsPlugin)
    univer.registerPlugin(UniverDocsUIPlugin)

    univer.registerPlugin(UniverSheetsNumfmtPlugin)
    univer.registerPlugin(UniverSheetsFormulaPlugin)
    univer.createUnit(UniverInstanceType.UNIVER_SHEET, {})

    const functionSvc = univer.__getInjector().get(IFunctionService)
    const localeSvc = univer.__getInjector().get(LocaleService)
    const subscription = univer.__getInjector().get(LifecycleService).lifecycle$.subscribe((state) => {
      if (state === LifecycleStages.Rendered) {
        const functions: IFunctionItem[] = []

        for (const [key, value] of functionSvc.getDescriptions()) {
          functions.push({
            name: key,
            desc: localeSvc.t(value.description),
          })
        }

        setFunctions(functions)
      }
    })

    return () => {
      subscription.unsubscribe()
      univer.dispose()
    }
  }, [])

  return (
    <details className="mt-6" open>
      <summary className="cursor-pointer font-medium">
        Functions - (
        {functions.length}
        )
      </summary>

      <div className="relative mt-6 overflow-x-auto">
        <table
          className={`
            w-full text-left text-sm

            rtl:text-right
          `}
        >
          <tbody>
            {functions.map(func => (
              <tr key={func.name}>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium"
                >
                  {func.name}
                </th>
                <td className="px-6 py-4">
                  {func.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  )
}
