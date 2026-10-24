import { m, useReducedMotion } from 'motion/react'
import { Check } from '@phosphor-icons/react'
import Reveal, { EASE } from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import { cut } from '../lib/image'

const POINTS = ['Party and group orders', 'Shakes blended to order', 'Combos for every budget', 'New dishes every season']

export default function Flavors() {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden pb-20 pt-4 sm:pb-28">
      <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-center gap-14 px-5 md:grid-cols-2 md:gap-12">
        {/* Image pair: a splash shot and the real outlet interior */}
        <div className="relative mx-auto w-full max-w-[480px] pb-16 pr-10 sm:pb-20 sm:pr-16">
          <m.div
            initial={reduce ? false : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative aspect-[4/5] overflow-hidden rounded-sm bg-[radial-gradient(circle_at_50%_55%,#ff9d1c_0%,#e0560c_32%,#5a1408_70%,#1f0a06_100%)] shadow-xl"
          >
            <img {...cut('fries-loose', '30vw')} alt="" aria-hidden loading="lazy" className="absolute left-[-12%] top-[8%] w-[60%] rotate-[-28deg] opacity-90" />
            <img {...cut('tomato-a', '12vw')} alt="" aria-hidden loading="lazy" className="absolute right-[8%] top-[10%] w-[20%] rotate-12" />
            <img {...cut('burger', '(min-width: 768px) 30vw, 70vw')} alt="Avadh Double Decker burger" loading="lazy" className="cutout absolute bottom-[10%] left-1/2 w-[88%] -translate-x-1/2" />
          </m.div>
          <m.figure
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="absolute bottom-0 right-0 w-[56%] overflow-hidden rounded-sm border-[6px] border-cream shadow-xl"
          >
            <img src="/ig/p9.jpg" alt="Inside an Avadh cafe" loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover" />
          </m.figure>
        </div>

        <div>
          <Reveal>
            <h2 className="display text-[clamp(32px,4.4vw,50px)] text-red">
              A world of flavors
              <br />
              in every bite.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-muted">
              From a cold, thick shake on a hot Surat afternoon to a stacked burger after college, Avadh is the place your
              friends already agree on. Everything on the menu is made fresh when you order it, and priced so you can come
              back tomorrow.
            </p>
          </Reveal>
          <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p} delay={0.12 + i * 0.05} className="flex items-center gap-2.5 text-[15px] font-medium text-ink">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-red text-white">
                  <Check weight="bold" className="size-3" />
                </span>
                {p}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.3} className="mt-8">
            <Button href="#dishes">Read more</Button>
          </Reveal>
        </div>
      </div>

      <img
        {...cut('burger-hero', '20vw')}
        alt=""
        aria-hidden
        loading="lazy"
        className="cutout float pointer-events-none absolute bottom-2 right-[4%] hidden w-[14vw] max-w-[230px] rotate-[-10deg] md:block"
      />
    </section>
  )
}
