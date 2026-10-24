import { useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Phone, Plus, WhatsappLogo } from '@phosphor-icons/react'
import { FAQS } from '../data/faq'
import { PHONE, PHONE_DISPLAY } from '../data/site'
import Reveal, { EASE } from '../components/ui/Reveal'
import SectionTag from '../components/ui/SectionTag'
import { cut } from '../lib/image'

function Item({ f, open, onToggle, id, i }) {
  return (
    <m.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
      className={`overflow-hidden rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 ${open ? 'border-red/20 bg-white shadow-[0_18px_40px_-24px_rgb(215_20_29/0.45)]' : 'border-line bg-white/60 hover:bg-white'}`}>
      <button onClick={onToggle} aria-expanded={open} aria-controls={id} className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5">
        <span className={`flex-1 text-[15px] font-semibold transition-colors sm:text-[16px] ${open ? 'text-red' : 'text-ink'}`}>{f.q}</span>
        <span className={`grid size-9 shrink-0 place-items-center rounded-full transition-[background-color,color,transform] duration-300 ease-[var(--ease-out-strong)] ${open ? 'rotate-45 bg-red text-white' : 'bg-red-soft text-red'}`}>
          <Plus weight="bold" className="size-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <p className="px-5 pb-5 text-[14px] leading-relaxed text-muted sm:px-6">{f.a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </m.li>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1140px] grid-cols-1 gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <SectionTag>Franchise FAQ</SectionTag>
            <h2 className="display mt-5 text-[clamp(32px,4.4vw,50px)] text-red">
              Questions owners
              <br />
              ask us first
            </h2>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-muted">
              Thinking of opening an Avadh in your town? Here is what most partners want to know before the first call.
            </p>
          </Reveal>

          {/* Help card */}
          <Reveal delay={0.1} className="relative mt-10 max-w-[420px]">
            <div className="relative overflow-hidden rounded-[26px] bg-red p-6 pr-32 text-white sm:p-7 sm:pr-40">
              <span aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10" />
              <p className="display text-[24px] leading-none tracking-wide">Still have a question?</p>
              <p className="mt-2 text-[14px] text-white/80">Talk to the franchise team directly.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={`tel:+91${PHONE}`} className="display inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 pt-[3px] text-[13px] tracking-wide text-red transition-transform active:scale-[0.97]">
                  <Phone weight="fill" className="-mt-[3px] size-4" /> {PHONE_DISPLAY}
                </a>
                <a
                  href={`https://wa.me/91${PHONE}?text=${encodeURIComponent('Hi, I would like to know about the Avadh franchise.')}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="grid size-10 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white hover:text-red"
                >
                  <WhatsappLogo weight="fill" className="size-5" />
                </a>
              </div>
            </div>
            <img {...cut('shake-strawberry', '160px')} alt="" aria-hidden loading="lazy" className="cutout float pointer-events-none absolute -bottom-4 right-2 h-[118%] w-auto rotate-6" />
          </Reveal>
        </div>

        <ul className="space-y-3">
          {FAQS.map((f, i) => (
            <Item key={f.q} f={f} i={i} id={`faq-${i}`} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
