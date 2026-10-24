import { AnimatePresence, m, useReducedMotion } from 'motion/react'

// A live illustration of the shake being built. Everything is drawn in one 200x300 SVG
// so layers stay aligned at any size.
const TOP = 70
const BOTTOM = 290
const GLASS = 'M20 70H180L162 278Q160 290 148 290H52Q40 290 38 278Z'
const BASE_COLOR = { milk: '#fff4e4', icecream: '#fffaf0', coffee: '#6b3e22' }

const SPRINKLES = [
  [70, 46, 20, '#ff4d6d'],
  [92, 30, -30, '#ffd60a'],
  [116, 44, 60, '#4cc9f0'],
  [132, 58, -10, '#80ed99'],
  [84, 60, 45, '#ff9f1c'],
  [106, 18, 10, '#c77dff'],
  [62, 70, -50, '#4cc9f0'],
  [146, 70, 30, '#ff4d6d'],
  [124, 26, -60, '#80ed99'],
]
const OREO = [
  [72, 50, 9],
  [126, 54, 8],
  [100, 34, 7],
  [148, 72, 6],
]
const BROWNIE = [
  [70, 250, 14, 12],
  [112, 262, 16, -8],
  [138, 236, 12, 20],
  [90, 226, 11, -18],
]
const DRIPS = [
  'M30 72q2 26 -1 44q-2 10 3 12q5 -2 2 -14q-3 -20 2 -42',
  'M66 72q1 18 -1 30q-1 8 4 8q4 -1 2 -10q-2 -14 1 -28',
  'M104 72q2 34 -1 54q-1 9 4 10q5 -2 2 -12q-3 -26 1 -52',
  'M142 72q1 20 -1 34q-1 8 4 8q4 -1 2 -9q-2 -16 1 -33',
  'M172 72q-1 24 -3 38q-1 8 3 9q4 -2 3 -10q0 -18 3 -37',
]

export default function ShakeGlass({ flavour, base, toppings, size }) {
  const reduce = useReducedMotion()
  const level = BOTTOM - size.fill * (BOTTOM - TOP)
  const has = (t) => toppings.includes(t)
  const onTop = has('cream') ? 0 : level - TOP // toppings sit on cream, or on the liquid when there is none
  const spring = { type: 'spring', stiffness: 260, damping: 18 }

  return (
    <svg viewBox="0 -10 200 310" className="h-full w-full overflow-visible" role="img" aria-label={`${size.label} ${flavour.label} shake`}>
      <defs>
        <clipPath id="glass-clip">
          <path d={GLASS} />
        </clipPath>
        <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
          <m.stop offset="0%" animate={{ stopColor: flavour.light }} transition={{ duration: 0.6 }} />
          <m.stop offset="55%" animate={{ stopColor: flavour.dark }} transition={{ duration: 0.6 }} />
          <m.stop offset="90%" animate={{ stopColor: flavour.dark }} transition={{ duration: 0.6 }} />
          <m.stop offset="100%" animate={{ stopColor: BASE_COLOR[base.id] }} transition={{ duration: 0.6 }} />
        </linearGradient>
        <pattern id="straw" width="12" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <rect width="12" height="16" fill="#d7141d" />
          <rect width="12" height="7" fill="#fff" />
        </pattern>
        <radialGradient id="cream" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f1e6d6" />
        </radialGradient>
      </defs>

      {/* Straw */}
      <rect x="116" y="-14" width="13" height="210" rx="6" fill="url(#straw)" transform="rotate(14 122 90)" />

      {/* Liquid, clipped to the glass */}
      <g clipPath="url(#glass-clip)">
        <rect x="0" y="0" width="200" height="300" fill="rgb(255 255 255 / 0.25)" />
        <m.g initial={false} animate={{ y: level - TOP }} transition={{ type: 'spring', stiffness: 70, damping: 14 }}>
          <m.path
            d="M-200 70q25 -8 50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0V320H-200Z"
            fill="url(#liquid)"
            animate={reduce ? {} : { x: [0, 100] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </m.g>
        {/* Bubbles */}
        {!reduce &&
          [52, 88, 130, 150].map((x, i) => (
            <m.circle
              key={x}
              cx={x}
              r={2.4 + (i % 2)}
              fill="rgb(255 255 255 / 0.55)"
              initial={{ cy: 285, opacity: 0 }}
              animate={{ cy: [285, level + 8], opacity: [0, 0.9, 0] }}
              transition={{ duration: 2.6 + i * 0.5, repeat: Infinity, delay: i * 0.7, ease: 'easeOut' }}
            />
          ))}
        <AnimatePresence>
          {has('brownie') &&
            BROWNIE.map(([x, y, s, r], i) => (
              <m.rect
                key={`b${i}`}
                x={x}
                y={y}
                width={s}
                height={s}
                rx="2.5"
                fill="#3b1d10"
                transform={`rotate(${r} ${x + s / 2} ${y + s / 2})`}
                initial={{ opacity: 0, y: -120 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ ...spring, delay: i * 0.06 }}
              />
            ))}
        </AnimatePresence>
        <AnimatePresence>
          {has('drizzle') &&
            DRIPS.map((d, i) => (
              <m.path
                key={`d${i}`}
                d={d}
                fill="none"
                stroke="#3b1d10"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              />
            ))}
        </AnimatePresence>
      </g>

      {/* Glass outline and shine */}
      <path d={GLASS} fill="none" stroke="rgb(255 255 255 / 0.9)" strokeWidth="3" />
      <path d="M34 92L48 262" stroke="rgb(255 255 255 / 0.55)" strokeWidth="6" strokeLinecap="round" />
      <path d="M50 92L58 190" stroke="rgb(255 255 255 / 0.35)" strokeWidth="3" strokeLinecap="round" />
      <rect x="14" y="66" width="172" height="8" rx="4" fill="rgb(255 255 255 / 0.9)" />

      {/* Whipped cream */}
      <AnimatePresence>
        {has('cream') && (
          <m.g key="cream" style={{ transformOrigin: '100px 70px' }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={spring}>
            {/* Soft-serve swirl: three tiers and a peak */}
            <path d="M14 74C14 52 40 46 100 46C160 46 186 52 186 74C186 84 160 86 100 86C40 86 14 84 14 74Z" fill="url(#cream)" stroke="#eadbc6" strokeWidth="1.5" />
            <path d="M34 54C34 36 58 30 100 30C142 30 166 36 166 54C166 64 142 66 100 66C58 66 34 64 34 54Z" fill="url(#cream)" stroke="#eadbc6" strokeWidth="1.5" />
            <path d="M54 36C54 22 74 16 100 16C126 16 146 22 146 36C146 46 126 48 100 48C74 48 54 46 54 36Z" fill="url(#cream)" stroke="#eadbc6" strokeWidth="1.5" />
            <path d="M76 22C76 10 90 2 100 -8C110 2 124 10 124 22C124 30 112 32 100 32C88 32 76 30 76 22Z" fill="url(#cream)" stroke="#eadbc6" strokeWidth="1.5" />
            <path d="M40 70Q100 80 160 70M58 50Q100 58 142 50M76 32Q100 38 124 32" fill="none" stroke="#e8d8c2" strokeWidth="2" strokeLinecap="round" />
          </m.g>
        )}
      </AnimatePresence>

      {/* Toppings ride on the cream or float on the liquid */}
      <m.g initial={false} animate={{ y: onTop }} transition={{ type: 'spring', stiffness: 120, damping: 16 }}>
        <AnimatePresence>
          {has('oreo') &&
            OREO.map(([x, y, r], i) => (
              <m.g key={`o${i}`} initial={{ opacity: 0, y: -60 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ ...spring, delay: i * 0.05 }}>
                <circle cx={x} cy={y} r={r} fill="#2b2220" />
                <circle cx={x} cy={y} r={r * 0.45} fill="#f4eee6" />
              </m.g>
            ))}
        </AnimatePresence>
        <AnimatePresence>
          {has('sprinkles') &&
            SPRINKLES.map(([x, y, r, c], i) => (
              <m.rect
                key={`s${i}`}
                x={x - 5}
                y={y - 1.5}
                width="10"
                height="3"
                rx="1.5"
                fill={c}
                transform={`rotate(${r} ${x} ${y})`}
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ ...spring, delay: i * 0.03 }}
              />
            ))}
        </AnimatePresence>
      </m.g>
    </svg>
  )
}
