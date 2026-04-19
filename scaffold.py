import os

os.makedirs("components/layout", exist_ok=True)
os.makedirs("components/home", exist_ok=True)

files = {
    "components/layout/Navbar.tsx": """import Link from 'next/link'
import { GlowButton } from '@/components/ui/GlowButton'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-transparent backdrop-blur-md border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-display text-white font-bold">C</div>
          <span className="font-display font-bold text-xl text-white">CareerPath</span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm text-[var(--text-secondary)]">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/roadmap" className="hover:text-white transition">Roadmaps</Link>
          <Link href="/resources" className="hover:text-white transition">Resources</Link>
        </div>
        <GlowButton size="sm">Get Started</GlowButton>
      </div>
    </nav>
  )
}
""",

    "components/layout/Footer.tsx": """export function Footer() {
  return (
    <footer className="py-12 border-t border-[var(--border-subtle)] text-center text-[var(--text-muted)] text-sm">
      <p>© {new Date().getFullYear()} CareerPath. Built for students who stop scrolling and start building.</p>
    </footer>
  )
}
""",

    "components/home/HeroSection.tsx": """'use client'
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
""",

    "components/home/StatsSection.tsx": """'use client'
import { useEffect, useRef } from 'react'
import { counterAnimation } from '@/lib/gsap-utils'

const stats = [
  { label: 'Career Paths', value: 5 },
  { label: 'Learning Resources', value: 50 },
  { label: 'Weeks Avg to Internship', value: 12 },
  { label: 'Students Guided', value: 10000 },
]

export function StatsSection() {
  const refs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    refs.current.forEach((el, index) => {
      if (el) counterAnimation(el, stats[index].value, 2)
    })
  }, [])

  return (
    <section className="py-20 border-y border-[var(--border-subtle)] bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[var(--border-subtle)]/50">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center justify-center">
            <span 
              ref={el => { refs.current[i] = el }}
              className="text-4xl md:text-5xl font-display font-bold text-[var(--blue-vivid)] mb-2"
            >
              0+
            </span>
            <span className="text-[var(--text-secondary)] text-sm uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
""",

    "components/home/RolesGrid.tsx": """'use client'
import { useEffect } from 'react'
import { fadeUpOnScroll } from '@/lib/gsap-utils'
import { roadmaps } from '@/lib/roadmaps'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function RolesGrid() {
  useEffect(() => {
    fadeUpOnScroll('.role-card')
  }, [])

  return (
    <section className="py-32 max-w-7xl mx-auto px-6">
      <h2 className="font-display font-bold text-center mb-16 text-[var(--text-primary)]">Choose Your Path</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roadmaps.map(role => (
          <div key={role.id} className="role-card opacity-0 translate-y-8">
            <Link href={`/roadmap/${role.id}`} className="block h-full glass-card p-6 flex flex-col group relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `linear-gradient(135deg, ${role.color}, transparent)` }}
              />
              <div className="relative z-10 flex-1">
                <div 
                  className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${role.color}20`, color: role.color }}
                >
                  <span className="font-bold text-xl">{role.title[0]}</span>
                </div>
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-[var(--blue-vivid)] transition-colors">{role.title}</h3>
                <p className="text-[var(--text-secondary)] mb-6 text-sm flex-1">{role.tagline}</p>
              </div>
              <div className="relative z-10 flex items-center justify-between text-sm pt-4 border-t border-[var(--border-subtle)]">
                <span className="text-[var(--text-muted)] font-mono">{role.totalWeeks} Weeks</span>
                <span className="text-[var(--blue-vivid)] flex items-center gap-1 font-medium group-hover:translate-x-1 transition-transform">
                  Start <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
""",

    "components/home/CtaSection.tsx": """import { GlowButton } from '@/components/ui/GlowButton'
import Link from 'next/link'

export function CtaSection() {
  return (
    <section className="py-32 text-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[var(--blue-vivid)]/5 blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <h2 className="font-display font-bold mb-6 text-[var(--text-primary)]">Ready to Start Your Journey?</h2>
        <p className="text-[var(--text-secondary)] mb-10 text-lg">Pick a roadmap, build projects, and get hired.</p>
        <Link href="/roadmap"><GlowButton size="lg">Pick Your Roadmap →</GlowButton></Link>
      </div>
    </section>
  )
}
""",
    
    "app/page.tsx": """import { Navbar } from '@/components/layout/Navbar'
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
"""
}

for filepath, content in files.items():
    with open(filepath, "w") as f:
        f.write(content)
    print(f"Scaffolded {filepath}")
