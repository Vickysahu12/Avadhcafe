import { STATS } from '../data/site'
import Counter from '../components/ui/Counter'
import Reveal from '../components/ui/Reveal'

export default function Stats() {
  return (
    <section aria-label="Avadh in numbers" className="px-4 sm:px-5">
      <Reveal className="mx-auto max-w-[1000px]">
        <dl className="grid grid-cols-2 gap-y-6 rounded-[24px] bg-orange px-4 py-7 text-white shadow-[0_24px_50px_-24px_rgb(241_90_36/0.8)] sm:grid-cols-4 sm:px-6 sm:py-9">
          {STATS.map((s, i) => (
            <div key={s.label} className={`text-center ${i > 0 ? 'sm:border-l sm:border-white/25' : ''}`}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="display text-[clamp(34px,4.4vw,48px)] leading-none">
                <Counter to={s.value} suffix={s.suffix} />
              </dd>
              <dd className="mt-2 text-[12px] font-semibold uppercase tracking-wider text-white/85">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
