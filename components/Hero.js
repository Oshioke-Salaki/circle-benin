'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDownIcon } from '@phosphor-icons/react'
import { allItems, restaurant } from '../data/menu'
import { useMenu } from './MenuProvider'
import { LogoMark, Wordmark, MARK_HOLE, MARK_RATIO } from './brand/Logo'
import Photo from './ui/Photo'
import Price from './ui/Price'

// Overhead shots on round plates. The plate sits in the hole of the Circle logo, as its inner circle.
const plateIds = ['m2', 'pa2', 's6', 'pa1']
const plates = plateIds.map((id) => allItems.find((i) => i.id === id)).filter(Boolean)

const ease = [0.16, 1, 0.3, 1]

// Plate geometry inside the mark, as percentages of the mark box (a hair smaller than the hole so a ring of red shows).
const plateR = MARK_HOLE.r * 0.94
const pctY = (y) => `${(y / 100) * MARK_RATIO * 100}%`
const plateBox = { left: `${MARK_HOLE.cx - plateR}%`, top: pctY(MARK_HOLE.cy - plateR), width: `${plateR * 2}%` }
const ringR = plateR * 1.84
const ringBox = { left: `${MARK_HOLE.cx - ringR}%`, top: pctY(MARK_HOLE.cy - ringR), width: `${ringR * 2}%` }
const origin = `${MARK_HOLE.cx}% ${pctY(MARK_HOLE.cy)}`

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { openDish } = useMenu()
  const [index, setIndex] = useState(0)
  // When the opening moment plays, hold the hero's entrance until the red has opened.
  const [delay, setDelay] = useState(0)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const plateRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70])
  const plateScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])

  useEffect(() => {
    if (document.documentElement.dataset.intro === 'play' && !reduce) setDelay(1.7)
  }, [reduce])

  useEffect(() => {
    if (reduce || plates.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % plates.length), 5200)
    return () => clearInterval(id)
  }, [reduce])

  const current = plates[index]

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden">
      <div id="hero-sentinel" aria-hidden className="absolute top-10 h-px w-px" />
      <div id="hero-end" aria-hidden className="absolute top-[70%] h-px w-px" />

      {/* Ambient crimson light pooling behind the plate */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[20%] top-[-10%] -z-10 aspect-square w-[110vw] rounded-full opacity-70 blur-3xl md:w-[70vw] lg:right-[-10%]"
        style={{ background: 'radial-gradient(circle, rgb(var(--halo) / 0.6), transparent 62%)' }}
      />

      <div className="mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 content-center items-center gap-4 px-5 pb-10 pt-16 sm:gap-10 md:px-8 md:pt-24 lg:grid-cols-12 lg:gap-8 lg:pb-16">
        {/* The plate, inside the Circle rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay, ease }}
          className="relative mx-auto w-[min(58vw,32dvh)] sm:w-[min(48vw,40dvh)] lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:w-[min(29vw,56dvh)]"
        >
          <motion.div
            style={{ rotate: plateRotate, scale: plateScale, transformOrigin: origin, aspectRatio: `${MARK_RATIO}` }}
            className="relative"
          >
            {/* Brand line orbiting outside the rings */}
            <svg viewBox="0 0 200 200" aria-hidden className="absolute aspect-square animate-spin-ring text-muted" style={ringBox}>
              <defs>
                <path id="ring" d="M100,100 m-94,0 a94,94 0 1,1 188,0 a94,94 0 1,1 -188,0" />
              </defs>
              <text className="fill-current font-sans text-[6.4px] uppercase tracking-[0.5em]">
                <textPath href="#ring">Cocktails ✦ Bites ✦ Vibes ✦ Skyline views ✦ Rooftop lounge ✦ Benin City ✦</textPath>
              </text>
            </svg>

            <div
              className="absolute aspect-square overflow-hidden rounded-full shadow-[0_40px_120px_-20px_rgb(var(--halo)/0.7)]"
              style={plateBox}
            >
              <div className="absolute inset-0 animate-spin-slow">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, ease }}
                    className="absolute inset-0"
                  >
                    <Photo
                      src={current.image}
                      alt={current.name}
                      sizes="(min-width: 1024px) 30vw, 60vw"
                      priority={index === 0}
                      className="absolute inset-0"
                      imgClassName="scale-[1.18]"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* The Circle rings, turning slowly around the plate */}
            <div className="absolute inset-0 animate-spin-ring" style={{ transformOrigin: origin }}>
              <LogoMark className="size-full text-crimson-glow drop-shadow-[0_0_28px_rgb(var(--crimson)/0.6)]" />
            </div>
          </motion.div>

          {/* What is on the plate right now */}
          <button
            onClick={() => openDish(current)}
            className="group mx-auto mt-8 flex items-baseline gap-2 text-sm text-muted transition hover:text-ink sm:mt-12"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={current.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease }}
                className="flex items-baseline gap-2"
              >
                <span className="font-display text-base italic text-ink underline decoration-crimson-glow/70 underline-offset-4 group-hover:decoration-accent">
                  {current.name}
                </span>
                <Price item={current} />
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Copy */}
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="text-center lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delay + 0.2, ease }}
            className="text-xs uppercase tracking-[0.3em] text-accent sm:text-sm"
          >
            Rooftop restaurant &amp; lounge
          </motion.p>

          <h1 className="mt-4 lg:mt-6">
            <span className="sr-only">Circle</span>
            <span aria-hidden className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: delay + 0.3, ease }}
                className="block"
              >
                <Wordmark className="mx-auto h-[clamp(4rem,17vw,7.5rem)] w-auto text-ink lg:mx-0 xl:h-[9rem]" />
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delay + 0.7, ease }}
            className="mx-auto mt-4 max-w-[34ch] text-base leading-relaxed text-muted sm:text-lg lg:mx-0 lg:mt-6"
          >
            Cocktails, bites and skyline views from a Benin City rooftop. The full menu is right below.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delay + 0.85, ease }}
            className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row lg:mt-10 lg:justify-start"
          >
            <a
              href="#signatures"
              className="group inline-flex h-12 w-full max-w-xs items-center justify-center gap-2 rounded-full bg-crimson px-7 text-[0.95rem] font-medium text-white shadow-[0_12px_40px_-12px_rgb(var(--crimson)/0.9)] transition hover:bg-crimson-hover active:scale-[0.98] sm:w-auto"
            >
              See the menu
              <ArrowDownIcon size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href={restaurant.phoneHref}
              className="inline-flex h-12 w-full max-w-xs items-center justify-center rounded-full border border-ink/20 px-7 text-[0.95rem] font-medium text-ink transition hover:border-crimson-glow active:scale-[0.98] sm:w-auto"
            >
              Reserve a table
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
