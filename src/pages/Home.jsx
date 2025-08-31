import React from 'react'
import Hero from '../components/Hero'
import PopularDestinations from '../components/PopularDestinations' 
import TravelGuides from '../components/TravelGuides'
import Testimonials from '../components/Testimonials'

function Home() {
  return (
    <div className=" w-[100vw]">
       <Hero />
        <PopularDestinations />
        <TravelGuides />
        <Testimonials />
    </div>
  )
}

export default Home