import { lazy, Suspense, useState } from 'react'
import { domMax, LazyMotion } from 'motion/react'
import { useLenis } from './hooks/useLenis'
import { EnquiryProvider } from './components/common/EnquiryModal'
import Navbar from './components/layout/Navbar'
import Hero from './sections/Hero'

// Everything below the hero is split out so the first screen ships less JavaScript.
const WhyChooseUs = lazy(() => import('./sections/WhyChooseUs'))
const Categories = lazy(() => import('./sections/Categories'))
const DishMarquee = lazy(() => import('./sections/DishMarquee'))
const Flavors = lazy(() => import('./sections/Flavors'))
const PopularDishes = lazy(() => import('./sections/PopularDishes'))
const Combos = lazy(() => import('./sections/Combos'))
const ShakeLab = lazy(() => import('./sections/ShakeLab'))
const Outlets = lazy(() => import('./sections/Outlets'))
const Stats = lazy(() => import('./sections/Stats'))
const Franchise = lazy(() => import('./sections/Franchise'))
const ProfitCalculator = lazy(() => import('./sections/ProfitCalculator'))
const Faq = lazy(() => import('./sections/Faq'))
const Gallery = lazy(() => import('./sections/Gallery'))
const Offers = lazy(() => import('./sections/Offers'))
const Footer = lazy(() => import('./components/layout/Footer'))

export default function App() {
  useLenis()
  // Shared by the category strip and the popular dishes card.
  const [category, setCategory] = useState('shakes')

  return (
    <LazyMotion features={domMax} strict>
      <EnquiryProvider>
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<div className="min-h-[100svh]" />}>
            <WhyChooseUs />
            <Categories active={category} onChange={setCategory} />
            <DishMarquee />
            <Flavors />
            <PopularDishes active={category} onChange={setCategory} />
            <Combos />
            <ShakeLab />
            <Outlets />
            <Stats />
            <Franchise />
            <ProfitCalculator />
            <Faq />
            <Gallery />
            <Offers />
            <Footer />
          </Suspense>
        </main>
      </EnquiryProvider>
    </LazyMotion>
  )
}
