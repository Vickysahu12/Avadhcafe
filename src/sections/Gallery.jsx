import { m, useReducedMotion } from 'motion/react'
import { InstagramLogo } from '@phosphor-icons/react'
import { GALLERY } from '../data/social'
import { INSTAGRAM } from '../data/site'
import Reveal, { EASE } from '../components/ui/Reveal'
import SectionTag from '../components/ui/SectionTag'

// Alternating offsets give the strip the stepped look of a feed.
const OFFSET = ['lg:mt-0', 'lg:mt-12', 'lg:mt-4', 'lg:mt-16', 'lg:mt-2', 'lg:mt-10']

export default function Gallery() {
  const reduce = useReducedMotion()
  return (
    <section id="gallery" className="scroll-mt-24 overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-5">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <Reveal>
            <SectionTag>@avadhcafeofficial</SectionTag>
            <h2 className="display mt-5 text-[clamp(32px,4.4vw,50px)] text-red">
              Follow the flavor
              <br />
              on Instagram
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="display inline-flex h-12 items-center gap-2.5 rounded-full bg-gradient-to-r from-red to-orange px-6 pt-[3px] text-[15px] tracking-wide text-white shadow-[0_12px_24px_-12px_rgb(215_20_29/0.8)] transition-transform hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <InstagramLogo weight="bold" className="-mt-[3px] size-5" /> Join 12K+ followers
            </a>
          </Reveal>
        </div>

        <ul className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 lg:mx-0 lg:grid lg:grid-cols-6 lg:overflow-visible lg:px-0">
          {GALLERY.map((g, i) => (
            <m.li
              key={g.img}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}
              className={`w-[46%] shrink-0 snap-start sm:w-[30%] lg:w-auto ${OFFSET[i]}`}
            >
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label={`${g.caption} on Instagram`} className="group relative block overflow-hidden rounded-[22px] bg-ink">
                <img
                  src={g.img}
                  alt={g.caption}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[9/14] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-strong)] group-hover:scale-110"
                />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-red/75 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <InstagramLogo weight="bold" className="size-8 translate-y-2 transition-transform duration-300 group-hover:translate-y-0" />
                  <span className="px-3 text-center text-[13px] font-semibold">{g.caption}</span>
                </span>
              </a>
            </m.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
