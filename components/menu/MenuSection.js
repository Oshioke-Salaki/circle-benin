'use client'

import { motion } from 'motion/react'
import { Bento, Plates, Preview, Card, Bar, Cellar } from './layouts'

const layouts = { bento: Bento, plates: Plates, preview: Preview, card: Card, bar: Bar, cellar: Cellar }
const ease = [0.16, 1, 0.3, 1]

// "Starters & Garden" renders its ampersand in italic, the same family, as the one flourish.
function Title({ name }) {
  const parts = name.split(' & ')
  return parts.map((part, i) => (
    <span key={part}>
      {i > 0 && <em className="px-[0.12em] text-accent">&amp;</em>}
      {part}
    </span>
  ))
}

export default function MenuSection({ section }) {
  const Layout = layouts[section.layout]
  const count = section.groups.reduce((n, g) => n + g.items.length, 0)

  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-14 py-12 md:scroll-mt-[72px] md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease }}
          className="mb-10 border-t border-ink/10 pt-8 md:mb-16 md:pt-12"
        >
          <h2 id={`${section.id}-title`} className="flex items-start gap-3 font-display text-[clamp(2.75rem,9vw,6.5rem)] leading-[1] tracking-[-0.015em]">
            <span className="pb-2">
              <Title name={section.name} />
            </span>
            <sup className="tabular mt-[0.6em] hidden sm:inline font-sans text-sm tracking-normal text-muted md:text-base">{count}</sup>
          </h2>
          <p className="mt-4 max-w-[48ch] text-base text-muted md:text-lg">{section.blurb}</p>
        </motion.header>

        <Layout section={section} />
      </div>
    </section>
  )
}
