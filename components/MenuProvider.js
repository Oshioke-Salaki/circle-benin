'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { IconContext } from '@phosphor-icons/react'
import DishSheet from './DishSheet'
import SearchPalette from './SearchPalette'

const MenuContext = createContext(null)

export function useMenu() {
  return useContext(MenuContext)
}

export default function MenuProvider({ children }) {
  const [dish, setDish] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)

  const openDish = useCallback((item) => setDish(item), [])
  const closeDish = useCallback(() => setDish(null), [])
  const openSearch = useCallback(() => setSearchOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])

  // "/" or Cmd/Ctrl+K opens search from anywhere on desktop.
  useEffect(() => {
    const onKey = (e) => {
      const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock page scroll behind any overlay.
  useEffect(() => {
    if (!dish && !searchOpen) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [dish, searchOpen])

  const value = useMemo(
    () => ({ openDish, closeDish, openSearch, closeSearch }),
    [openDish, closeDish, openSearch, closeSearch]
  )

  return (
    <MotionConfig reducedMotion="user">
      <IconContext.Provider value={{ size: 20, weight: 'regular', mirrored: false }}>
        <MenuContext.Provider value={value}>
          {children}
          <DishSheet item={dish} onClose={closeDish} onSelect={openDish} />
          <SearchPalette open={searchOpen} onClose={closeSearch} onSelect={openDish} />
        </MenuContext.Provider>
      </IconContext.Provider>
    </MotionConfig>
  )
}
