import { webDevelopmentRoadmap } from './web-development'
import { aiMlRoadmap } from './ai-ml'
import { uiUxRoadmap } from './ui-ux'
import { dataAnalyticsRoadmap } from './data-analytics'
import { appDevelopmentRoadmap } from './app-development'

export const roadmaps = [
  webDevelopmentRoadmap,
  aiMlRoadmap,
  uiUxRoadmap,
  dataAnalyticsRoadmap,
  appDevelopmentRoadmap
]

export const getRoadmapById = (id: string) => roadmaps.find(r => r.id === id)
