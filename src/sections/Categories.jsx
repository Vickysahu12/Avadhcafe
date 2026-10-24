import { m, useReducedMotion } from 'motion/react'
import { CATEGORIES } from '../data/menu'
import { EASE } from '../components/ui/Reveal'
import { cut } from '../lib/image'

export default function Categories({ active, onChange }) {
  const reduce = useReducedMotion()
  return (
    <section id="menu" aria-label="Menu categories" className="scroll-mt-24">
      <div className="mx-auto max-w-[1240px] px-0 sm:px-5">
        <m.ul
          initial={reduce ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto bg-white shadow-[0_20px_50px_-30px_rgb(31_20_20/0.35)] sm:grid sm:grid-cols-3 sm:overflow-visible lg:grid-cols-6"
        >
          {CATEGORIES.map((c) => {
            const on = c.id === active
            return (
              <li key={c.id} className="w-[38%] shrink-0 snap-start border-r border-line last:border-r-0 sm:w-auto sm:border-b lg:border-b-0">
                <button
                  onClick={() => onChange(c.id)}
                  aria-pressed={on}
                  className="group relative flex h-full min-h-[200px] w-full flex-col items-center justify-end px-3 pb-7 pt-12 sm:min-h-[230px]"
                >
                  {on && <m.span layoutId="cat-bg" className="absolute inset-0 bg-red" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                  <span className={`display absolute top-5 text-[18px] tracking-wide transition-opacity duration-200 ${on ? 'text-white opacity-100' : 'opacity-0'}`}>
                    {c.short}
                  </span>
                  <img
                    {...cut(c.img, '160px')}
                    alt=""
                    loading="lazy"
                    className={`cutout relative size-[104px] object-contain transition-transform duration-500 ease-[var(--ease-out-strong)] sm:size-[120px] ${on ? 'scale-110 -rotate-6' : 'group-hover:-translate-y-1.5 group-hover:rotate-6'}`}
                  />
                  <span className={`display relative mt-5 text-[15px] tracking-wide transition-colors ${on ? 'text-white' : 'text-ink group-hover:text-red'}`}>{c.label}</span>
                </button>
              </li>
            )
          })}
        </m.ul>
      </div>
    </section>
  )
}
