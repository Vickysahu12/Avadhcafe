import { useEffect } from 'react'
import { AnimatePresence, m, useDragControls, useReducedMotion } from 'motion/react'
import { ArrowRight, ChatCircleDots, ForkKnife, House, Info, InstagramLogo, MapPin, Phone, Storefront, WhatsappLogo, X } from '@phosphor-icons/react'
import { INSTAGRAM, NAV_LEFT, NAV_RIGHT, PHONE } from '../../data/site'
import { cut } from '../../lib/image'
import { scrollToTarget } from '../../hooks/useLenis'

const LINKS = [...NAV_LEFT, ...NAV_RIGHT]
const ICONS = { '#top': House, '#menu': ForkKnife, '#about': Info, '#outlets': MapPin, '#franchise': Storefront, '#contact': ChatCircleDots }

// Bottom sheet for phones: slides up, swipe down (or tap outside) to close.
export default function MobileMenu({ open, onClose, active, onEnquire }) {
  const reduce = useReducedMotion()
  const drag = useDragControls()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open, onClose])

  // Close first, then scroll once the page is unlocked again.
  function go(e, href) {
    e.preventDefault()
    onClose()
    setTimeout(() => scrollToTarget(href, href === '#top' ? 0 : -88), 320)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.button
            key="backdrop"
            aria-label="Close menu"
            onClick={onClose}
            className="fixed inset-0 z-[45] bg-ink/45 backdrop-blur-[2px] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <m.div
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            drag="y"
            dragListener={false}
            dragControls={drag}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.7 }}
            onDragEnd={(_, info) => (info.offset.y > 110 || info.velocity.y > 500) && onClose()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 36 }}
            className="fixed inset-x-0 bottom-0 z-[46] max-h-[86dvh] overflow-y-auto rounded-t-[30px] bg-cream pb-[max(20px,env(safe-area-inset-bottom))] shadow-[0_-20px_60px_-20px_rgb(31_20_20/0.5)] md:hidden"
          >
            {/* Grab area: handle + title, this is where the swipe starts */}
            <div onPointerDown={(e) => drag.start(e)} className="sticky top-0 z-10 cursor-grab touch-none bg-cream px-5 pb-3 pt-3 active:cursor-grabbing">
              <span aria-hidden className="mx-auto block h-1.5 w-12 rounded-full bg-ink/15" />
              <div className="mt-3 flex items-center justify-between">
                <p className="display text-[26px] leading-none tracking-wide text-red">Explore Avadh</p>
                <button onClick={onClose} aria-label="Close menu" className="grid size-10 place-items-center rounded-full bg-white text-ink shadow-sm active:scale-90">
                  <X weight="bold" className="size-4" />
                </button>
              </div>
            </div>

            <div className="px-5">
              <ul className="grid grid-cols-3 gap-2.5">
                {LINKS.map((l, i) => {
                  const Icon = ICONS[l.href]
                  const on = active === l.href
                  return (
                    <m.li
                      key={l.href}
                      initial={reduce ? false : { opacity: 0, y: 18, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 28, delay: 0.06 + i * 0.035 }}
                    >
                      <a
                        href={l.href}
                        onClick={(e) => go(e, l.href)}
                        aria-current={on ? 'true' : undefined}
                        className={`flex h-[92px] flex-col items-center justify-center gap-2 rounded-2xl text-center transition-[background-color,transform] active:scale-[0.96] ${
                          on ? 'bg-red text-white shadow-[0_12px_24px_-12px_rgb(215_20_29/0.8)]' : 'bg-white text-ink'
                        }`}
                      >
                        <span className={`grid size-10 place-items-center rounded-full ${on ? 'bg-white/20' : 'bg-red-soft text-red'}`}>
                          <Icon weight="fill" className="size-5" />
                        </span>
                        <span className="text-[12px] font-semibold leading-tight">{l.label}</span>
                      </a>
                    </m.li>
                  )
                })}
              </ul>

              {/* Feature card for the shake builder */}
              <m.a
                href="#shake-lab"
                onClick={(e) => go(e, '#shake-lab')}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30, delay: 0.28 }}
                className="relative mt-3 flex items-center overflow-hidden rounded-2xl bg-yellow p-4 pr-28 active:scale-[0.98]"
              >
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-ink/60">New on the menu</span>
                  <span className="display mt-1 block text-[20px] leading-none text-ink">Build your own shake</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-red">
                    Try the Shake Lab <ArrowRight weight="bold" className="size-3" />
                  </span>
                </span>
                <img {...cut('shake-oreo', '120px')} alt="" className="cutout absolute -bottom-6 right-3 h-[140%] w-auto rotate-6" />
              </m.a>

              {/* Quick actions */}
              <m.div
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30, delay: 0.34 }}
                className="mt-3 grid grid-cols-2 gap-2.5"
              >
                <a href={`tel:+91${PHONE}`} className="display inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red pt-[3px] text-[14px] tracking-wide text-white active:scale-[0.97]">
                  <Phone weight="fill" className="-mt-[3px] size-4" /> Call now
                </a>
                <a
                  href={`https://wa.me/91${PHONE}`}
                  target="_blank"
                  rel="noreferrer"
                  className="display inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white pt-[3px] text-[14px] tracking-wide text-ink ring-1 ring-line active:scale-[0.97]"
                >
                  <WhatsappLogo weight="fill" className="-mt-[3px] size-4 text-[#1fa855]" /> WhatsApp
                </a>
                <button
                  onClick={() => {
                    onClose()
                    setTimeout(onEnquire, 280)
                  }}
                  className="display col-span-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink pt-[3px] text-[14px] tracking-wide text-white active:scale-[0.97]"
                >
                  <Storefront weight="fill" className="-mt-[3px] size-4" /> Own an Avadh franchise
                </button>
              </m.div>

              <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 text-[13px] font-medium text-muted">
                <InstagramLogo weight="bold" className="size-4" /> @avadhcafeofficial
              </a>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
