# Avadh Cafe website (pitch demo)

React 19 + Vite + Tailwind CSS v4, animated with Motion and smoothed with Lenis.

```bash
npm install
npm run dev       # local development
npm run build     # production build in dist/
npm run preview   # serve the production build
```

## Folder structure

```
public/
  cut/        cut-out food images, each in -sm (420px), -md (760px) and full size
  fonts/      self-hosted, subset Luckiest Guy + Poppins
  ig/         logo and outlet photos from @avadhcafeofficial
src/
  main.jsx            entry
  App.jsx             page order, lazy-loaded sections
  styles/globals.css  fonts, brand tokens, shared utilities
  data/               all copy and content (site, menu, outlets, faq, social, shakeLab)
  hooks/              useLenis
  lib/                image helper (responsive srcset for /cut)
  components/
    ui/               Button, SectionTag, Reveal, Counter
    layout/           Navbar, Footer
    common/           EnquiryModal (franchise form + context), ShakeGlass (live shake SVG)
  sections/           Hero, WhyChooseUs, Categories, DishMarquee, Flavors,
                      PopularDishes, Combos, ShakeLab, Outlets, Stats,
                      Franchise, ProfitCalculator, Faq, Gallery, Offers
```

## Before going live

- Menu and combo prices in `src/data/menu.js` are samples. Replace with Avadh's menu card.
- Opening hours in `src/data/site.js` are a placeholder.
- The franchise form and offers signup show a success state only. Connect them where marked `TODO`.
- Replace Instagram-sized logo and outlet photos with high-resolution originals.
