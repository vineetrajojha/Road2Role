import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/home/HeroSection'
import { StatsSection } from '@/components/home/StatsSection'
import { RolesGrid } from '@/components/home/RolesGrid'
import { CtaSection } from '@/components/home/CtaSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <RolesGrid />
      <CtaSection />
      <Footer />
    </main>
  )
}
