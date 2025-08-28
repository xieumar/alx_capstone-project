import React from 'react'
import Hero from '../components/Hero'
import PopularDestinations from '../components/PopularDestinations' 
import TravelGuides from '../components/TravelGuides'
import Testimonials from '../components/Testimonials'

function Home() {
  return (
    <>
        <Hero />
        <PopularDestinations />
        <TravelGuides />
        <Testimonials />
    </>
  )
}

export default Home