import { useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { CaretLeft, CaretRight, Coins, Rocket, Storefront } from '@phosphor-icons/react'
import { FRANCHISE_SLIDES } from '../data/site'
import { useEnquiry } from '../components/common/EnquiryModal'
import Button from '../components/ui/Button'
import Reveal, { EASE } from '../components/ui/Reveal'
import SectionTag from '../components/ui/SectionTag'

const ICONS = [Storefront, Coins, Rocket]

export default function Franchise() {
  const reduce = useReducedMotion()
  const enquire = useEnquiry()
  const [[i, dir], setState] = useState([0, 1])
  const go = (d) => setState(([v]) => [(v + d + FRANCHISE_SLIDES.length) % FRANCHISE_SLIDES.length, d])
  const slide = FRANCHISE_SLIDES[i]

  return (
    <section id="franchise" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-[860px] px-5 text-center">
        <Reveal>
          <SectionTag>Franchise with us</SectionTag>
        </Reveal>

        <div className="relative mt-8 flex items-center gap-3 sm:gap-6">
          <button onClick={() => go(-1)} aria-label="Previous" className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition-[background-color,color,transform] hover:bg-red hover:text-white active:scale-90">
            <CaretLeft weight="bold" className="size-4" />
          </button>

          <div className="relative min-h-[230px] flex-1 overflow-hidden sm:min-h-[200px]">
            <AnimatePresence mode="popLayout" initial={false} custom={dir}>
              <m.div
                key={i}
                custom={dir}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -80 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-orange">{slide.kicker}</p>
                <p className="display mt-3 text-[clamp(26px,3.6vw,38px)] text-red">{slide.title}</p>
                <p className="mx-auto mt-4 max-w-[56ch] text-[15px] leading-relaxed text-muted">{slide.text}</p>
              </m.div>
            </AnimatePresence>
          </div>

          <button onClick={() => go(1)} aria-label="Next" className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition-[background-color,color,transform] hover:bg-red hover:text-white active:scale-90">
            <CaretRight weight="bold" className="size-4" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {FRANCHISE_SLIDES.map((s, k) => {
            const Icon = ICONS[k]
            return (
              <button
                key={s.kicker}
                onClick={() => setState([k, k > i ? 1 : -1])}
                aria-label={s.kicker}
                className={`grid size-10 place-items-center rounded-full transition-[background-color,color,transform] duration-300 ${k === i ? 'scale-110 bg-red text-white' : 'bg-white text-muted hover:text-red'}`}
              >
                <Icon weight="fill" className="size-4" />
              </button>
            )
          })}
        </div>

        <Reveal className="mt-8">
          <Button onClick={enquire}>Own an Avadh</Button>
        </Reveal>
        <p className="mt-4 text-[12px] text-muted">Figures as reported by the brand on chaishotts.com.</p>
      </div>
    </section>
  )
}
