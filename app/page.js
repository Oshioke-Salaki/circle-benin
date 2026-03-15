'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { menuData } from '../data/menu'

// ─── Ornamental Divider ──────────────────────────────────────────
function OrnamentLine({ reverse = false, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="h-px flex-1"
        style={{
          background: reverse
            ? 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6))'
            : 'linear-gradient(90deg, rgba(201,169,110,0.6), transparent)',
        }}
      />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="6" y="6" width="4" height="4" fill="#C9A96E" transform="rotate(45 8 8)" />
        <rect x="4" y="4" width="8" height="8" stroke="rgba(201,169,110,0.4)" strokeWidth="0.5" fill="none" transform="rotate(45 8 8)" />
      </svg>
      <div
        className="h-px flex-1"
        style={{
          background: reverse
            ? 'linear-gradient(90deg, rgba(201,169,110,0.6), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(201,169,110,0.6))',
        }}
      />
    </div>
  )
}

function GoldLine({ className = '' }) {
  return (
    <div
      className={`h-px ${className}`}
      style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5) 30%, rgba(201,169,110,0.5) 70%, transparent)' }}
    />
  )
}

// ─── Hero Section ────────────────────────────────────────────────
function Hero({ onEnter }) {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(139,12,42,0.22) 0%, #080309 65%)' }}
    >
      {/* Background rings */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '600px', height: '600px',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(139,12,42,0.08)',
          animation: 'pulse-orb 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '900px', height: '900px',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(201,169,110,0.04)',
          animation: 'pulse-orb 12s ease-in-out infinite 2s',
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '1200px', height: '1200px',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          border: '1px solid rgba(139,12,42,0.04)',
        }}
      />

      {/* Floating orbs */}
      <div className="orb orb-crimson absolute" style={{ width: 400, height: 400, top: '-10%', right: '-5%', animationDelay: '0s' }} />
      <div className="orb orb-gold absolute" style={{ width: 300, height: 300, bottom: '5%', left: '-8%', animationDelay: '3s' }} />
      <div className="orb orb-crimson absolute" style={{ width: 200, height: 200, bottom: '20%', right: '10%', animationDelay: '5s' }} />

      {/* Animated Circle Logo */}
      <div className="relative z-10 mb-8">
        <svg viewBox="0 0 200 200" className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44" fill="none">
          {/* Outer glow */}
          <circle cx="100" cy="100" r="88" stroke="rgba(139,12,42,0.12)" strokeWidth="1" />
          {/* Main circle */}
          <path
            d="M 100 22 A 78 78 0 1 1 99.9 22"
            stroke="rgba(242,232,220,0.9)"
            strokeWidth="3"
            strokeLinecap="round"
            className="circle-draw-1"
          />
          {/* Inner arc */}
          <path
            d="M 130 44 A 58 58 0 1 0 70 44"
            stroke="rgba(242,232,220,0.45)"
            strokeWidth="2"
            strokeLinecap="round"
            className="circle-draw-2"
          />
          {/* Centre dot */}
          <circle
            cx="100" cy="100" r="4"
            fill="#C9A96E"
            style={{ opacity: 0, animation: 'fadeIn 0.5s ease forwards 2.8s' }}
          />
        </svg>
      </div>

      {/* Text content */}
      <div className="relative z-10 text-center px-6">
        <p
          className="font-body text-xs tracking-[0.4em] uppercase mb-3"
          style={{ color: 'rgba(201,169,110,0.7)', opacity: 0, animation: 'fadeUp 0.9s ease forwards 1.8s' }}
        >
          Benin City — Est. 2019
        </p>

        <h1
          className="font-display font-bold leading-none tracking-widest mb-4"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 7.5rem)',
            opacity: 0,
            animation: 'fadeUp 1s ease forwards 2.1s',
          }}
        >
          <span className="shimmer-cream">circle</span>
        </h1>

        <div
          className="flex items-center justify-center gap-4 mb-3"
          style={{ opacity: 0, animation: 'fadeUp 0.9s ease forwards 2.5s' }}
        >
          <div className="h-px w-12 md:w-20" style={{ background: 'rgba(201,169,110,0.45)' }} />
          <p className="font-body italic text-sm md:text-base tracking-[0.2em]" style={{ color: 'rgba(242,232,220,0.65)' }}>
            Restaurant &amp; Lounge
          </p>
          <div className="h-px w-12 md:w-20" style={{ background: 'rgba(201,169,110,0.45)' }} />
        </div>

        <p
          className="font-body text-sm md:text-base max-w-sm mx-auto leading-relaxed mb-10"
          style={{ color: 'rgba(242,232,220,0.42)', opacity: 0, animation: 'fadeUp 0.9s ease forwards 2.9s', letterSpacing: '0.06em' }}
        >
          Where every detail is a deliberate act of pleasure
        </p>

        <button
          onClick={onEnter}
          className="font-body group relative inline-flex items-center gap-3 px-8 py-3 text-sm tracking-[0.22em] uppercase overflow-hidden"
          style={{
            border: '1px solid rgba(201,169,110,0.35)',
            color: '#C9A96E',
            opacity: 0,
            animation: 'fadeIn 1s ease forwards 3.4s',
            background: 'rgba(139,12,42,0.15)',
            transition: 'all 0.4s ease',
            letterSpacing: '0.22em',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(139,12,42,0.4)'
            e.currentTarget.style.borderColor = 'rgba(201,169,110,0.65)'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(139,12,42,0.35)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(139,12,42,0.15)'
            e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <span className="font-body">Explore the Menu</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-y-1">
            <path d="M7 1v12M1 7l6 6 6-6" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0, animation: 'fadeIn 1s ease forwards 4s' }}
      >
        <div
          className="w-px h-12"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(201,169,110,0.6), transparent)',
            animation: 'pulse-orb 2s ease-in-out infinite',
          }}
        />
        <p className="font-body text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(201,169,110,0.4)' }}>scroll</p>
      </div>
    </section>
  )
}

// ─── Sticky Nav ──────────────────────────────────────────────────
function StickyNav({ categories, activeId, onSelect }) {
  const scrollRef = useRef(null)

  const scrollToActive = useCallback((id) => {
    const container = scrollRef.current
    if (!container) return
    const active = container.querySelector(`[data-id="${id}"]`)
    if (active) {
      const offset = active.offsetLeft - container.offsetWidth / 2 + active.offsetWidth / 2
      container.scrollTo({ left: offset, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    scrollToActive(activeId)
  }, [activeId, scrollToActive])

  return (
    <nav
      className="sticky top-0 z-50 py-3 nav-reveal"
      style={{
        background: 'rgba(8,3,9,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(139,12,42,0.2)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo row */}
        <div className="flex items-center justify-between mb-3 md:mb-2">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none">
              <path d="M20 4 A16 16 0 1 1 19.9 4" stroke="rgba(242,232,220,0.85)" strokeWidth="1.8" strokeLinecap="round"
                style={{ strokeDasharray: 200, strokeDashoffset: 0 }} />
              <path d="M27 9 A11 11 0 1 0 13 9" stroke="rgba(242,232,220,0.4)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="font-display text-sm font-semibold tracking-widest" style={{ color: 'rgba(242,232,220,0.85)' }}>CIRCLE</span>
          </div>
          <p className="font-body text-xs italic hidden sm:block" style={{ color: 'rgba(201,169,110,0.5)', letterSpacing: '0.12em' }}>
            Restaurant &amp; Lounge
          </p>
          <div className="font-body text-xs tracking-widest uppercase hidden md:block" style={{ color: 'rgba(201,169,110,0.4)' }}>
            Benin City
          </div>
        </div>

        {/* Category pills */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto nav-scroll pb-1"
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              data-id={cat.id}
              className={`cat-pill flex-shrink-0 ${activeId === cat.id ? 'active' : ''}`}
              onClick={() => onSelect(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ─── Spice indicator ─────────────────────────────────────────────
function SpiceBadge({ level }) {
  const map = { mild: { label: 'Mild', count: 1 }, medium: { label: 'Medium', count: 2 }, hot: { label: 'Hot', count: 3 } }
  if (!level || !map[level]) return null
  const { label, count } = map[level]
  return (
    <span className="inline-flex items-center gap-1 ml-2" title={label}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#ff6b35', fontSize: '0.65rem' }}>🌶</span>
      ))}
    </span>
  )
}

// ─── Menu Item ───────────────────────────────────────────────────
function MenuItem({ item, isOpen, onToggle }) {
  const detailsRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (detailsRef.current) {
      setHeight(isOpen ? detailsRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div
      className={`menu-card rounded-lg cursor-pointer select-none ${isOpen ? 'is-open' : ''}`}
      onClick={onToggle}
    >
      {/* Main visible row */}
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3
                className="font-display font-semibold text-base md:text-lg leading-snug"
                style={{ color: '#F2E8DC' }}
              >
                {item.name}
              </h3>
              {item.badge && (
                <span className="badge-signature">{item.badge}</span>
              )}
              {item.dietary === 'vegetarian' && (
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border text-xs"
                  style={{ borderColor: 'rgba(74,200,80,0.5)', color: 'rgba(74,200,80,0.8)', fontSize: '0.6rem' }} title="Vegetarian">V</span>
              )}
              {item.dietary === 'non-alcoholic' && (
                <span className="badge-signature" style={{ background: 'rgba(10,80,40,0.7)', borderColor: 'rgba(74,200,80,0.4)', color: 'rgba(180,255,186,0.9)' }}>
                  Non-Alcoholic
                </span>
              )}
              <SpiceBadge level={item.spice} />
            </div>
            <p
              className="font-body italic text-sm leading-relaxed"
              style={{ color: 'rgba(242,232,220,0.48)', letterSpacing: '0.02em' }}
            >
              {item.shortDesc}
            </p>
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span
              className="font-display font-semibold text-base md:text-lg whitespace-nowrap shimmer-gold"
            >
              {item.price}
            </span>
            <div
              className="flex items-center gap-1 transition-transform duration-300"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="8" stroke="rgba(201,169,110,0.3)" strokeWidth="0.8" />
                <path d="M5.5 7.5L9 11L12.5 7.5" stroke="rgba(201,169,110,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable details */}
      <div
        style={{
          height: `${height}px`,
          overflow: 'hidden',
          transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div ref={detailsRef}>
          <GoldLine className="mx-5 md:mx-6" />
          <div className="p-5 md:p-6 pt-4 expand-panel" onClick={e => e.stopPropagation()}>
            {/* Description */}
            <p
              className="font-body text-sm md:text-base leading-relaxed mb-5"
              style={{ color: 'rgba(242,232,220,0.72)', letterSpacing: '0.02em', lineHeight: 1.75 }}
            >
              {item.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {/* Ingredients */}
              <div>
                <p className="font-body text-xs tracking-[0.25em] uppercase mb-3" style={{ color: 'rgba(201,169,110,0.6)' }}>
                  Key Ingredients
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="font-body text-xs px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(139,12,42,0.2)',
                        border: '1px solid rgba(139,12,42,0.35)',
                        color: 'rgba(242,232,220,0.65)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Chef's note + Pairing */}
              <div className="space-y-4">
                {item.chefNote && (
                  <div
                    className="p-4 rounded"
                    style={{ background: 'rgba(201,169,110,0.06)', borderLeft: '2px solid rgba(201,169,110,0.35)' }}
                  >
                    <p className="font-body text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(201,169,110,0.55)' }}>
                      Chef&apos;s Note
                    </p>
                    <p className="font-body italic text-sm leading-relaxed" style={{ color: 'rgba(242,232,220,0.6)' }}>
                      {item.chefNote}
                    </p>
                  </div>
                )}
                {item.pairing && (
                  <div>
                    <p className="font-body text-xs tracking-[0.2em] uppercase mb-1.5" style={{ color: 'rgba(201,169,110,0.55)' }}>
                      ♦ Suggested Pairing
                    </p>
                    <p className="font-body italic text-sm" style={{ color: 'rgba(242,232,220,0.5)' }}>
                      {item.pairing}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Allergens */}
            {item.allergens && item.allergens.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-body text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(201,169,110,0.4)' }}>
                  Allergens:
                </p>
                {item.allergens.map((a, i) => (
                  <span key={i} className="font-body text-xs" style={{ color: 'rgba(242,232,220,0.35)' }}>
                    {a}{i < item.allergens.length - 1 ? ' ·' : ''}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Menu Section ────────────────────────────────────────────────
function MenuSection({ section, sectionRef }) {
  const [openItemId, setOpenItemId] = useState(null)

  const toggle = (id) => setOpenItemId(prev => (prev === id ? null : id))

  return (
    <section
      ref={sectionRef}
      id={section.id}
      className="py-16 md:py-24 px-4"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className="font-body text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: 'rgba(201,169,110,0.55)' }}
          >
            {section.subtitle}
          </p>

          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#F2E8DC',
              letterSpacing: '0.06em',
              lineHeight: 1.1,
            }}
          >
            {section.name}
          </h2>

          <OrnamentLine className="max-w-xs mx-auto mb-5" />

          <p
            className="font-body italic text-base md:text-lg max-w-lg mx-auto"
            style={{ color: 'rgba(242,232,220,0.45)', letterSpacing: '0.04em', lineHeight: 1.7 }}
          >
            {section.description}
          </p>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {section.items.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              isOpen={openItemId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer-bg pt-20 pb-10 px-4">
      <div className="max-w-5xl mx-auto">
        <GoldLine className="mb-14" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 50 50" className="w-9 h-9" fill="none">
                <path d="M25 5 A20 20 0 1 1 24.9 5" stroke="rgba(242,232,220,0.8)" strokeWidth="2" strokeLinecap="round" />
                <path d="M33 11 A14 14 0 1 0 17 11" stroke="rgba(242,232,220,0.35)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div>
                <p className="font-display font-bold text-xl tracking-[0.12em]" style={{ color: '#F2E8DC' }}>circle</p>
                <p className="font-body italic text-xs tracking-widest" style={{ color: 'rgba(201,169,110,0.5)' }}>Restaurant &amp; Lounge</p>
              </div>
            </div>
            <p className="font-body text-sm text-center md:text-left" style={{ color: 'rgba(242,232,220,0.35)', lineHeight: 1.7, maxWidth: 220 }}>
              An unparalleled dining experience in the heart of Benin City.
            </p>
          </div>

          {/* Hours */}
          <div className="text-center md:text-left">
            <p className="font-body text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(201,169,110,0.55)' }}>Opening Hours</p>
            <div className="space-y-2 font-body text-sm" style={{ color: 'rgba(242,232,220,0.5)' }}>
              {[
                ['Monday – Thursday', '12:00 – 23:00'],
                ['Friday – Saturday', '12:00 – 01:00'],
                ['Sunday', '13:00 – 22:00'],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between gap-6 max-w-xs mx-auto md:mx-0">
                  <span>{day}</span>
                  <span style={{ color: 'rgba(201,169,110,0.65)' }}>{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="text-center md:text-left">
            <p className="font-body text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'rgba(201,169,110,0.55)' }}>Find Us</p>
            <div className="space-y-2 font-body text-sm" style={{ color: 'rgba(242,232,220,0.5)' }}>
              <p>Circle Restaurant &amp; Lounge</p>
              <p>10 Airport Road,</p>
              <p>Benin City, Edo State</p>
              <p>Nigeria</p>
              <p className="mt-3" style={{ color: 'rgba(201,169,110,0.55)' }}>Reservations: +234 800 CIRCLE 1</p>
            </div>
          </div>
        </div>

        <OrnamentLine className="mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-center" style={{ color: 'rgba(242,232,220,0.22)', letterSpacing: '0.08em' }}>
            © {new Date().getFullYear()} Circle Restaurant &amp; Lounge. All rights reserved.
          </p>
          <p className="font-body italic text-xs" style={{ color: 'rgba(201,169,110,0.28)' }}>
            Crafted with passion in Benin City
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Divider between sections ─────────────────────────────────────
function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-4 px-4">
      <div className="max-w-5xl w-full mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,12,42,0.2))' }} />
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="rgba(139,12,42,0.2)" strokeWidth="0.5" />
            <circle cx="12" cy="12" r="3" fill="rgba(139,12,42,0.3)" />
          </svg>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(139,12,42,0.2), transparent)' }} />
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────
export default function Page() {
  const [showMenu, setShowMenu] = useState(false)
  const [activeSection, setActiveSection] = useState(menuData[0].id)
  const sectionRefs = useRef({})
  const menuRef = useRef(null)

  const handleEnter = () => {
    setShowMenu(true)
    setTimeout(() => {
      menuRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleNavSelect = (id) => {
    setActiveSection(id)
    const el = sectionRefs.current[id]
    if (el) {
      const offset = 100
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  // Intersection observer to update active nav item
  useEffect(() => {
    if (!showMenu) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [showMenu])

  return (
    <main
      className="min-h-screen"
      style={{ background: '#080309', color: '#F2E8DC' }}
    >
      <Hero onEnter={handleEnter} />

      <div ref={menuRef}>
        {showMenu && (
          <>
            <StickyNav
              categories={menuData}
              activeId={activeSection}
              onSelect={handleNavSelect}
            />

            {/* Subtle intro band */}
            <div
              className="py-10 px-4 text-center relative overflow-hidden"
              style={{ background: 'linear-gradient(180deg, rgba(139,12,42,0.08) 0%, transparent 100%)' }}
            >
              <div className="orb orb-crimson absolute" style={{ width: 500, height: 500, top: '-50%', left: '50%', transform: 'translateX(-50%)' }} />
              <p
                className="font-body text-xs tracking-[0.4em] uppercase relative z-10"
                style={{ color: 'rgba(201,169,110,0.45)' }}
              >
                A Curated Collection of Excellence
              </p>
            </div>

            {menuData.map((section, idx) => (
              <div key={section.id}>
                <MenuSection
                  section={section}
                  sectionRef={el => { sectionRefs.current[section.id] = el }}
                />
                {idx < menuData.length - 1 && <SectionDivider />}
              </div>
            ))}

            <Footer />
          </>
        )}
      </div>
    </main>
  )
}
