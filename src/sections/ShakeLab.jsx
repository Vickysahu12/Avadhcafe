import { useMemo, useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { ArrowsClockwise, Check, WhatsappLogo } from '@phosphor-icons/react'
import { BASES, FLAVOURS, SIZES, TOPPINGS } from '../data/shakeLab'
import { PHONE } from '../data/site'
import ShakeGlass from '../components/common/ShakeGlass'
import Reveal, { EASE } from '../components/ui/Reveal'
import SectionTag from '../components/ui/SectionTag'
import { cut } from '../lib/image'

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

function Step({ n, title, children }) {
  return (
    <div>
      <p className="flex items-center gap-2.5">
        <span className="display grid size-7 place-items-center rounded-full bg-red pt-[3px] text-[13px] text-white">{n}</span>
        <span className="display text-[18px] tracking-wide text-ink">{title}</span>
      </p>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

function Chip({ on, onClick, children, swatch, group }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`relative inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[13px] font-semibold transition-[border-color,color,transform] duration-200 active:scale-[0.96] ${
        on ? 'border-red text-white' : 'border-line bg-white text-ink hover:border-red/40'
      }`}
    >
      {on && group && <m.span layoutId={group} className="absolute inset-0 rounded-full bg-red" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
      {on && !group && <span className="absolute inset-0 rounded-full bg-red" />}
      {swatch && <span className="relative size-4 rounded-full ring-2 ring-white/80" style={{ background: `linear-gradient(135deg, ${swatch[0]}, ${swatch[1]})` }} />}
      {!swatch && !group && (
        <span className={`relative grid size-4 place-items-center rounded-full ${on ? 'bg-white text-red' : 'bg-red-soft text-transparent'}`}>
          <Check weight="bold" className="size-2.5" />
        </span>
      )}
      <span className="relative">{children}</span>
    </button>
  )
}

export default function ShakeLab() {
  const [base, setBase] = useState(BASES[1])
  const [flavour, setFlavour] = useState(FLAVOURS[0])
  const [toppings, setToppings] = useState(['cream', 'drizzle'])
  const [size, setSize] = useState(SIZES[0])

  const price = useMemo(
    () => flavour.price + base.price + size.price + TOPPINGS.filter((t) => toppings.includes(t.id)).reduce((s, t) => s + t.price, 0),
    [flavour, base, size, toppings],
  )
  const toggle = (id) => setToppings((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]))

  function surprise() {
    setBase(pick(BASES))
    setFlavour(pick(FLAVOURS))
    setSize(pick(SIZES))
    setToppings(TOPPINGS.filter(() => Math.random() > 0.45).map((t) => t.id))
  }

  const toppingNames = TOPPINGS.filter((t) => toppings.includes(t.id)).map((t) => t.label)
  const message = `Hi Avadh! I'd like to order my own shake: ${size.label} (${size.ml} ml) ${flavour.label} on ${base.label}${
    toppingNames.length ? `, topped with ${toppingNames.join(', ')}` : ''
  }. Price on the website: ₹${price}.`

  return (
    <section id="shake-lab" className="relative scroll-mt-24 overflow-hidden bg-red-soft/60 py-16 sm:py-24">
      <img {...cut('shake-strawberry', '200px')} alt="" aria-hidden loading="lazy" className="cutout pointer-events-none absolute -left-10 bottom-10 hidden w-40 -rotate-12 lg:block" />

      <div className="mx-auto max-w-[1140px] px-5">
        <Reveal className="text-center">
          <SectionTag>Shake Lab</SectionTag>
          <h2 className="display mt-5 text-[clamp(32px,4.6vw,52px)] text-red">
            Build your own
            <br />
            thick shake
          </h2>
          <p className="mx-auto mt-4 max-w-[50ch] text-[15px] text-muted">Pick a base, a flavour and your toppings. Watch it come together, then send the order on WhatsApp.</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Glass stage */}
          <Reveal className="relative mx-auto w-full max-w-[420px]">
            <div aria-hidden className="absolute inset-x-[6%] bottom-[2%] top-[12%] rounded-full bg-yellow" />
            <div aria-hidden className="absolute inset-x-[16%] bottom-[-2%] h-6 rounded-[50%] bg-ink/15 blur-md" />
            <div className="relative mx-auto h-[300px] w-[210px] sm:h-[440px] sm:w-[300px]">
              <ShakeGlass flavour={flavour} base={base} toppings={toppings} size={size} />
            </div>

            {/* Live price tag */}
            <div className="absolute -right-1 top-[18%] rotate-6 rounded-2xl bg-white px-4 py-3 text-center shadow-[0_16px_30px_-14px_rgb(31_20_20/0.5)] sm:right-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Your shake</p>
              <AnimatePresence mode="popLayout" initial={false}>
                <m.p
                  key={price}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="text-[28px] font-bold leading-tight text-red"
                >
                  ₹{price}
                </m.p>
              </AnimatePresence>
              <p className="text-[11px] font-medium text-muted">{size.ml} ml</p>
            </div>
          </Reveal>

          {/* Builder */}
          <Reveal delay={0.1} className="rounded-[28px] bg-white p-6 shadow-[0_30px_60px_-34px_rgb(31_20_20/0.45)] sm:p-8">
            <div className="space-y-6">
              <Step n="1" title="Choose a base">
                {BASES.map((b) => (
                  <Chip key={b.id} group="lab-base" on={base.id === b.id} onClick={() => setBase(b)}>
                    {b.label}
                    {b.price > 0 && <span className="ml-1 opacity-70">+₹{b.price}</span>}
                  </Chip>
                ))}
              </Step>
              <Step n="2" title="Pick a flavour">
                {FLAVOURS.map((f) => (
                  <Chip key={f.id} group="lab-flavour" swatch={[f.light, f.dark]} on={flavour.id === f.id} onClick={() => setFlavour(f)}>
                    {f.label}
                  </Chip>
                ))}
              </Step>
              <Step n="3" title="Load it up">
                {TOPPINGS.map((t) => (
                  <Chip key={t.id} on={toppings.includes(t.id)} onClick={() => toggle(t.id)}>
                    {t.label} <span className="opacity-70">+₹{t.price}</span>
                  </Chip>
                ))}
              </Step>
              <Step n="4" title="Size">
                {SIZES.map((sz) => (
                  <Chip key={sz.id} group="lab-size" on={size.id === sz.id} onClick={() => setSize(sz)}>
                    {sz.label} {sz.ml} ml
                  </Chip>
                ))}
              </Step>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-dashed border-line pt-6">
              <a
                href={`https://wa.me/91${PHONE}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noreferrer"
                className="display inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-red px-6 pt-[3px] text-[15px] tracking-wide text-white shadow-[0_10px_22px_-10px_rgb(215_20_29/0.8)] transition-[background-color,transform] hover:bg-red-dark active:scale-[0.97] sm:flex-none"
              >
                <WhatsappLogo weight="fill" className="-mt-[3px] size-5" /> Order for ₹{price}
              </a>
              <button
                type="button"
                onClick={surprise}
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-line px-5 text-[14px] font-semibold text-ink transition-[border-color,color] hover:border-red hover:text-red"
              >
                <ArrowsClockwise weight="bold" className="size-4 transition-transform duration-500 group-hover:rotate-180" /> Surprise me
              </button>
            </div>
            <p className="mt-4 text-[12px] text-muted">Sample prices for this preview.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
