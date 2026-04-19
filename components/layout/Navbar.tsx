import Link from 'next/link'
import { GlowButton } from '@/components/ui/GlowButton'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-transparent backdrop-blur-md border-b border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-display text-white font-bold">C</div>
          <span className="font-display font-bold text-xl text-white">CareerPath</span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm text-[var(--text-secondary)]">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/roadmap" className="hover:text-white transition">Roadmaps</Link>
          <Link href="/resources" className="hover:text-white transition">Resources</Link>
        </div>
        <GlowButton size="sm">Get Started</GlowButton>
      </div>
    </nav>
  )
}
