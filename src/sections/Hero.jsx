import { useRef } from 'react'
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { Hamburger, Pizza, Coffee, IceCream } from '@phosphor-icons/react'
import SectionTag from '../components/ui/SectionTag'
import { EASE } from '../components/ui/Reveal'
import { cut } from '../lib/image'

// Ingredients bursting out of the burger. x/y are % of the burger stage, d is parallax depth.
const BITS = [
  { img: 'tomato-a', x: -8, y: 30, w: 15, r: -25, d: 28, s: '15vw' },
  { img: 'tomato-b', x: 92, y: 18, w: 13, r: 30, d: 34, s: '13vw' },
  { img: 'fry-1', x: 100, y: 52, w: 11, r: 40, d: 40, s: '11vw' },
  { img: 'fry-1', x: -14, y: 66, w: 10, r: -70, d: 36, s: '10vw' },
  { img: 'chili-1', x: 86, y: 86, w: 20, r: -30, d: 22, s: '20vw' },
  { img: 'tomato-c', x: 4, y: 92, w: 14, r: 15, d: 26, s: '14vw' },
  { img: 'fry-2', x: 60, y: 104, w: 5, r: 70, d: 44, s: '6vw' },
  { img: 'fry-2', x: 34, y: 100, w: 4, r: -20, d: 48, s: '6vw' },
]

function Bit({ b, i, mx, my, reduce }) {
  const x = useTransform(mx, (v) => v * b.d)
  const y = useTransform(my, (v) => v * b.d)
  return (
    <m.div style={{ x, y, left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%` }} className="absolute">
      <m.img
        {...cut(b.img, b.s)}
        alt=""
        className="cutout w-full"
        initial={reduce ? false : { opacity: 0, scale: 0.2, x: `${(50 - b.x) * 3}%`, y: `${(50 - b.y) * 3}%`, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: b.r }}
        transition={{ type: 'spring', stiffness: 90, damping: 14, delay: 0.45 + i * 0.05 }}
      />
    </m.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const mx = useSpring(px, { stiffness: 60, damping: 16 })
  const my = useSpring(py, { stiffness: 60, damping: 16 })
  const burgerX = useTransform(mx, (v) => v * -10)
  const burgerY = useTransform(my, (v) => v * -10)
  const sideX = useTransform(mx, (v) => v * 14)
  const sideXr = useTransform(mx, (v) => v * -14)

  function onMove(e) {
    if (reduce || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2)
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2)
  }

  const words = ['Taste the', 'Flavor plug']

  return (
    <section id="top" ref={ref} onPointerMove={onMove} className="relative isolate overflow-hidden pb-2 pt-28 sm:pb-10 sm:pt-36">
      {/* Red backdrop with the wavy lower edge */}
      <svg aria-hidden viewBox="0 0 400 1000" preserveAspectRatio="none" className="absolute inset-0 -z-10 size-full sm:hidden">
        <path d="M0 0H400V800C350 830 300 850 240 840C170 828 140 880 90 900C50 915 20 905 0 895Z" fill="var(--color-red)" />
      </svg>
      <svg aria-hidden viewBox="0 0 1440 1000" preserveAspectRatio="none" className="absolute inset-0 -z-10 hidden size-full sm:block">
        <path d="M0 0H1440V700C1350 760 1260 800 1140 780C1000 756 940 690 800 720C650 752 600 880 430 892C260 904 140 820 0 850Z" fill="var(--color-red)" />
      </svg>

      {/* Line-art doodles, as in the reference */}
      <Hamburger aria-hidden weight="thin" className="absolute left-[6%] top-[16%] -z-10 size-24 rotate-[-18deg] text-white/15 sm:size-32" />
      <Pizza aria-hidden weight="thin" className="absolute right-[7%] top-[18%] -z-10 hidden size-28 rotate-12 text-white/15 sm:block" />
      <IceCream aria-hidden weight="thin" className="absolute left-[24%] top-[44%] -z-10 hidden size-20 -rotate-12 text-white/10 lg:block" />
      <Coffee aria-hidden weight="thin" className="absolute right-[24%] top-[52%] -z-10 hidden size-20 rotate-6 text-white/10 lg:block" />

      {/* Edge dishes */}
      <m.div style={{ x: sideX }} className="pointer-events-none absolute -left-[16%] top-[26%] w-[46%] sm:-left-[9%] sm:top-[30%] sm:w-[26%]">
        <m.img
          {...cut('pizza-whole', '(min-width: 640px) 26vw, 46vw')}
          alt="Loaded veg pizza"
          className="cutout w-full rotate-[-12deg]"
          initial={reduce ? false : { x: '-60%', rotate: -60, opacity: 0 }}
          animate={{ x: 0, rotate: -12, opacity: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
        />
      </m.div>
      <m.div style={{ x: sideXr }} className="pointer-events-none absolute -right-[14%] top-[30%] w-[42%] sm:-right-[7%] sm:top-[33%] sm:w-[22%]">
        <m.img
          {...cut('burger-2', '(min-width: 640px) 22vw, 42vw')}
          alt="Paneer burger"
          className="cutout w-full rotate-[14deg]"
          initial={reduce ? false : { x: '60%', rotate: 60, opacity: 0 }}
          animate={{ x: 0, rotate: 14, opacity: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
        />
      </m.div>

      <div className="relative mx-auto flex max-w-[1240px] flex-col items-center px-5 text-center">
        <m.div initial={reduce ? false : { opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <SectionTag tone="dark">Welcome to Avadh Cafe</SectionTag>
        </m.div>

        <h1 className="display relative z-10 mt-5 text-[clamp(52px,10.5vw,138px)] leading-[0.88] text-white [text-shadow:0_6px_0_rgb(168_15_21/0.55)]">
          {words.map((w, i) => (
            <span key={w} className="block overflow-hidden pb-[0.04em]">
              <m.span
                className="block"
                initial={reduce ? false : { y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASE }}
              >
                {w}
              </m.span>
            </span>
          ))}
        </h1>

        {/* Burger stage */}
        <div className="relative z-20 mt-1 w-[min(74vw,500px)] sm:-mt-[3.5vw] lg:-mt-[38px]">
          <m.div style={{ x: burgerX, y: burgerY }}>
            <m.img
              {...cut('burger-hero', '(min-width: 640px) 500px, 78vw')}
              alt="Avadh stacked veg burger"
              fetchPriority="high"
              className="cutout float relative w-full"
              initial={reduce ? false : { y: -260, rotate: -18, scale: 0.7, opacity: 0 }}
              animate={{ y: 0, rotate: 0, scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 80, damping: 13, delay: 0.25 }}
            />
          </m.div>
          {BITS.map((b, i) => (
            <Bit key={i} b={b} i={i} mx={mx} my={my} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  )
}
