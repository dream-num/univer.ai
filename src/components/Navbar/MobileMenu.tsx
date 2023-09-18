import { createSignal, createEffect, createMemo } from 'solid-js'

interface IProps {
  navs: any[]
}

export default (props: IProps) => {
  const { navs } = props

  const realNavs = createMemo<any>(() => {
    return [{
      title: '首页',
      link: '/',
    }].concat(navs)
  })

  const [isOpen, setIsOpen] = createSignal(false)

  const [selectedMenu, setSelectedMenu] = createSignal({
    deepth: 0,
    index: -1,
    children: realNavs()
  })

  function handleCloseMenu () {
    setIsOpen(false)
  }

  function handleOpenMenu () {
    setIsOpen(true)
  }

  createEffect(() => {
    const $body = document.querySelector('[data-univer-body]')!

    if (isOpen()) {
      document.body.classList.add('overflow-hidden')
      $body.classList.add('-translate-x-89%')
      $body.classList.add('fixed')
    } else {
      document.body.classList.remove('overflow-hidden')
      $body.classList.remove('-translate-x-89%')
      $body.classList.remove('fixed')
    }
  })

  function handleChooseMenu (nav: any, index: number) {
    if (nav.children) {
      setSelectedMenu({
        deepth: selectedMenu().deepth + 1,
        index,
        children: nav.children
      })
    }
  }

  function handleBack () {
    setSelectedMenu({
      deepth: 0,
      index: -1,
      children: realNavs()
    })
  }

  return (
    <>
      <a
        class={`${isOpen() ? 'opacity-0' : ''} transition-opacity`}
        onClick={handleOpenMenu}
      >
        <img src="/images/navbar/menu.svg" />
      </a>

      <menu
        class={`${isOpen() ? 'translate-x-0' : ''} bg-[#1a1b1c] fixed right-0 top-0 h-screen w-89vw translate-x-100% px-6`}
      >
        <header class="h-14 mb-2 flex items-center justify-between">
          {selectedMenu().deepth !== 0 && (
            <a class="p-2" onClick={handleBack}>
              <img src="/images/navbar/left.svg" />
            </a>
          )}

          <span class="text-white text-1.125rem font-700">
            {selectedMenu().deepth !== 0 && realNavs()[selectedMenu().index].title}
          </span>

          <a class="p-2" onClick={handleCloseMenu}>
            <img src="/images/navbar/close.svg" />
          </a>
        </header>

        <ul class="grid gap-6">
          {selectedMenu().children.map((nav: any, index: number) => (
            <li>
              <a
                class="text-white font-700 flex items-center justify-between"
                href={nav.link}
                onClick={() => handleChooseMenu(nav, index)}
              >
                <span>{nav.title}</span>

                {nav.children && (
                  <span>
                    <img src="/images/navbar/right.svg" />
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </menu>
    </>
  )
}
