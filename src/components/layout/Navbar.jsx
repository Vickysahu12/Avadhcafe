import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react'
import { List, Phone, Storefront, X } from '@phosphor-icons/react'
import { NAV_LEFT, NAV_RIGHT, PHONE } from '../../data/site'
import { useEnquiry } from '../common/EnquiryModal'
import MobileMenu from './MobileMenu'

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
  const close = useCallback(() => setOpen(false), [])
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
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={`grid size-10 place-items-center rounded-full transition-colors duration-300 md:hidden ${open ? 'bg-red text-white' : 'bg-red-soft text-red'}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={open ? 'x' : 'list'}
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {open ? <X weight="bold" className="size-5" /> : <List weight="bold" className="size-5" />}
                </m.span>
              </AnimatePresence>
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

      <MobileMenu open={open} onClose={close} active={active} onEnquire={enquire} />
    </>
  )
}
