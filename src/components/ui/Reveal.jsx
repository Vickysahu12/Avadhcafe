import { m, useReducedMotion } from 'motion/react'

export const EASE = [0.23, 1, 0.32, 1]

export default function Reveal({ children, delay = 0, y = 30, className = '', as = 'div', amount = 0.25 }) {
  const reduce = useReducedMotion()
  const Tag = m[as]
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Tag>
  )
}
