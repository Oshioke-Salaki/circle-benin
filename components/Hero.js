'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero({ onExplore }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden bg-sexy-white">
      {/* Cinematic Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/80 to-sexy-white z-10" />
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/tomahawk_ribeye.png)' }}
        />
        {/* Crisp grid lines for a luxurious touch */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_80%,transparent_100%)] z-10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 mt-16 md:mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex flex-col items-center w-full"
        >
          <div className="w-12 h-[1px] bg-crimson/30 mb-6" />
          <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-crimson mb-4 font-semibold">Benin City — Est. 2025</p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-charcoal tracking-tight mb-2">
            CIRCLE
          </h1>
          <p className="font-display italic text-xl sm:text-2xl md:text-3xl text-charcoal-light tracking-wider">Restaurant & Lounge</p>
          <div className="w-12 h-[1px] bg-crimson/30 mt-6" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base text-charcoal-light max-w-md font-light leading-relaxed mb-10 md:mb-12 px-4"
        >
          Where the future of luxury dining meets the soul of culinary mastery. Every detail curated for perfection.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={onExplore}
          className="group relative flex items-center justify-center gap-4 px-8 py-4 bg-charcoal hover:bg-charcoal-light text-xs tracking-[0.2em] uppercase text-white transition-all duration-500 overflow-hidden w-full max-w-[280px] sm:w-auto shadow-luxury-soft"
        >
          <span className="relative z-10 font-semibold">Explore Collection</span>
          <ArrowRight size={14} className="relative z-10 text-crimson transition-transform duration-500 group-hover:translate-x-1" />
          <div className="absolute inset-0 bg-gradient-to-r from-crimson/0 via-crimson/20 to-crimson/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20"
      >
        <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-crimson/30 to-transparent overflow-hidden">
          <motion.div
            animate={{ y: [0, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-crimson"
          />
        </div>
      </motion.div>
    </section>
  )
}
