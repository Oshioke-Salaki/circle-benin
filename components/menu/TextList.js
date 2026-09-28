'use client'

import { motion } from 'motion/react'
import clsx from 'clsx'
import Price from '../ui/Price'
import OptionList from './OptionList'

const ease = [0.16, 1, 0.3, 1]

// Typographic menu rows for dishes without a photo: name, leader, price, then the description.
export default function TextList({ items, columns = 2, className }) {
  return (
    <ul
      className={clsx(
        'grid grid-cols-1 gap-x-14 gap-y-7',
        columns === 2 && 'md:grid-cols-2',
        columns === 3 && 'md:grid-cols-2 xl:grid-cols-3',
        className
      )}
    >
      {items.map((item, i) => (
        <motion.li
          key={item.id}
          id={`item-${item.id}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: (i % 6) * 0.04, ease }}
          className="scroll-mt-32"
        >
          <div className="flex items-baseline gap-3">
            <h4 className="font-display text-[1.35rem] leading-snug md:text-2xl">{item.name}</h4>
            {!item.options && !item.sides && (
              <>
                <span aria-hidden className="leader" />
                <Price item={item} className="text-[0.95rem] text-ink" />
              </>
            )}
          </div>
          {item.desc && <p className="mt-1.5 max-w-[52ch] text-[0.95rem] leading-relaxed text-muted">{item.desc}</p>}
          {item.options && (
            <div className="mt-4">
              <OptionList options={item.options} />
            </div>
          )}
          {item.sides && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.sides.map((side) => (
                <li key={side} className="rounded-full border border-ink/15 px-3.5 py-1.5 text-sm text-ink">
                  {side}
                </li>
              ))}
            </ul>
          )}
        </motion.li>
      ))}
    </ul>
  )
}
