import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { ArrowRight, CheckCircle, CircleNotch, Phone, X } from '@phosphor-icons/react'
import { PHONE, PHONE_DISPLAY } from '../../data/site'
import { EASE } from '../ui/Reveal'

const Ctx = createContext(() => {})
export const useEnquiry = () => useContext(Ctx)

const BUDGETS = ['₹5-7 lakh', '₹7-10 lakh', 'Above ₹10 lakh']
const input =
  'h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-200 focus:border-red focus:shadow-[0_0_0_4px_rgb(215_20_29/0.12)] focus:outline-none'

function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-[13px] font-medium text-red">
          {error}
        </p>
      )}
    </div>
  )
}

function Form({ onClose }) {
  const reduce = useReducedMotion()
  const [form, setForm] = useState({ name: '', phone: '', city: '', budget: BUDGETS[0] })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [shake, setShake] = useState(0)

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  function submit(e) {
    e.preventDefault()
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10))) next.phone = 'Enter a 10 digit mobile number.'
    if (form.city.trim().length < 2) next.city = 'Which city are you looking at?'
    setErrors(next)
    if (Object.keys(next).length) return setShake((s) => s + 1)
    // TODO: send to the CRM or WhatsApp API once Avadh confirms where leads should go.
    setStatus('sending')
    setTimeout(() => setStatus('done'), 1000)
  }

  if (status === 'done')
    return (
      <div className="grid min-h-[380px] place-items-center p-8 text-center">
        <div>
          <m.span initial={reduce ? false : { scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }} className="inline-block">
            <CheckCircle weight="fill" className="size-20 text-red" />
          </m.span>
          <p className="display mt-4 text-3xl text-red">Thank you, {form.name.split(' ')[0]}!</p>
          <p className="mx-auto mt-2 max-w-[32ch] text-muted">Our franchise team will call you soon about opening an Avadh in {form.city}.</p>
          <button onClick={onClose} className="mt-6 text-sm font-semibold text-red underline underline-offset-4">
            Back to the site
          </button>
        </div>
      </div>
    )

  return (
    <m.form onSubmit={submit} noValidate animate={reduce || !shake ? {} : { x: [0, -10, 10, -6, 6, 0] }} transition={{ duration: 0.4 }} data-shake={shake} className="grid gap-4 p-6 sm:p-8">
      <div>
        <p className="display text-4xl text-red">Own an Avadh</p>
        <p className="mt-1 text-[15px] text-muted">Share a few details and get the full investment breakdown on call.</p>
      </div>
      <Field id="f-name" label="Full name" error={errors.name}>
        <input id="f-name" className={input} value={form.name} onChange={set('name')} placeholder="Riya Desai" autoComplete="name" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="f-phone" label="Mobile number" error={errors.phone}>
          <input id="f-phone" className={input} value={form.phone} onChange={set('phone')} placeholder="98250 41762" inputMode="tel" autoComplete="tel" />
        </Field>
        <Field id="f-city" label="City" error={errors.city}>
          <input id="f-city" className={input} value={form.city} onChange={set('city')} placeholder="Valsad" autoComplete="address-level2" />
        </Field>
      </div>
      <div className="flex flex-col gap-1.5">
        <span id="f-budget" className="text-sm font-semibold text-ink">
          Investment budget
        </span>
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-labelledby="f-budget">
          {BUDGETS.map((b) => (
            <button
              type="button"
              role="radio"
              aria-checked={form.budget === b}
              key={b}
              onClick={() => setForm((f) => ({ ...f, budget: b }))}
              className={`relative h-11 rounded-xl border px-2 text-[13px] font-semibold transition-colors duration-200 active:scale-[0.97] ${
                form.budget === b ? 'border-red text-white' : 'border-line text-ink hover:border-red/40'
              }`}
            >
              {form.budget === b && <m.span layoutId="budget" className="absolute inset-0 rounded-[11px] bg-red" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
              <span className="relative">{b}</span>
            </button>
          ))}
        </div>
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="display mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-red pt-[3px] text-[16px] tracking-wide text-white transition-[background-color,transform] hover:bg-red-dark active:scale-[0.98] disabled:opacity-80"
      >
        {status === 'sending' ? (
          <>
            <CircleNotch weight="bold" className="size-5 animate-spin" /> Sending
          </>
        ) : (
          <>
            Request a callback <ArrowRight weight="bold" className="size-5" />
          </>
        )}
      </button>
      <a href={`tel:+91${PHONE}`} className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted hover:text-red">
        <Phone weight="fill" className="size-4" /> Or call {PHONE_DISPLAY}
      </a>
    </m.form>
  )
}

export function EnquiryProvider({ children }) {
  const [open, setOpen] = useState(false)
  const show = useCallback(() => setOpen(true), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <Ctx.Provider value={show}>
      {children}
      <AnimatePresence>
        {open && (
          <m.div className="fixed inset-0 z-[60] grid place-items-center p-3 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <button aria-label="Close" onClick={() => setOpen(false)} className="absolute inset-0 bg-ink/55" />
            <m.div
              role="dialog"
              aria-modal="true"
              aria-label="Franchise enquiry"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-3xl bg-cream shadow-2xl"
            >
              <button onClick={() => setOpen(false)} aria-label="Close form" className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white text-ink shadow-sm transition-colors hover:bg-red hover:text-white">
                <X weight="bold" className="size-4" />
              </button>
              <Form onClose={() => setOpen(false)} />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}
