// Options for the build-your-own shake. Prices are samples for the demo.
export const BASES = [
  { id: 'milk', label: 'Chilled Milk', price: 0 },
  { id: 'icecream', label: 'Thick Ice Cream', price: 30 },
  { id: 'coffee', label: 'Kulhad Coffee', price: 20 },
]

// Each flavour carries the two colours used to paint the liquid in the glass.
export const FLAVOURS = [
  { id: 'chocolate', label: 'Chocolate', price: 109, light: '#8a5a3c', dark: '#4a2614' },
  { id: 'strawberry', label: 'Strawberry', price: 109, light: '#ffb3c1', dark: '#e8577a' },
  { id: 'oreo', label: 'Oreo', price: 119, light: '#d9d2cc', dark: '#7d726b' },
  { id: 'mango', label: 'Alphonso Mango', price: 119, light: '#ffd36b', dark: '#f29a1d' },
  { id: 'butterscotch', label: 'Butterscotch', price: 109, light: '#f1c27d', dark: '#c47f2c' },
  { id: 'blueberry', label: 'Blueberry', price: 129, light: '#b7a4e6', dark: '#5d43a8' },
]

export const TOPPINGS = [
  { id: 'cream', label: 'Whipped Cream', price: 20 },
  { id: 'drizzle', label: 'Choco Drizzle', price: 15 },
  { id: 'oreo', label: 'Oreo Crumble', price: 25 },
  { id: 'sprinkles', label: 'Sprinkles', price: 10 },
  { id: 'brownie', label: 'Brownie Bits', price: 30 },
]

export const SIZES = [
  { id: 'regular', label: 'Regular', ml: 350, price: 0, fill: 0.72 },
  { id: 'large', label: 'Large', ml: 500, price: 40, fill: 0.9 },
]
