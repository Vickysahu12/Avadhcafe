import { useState } from 'react'
import { m } from 'motion/react'
import { ArrowRight, Calculator } from '@phosphor-icons/react'
import { useEnquiry } from '../components/common/EnquiryModal'
import Reveal, { EASE } from '../components/ui/Reveal'
import SectionTag from '../components/ui/SectionTag'
import { cut } from '../lib/image'

// Assumptions behind the estimate. Gross margin is the midpoint of the 40-60% the brand reports.
const MARGIN = 0.5
const STAFF_SALARY = 12000
const OTHER_COSTS = 0.05

const inr = (n) => {
  const v = Math.round(n)
  if (Math.abs(v) >= 100000) return `₹${(v / 100000).toFixed(2)}L`
  return `₹${(v / 1000).toFixed(1)}K`
}

const SLIDERS = [
  { key: 'orders', label: 'Orders per day', min: 40, max: 400, step: 5, fmt: (v) => v },
  { key: 'bill', label: 'Average bill', min: 100, max: 350, step: 10, fmt: (v) => `₹${v}` },
  { key: 'rent', label: 'Monthly rent', min: 10000, max: 80000, step: 1000, fmt: (v) => inr(v) },
  { key: 'staff', label: 'Staff members', min: 2, max: 8, step: 1, fmt: (v) => v },
  { key: 'invest', label: 'Total investment', min: 500000, max: 1000000, step: 25000, fmt: (v) => inr(v) },
]

function Slider({ s, value, onChange }) {
  const fill = ((value - s.min) / (s.max - s.min)) * 100
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-[14px] font-semibold text-ink">{s.label}</span>
        <span className="text-[18px] font-bold tabular-nums text-red">{s.fmt(value)}</span>
      </span>
      <input
        type="range"
        min={s.min}
        max={s.max}
        step={s.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="calc-range mt-2.5 w-full"
        style={{ background: `linear-gradient(to right, var(--color-red) ${fill}%, var(--color-line) ${fill}%)` }}
      />
    </label>
  )
}

export default function ProfitCalculator() {
  const enquire = useEnquiry()
  const [v, setV] = useState({ orders: 75, bill: 160, rent: 25000, staff: 3, invest: 750000 })
  const set = (k) => (n) => setV((x) => ({ ...x, [k]: n }))

  const sales = v.orders * v.bill * 30
  const food = sales * (1 - MARGIN)
  const staff = v.staff * STAFF_SALARY
  const other = sales * OTHER_COSTS
  const profit = sales - food - v.rent - staff - other
  const payback = profit > 0 ? v.invest / profit : null

  const parts = [
    { label: 'Ingredients', value: food, color: 'bg-ink/80' },
    { label: 'Rent', value: v.rent, color: 'bg-orange' },
    { label: 'Staff', value: staff, color: 'bg-[#8a5a3c]' },
    { label: 'Other', value: other, color: 'bg-muted/50' },
    { label: 'Your profit', value: Math.max(profit, 0), color: 'bg-red' },
  ]
  const total = parts.reduce((s, p) => s + p.value, 0) || 1

  return (
    <section id="calculator" className="relative scroll-mt-24 overflow-hidden bg-red py-16 text-white sm:py-24">
      <span aria-hidden className="absolute -left-24 -top-24 size-80 rounded-full bg-white/5" />
      <span aria-hidden className="absolute -bottom-32 -right-20 size-96 rounded-full bg-red-dark/60" />
      <img {...cut('fries-pile', '220px')} alt="" aria-hidden loading="lazy" className="cutout pointer-events-none absolute -right-10 top-10 hidden w-48 rotate-12 lg:block" />

      <div className="relative mx-auto max-w-[1140px] px-5">
        <Reveal className="text-center">
          <SectionTag tone="dark">Profit calculator</SectionTag>
          <h2 className="display mt-5 text-[clamp(32px,4.6vw,52px)]">
            Run the numbers for
            <br />
            your own Avadh
          </h2>
          <p className="mx-auto mt-4 max-w-[54ch] text-[15px] text-white/80">Move the sliders to match your town. The estimate updates as you go.</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.05fr]">
          <Reveal className="rounded-[28px] bg-white p-6 text-ink sm:p-8">
            <p className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full bg-red-soft text-red">
                <Calculator weight="fill" className="size-5" />
              </span>
              <span className="display text-[20px] tracking-wide">Your outlet</span>
            </p>
            <div className="mt-6 space-y-6">
              {SLIDERS.map((s) => (
                <Slider key={s.key} s={s} value={v[s.key]} onChange={set(s.key)} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col rounded-[28px] bg-yellow p-6 text-ink sm:p-8">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-ink/60">Monthly sales</p>
                <p className="mt-1 text-[26px] font-bold tabular-nums sm:text-[30px]">{inr(sales)}</p>
              </div>
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="text-[12px] font-semibold uppercase tracking-wider text-ink/60">Payback</p>
                <p className="mt-1 text-[26px] font-bold tabular-nums sm:text-[30px]">{payback ? `${payback.toFixed(1)} mo` : 'Not yet'}</p>
              </div>
            </div>

            <div className="mt-3 rounded-2xl bg-red p-5 text-white">
              <p className="text-[12px] font-semibold uppercase tracking-wider text-white/75">Estimated monthly profit</p>
              <m.p key={Math.round(profit / 1000)} initial={{ y: 8, opacity: 0.4 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.25, ease: EASE }} className="display mt-1 text-[clamp(40px,5vw,56px)] leading-none">
                {profit > 0 ? inr(profit) : 'Below break-even'}
              </m.p>
              <p className="mt-2 text-[13px] text-white/80">{profit > 0 ? `About ${inr(profit * 12)} a year at this pace.` : 'Try more daily orders or a lower rent.'}</p>
            </div>

            {/* Where each rupee of sales goes */}
            <div className="mt-6">
              <p className="text-[13px] font-semibold text-ink/70">Where your sales go each month</p>
              <div className="mt-2.5 flex h-4 overflow-hidden rounded-full bg-white/60">
                {parts.map((p) => (
                  <m.span key={p.label} className={`h-full ${p.color}`} initial={false} animate={{ width: `${(p.value / total) * 100}%` }} transition={{ type: 'spring', stiffness: 140, damping: 22 }} />
                ))}
              </div>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3">
                {parts.map((p) => (
                  <li key={p.label} className="flex items-center gap-2 text-[12px] font-medium">
                    <span className={`size-2.5 shrink-0 rounded-full ${p.color}`} />
                    <span className="text-ink/70">{p.label}</span>
                    <span className="ml-auto font-semibold tabular-nums">{inr(p.value)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-7">
              <button
                onClick={enquire}
                className="display inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 pt-[3px] text-[15px] tracking-wide text-white transition-[background-color,transform] hover:bg-red-dark active:scale-[0.98]"
              >
                Get the exact numbers for my city <ArrowRight weight="bold" className="-mt-[3px] size-4" />
              </button>
              <p className="mt-3 text-[11px] leading-snug text-ink/65">
                Illustrative estimate. Assumes a 50% gross margin (the brand reports 40-60%), ₹12K per staff member and 5% other costs.
                Real results depend on location and operations.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
