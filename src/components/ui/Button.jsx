const TONES = {
  red: 'bg-red text-white hover:bg-red-dark shadow-[0_8px_18px_-8px_rgb(215_20_29/0.7)]',
  white: 'bg-white text-red hover:bg-cream',
  yellow: 'bg-yellow text-ink hover:brightness-95',
  outline: 'border-2 border-red text-red hover:bg-red hover:text-white',
}

export default function Button({ href, children, tone = 'red', icon, className = '', ...rest }) {
  const cls = `display group inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 pt-[3px] text-[15px] tracking-wide transition-[background-color,color,transform,filter] duration-200 ease-[var(--ease-out-strong)] active:scale-[0.97] ${TONES[tone]} ${className}`
  const inner = (
    <>
      {icon}
      {children}
    </>
  )
  return href ? (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  ) : (
    <button type="button" className={cls} {...rest}>
      {inner}
    </button>
  )
}
