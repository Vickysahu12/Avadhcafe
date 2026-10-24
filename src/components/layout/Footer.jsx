import { FacebookLogo, InstagramLogo, MapPin, Phone, Clock, WhatsappLogo } from '@phosphor-icons/react'
import { ADDRESS, FACEBOOK, HOURS, INSTAGRAM, NAV_LEFT, NAV_RIGHT, PHONE, PHONE_DISPLAY } from '../../data/site'
import { CATEGORIES } from '../../data/menu'

export default function Footer() {
  return (
    <footer id="contact" className="relative mt-10 bg-red text-white">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <img src="/ig/logo.jpg" alt="Avadh Shakes & Fast Food" width="150" height="150" loading="lazy" className="size-24 rounded-full ring-[6px] ring-cream" />
      </div>

      <div className="mx-auto grid max-w-[1140px] grid-cols-2 gap-10 px-5 pb-10 pt-20 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <p className="display text-xl tracking-wide">About Avadh</p>
          <p className="mt-4 text-[14px] leading-relaxed text-white/80">
            Shakes and fast food from the Chai Shotts family. Big on taste, light on your pocket, across South Gujarat.
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { href: INSTAGRAM, label: 'Instagram', Icon: InstagramLogo },
              { href: FACEBOOK, label: 'Facebook', Icon: FacebookLogo },
              { href: `https://wa.me/91${PHONE}`, label: 'WhatsApp', Icon: WhatsappLogo },
            ].map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid size-10 place-items-center rounded-full bg-white/15 transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-white hover:text-red">
                <Icon weight="fill" className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Quick links">
          <p className="display text-xl tracking-wide">Quick links</p>
          <ul className="mt-4 space-y-2.5 text-[14px] text-white/80">
            {[...NAV_LEFT, ...NAV_RIGHT].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-yellow">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Menu">
          <p className="display text-xl tracking-wide">Our menu</p>
          <ul className="mt-4 space-y-2.5 text-[14px] text-white/80">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <a href="#dishes" className="transition-colors hover:text-yellow">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 md:col-span-1">
          <p className="display text-xl tracking-wide">Contact us</p>
          <ul className="mt-4 space-y-3 text-[14px] text-white/80">
            <li className="flex gap-2.5">
              <MapPin weight="fill" className="mt-0.5 size-4 shrink-0 text-yellow" />
              Corporate office: {ADDRESS}
            </li>
            <li>
              <a href={`tel:+91${PHONE}`} className="flex gap-2.5 transition-colors hover:text-yellow">
                <Phone weight="fill" className="mt-0.5 size-4 shrink-0 text-yellow" />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Clock weight="fill" className="mt-0.5 size-4 shrink-0 text-yellow" />
              {HOURS} (sample hours)
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-[1140px] flex-col items-center justify-between gap-2 px-5 py-5 text-[13px] text-white/70 sm:flex-row">
          <p>© 2026 Avadh Shakes &amp; Fast Food. All rights reserved.</p>
          <p>A Chai Shotts brand</p>
        </div>
      </div>
    </footer>
  )
}
