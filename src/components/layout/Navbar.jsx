import { useEffect, useState } from 'react'
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react'
import { List, Phone, Storefront, X } from '@phosphor-icons/react'
import { NAV_LEFT, NAV_RIGHT, PHONE } from '../../data/site'
import { useEnquiry } from '../common/EnquiryModal'
import { EASE } from '../ui/Reveal'

const ALL = [...NAV_LEFT, ...NAV_RIGHT]

// Highlights the link for the section in view. Sections mount lazily, so keep scanning.
function useActiveHash() {
  const [active, setActive] = useState('#top')
  useEffect(() => {
    const seen = new Set()
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    const scan = () =>
      ALL.forEach(({ href }) => {
        const el = document.querySelector(href)
        if (el && !seen.has(el)) {
          seen.add(el)
          io.observe(el)
        }
      })
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      mo.disconnect()
      io.disconnect()
    }
  }, [])
  return active
}

function NavLink({ href, label, active }) {
  const on = active === href
  return (
    <li>
      <a href={href} className={`relative block px-1 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors ${on ? 'text-red' : 'text-ink hover:text-red'}`}>
        {label}
        {on && <m.span layoutId="nav-line" className="absolute inset-x-1 -bottom-0.5 h-[2px] rounded-full bg-red" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
      </a>
    </li>
  )
}

export default function Navbar() {
  const enquire = useEnquiry()
  const active = useActiveHash()
  const { scrollY } = useScroll()
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setStuck(v > 40))

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 sm:px-6 sm:pt-4">
        <nav
          className={`mx-auto flex h-16 w-full min-w-0 max-w-[1240px] items-center justify-between rounded-[22px] bg-white px-2.5 transition-shadow duration-300 sm:h-[72px] sm:px-5 ${
            stuck ? 'shadow-[0_12px_30px_-12px_rgb(31_20_20/0.35)]' : 'shadow-[0_6px_20px_-10px_rgb(31_20_20/0.25)]'
          }`}
        >
          <div className="flex min-w-0 flex-1 items-center gap-6">
            <a href={`tel:+91${PHONE}`} className="display hidden h-10 items-center gap-2 rounded-full bg-red px-4 pt-[3px] text-[13px] tracking-wide text-white transition-[background-color,transform] hover:bg-red-dark active:scale-[0.97] md:inline-flex">
              <Phone weight="fill" className="-mt-[3px] size-4" /> Call Now
            </a>
            <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid size-10 place-items-center rounded-full bg-red-soft text-red md:hidden">
              <List weight="bold" className="size-5" />
            </button>
            <ul className="hidden items-center gap-5 lg:flex">
              {NAV_LEFT.map((l) => (
                <NavLink key={l.href} {...l} active={active} />
              ))}
            </ul>
          </div>

          <a href="#top" aria-label="Avadh home" className="relative mx-2 shrink-0 sm:mx-4">
            <img src="/ig/logo.jpg" alt="Avadh Shakes & Fast Food" width="150" height="150" className="size-12 rounded-full ring-4 ring-white sm:size-[60px] lg:-mb-5 lg:size-[74px]" />
          </a>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-6">
            <ul className="hidden items-center gap-5 lg:flex">
              {NAV_RIGHT.map((l) => (
                <NavLink key={l.href} {...l} active={active} />
              ))}
            </ul>
            <button onClick={enquire} className="display inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-red px-3 pt-[3px] text-[12px] tracking-wide text-white transition-[background-color,transform] hover:bg-red-dark active:scale-[0.97] sm:gap-2 sm:px-4 sm:text-[13px]">
              <Storefront weight="fill" className="-mt-[3px] size-4" />
              <span className="hidden sm:inline">Own an Avadh</span>
              <span className="sm:hidden">Franchise</span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <m.div className="fixed inset-0 z-[55] md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="absolute inset-0 bg-ink/50" />
            <m.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-y-0 left-0 flex w-[82%] max-w-sm flex-col bg-red p-6 text-white"
            >
              <div className="flex items-center justify-between">
                <img src="/ig/logo.jpg" alt="" className="size-14 rounded-full ring-4 ring-white/30" />
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-10 place-items-center rounded-full bg-white/15">
                  <X weight="bold" className="size-5" />
                </button>
              </div>
              <ul className="mt-10 space-y-1">
                {ALL.map((l, i) => (
                  <m.li key={l.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.05, duration: 0.4, ease: EASE }}>
                    <a href={l.href} onClick={() => setOpen(false)} className={`display block py-2 text-3xl tracking-wide ${active === l.href ? 'text-yellow' : ''}`}>
                      {l.label}
                    </a>
                  </m.li>
                ))}
              </ul>
              <a href={`tel:+91${PHONE}`} className="display mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white pt-[3px] text-red">
                <Phone weight="fill" className="-mt-[3px] size-4" /> Call Now
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
