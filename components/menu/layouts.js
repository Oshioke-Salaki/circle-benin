'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import clsx from 'clsx'
import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { useMenu } from '../MenuProvider'
import Photo from '../ui/Photo'
import Price from '../ui/Price'
import PhotoTile from './PhotoTile'
import TextList from './TextList'
import GroupHeading from './GroupHeading'
import OptionList from './OptionList'
import { LogoMark } from '../brand/Logo'

const ease = [0.16, 1, 0.3, 1]

// Photographed items are shown visually; the rest keep their group and become menu rows.
function split(groups) {
  const photos = groups.flatMap((g) => g.items.filter((i) => i.image))
  const textGroups = groups
    .map((g) => ({ name: g.name, items: g.items.filter((i) => !i.image) }))
    .filter((g) => g.items.length)
  return { photos, textGroups }
}

function TextGroups({ groups, showNames = true, columns }) {
  return (
    <div className="space-y-14">
      {groups.map((g) => (
        <div key={g.name}>
          {showNames && groups.length > 1 && <GroupHeading>{g.name}</GroupHeading>}
          <TextList items={g.items} columns={columns} />
        </div>
      ))}
    </div>
  )
}

/* Starters: bento. One hero plate, the rest around it. Exactly one cell per photo. */
export function Bento({ section }) {
  const { photos, textGroups } = split(section.groups)
  const bento = photos.length === 5

  return (
    <>
      <ul
        className={clsx(
          'grid gap-x-4 gap-y-8 md:gap-x-6',
          bento ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        )}
      >
        {photos.map((item, i) => {
          const hero = bento && i === 0
          return (
            <PhotoTile
              key={item.id}
              item={item}
              index={i}
              large={hero}
              className={clsx(hero && 'col-span-2 md:row-span-2')}
              imageClassName={hero ? 'aspect-[4/3] md:aspect-auto md:flex-1 md:min-h-[320px]' : 'aspect-square'}
              sizes={hero ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
            />
          )
        })}
      </ul>
      <div className="mt-16 md:mt-20">
        <TextGroups groups={textGroups} />
      </div>
    </>
  )
}

/* Mains: the Circle motif. Round-cropped plates, which turn a little on hover. */
export function Plates({ section }) {
  const { photos, textGroups } = split(section.groups)
  const { openDish } = useMenu()

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4 md:gap-x-8">
        {photos.map((item, i) => (
          <motion.li
            key={item.id}
            id={`item-${item.id}`}
            initial={{ opacity: 0, scale: 0.9, rotate: -12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, delay: i * 0.08, ease }}
          >
            <button onClick={() => openDish(item)} className="group block w-full text-center active:scale-[0.98]">
              <span className="relative block">
                <Photo
                  src={item.image}
                  alt={item.name}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="aspect-square rounded-full ring-1 ring-ink/10 transition duration-700 ease-out group-hover:rotate-[14deg] group-hover:ring-2 group-hover:ring-crimson"
                  imgClassName="scale-110"
                />
              </span>
              <span className="mt-5 block font-display text-xl leading-tight transition-colors group-hover:text-accent md:text-2xl">
                {item.name}
              </span>
              <Price item={item} className="mt-1 block text-sm text-muted" />
            </button>
          </motion.li>
        ))}
      </ul>
      <div className="mt-16 md:mt-24">
        <TextGroups groups={textGroups} />
      </div>
    </>
  )
}

/* Pasta & Steak: one list, with a pinned photo that follows the row you are on (desktop and tablet). */
export function Preview({ section }) {
  const items = section.groups.flatMap((g) => g.items)
  const firstPhoto = items.find((i) => i.image)
  const [preview, setPreview] = useState(firstPhoto)
  const { openDish } = useMenu()

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10 lg:gap-16">
      <div className="hidden md:col-span-5 md:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-tile">
          <AnimatePresence initial={false}>
            <motion.div
              key={preview.id}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease }}
              className="absolute inset-0"
            >
              <Photo src={preview.image} alt={preview.name} sizes="40vw" className="absolute inset-0" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="md:col-span-7">
        {section.groups.map((group) => (
          <div key={group.name} className="mb-14 last:mb-0">
            <GroupHeading>{group.name}</GroupHeading>
            <ul className="space-y-2">
              {group.items.map((item, i) => {
                const Row = item.image ? 'button' : 'div'
                const isPreview = preview.id === item.id
                return (
                  <motion.li
                    key={item.id}
                    id={`item-${item.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, delay: i * 0.05, ease }}
                    className="scroll-mt-32"
                  >
                    <Row
                      {...(item.image && {
                        onClick: () => openDish(item),
                        onMouseEnter: () => setPreview(item),
                        onFocus: () => setPreview(item),
                      })}
                      className={clsx(
                        'group -mx-3 flex w-[calc(100%+1.5rem)] items-start gap-4 rounded-tile p-3 text-left transition-colors md:items-center md:p-4',
                        item.image && 'hover:bg-ink/[0.04] active:scale-[0.99]',
                        item.image && isPreview && 'md:bg-ink/[0.04]'
                      )}
                    >
                      {item.image && (
                        <Photo src={item.image} alt="" sizes="64px" className="mt-1 size-14 shrink-0 rounded-full md:hidden" />
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-3">
                          <span className="font-display text-[1.35rem] leading-snug md:text-[1.75rem]">{item.name}</span>
                          <span aria-hidden className="leader" />
                          <Price item={item} className="text-[0.95rem] text-ink" />
                        </span>
                        <span className="mt-1 block max-w-[52ch] text-[0.95rem] leading-relaxed text-muted">{item.desc}</span>
                      </span>
                      {item.image && (
                        <ArrowUpRightIcon
                          size={18}
                          className="hidden shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block"
                        />
                      )}
                    </Row>
                  </motion.li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

/* Desserts & Sides: no photos yet, so it reads like a printed menu card, set in logo red. */
export function Card({ section }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease }}
      className="on-crimson relative isolate overflow-hidden rounded-tile p-6 shadow-[0_40px_120px_-40px_rgb(var(--crimson)/0.8)] sm:p-10 md:p-14"
    >
      <LogoMark className="pointer-events-none absolute -bottom-[30%] -right-[12%] -z-10 w-[min(90%,560px)] text-ink/[0.08]" />
      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        {section.groups.map((g) => (
          <div key={g.name}>
            <GroupHeading>{g.name}</GroupHeading>
            <TextList items={g.items} columns={1} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* Drinks: tabs for the bar's four lists, photographed drinks as a gallery, the rest as rows. */
export function Bar({ section }) {
  const [tab, setTab] = useState(section.groups[0].name)
  const group = section.groups.find((g) => g.name === tab)
  const photos = group.items.filter((i) => i.image)
  const rest = group.items.filter((i) => !i.image)
  // Feature the first drink when the photo count fills the grid exactly (a 2x2 feature plus full rows).
  const feature = photos.length >= 5 && (photos.length + 3) % 4 === 0

  return (
    <>
      <div role="tablist" aria-label="Drinks" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
        {section.groups.map((g) => {
          const selected = g.name === tab
          return (
            <button
              key={g.name}
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(g.name)}
              className={clsx(
                'relative h-11 shrink-0 rounded-full border px-5 text-sm transition-colors active:scale-[0.97]',
                selected ? 'border-transparent text-white' : 'border-ink/15 text-muted hover:text-ink'
              )}
            >
              {selected && (
                <motion.span
                  layoutId="drinks-tab"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-crimson"
                />
              )}
              <span className="relative">
                {g.name}
                <span className={clsx('ml-2 tabular', selected ? 'text-white/70' : 'text-muted/70')}>{g.items.length}</span>
              </span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          role="tabpanel"
          aria-label={tab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease }}
          className="mt-10"
        >
          {photos.length > 0 && (
            <ul
              className={clsx(
                'grid gap-x-4 gap-y-8 md:gap-x-6',
                photos.length <= 2 && 'grid-cols-2 md:max-w-2xl',
                photos.length > 2 && (feature ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4')
              )}
            >
              {photos.map((item, i) => {
                const big = feature && i === 0
                return (
                  <PhotoTile
                    key={item.id}
                    item={item}
                    index={i}
                    large={big}
                    className={clsx(big && 'col-span-2 row-span-2')}
                    imageClassName={big ? 'aspect-[4/5] md:aspect-auto md:flex-1' : 'aspect-[3/4]'}
                    sizes={big ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
                  />
                )
              })}
            </ul>
          )}
          {rest.length > 0 && (
            <div className={photos.length ? 'mt-16 md:mt-20' : ''}>
              <TextList items={rest} columns={photos.length ? 3 : 2} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

/* Spirits & Wine: shot photos up top, then the bottle list set in columns like a wine list. */
export function Cellar({ section }) {
  const [shots, ...bottleGroups] = section.groups
  const shotPhotos = shots.items.filter((i) => i.image)
  const shotRest = shots.items.filter((i) => !i.image)

  return (
    <>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <GroupHeading>{shots.name}</GroupHeading>
          <ul className="grid grid-cols-3 gap-3 md:gap-5">
            {shotPhotos.map((item, i) => (
              <PhotoTile
                key={item.id}
                item={item}
                index={i}
                imageClassName="aspect-[3/4]"
                sizes="(min-width: 1024px) 18vw, 33vw"
              />
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 lg:pt-[4.5rem]">
          {shotRest.map((item) => (
            <div key={item.id} id={`item-${item.id}`} className="rounded-tile border border-ink/10 bg-surface p-6 md:p-8">
              <h4 className="font-display text-2xl">{item.name}</h4>
              <p className="mt-1 text-sm text-muted">{item.desc}</p>
              <div className="mt-5">
                <OptionList options={item.options} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 gap-x-14 sm:columns-2 md:mt-24 xl:columns-3">
        {bottleGroups.map((group, gi) => (
          <motion.div
            key={group.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: (gi % 3) * 0.06, ease }}
            className="mb-14 break-inside-avoid"
          >
            <GroupHeading>{group.name}</GroupHeading>
            <div className="space-y-8">
              {group.items.map((item) => (
                <div key={item.id} id={`item-${item.id}`} className="scroll-mt-32">
                  {group.items.length > 1 && <h4 className="mb-3 font-display text-xl">{item.name}</h4>}
                  <OptionList options={item.options} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <p className="text-sm text-muted">Prices in this list are per bottle.</p>
    </>
  )
}
