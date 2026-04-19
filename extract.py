import os
import re

with open('AGENT.md', 'r') as f:
    lines = f.readlines()

def extract_between(start_str, end_str=".ts`)"):
    pass # Wait, let's use a simpler state machine

# Ensure dirs
os.makedirs('lib/roadmaps', exist_ok=True)
os.makedirs('lib', exist_ok=True)
os.makedirs('hooks', exist_ok=True)
os.makedirs('components/ui', exist_ok=True)
os.makedirs('components/roadmap', exist_ok=True)
os.makedirs('app/api/mentor', exist_ok=True)

files_to_extract = [
    ('lib/roadmaps/web-development.ts', '### 4.1 Web Development (`lib/roadmaps/web-development.ts`)'),
    ('lib/roadmaps/ai-ml.ts', '### 4.2 AI / ML Roadmap (`lib/roadmaps/ai-ml.ts`)'),
    ('lib/roadmaps/ui-ux.ts', '### 4.3 UI/UX Design Roadmap (`lib/roadmaps/ui-ux.ts`)'),
    ('lib/roadmaps/data-analytics.ts', '### 4.4 Data Analytics (`lib/roadmaps/data-analytics.ts`)'),
    ('lib/roadmaps/app-development.ts', '### 4.5 App Development (`lib/roadmaps/app-development.ts`)'),
    ('lib/gsap-utils.ts', '### 6.1 Core Animations Utility (`lib/gsap-utils.ts`)'),
    ('components/ui/GridBackground.tsx', '### 7.1 GridBackground Component'),
    ('components/ui/GlowButton.tsx', '### 7.2 GlowButton Component'),
    ('hooks/useProgress.ts', '### 7.3 Progress Tracker Hook'),
    ('components/roadmap/AiMentor.tsx', '### 7.4 AI Mentor Component'),
    ('app/api/mentor/route.ts', '### 7.5 API Route for AI Mentor (`app/api/mentor/route.ts`)')
]

for filepath, header in files_to_extract:
    in_section = False
    in_code = False
    content = []
    
    for line in lines:
        if header in line:
            in_section = True
            continue
        
        if in_section:
            if line.startswith('```tsx') or line.startswith('```typescript') or line.startswith('```ts'):
                if not in_code:
                    in_code = True
                    continue
            elif line.startswith('```'):
                if in_code:
                    break
                    
            if in_code:
                content.append(line)
                
    if content:
        with open(filepath, 'w') as f:
            f.writelines(content)
        print(f"Extracted {filepath}")

# Create index.ts
with open('lib/roadmaps/index.ts', 'w') as f:
    f.write("""import { webDevelopmentRoadmap } from './web-development'
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
""")
