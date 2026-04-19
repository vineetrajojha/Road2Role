'use client'
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
