'use client'
import { useEffect } from 'react'
import type { Roadmap } from '@/lib/types'
import { PhaseCard } from './PhaseCard'
import { growLine } from '@/lib/gsap-utils'

export function RoadmapTimeline({ roadmap }: { roadmap: Roadmap }) {
  useEffect(() => {
    growLine('.timeline-line')
  }, [])

  return (
    <div className="relative">
      <div className="absolute left-6 top-8 bottom-8 w-px bg-[var(--border-subtle)]">
        <div className="timeline-line absolute top-0 left-0 w-full bg-[var(--blue-vivid)] transform origin-top scale-y-0 h-full shadow-[0_0_10px_var(--blue-vivid)]" />
      </div>
      
      <div className="space-y-16 py-8">
        {roadmap.phases.map((phase) => (
          <PhaseCard key={phase.id} phase={phase} />
        ))}
      </div>
    </div>
  )
}
