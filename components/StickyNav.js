'use client'

import { motion } from 'framer-motion'

export default function StickyNav({ categories, activeId, onSelect }) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-charcoal/5 w-full shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <span className="font-display font-bold text-lg text-charcoal tracking-widest">CIRCLE</span>
          {/* <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
            <span className="text-[10px] uppercase tracking-widest text-charcoal-light">Menu</span>
          </div> */}
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto custom-scrollbar pb-1 md:pb-0 hide-scroll-mobile -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`flex-shrink-0 px-4 py-2 text-[10px] uppercase tracking-widest font-semibold rounded-full transition-all duration-300 ${activeId === cat.id
                ? 'bg-charcoal text-white shadow-md'
                : 'text-charcoal-light hover:text-charcoal hover:bg-charcoal/5 border border-transparent hover:border-charcoal/5'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
