import { useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { CheckCircle } from '@phosphor-icons/react'
import Reveal, { EASE } from '../components/ui/Reveal'
import { cut } from '../lib/image'

export default function Offers() {
  const [value, setValue] = useState('')
  const [state, setState] = useState('idle')

  function submit(e) {
    e.preventDefault()
    const digits = value.replace(/\D/g, '').slice(-10)
    const email = /\S+@\S+\.\S+/.test(value)
    if (!email && !/^[6-9]\d{9}$/.test(digits)) return setState('error')
    // TODO: connect to the offers list (WhatsApp broadcast or email tool).
    setState('done')
  }

  return (
    <section className="overflow-x-clip px-4 pb-16 pt-6 sm:px-5 sm:pb-20">
      <Reveal className="relative mx-auto max-w-[1060px]">
        <div className="relative overflow-hidden rounded-[28px] bg-yellow px-6 py-14 text-center sm:px-16 sm:py-16">
          <div aria-hidden className="absolute -left-20 -top-20 size-64 rounded-full bg-white/20" />
          <div aria-hidden className="absolute -bottom-24 -right-16 size-72 rounded-full bg-orange/20" />
          <h2 className="display relative text-[clamp(32px,5vw,54px)] leading-none text-white [text-shadow:0_4px_0_rgb(215_20_29/0.85)]">Join for hot offers</h2>
          <p className="relative mx-auto mt-3 max-w-[44ch] text-[15px] font-medium text-ink/80">
            Drop your WhatsApp number or email and get Avadh deals, new launches and combo offers first.
          </p>

          <AnimatePresence mode="wait" initial={false}>
            {state === 'done' ? (
              <m.p
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="relative mx-auto mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold text-red"
              >
                <CheckCircle weight="fill" className="size-5" /> You are on the list. Hot offers coming your way.
              </m.p>
            ) : (
              <m.form key="form" onSubmit={submit} noValidate className="relative mx-auto mt-7 max-w-[460px]">
                <label htmlFor="offers" className="sr-only">
                  WhatsApp number or email
                </label>
                <div className={`flex items-center rounded-full bg-white p-1.5 shadow-lg transition-shadow ${state === 'error' ? 'ring-2 ring-red' : ''}`}>
                  <input
                    id="offers"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value)
                      if (state === 'error') setState('idle')
                    }}
                    placeholder="WhatsApp number or email"
                    className="h-11 min-w-0 flex-1 bg-transparent px-4 text-[15px] text-ink placeholder:text-muted/70 focus:outline-none"
                  />
                  <button type="submit" className="display h-11 shrink-0 rounded-full bg-red px-5 pt-[3px] text-[14px] tracking-wide text-white transition-[background-color,transform] hover:bg-red-dark active:scale-[0.97]">
                    Subscribe
                  </button>
                </div>
                {state === 'error' && (
                  <p role="alert" className="mt-2 text-[13px] font-semibold text-red-dark">
                    Enter a 10 digit mobile number or a valid email.
                  </p>
                )}
              </m.form>
            )}
          </AnimatePresence>
        </div>

        <img {...cut('sandwich', '260px')} alt="" aria-hidden loading="lazy" className="cutout pointer-events-none absolute -left-8 bottom-[-28px] w-32 -rotate-12 sm:-left-20 sm:w-60" />
        <img {...cut('pizza-whole', '260px')} alt="" aria-hidden loading="lazy" className="cutout pointer-events-none absolute -right-8 -top-10 w-36 rotate-12 sm:-right-20 sm:-top-14 sm:w-64" />
      </Reveal>
    </section>
  )
}
