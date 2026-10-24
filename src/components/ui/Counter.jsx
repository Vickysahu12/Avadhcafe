import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

export default function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      ref.current.textContent = to + suffix
      return
    }
    const from = to > 1000 ? to - 40 : 0
    const c = animate(from, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix
      },
    })
    return () => c.stop()
  }, [inView, to, suffix, reduce])

  return <span ref={ref}>{to > 1000 ? to - 40 : 0}{suffix}</span>
}
