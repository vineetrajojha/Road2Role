import os

os.makedirs("app/roadmap/[role]", exist_ok=True)
os.makedirs("components/roadmap", exist_ok=True)

files = {}

files["app/roadmap/page.tsx"] = """import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { roadmaps } from '@/lib/roadmaps'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function RoadmapSelectorPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-void)] pt-24">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="font-display font-bold text-4xl md:text-5xl mb-4">What do you want to become?</h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">Select a specialized career path to view the complete curriculum, projects to build, and targeted internship strategies.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roadmaps.map(role => (
            <Link href={`/roadmap/${role.id}`} key={role.id} className="glass-card p-8 group flex flex-col items-start hover:-translate-y-1 transition-all duration-300">
              <div 
                className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-xl font-bold bg-[var(--bg-surface)] shadow-lg shadow-black/20"
                style={{ color: role.color }}
              >
                {role.title[0]}
              </div>
              <h2 className="font-display text-2xl font-bold mb-3 group-hover:text-[var(--blue-vivid)] transition-colors">{role.title}</h2>
              <p className="text-[var(--text-secondary)] mb-6 text-sm flex-1">{role.tagline}</p>
              
              <div className="space-y-3 w-full mb-8 pt-6 border-t border-[var(--border-subtle)]">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-muted)]">Timeline</span>
                  <span className="font-mono text-[var(--text-primary)]">{role.totalWeeks} Weeks</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-muted)]">Difficulty</span>
                  <span className="text-[var(--text-primary)] capitalize">{role.difficulty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-muted)]">Avg Salary</span>
                  <span className="text-emerald-400 font-medium">{role.averageSalary}</span>
                </div>
              </div>
              
              <div className="w-full flex items-center justify-between text-[var(--blue-vivid)] font-medium">
                <span>View Full Roadmap</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
"""

files["app/roadmap/[role]/page.tsx"] = """import { notFound } from 'next/navigation'
import { getRoadmapById, roadmaps } from '@/lib/roadmaps'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { RoadmapTimeline } from '@/components/roadmap/RoadmapTimeline'
import { AiMentor } from '@/components/roadmap/AiMentor'

export async function generateStaticParams() {
  return roadmaps.map((r) => ({ role: r.id }))
}

export default function RoadmapPage({ params }: { params: { role: string } }) {
  const roadmap = getRoadmapById(params.role)
  if (!roadmap) return notFound()

  return (
    <main className="min-h-screen bg-[var(--bg-void)] pt-24 relative">
      <Navbar />
      
      {/* Header */}
      <div className="py-12 border-b border-[var(--border-subtle)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${roadmap.color}, transparent 70%)` }} />
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-4 text-[var(--text-primary)]">{roadmap.title}</h1>
          <p className="text-xl text-[var(--text-secondary)] mb-8">{roadmap.tagline}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-mono">
            <span className="px-4 py-2 rounded-full border border-[var(--border-subtle)] glass-card">{roadmap.totalWeeks} Weeks</span>
            <span className="px-4 py-2 rounded-full border border-[var(--border-subtle)] glass-card capitalize">{roadmap.difficulty}</span>
            <span className="px-4 py-2 rounded-full border border-[var(--border-subtle)] glass-card text-emerald-400">{roadmap.averageSalary}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Timeline Context */}
        <div className="lg:col-span-8">
          <RoadmapTimeline roadmap={roadmap} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-28">
            <AiMentor roleTitle={roadmap.title} completedPhases={0} totalPhases={roadmap.phases.length} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
"""

files["components/roadmap/RoadmapTimeline.tsx"] = """'use client'
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
"""

files["components/roadmap/PhaseCard.tsx"] = """'use client'
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
"""

files["components/roadmap/ProjectCard.tsx"] = """import type { Project } from '@/lib/types'
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
"""

for filepath, content in files.items():
    with open(filepath, "w") as f:
        f.write(content)
    print(f"Scaffolded {filepath}")
