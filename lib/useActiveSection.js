'use client'

import { useEffect, useState } from 'react'

// Scroll-spy: the section crossing the upper third of the viewport is the active one.
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-30% 0px -65% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}

// True once the element with this id has scrolled out of view above the viewport.
export function usePastElement(id) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      setPast(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [id])

  return past
}
