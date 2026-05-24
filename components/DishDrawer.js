'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Info, Flame, Droplets, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import AIAssistant from './AIAssistant'

export default function DishDrawer({ item, isOpen, onClose }) {
  if (!item) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-white border-l border-charcoal/10 z-[101] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-charcoal hover:bg-charcoal/5 z-20 transition-colors border border-charcoal/10 shadow-sm"
            >
              <X size={20} />
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* Image Header */}
              <div className="relative w-full h-[35vh] md:h-[45vh] bg-sexy-cream border-b border-charcoal/5 flex items-center justify-center overflow-hidden group">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-80 z-0" />
                )}
                
                {/* Gradient overlay to blend image with content and provide text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 z-10">
                  {item.badge && (
                    <span className="inline-block px-3 py-1 bg-crimson border border-crimson-bright text-white text-[10px] tracking-widest uppercase rounded-sm mb-3 shadow-md">
                      {item.badge}
                    </span>
                  )}
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
                    {item.name}
                  </h2>
                  <p className="font-display text-xl text-white/90 font-medium drop-shadow-md">{item.price}</p>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 md:p-8 space-y-10">
                
                {/* Description */}
                <div>
                  <h3 className="text-[11px] font-semibold tracking-[0.2em] text-charcoal/40 uppercase mb-3 flex items-center gap-2">
                    <Info size={14} className="text-crimson" /> About the Dish
                  </h3>
                  <p className="text-charcoal-light text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Grid for Ingredients & Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Ingredients */}
                  <div>
                    <h3 className="text-[11px] font-semibold tracking-[0.2em] text-charcoal/40 uppercase mb-3 flex items-center gap-2">
                      <Droplets size={14} className="text-crimson" /> Key Elements
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.ingredients?.map((ing, i) => (
                        <span key={i} className="text-xs bg-charcoal/5 border border-charcoal/10 text-charcoal-light px-3 py-1.5 rounded-full">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights (Dietary, Spice, Allergens) */}
                  <div className="space-y-4">
                    {item.spice && (
                      <div>
                        <span className="text-[11px] font-semibold tracking-[0.2em] text-charcoal/40 uppercase block mb-1">Spice Level</span>
                        <div className="flex items-center gap-1">
                          <Flame size={16} className="text-crimson-bright" />
                          <span className="text-sm text-charcoal capitalize">{item.spice}</span>
                        </div>
                      </div>
                    )}
                    
                    {item.allergens && item.allergens.length > 0 && (
                      <div>
                        <span className="text-[11px] font-semibold tracking-[0.2em] text-charcoal/40 uppercase block mb-1">Allergens</span>
                        <p className="text-sm text-charcoal-light">{item.allergens.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Assistant Section */}
                <div className="h-[400px] border-t border-charcoal/10 pt-8">
                  <h3 className="text-[11px] font-semibold tracking-[0.2em] text-charcoal/40 uppercase mb-4 flex items-center gap-2">
                    <SparklesIcon /> AI Sommelier & Chef
                  </h3>
                  <AIAssistant item={item} />
                </div>
                
                {/* Spacer for bottom */}
                <div className="h-4" />
              </div>
            </div>
            
            {/* Action Bar */}
            <div className="p-4 bg-white border-t border-charcoal/10 pb-safe">
              <button 
                onClick={onClose}
                className="w-full group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-xs tracking-[0.2em] uppercase overflow-hidden bg-crimson hover:bg-crimson-bright text-white font-semibold transition-all shadow-md"
              >
                <span>Return to Menu</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function SparklesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-crimson">
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/>
    </svg>
  )
}
