'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { signatureItems } from '../data/menu'
import { useMenu } from './MenuProvider'
import Photo from './ui/Photo'
import Price from './ui/Price'

const ease = [0.16, 1, 0.3, 1]
const arrow =
  'grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition hover:border-ink/40 active:scale-95'

export default function Signatures() {
  const railRef = useRef(null)
  const { openDish } = useMenu()

  const nudge = (dir) => {
    const rail = railRef.current
    if (rail) rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section id="signatures" aria-labelledby="signatures-title" className="scroll-mt-16 py-16 md:scroll-mt-20 md:py-24">
      <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-5 md:px-8">
        <div>
          <h2 id="signatures-title" className="font-display text-5xl leading-[1.05] md:text-7xl">
            The <em className="pr-1">signatures</em>
          </h2>
          <p className="mt-3 max-w-[40ch] text-muted md:text-lg">The plates and pours guests come back for.</p>
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <button onClick={() => nudge(-1)} aria-label="Previous" className={arrow}>
            <ArrowLeftIcon size={18} />
          </button>
          <button onClick={() => nudge(1)} aria-label="Next" className={arrow}>
            <ArrowRightIcon size={18} />
          </button>
        </div>
      </div>

      <ul
        ref={railRef}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 md:scroll-px-8 overflow-x-auto scroll-smooth px-5 md:mt-14 md:gap-6 md:px-8 xl:px-[max(2rem,calc((100vw-1400px)/2+2rem))] xl:scroll-px-[max(2rem,calc((100vw-1400px)/2+2rem))]"
      >
        {signatureItems.map((item, i) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: Math.min(i, 4) * 0.07, ease }}
            className="w-[72vw] shrink-0 snap-start sm:w-[44vw] md:w-[34vw] lg:w-[26vw] xl:w-[340px]"
          >
            <button onClick={() => openDish(item)} className="group block w-full text-left active:scale-[0.99]">
              <Photo
                src={item.image}
                alt={item.name}
                sizes="(min-width: 1280px) 340px, (min-width: 768px) 34vw, 72vw"
                className="aspect-[4/5] rounded-tile"
                imgClassName="group-hover:scale-[1.04]"
              />
              <span className="mt-4 flex items-baseline justify-between gap-3">
                <span className="font-display text-2xl leading-tight transition-colors group-hover:text-accent">{item.name}</span>
                <Price item={item} className="text-sm text-muted" />
              </span>
              <span className="mt-1 block text-sm text-muted">{item.sectionName}</span>
            </button>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
