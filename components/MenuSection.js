'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DishCard from './DishCard'

export default function MenuSection({ section, sectionRef, onDishClick }) {
  const [activeSubMenu, setActiveSubMenu] = useState('All')

  const subCategories = section.hasSubMenu 
    ? ['All', ...Array.from(new Set(section.items.map(item => item.badge).filter(Boolean)))]
    : []

  const filteredItems = section.hasSubMenu && activeSubMenu !== 'All'
    ? section.items.filter(item => item.badge === activeSubMenu)
    : section.items

  return (
    <section ref={sectionRef} id={section.id} className="py-16 md:py-24 px-4 border-t border-charcoal/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 text-center md:text-left">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-crimson mb-3 font-semibold">{section.subtitle}</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal">{section.name}</h2>
          </div>
          <p className="text-sm text-charcoal-light max-w-sm mx-auto md:mx-0 font-light leading-relaxed">
            {section.description}
          </p>
        </div>

        {section.hasSubMenu && subCategories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-10">
            {subCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveSubMenu(cat)}
                className={`px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.15em] font-bold transition-all ${
                  activeSubMenu === cat
                    ? 'bg-crimson text-white shadow-md'
                    : 'bg-charcoal/5 text-charcoal hover:bg-charcoal/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <DishCard item={item} onClick={() => onDishClick(item)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
