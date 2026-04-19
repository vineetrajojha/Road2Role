// components/roadmap/AiMentor.tsx
'use client'
import { useState } from 'react'
import { Brain, Send, Loader2 } from 'lucide-react'

interface AiMentorProps {
  roleTitle: string
  completedPhases: number
  totalPhases: number
}

export function AiMentor({ roleTitle, completedPhases, totalPhases }: AiMentorProps) {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const askMentor = async () => {
    if (!question.trim()) return
    setLoading(true)
    setResponse('')

    try {
      const res = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          context: { roleTitle, completedPhases, totalPhases }
        })
      })
      const data = await res.json()
      setResponse(data.answer)
    } catch {
      setResponse('Sorry, the mentor is unavailable right now. Try again shortly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-6 rounded-2xl border border-[var(--border-default)]">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[var(--blue-subtle)] flex items-center justify-center glow-blue">
          <Brain className="w-5 h-5 text-[var(--blue-vivid)]" />
        </div>
        <div>
          <p className="font-semibold text-[var(--text-primary)]">AI Career Mentor</p>
          <p className="text-xs text-[var(--text-muted)]">Powered by Claude</p>
        </div>
      </div>

      {response && (
        <div className="mb-4 p-4 bg-[var(--bg-elevated)] rounded-xl border border-[var(--border-subtle)]">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{response}</p>
        </div>
      )}

      <div className="flex gap-2">
        <input
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && askMentor()}
          placeholder="Ask your mentor anything..."
          className="flex-1 bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--blue-vivid)] transition-colors"
        />
        <button
          onClick={askMentor}
          disabled={loading}
          className="px-4 py-3 bg-[var(--blue-vivid)] rounded-xl hover:bg-[var(--blue-glow)] transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}
