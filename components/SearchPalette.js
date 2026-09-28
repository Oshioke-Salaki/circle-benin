'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { MagnifyingGlassIcon, XIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { allItems } from '../data/menu'
import Photo from './ui/Photo'
import Price from './ui/Price'

const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

// Each item is searchable by its name, description, group and any bottle names.
const index = allItems.map((item) => ({
  item,
  text: normalize([item.name, item.desc, item.groupName, ...(item.options?.map((o) => o.name) ?? []), ...(item.sides ?? [])].join(' ')),
}))

const suggestions = ['Jollof', 'Chicken', 'Prawns', 'Mojito', 'Hennessy', 'Shisha']

export default function SearchPalette({ open, onClose, onSelect }) {
  return <AnimatePresence>{open && <Palette key="palette" onClose={onClose} onSelect={onSelect} />}</AnimatePresence>
}

function Palette({ onClose, onSelect }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const results = useMemo(() => {
    const terms = normalize(query).trim().split(/\s+/).filter(Boolean)
    if (!terms.length) return []
    return index
      .filter(({ text }) => terms.every((t) => text.includes(t)))
      .map(({ item }) => {
        // For bottle lists, name the bottles that matched ("Hennessy VSOP, Hennessy VS").
        const bottles = item.options?.filter((o) => terms.some((t) => normalize(o.name).includes(t))).map((o) => o.name)
        return { item, detail: bottles?.length ? bottles.join(', ') : item.sectionName }
      })
      .slice(0, 30)
  }, [query])

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Photo dishes open their sheet; text-only rows scroll to their place in the menu.
  const choose = (item) => {
    onClose()
    if (item.image || item.options) {
      onSelect(item)
    } else {
      document.getElementById(`item-${item.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="fixed inset-0 z-palette flex items-start justify-center md:pt-[12dvh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[rgb(8_5_7/0.75)] backdrop-blur-sm"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        className="relative flex h-[100dvh] w-full flex-col bg-surface md:h-auto md:max-h-[72dvh] md:w-[min(640px,92vw)] md:rounded-tile md:shadow-[0_30px_90px_rgb(0_0_0/0.5)]"
      >
        <div className="border-b border-ink/10 p-4 md:p-5">
          <div className="flex items-center justify-between">
            <label id="search-title" htmlFor="menu-search" className="text-sm text-muted">
              Search the menu
            </label>
            <button onClick={onClose} aria-label="Close search" className="grid size-9 place-items-center rounded-full text-muted transition hover:bg-ink/5 hover:text-ink active:scale-95">
              <XIcon size={18} />
            </button>
          </div>
          <div className="mt-2 flex items-center gap-3 rounded-full border border-ink/15 bg-bg px-4 focus-within:border-accent">
            <MagnifyingGlassIcon size={18} className="shrink-0 text-muted" />
            <input
              ref={inputRef}
              id="menu-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && results[0] && choose(results[0].item)}
              autoComplete="off"
              enterKeyHint="search"
              className="h-12 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
              placeholder="Dish, drink or bottle"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-2 md:p-3">
          {!query.trim() && (
            <div className="p-3">
              <p className="text-sm text-muted">Try</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink transition hover:border-accent hover:text-accent active:scale-95"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <div className="grid place-items-center px-6 py-16 text-center">
              <p className="font-display text-2xl italic">Nothing called “{query.trim()}”</p>
              <p className="mt-2 max-w-[34ch] text-sm text-muted">Try a shorter word, or ask your server.</p>
            </div>
          )}

          <ul>
            {results.map(({ item, detail }) => (
              <li key={item.id}>
                <button
                  onClick={() => choose(item)}
                  className="group flex w-full items-center gap-4 rounded-tile p-2.5 text-left transition hover:bg-ink/5 active:scale-[0.99]"
                >
                  {item.image ? (
                    <Photo src={item.image} alt="" sizes="56px" className="size-14 shrink-0 rounded-full" />
                  ) : (
                    <span aria-hidden className="grid size-14 shrink-0 place-items-center rounded-full border border-ink/10 font-display text-xl italic text-muted">
                      {item.name[0]}
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-ink">{item.name}</span>
                    <span className="block truncate text-sm text-muted">{detail}</span>
                  </span>
                  <Price item={item} className="text-sm text-ink" />
                  <ArrowRightIcon size={16} className="shrink-0 text-muted transition group-hover:translate-x-0.5 group-hover:text-accent" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
