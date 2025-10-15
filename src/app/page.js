import Faq from '@/components/FreqentlyAskedQuestion/faq'
import Hero from '@/components/Hero/Hero'
import Stats from '@/components/StatsSection/stats'
import TestimonialSection from '@/components/Testimonial/page'
import React from 'react'

export default function page() {
  return (
    <div>

      <Hero></Hero>
      <TestimonialSection></TestimonialSection>
      <Stats></Stats>
      <Faq></Faq>

    </div>
  )
}
