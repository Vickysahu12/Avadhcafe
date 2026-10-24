import { m, useReducedMotion } from 'motion/react'
import { Check, Phone } from '@phosphor-icons/react'
import { COMBOS } from '../data/menu'
import { PHONE } from '../data/site'
import Reveal, { EASE } from '../components/ui/Reveal'
import SectionTag from '../components/ui/SectionTag'
import { cut } from '../lib/image'

const TONES = {
  white: { card: 'bg-white text-ink', muted: 'text-muted', price: 'text-red', check: 'bg-red text-white', btn: 'bg-red text-white hover:bg-red-dark', glow: 'bg-red-soft' },
  red: { card: 'bg-red text-white', muted: 'text-white/75', price: 'text-yellow', check: 'bg-white text-red', btn: 'bg-yellow text-ink hover:brightness-95', glow: 'bg-white/15' },
  yellow: { card: 'bg-yellow text-ink', muted: 'text-ink/70', price: 'text-red', check: 'bg-red text-white', btn: 'bg-red text-white hover:bg-red-dark', glow: 'bg-white/35' },
}

function ComboCard({ c, i }) {
  const reduce = useReducedMotion()
  const t = TONES[c.tone]
  const save = c.was - c.price
  return (
    <m.li
      initial={reduce ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
      className={`group relative flex w-[82%] shrink-0 snap-center flex-col rounded-[28px] md:w-auto p-6 pt-0 shadow-[0_24px_50px_-28px_rgb(31_20_20/0.45)] transition-transform duration-500 ease-[var(--ease-out-strong)] hover:-translate-y-2 sm:p-7 sm:pt-0 ${t.card} ${c.badge ? 'md:-translate-y-4 md:hover:-translate-y-6' : ''}`}
    >

      {/* Two dishes stacked like a tray, they swing apart on hover */}
      <div className="relative -mt-14 h-48 sm:h-52">
        <span aria-hidden className={`absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/3 rounded-full ${t.glow}`} />
        <img
          {...cut(c.imgs[0], '200px')}
          alt=""
          loading="lazy"
          className="cutout absolute bottom-0 left-[6%] h-[92%] w-auto -rotate-6 object-contain transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:-translate-x-2 group-hover:-rotate-12"
        />
        <img
          {...cut(c.imgs[1], '200px')}
          alt=""
          loading="lazy"
          className="cutout absolute bottom-0 right-[4%] h-[80%] w-auto rotate-6 object-contain transition-transform duration-500 ease-[var(--ease-out-strong)] group-hover:translate-x-2 group-hover:rotate-12"
        />
      </div>

      <p className="display mt-4 flex flex-wrap items-center gap-2 text-[28px] leading-none tracking-wide">
        {c.name}
        {c.badge && <span className="-rotate-3 rounded-full bg-yellow px-2.5 pb-0.5 pt-[5px] text-[11px] text-ink">{c.badge}</span>}
      </p>
      <ul className="mt-4 space-y-2">
        {c.items.map((it) => (
          <li key={it} className={`flex items-center gap-2.5 text-[14px] font-medium ${t.muted}`}>
            <span className={`grid size-[18px] shrink-0 place-items-center rounded-full ${t.check}`}>
              <Check weight="bold" className="size-2.5" />
            </span>
            {it}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-end justify-between gap-3 border-t border-current/10 pt-5">
        <div>
          <p className={`text-[13px] font-medium line-through ${t.muted}`}>₹{c.was}</p>
          <p className={`text-[34px] font-bold leading-none ${t.price}`}>₹{c.price}</p>
          <p className={`mt-1 text-[12px] font-semibold ${t.muted}`}>You save ₹{save}</p>
        </div>
        <a
          href={`tel:+91${PHONE}`}
          className={`display inline-flex h-11 items-center gap-2 rounded-full px-5 pt-[3px] text-[14px] tracking-wide transition-[background-color,filter,transform] active:scale-[0.97] ${t.btn}`}
        >
          <Phone weight="fill" className="-mt-[3px] size-4" /> Order
        </a>
      </div>
    </m.li>
  )
}

export default function Combos() {
  return (
    <section id="combos" className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24">
      <img {...cut('chili-3', '20vw')} alt="" aria-hidden loading="lazy" className="cutout pointer-events-none absolute -left-20 top-20 w-52 rotate-[200deg] sm:w-64" />
      <div className="mx-auto max-w-[1140px] px-5">
        <Reveal className="text-center">
          <SectionTag>Combo deals</SectionTag>
          <h2 className="display mt-5 text-[clamp(32px,4.6vw,52px)] text-red">
            More food,
            <br />
            less on the bill
          </h2>
          <p className="mx-auto mt-4 max-w-[50ch] text-[15px] text-muted">Pick a combo for one, for two or for the whole gang. Call the outlet to order.</p>
        </Reveal>

        <ul className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 pt-16 md:mx-0 md:mt-10 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
          {COMBOS.map((c, i) => (
            <ComboCard key={c.name} c={c} i={i} />
          ))}
        </ul>
        <p className="mt-10 text-center text-[12px] text-muted">Sample combos and prices for this preview.</p>
      </div>
    </section>
  )
}
