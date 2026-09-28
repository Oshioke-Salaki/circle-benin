'use client'

import { motion } from 'motion/react'
import { InstagramLogoIcon, MapPinIcon } from '@phosphor-icons/react'
import { allItems, restaurant } from '../data/menu'
import { LogoLockup, LogoMark } from './brand/Logo'
import Photo from './ui/Photo'

const ease = [0.16, 1, 0.3, 1]
// A drink shot at the bar, with the dining room behind it.
const ambience = allItems.find((i) => i.id === 'c2')

// The page closes in logo red: the one deliberate colour block on the site.
export default function Visit() {
  return (
    <footer id="visit" className="on-crimson relative isolate overflow-hidden pb-8 pt-20 md:pt-28">
      {/* Oversized ring mark as a watermark */}
      <LogoMark className="pointer-events-none absolute -right-[18%] -top-[12%] -z-10 w-[80vw] max-w-[900px] text-ink/[0.06] md:-right-[8%]" />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-5 md:grid-cols-12 md:gap-10 md:px-8 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease }}
          className="mx-auto w-[min(74vw,400px)] md:col-span-5 md:w-full"
        >
          <Photo
            src={ambience.image}
            alt="A cocktail on the Circle bar with the lounge behind it"
            sizes="(min-width: 768px) 40vw, 74vw"
            className="aspect-square rounded-full shadow-[0_40px_100px_-30px_rgb(20_0_6/0.8)] ring-[6px] ring-ink/15"
          />
        </motion.div>

        <div className="md:col-span-7">
          <p className="text-xs uppercase tracking-[0.3em] text-accent sm:text-sm">Visit</p>
          <h2 className="mt-3 pb-1 font-display text-5xl leading-[1.08] md:text-6xl lg:text-7xl">
            Find us on the <em>rooftop</em>
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm text-muted">Address</h3>
              <address className="mt-3 not-italic leading-relaxed">
                {restaurant.name}
                {restaurant.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <div>
              <h3 className="text-sm text-muted">Hours</h3>
              <dl className="mt-3 space-y-1.5">
                {restaurant.hours.map((h) => (
                  <div key={h.days} className="flex items-baseline gap-3">
                    <dt>{h.days}</dt>
                    <span aria-hidden className="leader" />
                    <dd className="tabular">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={restaurant.phoneHref}
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-7 font-medium text-crimson transition hover:bg-ink/90 active:scale-[0.98]"
            >
              Reserve a table
            </a>
            <a
              href={restaurant.mapsHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-ink/40 px-7 font-medium transition hover:border-ink hover:bg-ink/[0.06] active:scale-[0.98]"
            >
              <MapPinIcon size={18} />
              Get directions
            </a>
          </div>
          <p className="mt-4 text-sm text-muted">
            Reservations line <span className="tabular text-ink">{restaurant.phone}</span>
          </p>

          <a
            href={restaurant.instagramHref}
            target="_blank"
            rel="noreferrer"
            className="group mt-10 inline-flex items-center gap-4 border-t border-ink/20 pt-6"
          >
            <span className="grid size-12 place-items-center rounded-full border border-ink/40 transition group-hover:bg-ink group-hover:text-crimson">
              <InstagramLogoIcon size={22} />
            </span>
            <span>
              <span className="block font-display text-2xl italic leading-tight">@{restaurant.instagram}</span>
              <span className="block text-sm text-muted">DJ nights, karaoke and parties. Follow along.</span>
            </span>
          </a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease }}
        className="mt-24 flex justify-center px-5 md:mt-32"
      >
        <LogoLockup className="w-[min(56vw,320px)] text-ink" />
      </motion.div>

      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col items-center justify-between gap-2 px-5 pb-24 text-sm text-muted sm:flex-row md:px-8 lg:pb-0">
        <p>© {new Date().getFullYear()} {restaurant.name}</p>
        <a href="#top" className="transition hover:text-ink">
          Back to top
        </a>
      </div>
    </footer>
  )
}
