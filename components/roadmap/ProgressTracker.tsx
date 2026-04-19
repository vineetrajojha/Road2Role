'use client'
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
