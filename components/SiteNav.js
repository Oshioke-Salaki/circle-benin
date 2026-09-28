'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import clsx from 'clsx'
import { MagnifyingGlassIcon, PhoneIcon } from '@phosphor-icons/react'
import { menuData, restaurant } from '../data/menu'
import useActiveSection, { usePastElement } from '../lib/useActiveSection'
import { useMenu } from './MenuProvider'
import ThemeToggle from './ThemeToggle'
import { LogoMark, Wordmark } from './brand/Logo'

const sectionIds = menuData.map((s) => s.id)
const iconButton =
  'grid size-10 place-items-center rounded-full text-ink transition hover:bg-ink/[0.07] active:scale-95'

const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function SiteNav() {
  const active = useActiveSection(sectionIds)
  const scrolled = usePastElement('hero-sentinel')
  const pastHero = usePastElement('hero-end')
  const { openSearch } = useMenu()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-header transition-[background-color,box-shadow,border-color] duration-500',
          scrolled ? 'glass border-b border-ink/[0.07]' : 'border-b border-transparent'
        )}
      >
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 md:h-[72px] md:px-8">
          <a href="#top" aria-label="Circle, back to top" className="group flex items-center gap-2.5 text-ink">
            <LogoMark className="h-7 w-auto text-crimson-glow transition-transform duration-700 ease-out group-hover:rotate-[-40deg] md:h-8" />
            <Wordmark className="h-[1.35rem] w-auto md:h-6" />
          </a>

          <nav aria-label="Menu sections" className="mx-auto hidden lg:block">
            <Pills active={active} layoutId="header-pill" />
          </nav>

          <div className="ml-auto flex items-center gap-1 lg:ml-0">
            <button onClick={openSearch} aria-label="Search the menu" className={iconButton}>
              <MagnifyingGlassIcon size={19} />
            </button>
            <ThemeToggle className={iconButton} />
            <a href={restaurant.phoneHref} aria-label="Reserve a table" className={clsx(iconButton, 'md:hidden')}>
              <PhoneIcon size={19} />
            </a>
            <a
              href={restaurant.phoneHref}
              className="ml-2 hidden h-10 items-center rounded-full bg-crimson px-5 text-sm font-medium text-white transition hover:bg-crimson-hover active:scale-[0.98] md:inline-flex"
            >
              Reserve a table
            </a>
          </div>
        </div>

        {/* Reading progress through the menu, in logo red */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className={clsx('absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-crimson-glow transition-opacity duration-500', scrolled ? 'opacity-100' : 'opacity-0')}
        />
      </header>

      {/* Thumb-reach category dock for phones and tablets */}
      <AnimatePresence>
        {pastHero && (
          <motion.nav
            aria-label="Menu sections"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="pointer-events-none fixed inset-x-0 bottom-0 z-dock px-3 pb-safe lg:hidden"
          >
            <div className="glass pointer-events-auto mx-auto flex max-w-xl items-center gap-1 rounded-full border border-ink/10 p-1.5 shadow-[0_20px_50px_rgb(0_0_0/0.35)]">
              <button
                onClick={openSearch}
                aria-label="Search the menu"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-ink/[0.07] text-ink active:scale-95"
              >
                <MagnifyingGlassIcon size={19} />
              </button>
              <Pills active={active} layoutId="dock-pill" scrollable />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

function Pills({ active, layoutId, scrollable }) {
  const listRef = useRef(null)

  // Keep the active pill in view inside the scrollable dock.
  useEffect(() => {
    if (!scrollable || !active || !listRef.current) return
    const list = listRef.current
    const pill = list.querySelector(`[data-id="${active}"]`)
    if (!pill) return
    list.scrollTo({ left: pill.offsetLeft - (list.clientWidth - pill.clientWidth) / 2, behavior: 'smooth' })
  }, [active, scrollable])

  return (
    <ul ref={listRef} className={clsx('flex items-center gap-0.5', scrollable && 'no-scrollbar min-w-0 flex-1 overflow-x-auto scroll-smooth')}>
      {menuData.map((section) => {
        const isActive = active === section.id
        return (
          <li key={section.id} data-id={section.id} className="shrink-0">
            <button
              onClick={() => goTo(section.id)}
              aria-current={isActive ? 'true' : undefined}
              className={clsx(
                'relative h-10 rounded-full px-4 text-sm transition-colors duration-300 active:scale-[0.97] sm:h-11 lg:h-9',
                isActive ? 'text-white' : 'text-muted hover:text-ink'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={layoutId}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-crimson"
                />
              )}
              <span className="relative">{section.label}</span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
