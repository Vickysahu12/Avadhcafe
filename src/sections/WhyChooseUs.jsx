import { m, useReducedMotion } from 'motion/react'
import { Clock, Coins, Leaf, Medal } from '@phosphor-icons/react'
import { FEATURES } from '../data/site'
import Reveal, { EASE } from '../components/ui/Reveal'
import SectionTag from '../components/ui/SectionTag'
import { cut } from '../lib/image'

const ICONS = { medal: Medal, leaf: Leaf, coins: Coins, clock: Clock }

export default function WhyChooseUs() {
  const reduce = useReducedMotion()
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden pb-16 pt-8 sm:py-24">
      <img {...cut('chili-1', '20vw')} alt="" aria-hidden className="cutout pointer-events-none absolute -left-16 top-24 w-44 rotate-[155deg] sm:w-60" loading="lazy" />
      <img {...cut('chili-3', '20vw')} alt="" aria-hidden className="cutout pointer-events-none absolute -right-14 bottom-16 w-44 -rotate-[25deg] sm:w-64" loading="lazy" />

      <div className="relative mx-auto max-w-[900px] px-5 text-center">
        <Reveal>
          <SectionTag>Why choose us</SectionTag>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display mt-5 text-[clamp(32px,5vw,54px)] text-red">
            Big on taste,
            <br />
            light on your pocket
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-[68ch] text-[15px] leading-relaxed text-muted">
            Avadh comes from the team behind Chai Shotts, the Surat cafe brand that has been serving since 2019 and grew to
            50+ outlets across 20+ cities. Same kitchen discipline, now behind a counter of thick shakes, loaded burgers,
            cheesy pizza and hot momos.
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[f.icon]
            return (
              <m.li
                key={f.title}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="group flex flex-col items-center"
              >
                <span className="grid size-[72px] place-items-center rounded-2xl border-2 border-dashed border-red/35 text-red transition-[background-color,border-color,color,transform] duration-300 group-hover:-translate-y-1 group-hover:border-red group-hover:bg-red group-hover:text-white">
                  <Icon weight="duotone" className="size-8" />
                </span>
                <span className="display mt-4 text-[15px] tracking-wide text-ink">{f.title}</span>
                <span className="mt-2 h-[3px] w-10 rounded-full bg-red/70 transition-[width] duration-300 group-hover:w-16" />
                <span className="mt-3 max-w-[22ch] text-[13px] leading-snug text-muted">{f.text}</span>
              </m.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
