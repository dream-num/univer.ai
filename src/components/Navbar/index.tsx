import clsx from 'clsx'
import { onMount, onCleanup, createSignal, createMemo } from 'solid-js'
import ResponsiveContainer from '@/components/ResponsiveContainer'
import { LogoIcon, MenuIcon, CloseIcon } from '@/components/Icons'

export type Mode = 'transparent' | 'white' | undefined

interface IProps {
  transitionWithParent?: boolean
  mode?: Mode
}

const NAV_HEIGHT = 72

export default (props: IProps) => {
  const { transitionWithParent = false, mode = 'transparent' } = props

  let logoRef: HTMLAnchorElement | undefined

  const [navbarMode, setNavbarMode] = createSignal<Mode>(mode)
  const [menuOpen, setMenuOpen] = createSignal(false)

  const fillColor = createMemo(() => navbarMode() === 'transparent' ? '#ffffff' : '#35322b')

  onMount(() => {
    if (document.body.clientWidth < 768) return

    if (transitionWithParent) {
      const heroRef = document.querySelector('#univer-hero') as HTMLElement

      function watchScrollToChangeNavbar() {
        if (!heroRef) return

        const { height, y } = heroRef.getBoundingClientRect()
  
        setNavbarMode(height + y <= NAV_HEIGHT ? 'white' : 'transparent')
        
        const svgElement = logoRef?.querySelector('svg')
        if (!svgElement) return
        svgElement.style.fill = fillColor()
      }

      watchScrollToChangeNavbar()
  
      window.addEventListener('scroll', watchScrollToChangeNavbar)
  
      onCleanup(() => {
        window.removeEventListener('scroll', watchScrollToChangeNavbar)
      })
    }
  })

  function handleToggleMenuVisible () {
    setMenuOpen(!menuOpen())
  }

  return (
    <nav
      class={clsx('sticky md:fixed top-0 left-0 w-full z-1', [
        navbarMode() === 'transparent' && 'bg-white text-#35322b shadow-[0_8px_24px_0_rgba(0,0,0,0.06)] md:bg-transparent md:text-white',
        navbarMode() === 'white' && 'bg-white text-#35322b shadow-[0_8px_24px_0_rgba(0,0,0,0.06)]'
      ])}
    >
      <ResponsiveContainer class="flex items-center justify-between">
        <section class="flex items-center gap-16">
          <a ref={logoRef} class="w-34 block [&>svg]:w-full [&>svg]:fill-#35322b" href="/">
            <LogoIcon fill={fillColor()} />
          </a>

          <section class="hidden md:flex items-center gap-16">
            <a href="/products">
              了解 Univer
            </a>

            <a href="/solutions">
              应用场景
            </a>

            <a href="/faq">
              帮助中心
            </a>

            <a href="/talent">
              加入我们
            </a>
          </section>
        </section>

        <section class="md:hidden">
          <a onClick={handleToggleMenuVisible}>
            <MenuIcon />
          </a>

          <section
            class={clsx('fixed w-90% h-full top-0 right-0 px-6 bg-#606060 transition-all', [
              menuOpen() ? 'translate-x-0' : 'translate-x-full'
            ])}
          >
            <header class="h-16 flex items-center justify-end">
              <a onClick={handleToggleMenuVisible}>
                <CloseIcon />
              </a>
            </header>

            <div class="grid gap-6 text-white font-700">
              <a href="/">
                首页
              </a>

              <a href="/products">
                了解 Univer
              </a>

              <a href="/solutions">
                应用场景
              </a>

              <a href="/faq">
                帮助中心
              </a>

              <a href="/talent">
                加入我们
              </a>
            </div>
          </section>
        </section>
      </ResponsiveContainer>
    </nav>

  )
}
