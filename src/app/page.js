import AboutSection from '@/components/About/About'
import Faq from '@/components/FreqentlyAskedQuestion/faq'
import Hero from '@/components/Hero/Hero'
import PremiumMembers from '@/components/prepmiumMember/PremiumMembers'
import Stats from '@/components/StatsSection/stats'
import OurStory from '@/components/Story/OurStory'
import Testimonial from '@/components/Testimonial/page'
import TestimonialSection from '@/components/Testimonial/page'
import React from 'react'

export default function page() {
  return (
    <div>

      <Hero></Hero>
      <AboutSection></AboutSection>
      <PremiumMembers></PremiumMembers>
      <OurStory></OurStory>
      <Testimonial></Testimonial>
      <Stats></Stats>
      <Faq></Faq>

    </div>
  )
}
