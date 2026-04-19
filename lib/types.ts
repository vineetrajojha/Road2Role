export type RoleId =
  | 'web-development'
  | 'ai-ml'
  | 'ui-ux'
  | 'data-analytics'
  | 'app-development'

export interface Resource {
  title: string
  url: string
  type: 'video' | 'article' | 'course' | 'tool' | 'book'
  free: boolean
}

export interface Project {
  title: string
  description: string
  skills: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  githubTemplate?: string
}

export interface Phase {
  id: string
  phase: number
  title: string
  subtitle: string
  duration: string          // e.g. "Week 1–2"
  icon: string              // lucide icon name
  color: string             // tailwind color token
  goal: string              // the "I can..." statement
  topics: string[]
  resources: Resource[]
  projects: Project[]
  milestone: string         // what proves phase is done
}

export interface InternshipTip {
  step: number
  title: string
  description: string
  platforms?: { name: string; url: string }[]
  template?: string
}

export interface Roadmap {
  id: RoleId
  title: string
  tagline: string
  icon: string
  color: string             // primary color for this role
  accentGradient: string    // tailwind gradient classes
  totalWeeks: number
  difficulty: 'beginner-friendly' | 'intermediate' | 'challenging'
  averageSalary: string
  jobOpenings: string
  phases: Phase[]
  internshipGuide: InternshipTip[]
  resumeTips: string[]
  linkedInTips: string[]
}
