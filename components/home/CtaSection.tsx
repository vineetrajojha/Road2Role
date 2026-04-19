import { GlowButton } from '@/components/ui/GlowButton'
import Link from 'next/link'

export function CtaSection() {
  return (
    <section className="py-32 text-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-[var(--blue-vivid)]/5 blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <h2 className="font-display font-bold mb-6 text-[var(--text-primary)]">Ready to Start Your Journey?</h2>
        <p className="text-[var(--text-secondary)] mb-10 text-lg">Pick a roadmap, build projects, and get hired.</p>
        <Link href="/roadmap"><GlowButton size="lg">Pick Your Roadmap →</GlowButton></Link>
      </div>
    </section>
  )
}
