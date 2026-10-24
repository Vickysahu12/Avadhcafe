import { m, useReducedMotion } from 'motion/react'
import { MapPin, NavigationArrow } from '@phosphor-icons/react'
import { OUTLETS, directionsUrl } from '../data/outlets'
import Reveal, { EASE } from '../components/ui/Reveal'

export default function Outlets() {
  const reduce = useReducedMotion()
  return (
    <section id="outlets" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-[1140px] px-5">
        <Reveal className="text-center">
          <h2 className="display text-[clamp(32px,4.6vw,52px)] text-red">
            Meet us at your
            <br />
            nearest Avadh
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[15px] text-muted">Five towns across South Gujarat and counting. Tap a card for directions.</p>
        </Reveal>

        <ul className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
          {OUTLETS.map((o, i) => (
            <m.li
              key={o.town}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="w-[60%] shrink-0 snap-start sm:w-auto"
            >
              <a
                href={directionsUrl(o.town)}
                target="_blank"
                rel="noreferrer"
                className="group relative block overflow-hidden rounded-[22px] bg-ink"
                aria-label={`Directions to Avadh ${o.town}`}
              >
                <img
                  src={o.img}
                  alt={`Avadh ${o.town} outlet`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:scale-[1.06]"
                />
                <span className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-2xl bg-white/95 px-3 py-2.5 transition-colors duration-300 group-hover:bg-orange group-hover:text-white">
                  <span>
                    <span className="display block text-[17px] leading-none tracking-wide">{o.town}</span>
                    <span className="mt-1 flex items-center gap-1 text-[11px] font-medium opacity-75">
                      <MapPin weight="fill" className="size-3" /> Now open
                    </span>
                  </span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-red text-white transition-transform duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-orange">
                    <NavigationArrow weight="fill" className="size-4" />
                  </span>
                </span>
              </a>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
