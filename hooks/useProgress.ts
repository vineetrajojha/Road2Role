// hooks/useProgress.ts
import { useState, useEffect } from 'react'
import type { RoleId } from '@/lib/types'

interface ProgressState {
  completedTopics: Record<string, boolean>    // key: `${phaseId}-${topicIndex}`
  completedProjects: Record<string, boolean>  // key: `${phaseId}-${projectTitle}`
  completedPhases: Record<string, boolean>    // key: phaseId
}

export function useProgress(roleId: RoleId) {
  const storageKey = `careerpath-progress-${roleId}`

  const [progress, setProgress] = useState<ProgressState>(() => {
    if (typeof window === 'undefined') return { completedTopics: {}, completedProjects: {}, completedPhases: {} }
    const saved = localStorage.getItem(storageKey)
    return saved ? JSON.parse(saved) : { completedTopics: {}, completedProjects: {}, completedPhases: {} }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress))
  }, [progress, storageKey])

  const toggleTopic = (phaseId: string, topicIndex: number) => {
    const key = `${phaseId}-${topicIndex}`
    setProgress(prev => ({
      ...prev,
      completedTopics: { ...prev.completedTopics, [key]: !prev.completedTopics[key] }
    }))
  }

  const toggleProject = (phaseId: string, projectTitle: string) => {
    const key = `${phaseId}-${projectTitle}`
    setProgress(prev => ({
      ...prev,
      completedProjects: { ...prev.completedProjects, [key]: !prev.completedProjects[key] }
    }))
  }

  const getPhaseProgress = (phaseId: string, totalTopics: number): number => {
    const completed = Array.from({ length: totalTopics }, (_, i) => 
      progress.completedTopics[`${phaseId}-${i}`]
    ).filter(Boolean).length
    return totalTopics > 0 ? Math.round((completed / totalTopics) * 100) : 0
  }

  return { progress, toggleTopic, toggleProject, getPhaseProgress }
}
