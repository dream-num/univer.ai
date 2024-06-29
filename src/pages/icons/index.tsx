import { GithubSingle24, SearchSingle16, SuccessSingle } from '@univerjs/icons'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { clsx } from '@/lib/utils'
import { ColorPicker } from '@/components/ColorPicker'
import { Slider } from '@/components/Slider'

interface IIconBoxProps {
  iconKey: string
  name: string

  fontSize?: number
  color?: string
  colorChannel1?: string
}

function IconBox(props: IIconBoxProps) {
  const { iconKey, name, fontSize = 24, color, colorChannel1 } = props
  const [copying, setCopying] = useState(false)
  const [Icons, setIcons] = useState<any>(null)

  useEffect(() => {
    import('@univerjs/icons/esm/icons').then((module) => {
      setIcons(module)
    })
  }, [])

  const Icon = useMemo(() => {
    if (!Icons) return null

    return (Icons as any)[name]
  }, [Icons, name])

  function handleCopy() {
    setCopying(true)
    const code = `<${name} />`
    navigator.clipboard.writeText(code)
    setTimeout(() => {
      setCopying(false)
    }, 3000)
  }
  return (
    <div className="{styles.box}">
      <div
        className={`
          mb-2 flex h-32 w-full flex-col items-center justify-center gap-5 rounded-xl border
          border-[#ECECEC] pt-4 text-2xl
        `}
      >
        {Icon && <Icon style={{ color, fontSize: `${fontSize}px` }} extend={{ colorChannel1 }} />}

        <a
          className={`
            cursor-pointer rounded px-5 py-1 text-xs

            hover:bg-[#F5F5F5]
          `}
          onClick={handleCopy}
        >
          {copying
            ? (
                <span className="flex items-center gap-1">
                  <SuccessSingle className="text-[#409F11]" />
                  Copied
                </span>
              )
            : 'Copy'}
        </a>
      </div>
      <p className="text-center text-xs text-[#656565]">{iconKey}</p>
    </div>
  )
}

export default function Page() {
  const [category, setCategory] = useState('single')
  const [keyword, setKeyword] = useState('')
  const [fontSize, setFontSize] = useState(24)
  const [color, setColor] = useState('#1e222b')
  const [colorChannel1, setColorChannel1] = useState('#274fee')
  const [manifest, setManifest] = useState<any>(null)

  const tabs = [{
    label: 'Single Tone',
    value: 'single',
  }, {
    label: 'Multi-Tone',
    value: 'binary',
  }, {
    label: 'Fixed Color',
    value: 'other',
  }]

  useEffect(() => {
    import('@univerjs/icons/esm/manifest').then((module) => {
      setManifest(module)
    })
  }, [])

  const excludeList = ['outdate']

  const groups = useMemo(() => {
    if (!manifest) {
      return []
    }

    return tabs.map(tab => ({
      name: tab.value,
      items: Object.keys(manifest)
        .filter((item) => {
          const itemLowerCase = item.toLowerCase()
          if (itemLowerCase.search(tab.value) < 0) {
            return false
          }

          const hasExclude = excludeList.some((excludeItem) => {
            return itemLowerCase.search(excludeItem) >= 0
          })
          if (hasExclude) {
            return false
          }
          return true
        })
        .map(item => ({
          groupName: item.replace('Manifest', '').replace(tab.value, ''),
          groupItem: manifest[item as keyof typeof manifest],
        })),
    }))
  }, [manifest])

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.target.value)
  }

  const activeGroup = useMemo(() => {
    const result = groups.find((group) => {
      return group.name === category
    })!

    if (!result) {
      return {
        items: [],
      }
    }

    if (!keyword) {
      return result
    }

    return {
      ...result,
      items: result.items.map((item) => {
        return {
          ...item,
          groupItem: item.groupItem.filter((icon: any) => {
            return icon.icon.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
          }),
        }
      }).filter(item => item.groupItem.length > 0),
    }
  }, [category, keyword, groups])!

  return (
    <>
      <Head>
        <title>Icons - Univer</title>
      </Head>

      <main className="overflow-hidden">
        <header
          className={`
            relative mx-auto px-8 py-[60px]

            md:h-[400px] md:py-0

            xl:mb-[100px] xl:max-w-[1200px]
          `}
        >
          <div>
            <div
              className={`
                absolute left-1/2 top-1/2 ml-[-720px] mt-[172px] h-[332px] w-[592px]
                translate-x-[-50%] translate-y-[-50%] transform rounded-full bg-[#2daeff33]
                blur-[1500px]
              `}
            />
            <div
              className={`
                absolute left-1/2 top-1/2 ml-[-352px] mt-[45px] h-[141px] w-[252px]
                translate-x-[-50%] translate-y-[-50%] transform rounded-full bg-[#2daeff33]
                blur-[200px]
              `}
            />
            <div
              className={`
                absolute right-1/2 top-0 mr-[-688px] h-[141px] w-[252px] translate-x-[-50%]
                translate-y-[-50%] transform rounded-full bg-[#2afede26] blur-[200px]
              `}
            />
            <img
              className={`
                absolute -top-1/2 left-1/2 hidden h-[800px]

                md:block
              `}
              src="/images/univer-icons/hero.png"
              alt="Univer Icons"
            />
          </div>

          <section className={`
            relative flex h-full flex-col justify-center gap-6

            md:w-[422px]
          `}
          >
            <label>
              SVG based, componentized, used on demand
            </label>
            <h1 className="text-5xl font-semibold">
              Univer Icons
            </h1>
            <footer>
              <Link
                className={`
                  inline-flex items-center gap-1 rounded-md bg-[#274fee0d] px-2.5 py-1.5 text-sm
                `}
                href="https://github.com/dream-num/univer-icons"
              >
                <GithubSingle24 />
                GitHub
              </Link>
            </footer>
          </section>
        </header>

        <search className={`
          relative mb-12 bg-white shadow-[0px_4px_24px_#1f23270a]

          md:h-14
        `}
        >
          <div
            className={`
              mx-auto flex h-full flex-row justify-center justify-between p-4

              md:items-center md:gap-6 md:px-8 md:py-0

              xl:max-w-[1200px]
            `}
          >
            <div className="flex w-1/2 flex-1 items-center gap-2">
              <SearchSingle16 className="text-lg" />
              <input className="flex-1" value={keyword} onChange={handleSearch} placeholder="Search" />
            </div>

            <div
              className={`
                mt-2 flex flex-1 flex-col gap-4

                md:mt-0 md:flex-none md:flex-row md:items-center md:gap-8

                xl:w-[500px]
              `}
            >
              <Slider value={fontSize} onChange={setFontSize} />

              <span className="inline-flex items-center gap-4 text-nowrap text-sm">
                channel 1
                <ColorPicker value={color} onChange={setColor} />
              </span>
              <span className="inline-flex items-center gap-4 text-nowrap text-sm">
                channel 2
                <ColorPicker value={colorChannel1} onChange={setColorChannel1} />
              </span>
            </div>
          </div>
        </search>

        <section
          className={`
            mx-auto mb-[100px] px-4

            xl:max-w-[1200px] xl:px-6
          `}
        >
          <section className="mb-10 flex gap-4">
            {
              tabs.map(tab => (
                <a
                  key={tab.value}
                  className={clsx(`
                    cursor-pointer px-2.5 py-1.5 text-sm

                    hover:text-[#274FEE]
                  `, {
                    'bg-[#274fee0d] text-[#274FEE]': tab.value === category,
                  })}
                  onClick={() => setCategory(tab.value)}
                >
                  {tab.label}
                </a>
              ))
            }
          </section>

          <section
            className={`
              grid gap-6 px-4

              xl:px-6
            `}
          >
            {activeGroup.items.map(item => (
              <div key={item.groupName}>
                <h4 className="mb-6 font-semibold">{item.groupName}</h4>

                <div
                  className={`
                    grid grid-cols-2 gap-8

                    md:grid-cols-4

                    xl:grid-cols-8
                  `}
                >
                  {item.groupItem.map((icon: any) => (
                    <IconBox
                      key={icon.stem}
                      name={icon.icon}
                      iconKey={icon.stem}
                      fontSize={fontSize}
                      color={color}
                      colorChannel1={colorChannel1}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        </section>
      </main>
    </>
  )
}
