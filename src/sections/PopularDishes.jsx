import { useMemo } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { CATEGORIES, DISHES } from '../data/menu'
import Reveal, { EASE } from '../components/ui/Reveal'
import { cut } from '../lib/image'

export default function PopularDishes({ active, onChange }) {
  const reduce = useReducedMotion()
  const cat = CATEGORIES.find((c) => c.id === active)
  // The chosen category leads, the rest of the menu fills the card to ten dishes.
  const list = useMemo(() => {
    const first = DISHES.filter((d) => d.cat === active)
    const rest = DISHES.filter((d) => d.cat !== active)
    return [...first, ...rest].slice(0, 10)
  }, [active])

  return (
    <section id="dishes" className="relative scroll-mt-24 overflow-x-clip pb-16 pt-6 sm:pb-24">
      {/* Yellow band behind the lower half of the card */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 top-[38%] bg-yellow" />

      <div className="relative mx-auto max-w-[1060px] px-4 sm:px-5">
        <m.div
          initial={reduce ? false : { opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative rounded-[28px] bg-white p-6 shadow-[0_30px_70px_-30px_rgb(31_20_20/0.45)] sm:p-10"
        >
          <img
            {...cut('pizza-2', '220px')}
            alt=""
            aria-hidden
            loading="lazy"
            className="cutout pointer-events-none absolute -bottom-16 -left-10 w-32 rotate-12 sm:-bottom-24 sm:-left-28 sm:w-48"
          />
          <img
            {...cut('burger', '220px')}
            alt=""
            aria-hidden
            loading="lazy"
            className="cutout float pointer-events-none absolute -right-6 -top-14 w-28 rotate-[8deg] sm:-right-12 sm:-top-20 sm:w-44"
          />

          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-[clamp(28px,3.6vw,40px)] leading-none text-ink">
              Our most popular
              <br />
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="inline-block text-red"
                >
                  {cat.label}
                </m.span>
              </AnimatePresence>
            </h2>
            <div className="no-scrollbar -mx-1 flex max-w-full gap-1.5 overflow-x-auto px-1 pb-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onChange(c.id)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${
                    c.id === active ? 'bg-red text-white' : 'bg-cream text-ink hover:bg-red-soft hover:text-red'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-x-12 md:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((d, i) => (
                <m.li
                  key={d.name}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.025, ease: EASE }}
                  className="group flex items-center gap-4 border-b border-dashed border-line py-4"
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-cream transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    <img {...cut(d.img, '64px')} alt="" loading="lazy" className="size-12 object-contain" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold text-ink transition-colors group-hover:text-red">{d.name}</span>
                    <span className="block truncate text-[13px] text-muted">{d.desc}</span>
                  </span>
                  <span className="text-[16px] font-bold text-red">₹{d.price}</span>
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
          <Reveal className="mt-6 text-center text-[12px] text-muted">Sample prices for this preview. Final menu and prices to come from Avadh.</Reveal>
        </m.div>
      </div>
    </section>
  )
}
