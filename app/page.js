'use client'

import { useState, useEffect, useRef } from 'react'
import { menuData } from '../data/menu'
import DishDrawer from '../components/DishDrawer'
import Hero from '../components/Hero'
import StickyNav from '../components/StickyNav'
import MenuSection from '../components/MenuSection'
import Footer from '../components/Footer'

// ─── Main Page ───────────────────────────────────────────────────
export default function Page() {
  const [activeSection, setActiveSection] = useState(menuData[0].id)
  const [selectedDish, setSelectedDish] = useState(null)
  const sectionRefs = useRef({})
  const menuStartRef = useRef(null)

  const handleExplore = () => {
    menuStartRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleNavSelect = (id) => {
    setActiveSection(id)
    const el = sectionRefs.current[id]
    if (el) {
      // Adjust offset based on mobile vs desktop
      const isMobile = window.innerWidth < 768
      const offset = isMobile ? 120 : 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    Object.values(sectionRefs.current).forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Prevent background scrolling when modal is open on mobile
  useEffect(() => {
    if (selectedDish) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedDish])

  return (
    <main className="min-h-screen bg-sexy-white text-charcoal">
      <Hero onExplore={handleExplore} />

      <div ref={menuStartRef}>
        <StickyNav
          categories={menuData}
          activeId={activeSection}
          onSelect={handleNavSelect}
        />

        <div className="bg-sexy-white">
          {menuData.map((section) => (
            <MenuSection
              key={section.id}
              section={section}
              sectionRef={el => { sectionRefs.current[section.id] = el }}
              onDishClick={setSelectedDish}
            />
          ))}
        </div>

        <Footer />
      </div>

      <DishDrawer
        item={selectedDish}
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
      />
    </main>
  )
}
