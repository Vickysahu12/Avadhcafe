import { useEffect } from 'react'
import Lenis from 'lenis'

let instance = null

// Scrolls through Lenis when it is running, so programmatic scrolls are not fought by it.
export function scrollToTarget(target, offset = -88) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (instance) return instance.scrollTo(el, { offset })
  const top = el.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: 'auto' })
}

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1, anchors: { offset: -90 } })
    instance = lenis
    let id
    const raf = (t) => {
      lenis.raf(t)
      id = requestAnimationFrame(raf)
    }
    id = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
      instance = null
    }
  }, [])
}
