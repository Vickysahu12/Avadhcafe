export default function DishMarquee() {
  const row = Array.from({ length: 6 }, () => 'Popular dishes')
  return (
    <div aria-hidden className="overflow-hidden py-6 sm:py-10">
      <div className="marquee flex w-max">
        {[...row, ...row].map((t, i) => (
          <span key={i} className="display outline-text whitespace-nowrap px-6 text-[clamp(48px,8vw,96px)]">
            {t} <span className="text-red/20 [-webkit-text-stroke:0]">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
