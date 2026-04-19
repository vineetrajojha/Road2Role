'use client'
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
