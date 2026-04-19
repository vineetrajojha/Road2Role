import type { Project } from '@/lib/types'
import { Code, Clock, Star } from 'lucide-react'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="p-5 border border-[var(--border-subtle)] bg-[var(--bg-surface)] rounded-xl hover:border-[var(--blue-vivid)]/50 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h5 className="font-bold text-[var(--text-primary)] text-lg">{project.title}</h5>
        <span className={`text-xs px-2 py-1 rounded-full border ${project.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : project.difficulty === 'intermediate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
          {project.difficulty}
        </span>
      </div>
      <p className="text-[var(--text-muted)] text-sm mb-4">{project.description}</p>
      
      <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
        <div className="flex gap-2">
          {project.skills.map(skill => (
            <span key={skill} className="text-xs bg-[var(--bg-elevated)] px-2 py-1 rounded font-mono text-[var(--text-secondary)] border border-[var(--border-default)]">{skill}</span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-[var(--text-muted)] text-xs font-mono">
          <Clock className="w-3 h-3" /> {project.estimatedTime}
        </div>
      </div>
    </div>
  )
}
