import { Navbar } from '@/components/layout/Navbar'
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
