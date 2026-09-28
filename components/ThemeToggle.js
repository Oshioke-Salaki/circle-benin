'use client'

import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@phosphor-icons/react'

export const THEME_KEY = 'circle-theme'

export default function ThemeToggle({ className }) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'dark')
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#0b090b' : '#f4f2f2')
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={className}
    >
      {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  )
}
