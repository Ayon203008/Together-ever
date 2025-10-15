import Faq from '@/components/FreqentlyAskedQuestion/faq'
import Hero from '@/components/Hero/Hero'
import PremiumMembership from '@/components/premiumMembership/premiumMembership'
import Stats from '@/components/StatsSection/stats'
import OurStory from '@/components/Story/OurStory'
import Testimonial from '@/components/Testimonial/page'
import TestimonialSection from '@/components/Testimonial/page'
import React from 'react'

export default function page() {
  return (
    <div>

      <Hero></Hero>
    <PremiumMembership></PremiumMembership>
    <OurStory></OurStory>

      <Testimonial></Testimonial>
      <Stats></Stats>
      <Faq></Faq>

    </div>
  )
}
