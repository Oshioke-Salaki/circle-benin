'use client'

import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence, motion, useDragControls } from 'motion/react'
import { XIcon } from '@phosphor-icons/react'
import { allItems, signatureItems } from '../data/menu'
import useMediaQuery from '../lib/useMediaQuery'
import Photo from './ui/Photo'
import Price from './ui/Price'
import OptionList from './menu/OptionList'

const spring = { type: 'spring', stiffness: 260, damping: 32 }

export default function DishSheet({ item, onClose, onSelect }) {
  const desktop = useMediaQuery('(min-width: 768px)')

  return (
    <AnimatePresence>
      {item && (
        <div key="sheet" className="fixed inset-0 z-sheet flex items-end justify-center md:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-[rgb(8_5_7/0.7)] backdrop-blur-sm"
          />
          <Panel item={item} desktop={desktop} onClose={onClose} onSelect={onSelect} />
        </div>
      )}
    </AnimatePresence>
  )
}

function Panel({ item, desktop, onClose, onSelect }) {
  const closeRef = useRef(null)
  const scrollRef = useRef(null)
  const drag = useDragControls()

  const related = useMemo(() => {
    const sameSection = allItems.filter((i) => i.sectionId === item.sectionId && i.image && i.id !== item.id)
    const pool = sameSection.length >= 3 ? sameSection : [...sameSection, ...signatureItems.filter((i) => i.id !== item.id)]
    return [...new Map(pool.map((i) => [i.id, i])).values()].slice(0, 3)
  }, [item])

  // Focus the close button on open, restore focus on close, and close on Escape.
  useEffect(() => {
    const previous = document.activeElement
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previous?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [item.id])

  const motionProps = desktop
    ? { initial: { opacity: 0, scale: 0.96, y: 16 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.97, y: 8 } }
    : { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-title"
      {...motionProps}
      transition={spring}
      drag={desktop ? false : 'y'}
      dragControls={drag}
      dragListener={false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={{ top: 0, bottom: 0.6 }}
      onDragEnd={(_, info) => {
        if (info.offset.y > 120 || info.velocity.y > 600) onClose()
      }}
      className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-tile bg-surface shadow-[0_-24px_80px_rgb(0_0_0/0.45)] md:h-[min(660px,88dvh)] md:w-[min(1000px,92vw)] md:flex-row md:rounded-tile"
    >
      {/* Mobile drag handle */}
      <div
        onPointerDown={(e) => drag.start(e)}
        className="absolute inset-x-0 top-0 z-raised flex h-8 cursor-grab touch-none justify-center pt-2.5 md:hidden"
      >
        <span className="h-1 w-10 rounded-full bg-white/60 shadow" />
      </div>

      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close"
        className="glass absolute right-4 top-4 z-raised grid size-10 place-items-center rounded-full text-ink transition active:scale-95"
      >
        <XIcon size={18} />
      </button>

      <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain md:flex md:overflow-hidden">
        {item.image && (
          <div
            onPointerDown={(e) => !desktop && drag.start(e)}
            className="relative h-[44dvh] w-full shrink-0 touch-none md:h-full md:w-1/2 md:touch-auto"
          >
            <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="absolute inset-0">
              <Photo src={item.image} alt={item.name} sizes="(min-width: 768px) 500px, 100vw" priority className="absolute inset-0" />
            </motion.div>
          </div>
        )}

        <motion.div
          key={`${item.id}-body`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 p-6 pb-10 md:overflow-y-auto md:p-10"
          style={{ flex: 1 }}
        >
          <div className={item.image ? '' : 'pt-8'}>
            <p className="text-sm text-muted">{item.groupName ?? item.sectionName}</p>
            <h2 id="dish-title" className="mt-2 pb-1 font-display text-4xl leading-[1.1] md:text-5xl">
              {item.name}
            </h2>
            <Price item={item} className="mt-3 block text-2xl font-medium text-accent" />
          </div>

          {item.desc && <p className="max-w-[46ch] text-base leading-relaxed text-muted">{item.desc}</p>}

          {item.options && <OptionList options={item.options} />}

          {related.length > 0 && (
            <div className="mt-auto border-t border-ink/10 pt-6">
              <h3 className="text-sm text-muted">You might also like</h3>
              <ul className="mt-4 grid grid-cols-3 gap-3">
                {related.map((r) => (
                  <li key={r.id}>
                    <button onClick={() => onSelect(r)} className="group w-full text-left transition active:scale-[0.98]">
                      <Photo
                        src={r.image}
                        alt={r.name}
                        sizes="160px"
                        className="aspect-square rounded-tile"
                        imgClassName="group-hover:scale-105"
                      />
                      <span className="mt-2 block text-sm leading-snug text-ink">{r.name}</span>
                      <Price item={r} className="text-xs text-muted" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
