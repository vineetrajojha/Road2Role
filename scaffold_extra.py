import os

files = {}

files["components/roadmap/ProgressTracker.tsx"] = """'use client'
import { useProgress } from '@/hooks/useProgress'
import type { Roadmap } from '@/lib/types'
import { useEffect, useState } from 'react'

export function ProgressTracker({ roadmap }: { roadmap: Roadmap }) {
  const { progress, getPhaseProgress } = useProgress(roadmap.id)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="glass-card p-6 min-h-[300px] animate-pulse" />

  let totalTopicsCount = 0
  let completedTopicsCount = 0

  const phaseStats = roadmap.phases.map(phase => {
    const total = phase.topics.length
    let completedInPhase = 0
    phase.topics.forEach((_, i) => {
      totalTopicsCount++
      if (progress.completedTopics[`${phase.id}-${i}`]) {
        completedInPhase++
        completedTopicsCount++
      }
    })
    return { title: phase.title, progress: total > 0 ? (completedInPhase / total) * 100 : 0 }
  })

  const overallProgress = totalTopicsCount === 0 ? 0 : Math.round((completedTopicsCount / totalTopicsCount) * 100)

  return (
    <div className="glass-card p-6 rounded-2xl">
      <h3 className="font-display font-bold text-xl mb-6">Your Progress</h3>
      
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2 font-mono">
          <span className="text-[var(--text-secondary)]">Overall</span>
          <span className="text-[var(--blue-vivid)] font-bold">{overallProgress}%</span>
        </div>
        <div className="h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
          <div 
            className="h-full bg-[var(--blue-vivid)] transition-all duration-500 shadow-[0_0_10px_var(--blue-vivid)]"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-[var(--text-muted)] text-right">
          {completedTopicsCount} of {totalTopicsCount} topics
        </div>
      </div>

      <div className="space-y-4">
        {phaseStats.map((stat, i) => (
          <div key={i} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-[var(--text-secondary)] truncate pr-4">{stat.title}</span>
              <span className="text-[var(--text-muted)] font-mono">{Math.round(stat.progress)}%</span>
            </div>
            <div className="h-1 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[var(--text-secondary)] transition-all duration-500"
                style={{ width: `${stat.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
"""

files["components/roadmap/InternshipGuide.tsx"] = """import type { InternshipTip } from '@/lib/types'
import { Briefcase, Copy, ExternalLink, MessageSquare } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton'

export function InternshipGuide({ guide }: { guide: InternshipTip[] }) {
  if (!guide || guide.length === 0) return null
  
  return (
    <div className="mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
          <Briefcase className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h2 className="font-display font-bold text-3xl">Internship Playbook</h2>
          <p className="text-[var(--text-secondary)]">How to transition from learning to earning</p>
        </div>
      </div>

      <div className="space-y-6">
        {guide.map((tip) => (
          <div key={tip.step} className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-8xl font-display font-bold text-emerald-500/5 select-none pointer-events-none translate-x-4 -translate-y-4">
              {tip.step}
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono shrink-0">{tip.step}</span>
              {tip.title}
            </h3>
            
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{tip.description}</p>
            
            {tip.platforms && tip.platforms.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {tip.platforms.map((platform, i) => (
                  <a 
                    key={i} 
                    href={platform.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-emerald-500/40 hover:text-emerald-400 transition-colors text-sm text-[var(--text-muted)] group"
                  >
                    {platform.name}
                    <ExternalLink className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            )}

            {tip.template && (
              <div className="mt-6 p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-void)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
                    <MessageSquare className="w-4 h-4" /> Cold Outreach Message
                  </div>
                  <button className="text-xs text-[var(--text-muted)] flex items-center gap-1 hover:text-[var(--blue-vivid)] transition-colors">
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
                <p className="text-sm text-[var(--text-muted)] font-mono whitespace-pre-wrap">{tip.template}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
"""

for filepath, content in files.items():
    with open(filepath, "w") as f:
        f.write(content)
    print(f"Scaffolded {filepath}")
