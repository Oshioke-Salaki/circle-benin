'use client'

import { motion } from 'framer-motion'
import DishCard from './DishCard'

export default function MenuSection({ section, sectionRef, onDishClick }) {
  return (
    <section ref={sectionRef} id={section.id} className="py-16 md:py-24 px-4 border-t border-charcoal/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8 text-center md:text-left">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-crimson mb-3 font-semibold">{section.subtitle}</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal">{section.name}</h2>
          </div>
          <p className="text-sm text-charcoal-light max-w-sm mx-auto md:mx-0 font-light leading-relaxed">
            {section.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {section.items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            >
              <DishCard item={item} onClick={() => onDishClick(item)} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
