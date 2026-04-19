import { notFound } from 'next/navigation'
import { getRoadmapById, roadmaps } from '@/lib/roadmaps'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { RoadmapTimeline } from '@/components/roadmap/RoadmapTimeline'
import { AiMentor } from '@/components/roadmap/AiMentor'
import { ProgressTracker } from '@/components/roadmap/ProgressTracker'
import { InternshipGuide } from '@/components/roadmap/InternshipGuide'

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

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        {/* Main Timeline Context */}
        <div className="lg:col-span-8 space-y-12">
          <RoadmapTimeline roadmap={roadmap} />
          {roadmap.internshipGuide && <InternshipGuide guide={roadmap.internshipGuide} />}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8 relative">
          <div className="sticky top-28 space-y-6">
            <ProgressTracker roadmap={roadmap} />
            <AiMentor roleTitle={roadmap.title} completedPhases={0} totalPhases={roadmap.phases.length} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

