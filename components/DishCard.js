'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function DishCard({ item, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group cursor-pointer bg-white border border-charcoal/5 hover:border-crimson/30 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-luxury-soft flex flex-col h-full"
    >
      {/* Image Area */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 bg-sexy-cream overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-4xl text-charcoal/5 font-bold tracking-tighter">CIRCLE</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />

        {/* Price tag */}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-charcoal/5 shadow-sm">
          <span className="text-charcoal font-display text-sm md:text-base font-semibold">{item.price}</span>
        </div>

        {/* Badges */}
        {item.badge && (
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 bg-crimson border border-crimson-bright text-white text-[9px] uppercase tracking-wider rounded-sm shadow-md">
              {item.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl md:text-2xl font-bold text-charcoal mb-2 group-hover:text-crimson transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-charcoal-light font-light leading-relaxed mb-4 flex-1 line-clamp-2">
          {item.shortDesc}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-charcoal/5">
          <span className="text-[10px] text-charcoal-light uppercase tracking-widest font-semibold flex items-center gap-2">
            View Details
          </span>
          <ArrowRight size={14} className="text-crimson transition-transform group-hover:translate-x-2" />
        </div>
      </div>
    </motion.div>
  )
}
