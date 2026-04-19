'use client'
import { useEffect } from 'react'
import { fadeUpOnScroll } from '@/lib/gsap-utils'
import type { Phase } from '@/lib/types'
import { Check, BookOpen, Video, PenTool, Layout, Folder } from 'lucide-react'
import { ProjectCard } from './ProjectCard'

export function PhaseCard({ phase }: { phase: Phase }) {
  useEffect(() => {
    fadeUpOnScroll(`#${phase.id}`)
  }, [phase.id])

  return (
    <div id={phase.id} className="relative pl-16">
      {/* Node */}
      <div className="absolute left-6 w-4 h-4 -ml-2 rounded-full border-2 border-[var(--bg-void)] bg-[var(--blue-vivid)] shadow-[0_0_10px_var(--blue-vivid)] z-10 top-6" />
      
      <div className="glass-card p-6 md:p-8 rounded-2xl">
        <div className="inline-block px-3 py-1 bg-[var(--blue-vivid)]/10 text-[var(--blue-vivid)] text-xs font-mono rounded-full mb-4">
          Phase {phase.phase} · {phase.duration}
        </div>
        
        <h3 className="font-display font-bold text-2xl md:text-3xl mb-2">{phase.title}</h3>
        <p className="text-[var(--text-secondary)] mb-6 text-lg">{phase.subtitle}</p>
        
        <div className="p-4 bg-[var(--blue-subtle)]/30 border border-[var(--blue-vivid)]/20 rounded-xl mb-8 flex gap-4">
          <Check className="w-6 h-6 text-[var(--success)] shrink-0" />
          <p className="text-[var(--text-primary)] font-medium">Goal: {phase.goal}</p>
        </div>

        {/* Topics */}
        <div className="mb-8">
          <h4 className="font-bold text-lg mb-4 text-[var(--text-secondary)] flex items-center gap-2"><BookOpen className="w-5 h-5"/> Key Topics</h4>
          <ul className="space-y-3">
            {phase.topics.map((topic, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <div className="w-5 h-5 rounded border border-[var(--border-default)] mt-0.5 group-hover:border-[var(--blue-vivid)] transition-colors" />
                <span className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">{topic}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Projects */}
        {phase.projects.length > 0 && (
          <div className="mb-8">
             <h4 className="font-bold text-lg mb-4 text-[var(--text-secondary)] flex items-center gap-2"><Folder className="w-5 h-5"/> Projects</h4>
             <div className="grid grid-cols-1 gap-4">
               {phase.projects.map((proj, i) => (
                 <ProjectCard key={i} project={proj} />
               ))}
             </div>
          </div>
        )}
      </div>
    </div>
  )
}
