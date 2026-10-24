// Sample prices for the pitch demo, to be replaced with Avadh's menu card.
export const CATEGORIES = [
  { id: 'shakes', label: 'Thick Shakes', short: 'Shakes', img: 'shake-oreo' },
  { id: 'burgers', label: 'Burgers', short: 'Burger', img: 'burger-hero' },
  { id: 'pizza', label: 'Pizza', short: 'Pizza', img: 'pizza-2' },
  { id: 'momos', label: 'Momos', short: 'Momos', img: 'momos-2' },
  { id: 'bites', label: 'Fries & Bites', short: 'Fries', img: 'fries' },
  { id: 'wraps', label: 'Sandwich & Wraps', short: 'Wraps', img: 'wrap' },
]

export const DISHES = [
  { cat: 'shakes', name: 'Oreo Overload Shake', desc: 'Crushed Oreo, vanilla ice cream, choco drip', price: 149, img: 'shake-oreo' },
  { cat: 'shakes', name: 'Death by Chocolate', desc: 'Dark cocoa, brownie bits, fudge on top', price: 169, img: 'shake-hero' },
  { cat: 'shakes', name: 'Strawberry Cloud', desc: 'Fresh strawberry blended with cream', price: 139, img: 'shake-strawberry' },
  { cat: 'shakes', name: 'Kulhad Cold Coffee', desc: 'Strong brew, chilled milk, a little sweet', price: 119, img: 'cold-coffee' },
  { cat: 'shakes', name: 'Berry Blast', desc: 'Mixed berries, yogurt, crushed ice', price: 149, img: 'shake-berry' },
  { cat: 'shakes', name: 'Cookie Freakshake', desc: 'Loaded jar shake with cookies and cream', price: 199, img: 'shake-freak' },
  { cat: 'burgers', name: 'Avadh Double Decker', desc: 'Two crispy patties, cheese, house sauce', price: 159, img: 'burger' },
  { cat: 'burgers', name: 'Classic Aloo Tikki', desc: 'Spiced tikki, onion, mint mayo', price: 89, img: 'burger-hero' },
  { cat: 'burgers', name: 'Paneer Makhani Stack', desc: 'Grilled paneer in a makhani glaze', price: 139, img: 'burger-2' },
  { cat: 'pizza', name: 'Farmhouse Loaded', desc: 'Capsicum, onion, corn, olives, extra cheese', price: 229, img: 'pizza-2' },
  { cat: 'pizza', name: 'Tandoori Paneer Pizza', desc: 'Smoky paneer tikka, onion, coriander', price: 249, img: 'pizza-2' },
  { cat: 'momos', name: 'Steamed Veg Momos', desc: 'Six pieces with fiery red chutney', price: 99, img: 'momos-2' },
  { cat: 'momos', name: 'Kurkure Momos', desc: 'Crumb-fried and crunchy all through', price: 129, img: 'momos' },
  { cat: 'bites', name: 'Peri Peri Fries', desc: 'Crinkle-cut, peri peri dust, cheesy dip', price: 99, img: 'fries' },
  { cat: 'wraps', name: 'Bombay Grilled Sandwich', desc: 'Green chutney, veggies, butter-toasted', price: 109, img: 'sandwich' },
  { cat: 'wraps', name: 'Paneer Tikka Wrap', desc: 'Rolled tight with onion and lachha sauce', price: 129, img: 'wrap' },
]

// Sample combos for the pitch, priced to show the "light on your pocket" promise.
export const COMBOS = [
  {
    name: 'Shake & Burger',
    items: ['Oreo Overload Shake', 'Classic Aloo Tikki Burger', 'Peri Peri Fries'],
    price: 249,
    was: 337,
    imgs: ['shake-oreo', 'burger-hero'],
    tone: 'white',
  },
  {
    name: 'Friends Feast',
    items: ['Farmhouse Loaded Pizza', '2 Thick Shakes of choice', 'Kurkure Momos'],
    price: 499,
    was: 656,
    imgs: ['pizza-2', 'shake-hero'],
    tone: 'red',
    badge: 'Best seller',
  },
  {
    name: 'Momo Meal',
    items: ['Steamed Veg Momos', 'Kulhad Cold Coffee', 'Cheesy Loaded Fries'],
    price: 299,
    was: 347,
    imgs: ['momos-2', 'cold-coffee'],
    tone: 'yellow',
  },
]
