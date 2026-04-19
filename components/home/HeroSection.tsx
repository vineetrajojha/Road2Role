'use client'
import { useEffect, useRef } from 'react'
import { GlowButton } from '@/components/ui/GlowButton'
import { GridBackground } from '@/components/ui/GridBackground'
import { heroTextReveal } from '@/lib/gsap-utils'
import Link from 'next/link'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      heroTextReveal('.hero-container')
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden" ref={containerRef}>
      <GridBackground />
      <div className="hero-container relative z-10 text-center max-w-4xl px-4 flex flex-col items-center">
        <h1 className="font-display font-bold text-[var(--text-primary)] mb-6 flex flex-wrap justify-center gap-x-4">
          {"Your Personalized Career Roadmap".split(" ").map((word, i) => (
            <span key={i} className="hero-word inline-block opacity-0 translate-y-8">{word}</span>
          ))}
        </h1>
        <p className="text-xl text-[var(--text-secondary)] mb-10 max-w-2xl">
          Stop scrolling. Start building. Go from zero to internship-ready.
        </p>
        <div className="flex gap-4">
          <Link href="/roadmap"><GlowButton size="lg">Explore Roadmaps</GlowButton></Link>
          <GlowButton variant="ghost" size="lg">How It Works</GlowButton>
        </div>
      </div>
    </section>
  )
}
