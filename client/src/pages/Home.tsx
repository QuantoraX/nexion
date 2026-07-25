import { HeroSection } from "../sections/hero-sections"
import { Stats } from "../sections/stats"
import { Gallery } from "../sections/gallery"
import { WhyChooseUs } from "../sections/why-choose-us"
import { Testimonials } from "../sections/testimonials"
import { CallToAction } from "../sections/call-to-action"
import { TeamSection } from "../sections/team"

export default function Home() {
  return (
    <>
      <HeroSection />
      <Stats />
      <Gallery />
      <WhyChooseUs />
      <Testimonials />  
      <CallToAction />
      <TeamSection />
    </>
  )
}
