// The small slanted pill above section titles, as in the reference layout.
export default function SectionTag({ children, tone = 'red', className = '' }) {
  const tones = {
    red: 'bg-red text-white',
    dark: 'bg-red-dark text-white ring-2 ring-white/25',
  }
  return (
    <span className={`display inline-block -skew-x-6 rounded-md px-4 pb-1 pt-[7px] text-[13px] tracking-[0.06em] ${tones[tone]} ${className}`}>
      <span className="inline-block skew-x-6">{children}</span>
    </span>
  )
}
