'use client'

import { motion } from 'motion/react'
import clsx from 'clsx'
import { useMenu } from '../MenuProvider'
import Photo from '../ui/Photo'
import Price from '../ui/Price'

const ease = [0.16, 1, 0.3, 1]

// A photographed dish: image on top, name and price underneath. Opens the dish sheet.
export default function PhotoTile({ item, sizes, className, imageClassName = 'aspect-[4/5]', index = 0, large }) {
  const { openDish } = useMenu()

  return (
    <motion.li
      id={`item-${item.id}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.06, ease }}
      className={clsx('min-w-0', className)}
    >
      <button onClick={() => openDish(item)} className="group flex h-full w-full flex-col text-left active:scale-[0.99]">
        <Photo
          src={item.image}
          alt={item.name}
          sizes={sizes}
          className={clsx('w-full rounded-tile', imageClassName)}
          imgClassName="group-hover:scale-[1.04]"
        />
        <span className={clsx('mt-3 flex', large ? 'items-baseline justify-between gap-3' : 'flex-col gap-0.5')}>
          <span
            className={clsx(
              'font-display leading-tight transition-colors group-hover:text-accent',
              large ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
            )}
          >
            {item.name}
          </span>
          <Price item={item} className={clsx('shrink-0 text-muted', large ? 'text-base' : 'text-sm')} />
        </span>
      </button>
    </motion.li>
  )
}
