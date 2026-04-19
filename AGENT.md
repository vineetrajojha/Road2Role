# 🗺️ CareerPath — LLM Agent Build Guide
> **Stack**: Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · GSAP · Framer Motion
> **Theme**: Dark mode · Midnight black + Electric blue · Awwwards-calibre design

---

## 0. AGENT INSTRUCTIONS (READ FIRST)

You are building a **production-grade, visually exceptional career roadmap platform** called **CareerPath**. This is not a plain CRUD app — it must feel like an Awwwards-nominated website with a premium dark aesthetic, fluid GSAP scroll animations, and genuine interactive utility.

Follow these rules strictly:
1. **Never use generic aesthetics** — no purple gradients on white, no Inter/Roboto/Arial fonts, no cookie-cutter shadcn defaults.
2. **Every section must have a scroll-triggered GSAP animation** — staggered reveals, parallax, counter animations, etc.
3. **Mobile-first responsive** — every component must work flawlessly on 320px → 2560px.
4. **Ship real data** — all roadmaps, phases, resources, and job links must be populated with real, useful content from the data layer defined below.
5. **TypeScript everywhere** — no `any` types.
6. **File structure matters** — follow the architecture defined in Section 2.

---

## 1. DESIGN SYSTEM

### 1.1 Color Palette (CSS Variables in `globals.css`)

```css
:root {
  /* Backgrounds */
  --bg-void:       #020408;   /* near-black page bg */
  --bg-surface:    #080d14;   /* card / section bg */
  --bg-elevated:   #0d1520;   /* hover state / elevated cards */
  --bg-overlay:    #111c2b;   /* modals / drawers */

  /* Brand Blues */
  --blue-vivid:    #0ea5e9;   /* primary CTA, active states */
  --blue-glow:     #38bdf8;   /* glow effects */
  --blue-dim:      #0369a1;   /* muted accents */
  --blue-subtle:   #0c1f33;   /* tinted backgrounds */

  /* Text */
  --text-primary:  #f0f6ff;
  --text-secondary:#94a3b8;
  --text-muted:    #475569;
  --text-accent:   #0ea5e9;

  /* Borders */
  --border-default:#1e2d3d;
  --border-active: #0ea5e9;
  --border-subtle: #0f1e2e;

  /* Status Colors */
  --success:       #22d3ee;
  --warning:       #f59e0b;
  --danger:        #ef4444;

  /* Gradients */
  --grad-hero:     linear-gradient(135deg, #020408 0%, #0c1f33 50%, #020408 100%);
  --grad-card:     linear-gradient(145deg, #080d14, #0d1520);
  --grad-blue:     linear-gradient(90deg, #0ea5e9, #38bdf8);
  --grad-text:     linear-gradient(90deg, #f0f6ff 0%, #38bdf8 50%, #0ea5e9 100%);
}
```

### 1.2 Typography

```css
/* In layout.tsx font imports */
import { Space_Grotesk, JetBrains_Mono, Syne } from 'next/font/google'

/* 
  Display / Hero headings  → Syne (bold, geometric, editorial)
  Body / UI text           → Space_Grotesk (clean, slightly techy)
  Code / labels / badges   → JetBrains_Mono (technical credibility)
*/

/* Scale */
--font-display: 'Syne', sans-serif;
--font-body:    'Space Grotesk', sans-serif;
--font-mono:    'JetBrains Mono', monospace;

/* Sizes */
h1: clamp(3rem, 8vw, 6rem)      /* Hero headline */
h2: clamp(2rem, 4vw, 3.5rem)    /* Section headings */
h3: clamp(1.25rem, 2vw, 1.75rem)
body: 1rem / 1.6
small: 0.875rem
```

### 1.3 Motion Tokens

```ts
export const EASING = {
  smooth:  [0.25, 0.46, 0.45, 0.94],
  snappy:  [0.68, -0.6, 0.32, 1.6],
  elastic: [0.175, 0.885, 0.32, 1.275],
}

export const DURATION = {
  fast:   0.25,
  medium: 0.5,
  slow:   0.85,
  xslow:  1.2,
}

export const STAGGER = 0.08  // between list items
```

### 1.4 Glassmorphism Card Style

```css
.glass-card {
  background: rgba(8, 13, 20, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--border-default);
  border-radius: 1rem;
  box-shadow:
    0 0 0 1px rgba(14, 165, 233, 0.05),
    0 24px 64px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.glass-card:hover {
  border-color: rgba(14, 165, 233, 0.3);
  box-shadow:
    0 0 0 1px rgba(14, 165, 233, 0.15),
    0 24px 64px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(14, 165, 233, 0.08);
}
```

### 1.5 Blue Glow Effect (reusable)

```css
.glow-blue {
  box-shadow: 0 0 20px rgba(14, 165, 233, 0.4),
              0 0 60px rgba(14, 165, 233, 0.15),
              0 0 120px rgba(14, 165, 233, 0.05);
}

.text-glow {
  text-shadow: 0 0 30px rgba(56, 189, 248, 0.5);
}
```

---

## 2. PROJECT ARCHITECTURE

```
careerpath/
├── app/
│   ├── layout.tsx              ← Root layout, fonts, providers
│   ├── page.tsx                ← Landing page (/)
│   ├── roadmap/
│   │   ├── page.tsx            ← Role selector page (/roadmap)
│   │   └── [role]/
│   │       └── page.tsx        ← Individual roadmap (/roadmap/web-dev)
│   ├── resources/
│   │   └── page.tsx            ← Resources hub
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── RolesGrid.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CtaSection.tsx
│   ├── roadmap/
│   │   ├── RoleSelector.tsx
│   │   ├── RoadmapTimeline.tsx
│   │   ├── PhaseCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProgressTracker.tsx
│   │   ├── InternshipFeed.tsx
│   │   └── AiMentor.tsx
│   └── ui/
│       ├── GlowButton.tsx
│       ├── AnimatedCounter.tsx
│       ├── ParticleField.tsx
│       ├── ScrollProgress.tsx
│       ├── Badge.tsx
│       └── GridBackground.tsx
│
├── lib/
│   ├── roadmaps/
│   │   ├── index.ts            ← exports all roadmaps
│   │   ├── web-development.ts
│   │   ├── ai-ml.ts
│   │   ├── ui-ux.ts
│   │   ├── data-analytics.ts
│   │   └── app-development.ts
│   ├── types.ts
│   ├── gsap-utils.ts
│   └── constants.ts
│
├── hooks/
│   ├── useScrollAnimation.ts
│   ├── useProgress.ts
│   └── useMounted.ts
│
└── public/
    └── icons/                  ← SVG tech icons
```

---

## 3. TYPE DEFINITIONS (`lib/types.ts`)

```typescript
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
```

---

## 4. ROADMAP DATA

### 4.1 Web Development (`lib/roadmaps/web-development.ts`)

```typescript
export const webDevelopmentRoadmap: Roadmap = {
  id: 'web-development',
  title: 'Web Development',
  tagline: 'From zero to internship-ready in 12 weeks',
  icon: 'Globe',
  color: '#0ea5e9',
  accentGradient: 'from-sky-500 to-cyan-400',
  totalWeeks: 12,
  difficulty: 'beginner-friendly',
  averageSalary: '₹3–8 LPA (fresher)',
  jobOpenings: '85,000+ open roles in India',

  phases: [
    {
      id: 'phase-1',
      phase: 1,
      title: 'The Foundation',
      subtitle: 'HTML · CSS · JS Basics',
      duration: 'Week 1–2',
      icon: 'Layers',
      color: 'sky',
      goal: 'I can build and style a static website from scratch',
      topics: [
        'HTML5 semantic elements (header, main, section, article)',
        'CSS Flexbox & Grid layout systems',
        'CSS custom properties & responsive design',
        'JavaScript variables, functions, arrays, objects',
        'DOM selection & basic event handling',
        'Chrome DevTools for debugging',
      ],
      resources: [
        { title: 'The Odin Project – Foundations', url: 'https://theodinproject.com', type: 'course', free: true },
        { title: 'freeCodeCamp – Responsive Web Design', url: 'https://freecodecamp.org', type: 'course', free: true },
        { title: 'CSS Tricks – A Complete Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', type: 'article', free: true },
        { title: 'JavaScript.info', url: 'https://javascript.info', type: 'article', free: true },
        { title: 'Kevin Powell – CSS YouTube Channel', url: 'https://youtube.com/@KevinPowell', type: 'video', free: true },
      ],
      projects: [
        {
          title: 'Personal Portfolio Website',
          description: 'Build a multi-section portfolio with About, Projects, Skills, and Contact sections. Deploy on GitHub Pages.',
          skills: ['HTML', 'CSS', 'Responsive Design'],
          difficulty: 'beginner',
          estimatedTime: '8–12 hours',
        },
        {
          title: 'Product Landing Page Clone',
          description: 'Clone any popular product landing page (e.g., Notion, Linear) to practice layout and styling skills.',
          skills: ['CSS Grid', 'Flexbox', 'Typography'],
          difficulty: 'beginner',
          estimatedTime: '6–10 hours',
        },
      ],
      milestone: 'Your portfolio is live on GitHub Pages with a custom domain',
    },
    {
      id: 'phase-2',
      phase: 2,
      title: 'Going Interactive',
      subtitle: 'Advanced JS · Git · React Basics',
      duration: 'Week 3–6',
      icon: 'Zap',
      color: 'blue',
      goal: 'I can build real interactive applications and collaborate via Git',
      topics: [
        'DOM manipulation & event bubbling',
        'Fetch API & async/await (Promises)',
        'LocalStorage & JSON',
        'Git workflow: branch, commit, merge, PR',
        'GitHub – push projects, write READMEs',
        'React fundamentals: JSX, components, props, state',
        'React hooks: useState, useEffect',
        'React Router for SPA navigation',
      ],
      resources: [
        { title: 'React Official Docs – react.dev', url: 'https://react.dev', type: 'article', free: true },
        { title: 'Scrimba – Learn React for Free', url: 'https://scrimba.com/learn/learnreact', type: 'course', free: true },
        { title: 'Git & GitHub Crash Course – Traversy Media', url: 'https://youtube.com/watch?v=SWYqp7iY_Tc', type: 'video', free: true },
        { title: 'Open Weather Map API Docs', url: 'https://openweathermap.org/api', type: 'tool', free: true },
        { title: 'JavaScript30 by Wes Bos', url: 'https://javascript30.com', type: 'course', free: true },
      ],
      projects: [
        {
          title: 'To-Do App with Persistence',
          description: 'React to-do list with add/edit/delete/filter, LocalStorage persistence, and drag-to-reorder.',
          skills: ['React', 'useState', 'LocalStorage'],
          difficulty: 'intermediate',
          estimatedTime: '10–15 hours',
        },
        {
          title: 'Weather Dashboard',
          description: 'Fetch real weather data from OpenWeatherMap API. Show current + 5-day forecast with animated icons.',
          skills: ['React', 'Fetch API', 'async/await', 'CSS animations'],
          difficulty: 'intermediate',
          estimatedTime: '12–18 hours',
        },
        {
          title: 'GitHub Profile Finder',
          description: 'Search GitHub users and display repos, followers, stars using the GitHub REST API.',
          skills: ['React', 'REST API', 'React Router'],
          difficulty: 'intermediate',
          estimatedTime: '8–12 hours',
        },
      ],
      milestone: 'Three projects deployed on Vercel, all with GitHub repos with good READMEs',
    },
    {
      id: 'phase-3',
      phase: 3,
      title: 'Full-Stack Power',
      subtitle: 'Node.js · MongoDB · Auth · Deployment',
      duration: 'Week 7–10',
      icon: 'Server',
      color: 'violet',
      goal: 'I can build, deploy, and secure a full-stack web application',
      topics: [
        'Node.js fundamentals & npm ecosystem',
        'Express.js: routes, middleware, error handling',
        'REST API design (GET, POST, PUT, DELETE)',
        'MongoDB with Mongoose ODM',
        'JWT authentication & bcrypt password hashing',
        'Environment variables & .env security',
        'Vercel / Railway deployment',
        'Basic SQL with PostgreSQL (bonus)',
      ],
      resources: [
        { title: 'Node.js Official Docs', url: 'https://nodejs.org/docs', type: 'article', free: true },
        { title: 'MongoDB University – Free Courses', url: 'https://university.mongodb.com', type: 'course', free: true },
        { title: 'Full Stack Open (Helsinki University)', url: 'https://fullstackopen.com', type: 'course', free: true },
        { title: 'Postman – API Testing Tool', url: 'https://postman.com', type: 'tool', free: true },
        { title: 'Railway.app – Free Deployment', url: 'https://railway.app', type: 'tool', free: true },
      ],
      projects: [
        {
          title: 'Full-Stack Auth App',
          description: 'User registration + login with JWT, protected routes, dashboard with CRUD operations. Deploy backend + frontend separately.',
          skills: ['Node.js', 'Express', 'MongoDB', 'JWT', 'React'],
          difficulty: 'advanced',
          estimatedTime: '25–40 hours',
        },
        {
          title: 'Blog Platform CMS',
          description: 'Full-stack blog with admin panel to write/edit/delete posts, public reader view, and comment system.',
          skills: ['MERN Stack', 'Authentication', 'REST API'],
          difficulty: 'advanced',
          estimatedTime: '30–50 hours',
        },
      ],
      milestone: 'Full-stack project is live with a shareable URL, documented API, and clean codebase',
    },
    {
      id: 'phase-4',
      phase: 4,
      title: 'Internship Launch',
      subtitle: 'Resume · Portfolio · Outreach · DSA',
      duration: 'Week 11–12',
      icon: 'Rocket',
      color: 'emerald',
      goal: 'I am actively applying and getting interview calls',
      topics: [
        'ATS-optimized resume writing',
        'GitHub portfolio curation (pinned repos, READMEs)',
        'LinkedIn profile optimization (banner, about, skills)',
        'Basic DSA: arrays, strings, hashmaps, two pointers',
        'Cold outreach message writing',
        'Startup research & targeting strategy',
        'Behavioral interview preparation (STAR method)',
      ],
      resources: [
        { title: 'Internshala', url: 'https://internshala.com', type: 'tool', free: true },
        { title: 'LinkedIn Jobs', url: 'https://linkedin.com/jobs', type: 'tool', free: true },
        { title: 'Wellfound (AngelList)', url: 'https://wellfound.com', type: 'tool', free: true },
        { title: 'Naukri.com', url: 'https://naukri.com', type: 'tool', free: true },
        { title: 'LeetCode – Easy Problems', url: 'https://leetcode.com/problemset', type: 'tool', free: true },
        { title: 'Resume Worded – ATS Checker', url: 'https://resumeworded.com', type: 'tool', free: false },
      ],
      projects: [
        {
          title: 'Polish All 3–4 Projects',
          description: 'Add proper READMEs with screenshots, live demo links, tech stack badges. Record a 2-min demo video for each.',
          skills: ['Documentation', 'Markdown', 'Loom'],
          difficulty: 'beginner',
          estimatedTime: '8–12 hours',
        },
      ],
      milestone: '10 applications sent, 1 interview scheduled',
    },
  ],

  internshipGuide: [
    {
      step: 1,
      title: "Don't wait to feel 100% ready",
      description: "Apply when you're at 70% confident. Employers expect interns to learn. Waiting for perfect is the #1 reason students miss opportunities. Start applying after Phase 3.",
    },
    {
      step: 2,
      title: 'Target the right platforms',
      description: 'Different platforms serve different opportunities. Use all of them simultaneously — each has different listings.',
      platforms: [
        { name: 'Internshala', url: 'https://internshala.com' },
        { name: 'LinkedIn', url: 'https://linkedin.com/jobs' },
        { name: 'Wellfound', url: 'https://wellfound.com' },
        { name: 'Naukri.com', url: 'https://naukri.com' },
        { name: 'Instahyre', url: 'https://instahyre.com' },
        { name: 'HackerEarth Jobs', url: 'https://hackerearth.com/jobs' },
      ],
    },
    {
      step: 3,
      title: 'Cold Outreach (Most Powerful)',
      description: 'Directly messaging founders on LinkedIn works 5x better than submitting blind applications. Keep it short, specific, and genuine.',
      template: `Hi [Name], I'm a CS student learning full-stack development. I built [Project Name] — a [one-line description]. I'd love to contribute to [Company] — even as an unpaid intern — to gain real-world experience. Would you be open to a 15-minute call?`,
    },
    {
      step: 4,
      title: 'Target Startups, Not Giants',
      description: 'Early-stage startups (5–50 person companies) are 10x more likely to hire student interns. They need help, move fast, and give real ownership. Search LinkedIn for "hiring interns", "looking for contributors", "student developer".',
    },
    {
      step: 5,
      title: 'DSA Won't Kill You (But Helps)',
      description: 'For internships, focus on: arrays, strings, hashmaps, two pointers, binary search. Do 20–30 LeetCode Easy problems. Most internship interviews at startups are project-focused, not DSA-heavy.',
    },
  ],

  resumeTips: [
    'Use a single-column, ATS-scannable format (no tables or columns)',
    'Put your GitHub and portfolio link prominently at the top',
    'For each project, use: Built X using Y that resulted in Z',
    'Quantify wherever possible: "reduced load time by 40%"',
    'Keep to 1 page — recruiters spend 7 seconds on a resume',
    'Use keywords from the job description verbatim',
    'List tech skills grouped by category (Languages, Frameworks, Tools)',
    'Include CGPA only if above 7.5/10',
  ],

  linkedInTips: [
    'Headline: "Aspiring Web Developer | React · Node.js · Building in Public"',
    'Post 1 project update per week with screenshots (massive visibility)',
    'Connect with developers at target companies BEFORE applying',
    'Engage on posts by CTOs and founders of target startups',
    'Add "Open to Internships" in the job preferences section',
    'Get 3 skill endorsements from peers or mentors',
  ],
}
```

### 4.2 AI / ML Roadmap (`lib/roadmaps/ai-ml.ts`)

```typescript
export const aiMlRoadmap: Roadmap = {
  id: 'ai-ml',
  title: 'AI / Machine Learning',
  tagline: 'From Python basics to building real ML models in 14 weeks',
  icon: 'Brain',
  color: '#a78bfa',
  accentGradient: 'from-violet-500 to-purple-400',
  totalWeeks: 14,
  difficulty: 'intermediate',
  averageSalary: '₹5–12 LPA (fresher)',
  jobOpenings: '45,000+ open roles in India',

  phases: [
    {
      id: 'phase-1',
      phase: 1,
      title: 'Python & Math Foundations',
      subtitle: 'Python · NumPy · Linear Algebra',
      duration: 'Week 1–3',
      icon: 'Code2',
      color: 'violet',
      goal: 'I can write clean Python and understand the math behind ML',
      topics: [
        'Python: data types, loops, functions, OOP basics',
        'NumPy arrays, broadcasting, matrix operations',
        'Pandas DataFrames: load, clean, transform data',
        'Linear algebra: vectors, matrices, dot product, eigenvalues',
        'Statistics & probability: mean, variance, distributions, Bayes theorem',
        'Matplotlib & Seaborn for data visualization',
      ],
      resources: [
        { title: 'Python for Everybody – Coursera (Audit Free)', url: 'https://coursera.org/specializations/python', type: 'course', free: true },
        { title: '3Blue1Brown – Essence of Linear Algebra', url: 'https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', type: 'video', free: true },
        { title: 'Kaggle – Python & Pandas Courses', url: 'https://kaggle.com/learn', type: 'course', free: true },
        { title: 'StatQuest with Josh Starmer', url: 'https://youtube.com/@statquest', type: 'video', free: true },
      ],
      projects: [
        {
          title: 'Exploratory Data Analysis (EDA) on Real Dataset',
          description: 'Pick any dataset from Kaggle (Titanic, House Prices, Netflix). Clean, analyze, and visualize 10 insights.',
          skills: ['Pandas', 'Matplotlib', 'Seaborn', 'NumPy'],
          difficulty: 'beginner',
          estimatedTime: '10–15 hours',
        },
      ],
      milestone: 'Published EDA notebook on Kaggle with 5+ visualizations',
    },
    {
      id: 'phase-2',
      phase: 2,
      title: 'Classical ML Algorithms',
      subtitle: 'Scikit-learn · Regression · Classification · Clustering',
      duration: 'Week 4–7',
      icon: 'GitBranch',
      color: 'purple',
      goal: 'I can train, evaluate, and tune ML models on real datasets',
      topics: [
        'Supervised learning: Linear Regression, Logistic Regression',
        'Decision Trees, Random Forests, XGBoost',
        'K-Means Clustering, DBSCAN',
        'Feature engineering & selection',
        'Train/val/test splits, cross-validation',
        'Model evaluation: confusion matrix, ROC-AUC, RMSE',
        'Hyperparameter tuning with GridSearchCV',
        'Scikit-learn pipelines',
      ],
      resources: [
        { title: 'Scikit-learn Official Documentation', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'article', free: true },
        { title: 'Hands-On ML with Scikit-Learn & TensorFlow (Book)', url: 'https://oreilly.com/library/view/hands-on-machine-learning/9781492032632/', type: 'book', free: false },
        { title: 'Kaggle – Intro to ML & Intermediate ML', url: 'https://kaggle.com/learn/intro-to-machine-learning', type: 'course', free: true },
        { title: 'fast.ai – Practical Deep Learning', url: 'https://course.fast.ai', type: 'course', free: true },
      ],
      projects: [
        {
          title: 'House Price Prediction',
          description: 'Build a regression model to predict house prices. Feature engineering, model comparison, deployment on Streamlit.',
          skills: ['Scikit-learn', 'Feature Engineering', 'Streamlit'],
          difficulty: 'intermediate',
          estimatedTime: '20–30 hours',
        },
        {
          title: 'Customer Churn Classifier',
          description: 'Binary classification on telecom dataset. Build XGBoost model, explain predictions with SHAP values.',
          skills: ['XGBoost', 'SHAP', 'Pandas', 'Scikit-learn'],
          difficulty: 'intermediate',
          estimatedTime: '15–25 hours',
        },
      ],
      milestone: '2 ML projects on GitHub with documented notebooks and Streamlit demo',
    },
    {
      id: 'phase-3',
      phase: 3,
      title: 'Deep Learning & Neural Networks',
      subtitle: 'PyTorch · CNNs · NLP Basics · Transfer Learning',
      duration: 'Week 8–11',
      icon: 'Cpu',
      color: 'fuchsia',
      goal: 'I can build and train neural networks for vision and NLP tasks',
      topics: [
        'Neural network fundamentals: forward/backward pass, gradient descent',
        'PyTorch tensors, autograd, nn.Module',
        'CNNs for image classification',
        'Transfer learning with pretrained models (ResNet, EfficientNet)',
        'NLP basics: tokenization, embeddings, sentiment analysis',
        'Hugging Face Transformers (BERT, GPT-2 fine-tuning)',
        'Model saving, loading, and serving',
        'Google Colab & GPU acceleration',
      ],
      resources: [
        { title: 'fast.ai – Practical Deep Learning Part 1', url: 'https://course.fast.ai', type: 'course', free: true },
        { title: 'PyTorch Official Tutorials', url: 'https://pytorch.org/tutorials', type: 'article', free: true },
        { title: 'Hugging Face Course', url: 'https://huggingface.co/course', type: 'course', free: true },
        { title: 'Andrej Karpathy – Neural Networks Zero to Hero', url: 'https://youtube.com/@AndrejKarpathy', type: 'video', free: true },
      ],
      projects: [
        {
          title: 'Image Classifier (Your Own Category)',
          description: 'Train a CNN to classify images you scrape. Fine-tune ResNet50. Deploy with FastAPI + Streamlit.',
          skills: ['PyTorch', 'Transfer Learning', 'FastAPI', 'Streamlit'],
          difficulty: 'advanced',
          estimatedTime: '25–40 hours',
        },
        {
          title: 'Sentiment Analysis API',
          description: 'Fine-tune DistilBERT on a custom dataset. Build a REST API endpoint that returns sentiment + confidence score.',
          skills: ['Hugging Face', 'BERT', 'FastAPI', 'Python'],
          difficulty: 'advanced',
          estimatedTime: '20–35 hours',
        },
      ],
      milestone: 'Both projects deployed as APIs, linked in resume and LinkedIn',
    },
    {
      id: 'phase-4',
      phase: 4,
      title: 'MLOps & Internship Prep',
      subtitle: 'MLflow · Docker · Resume · Research',
      duration: 'Week 12–14',
      icon: 'Rocket',
      color: 'emerald',
      goal: 'I can manage the full ML lifecycle and communicate my work professionally',
      topics: [
        'MLflow experiment tracking',
        'Docker containers for ML apps',
        'GitHub Actions for CI/CD',
        'Writing ML project READMEs that impress',
        'Reading and summarizing ML papers (arXiv)',
        'Kaggle competition participation',
        'Interview prep: ML fundamentals questions',
      ],
      resources: [
        { title: 'MLflow Documentation', url: 'https://mlflow.org/docs/latest/index.html', type: 'article', free: true },
        { title: 'Docker for ML – Towards Data Science', url: 'https://towardsdatascience.com', type: 'article', free: true },
        { title: 'Kaggle Competitions (Start with Playground)', url: 'https://kaggle.com/competitions', type: 'tool', free: true },
      ],
      projects: [],
      milestone: 'Kaggle profile with 1 competition submission, 3 ML projects on GitHub',
    },
  ],

  internshipGuide: [
    {
      step: 1,
      title: 'Start with Research Internships',
      description: 'University AI labs are a goldmine for beginners. Email professors with your Kaggle profile and GitHub. Most say yes if you show genuine curiosity and one solid project.',
    },
    {
      step: 2,
      title: 'Target ML Platforms',
      description: 'AI startups, ML SaaS, and data analytics companies are the best hunting grounds for ML internships.',
      platforms: [
        { name: 'Internshala', url: 'https://internshala.com' },
        { name: 'LinkedIn', url: 'https://linkedin.com/jobs' },
        { name: 'Wellfound', url: 'https://wellfound.com' },
        { name: 'Kaggle Jobs', url: 'https://kaggle.com/jobs' },
        { name: 'AI Jobs (aijobs.net)', url: 'https://aijobs.net' },
      ],
    },
    {
      step: 3,
      title: 'Cold Email Researchers',
      description: 'Find ML researchers on Google Scholar. Email them after reading one of their papers. This shows genuine interest.',
      template: `Hi Professor/Dr. [Name], I recently read your paper on [Topic] and found your approach to [specific method] particularly insightful. I'm a [year] student working on [related project]. Would you consider a research internship or collaboration opportunity?`,
    },
  ],

  resumeTips: [
    'Lead with a strong "Skills" section — list frameworks, libraries, tools',
    'For each project, mention dataset size, accuracy metrics, and deployment status',
    'Include Kaggle rank/medals if applicable',
    'Mention any published notebooks with view counts',
    'Highlight contributions to open-source ML repos if any',
    'Add a "Research Interests" section to signal long-term direction',
  ],

  linkedInTips: [
    'Share every model you build — even imperfect ones. Document the journey.',
    'Follow and engage with AI researchers and ML practitioners',
    'Write short posts explaining ML concepts in simple terms',
    'Join and post in ML-focused LinkedIn groups',
  ],
}
```

### 4.3 UI/UX Design Roadmap (`lib/roadmaps/ui-ux.ts`)

```typescript
export const uiUxRoadmap: Roadmap = {
  id: 'ui-ux',
  title: 'UI/UX Design',
  tagline: 'From design thinking to a portfolio that lands jobs — 10 weeks',
  icon: 'Paintbrush',
  color: '#f472b6',
  accentGradient: 'from-pink-500 to-rose-400',
  totalWeeks: 10,
  difficulty: 'beginner-friendly',
  averageSalary: '₹3–7 LPA (fresher)',
  jobOpenings: '30,000+ open roles in India',

  phases: [
    {
      id: 'phase-1',
      phase: 1,
      title: 'Design Fundamentals',
      subtitle: 'Principles · Typography · Color · Figma',
      duration: 'Week 1–2',
      icon: 'Palette',
      color: 'pink',
      goal: 'I understand core design principles and can navigate Figma confidently',
      topics: [
        'Design principles: contrast, alignment, repetition, proximity (CARP)',
        'Typography: typeface pairing, hierarchy, readability',
        'Color theory: HSL, complementary, analogous, 60-30-10 rule',
        'Figma basics: frames, auto-layout, components, styles',
        'Grid systems and spacing (8pt grid)',
        'Gestalt principles in UI design',
      ],
      resources: [
        { title: 'Google UX Design Certificate – Coursera (Audit)', url: 'https://coursera.org/professional-certificates/google-ux-design', type: 'course', free: true },
        { title: 'Figma for Beginners – Official Tutorials', url: 'https://figma.com/resources/learn-design', type: 'course', free: true },
        { title: 'Refactoring UI (Book + Free Samples)', url: 'https://refactoringui.com', type: 'book', free: false },
        { title: 'Design Systems with Figma – Figma YouTube', url: 'https://youtube.com/@Figma', type: 'video', free: true },
        { title: 'Mobbin – UI Inspiration Library', url: 'https://mobbin.com', type: 'tool', free: true },
      ],
      projects: [
        {
          title: 'Design Fundamentals Exercises',
          description: 'Recreate 3 famous UI screens in Figma (Spotify, Airbnb, Stripe). Focus on understanding their grid, type scale, and color choices.',
          skills: ['Figma', 'Typography', 'Color', 'Layout'],
          difficulty: 'beginner',
          estimatedTime: '10–15 hours',
        },
      ],
      milestone: 'Figma file shared publicly on community with 3 recreations',
    },
    {
      id: 'phase-2',
      phase: 2,
      title: 'UX Research & Wireframing',
      subtitle: 'User Research · Personas · Information Architecture',
      duration: 'Week 3–5',
      icon: 'Users',
      color: 'rose',
      goal: 'I can identify user problems and structure solutions before jumping to UI',
      topics: [
        'UX research methods: user interviews, surveys, usability testing',
        'User personas and empathy maps',
        'User journey mapping',
        'Information architecture: card sorting, site maps',
        'Low-fidelity wireframing (pen-paper → Figma)',
        'User flows and task flows',
        'Accessibility basics (WCAG 2.1 AA)',
      ],
      resources: [
        { title: 'Nielsen Norman Group Articles (Free)', url: 'https://nngroup.com/articles/', type: 'article', free: true },
        { title: 'Laws of UX', url: 'https://lawsofux.com', type: 'article', free: true },
        { title: 'UX Collective – Medium', url: 'https://uxdesign.cc', type: 'article', free: true },
      ],
      projects: [
        {
          title: 'UX Case Study: Redesign an App',
          description: 'Pick a poorly designed app (government, bank, local business). Do 3 user interviews, identify pain points, create personas and a redesign wireframe.',
          skills: ['UX Research', 'Wireframing', 'User Personas'],
          difficulty: 'intermediate',
          estimatedTime: '20–30 hours',
        },
      ],
      milestone: 'Published case study on Notion or Medium with research + wireframes',
    },
    {
      id: 'phase-3',
      phase: 3,
      title: 'High-Fidelity UI & Prototyping',
      subtitle: 'UI Design · Design Systems · Interactive Prototypes',
      duration: 'Week 6–8',
      icon: 'Layers',
      color: 'fuchsia',
      goal: 'I can produce polished, production-ready UI and interactive prototypes',
      topics: [
        'Component-driven design in Figma (Variants, Props)',
        'Building a personal design system (colors, typography, icons, components)',
        'Micro-interactions and animation in Figma Prototype',
        'Responsive design for mobile, tablet, desktop',
        'Dark mode design considerations',
        'Design handoff to developers (Inspect, Zeplin)',
      ],
      resources: [
        { title: 'Dribbble – UI Inspiration', url: 'https://dribbble.com', type: 'tool', free: true },
        { title: 'UI.dev – Advanced Figma Techniques', url: 'https://ui.dev', type: 'course', free: false },
        { title: 'Iconify – Icon Library', url: 'https://iconify.design', type: 'tool', free: true },
        { title: 'Google Fonts', url: 'https://fonts.google.com', type: 'tool', free: true },
      ],
      projects: [
        {
          title: 'Full Product Design (End-to-End)',
          description: 'Design a complete mobile app from scratch: onboarding, home, profile, settings. Build interactive prototype with transitions.',
          skills: ['Figma', 'Prototyping', 'Component Library', 'Mobile Design'],
          difficulty: 'advanced',
          estimatedTime: '30–50 hours',
        },
      ],
      milestone: 'Portfolio-ready Figma file with components, prototype link, and Loom walkthrough',
    },
    {
      id: 'phase-4',
      phase: 4,
      title: 'Portfolio & Job Hunt',
      subtitle: 'Behance · Case Studies · Interviews',
      duration: 'Week 9–10',
      icon: 'Rocket',
      color: 'emerald',
      goal: 'My portfolio impresses recruiters and I can explain my design decisions',
      topics: [
        'Writing compelling UX case studies (problem → process → solution → impact)',
        'Building a portfolio website (Framer, Webflow, or custom)',
        'Behance and Dribbble profile optimization',
        'Common UI/UX interview questions',
        'Design challenge preparation (1-hour exercises)',
        'Presentation skills for design reviews',
      ],
      resources: [
        { title: 'Framer – Portfolio Builder', url: 'https://framer.com', type: 'tool', free: false },
        { title: 'Behance', url: 'https://behance.net', type: 'tool', free: true },
        { title: 'UX Portfolio Tips – Sarah Doody YouTube', url: 'https://youtube.com/@SarahDoody', type: 'video', free: true },
      ],
      projects: [],
      milestone: '2 published case studies, portfolio site live, 10 applications sent',
    },
  ],

  internshipGuide: [
    {
      step: 1,
      title: 'Portfolio First, Applications Second',
      description: 'In UX/UI, your portfolio IS your resume. Before applying anywhere, make sure you have at least 2 full case studies published publicly.',
    },
    {
      step: 2,
      title: 'Where to Find Design Internships',
      platforms: [
        { name: 'Internshala', url: 'https://internshala.com' },
        { name: 'LinkedIn', url: 'https://linkedin.com/jobs' },
        { name: 'Dribbble Jobs', url: 'https://dribbble.com/jobs' },
        { name: 'Behance Jobs', url: 'https://behance.net/joblist' },
        { name: 'Wellfound', url: 'https://wellfound.com' },
      ],
      description: 'Apply specifically to product-based companies, SaaS startups, and digital agencies.',
    },
    {
      step: 3,
      title: 'Cold DM on Twitter/X and LinkedIn',
      description: 'Design leaders love designers who show initiative and taste.',
      template: `Hi [Name], I've been following your work at [Company] — your [specific project/feature] has a great balance of simplicity and clarity. I'm a UI/UX student building my portfolio. I'd love to shadow or intern with your team — even remotely. Here's my portfolio: [link]`,
    },
  ],

  resumeTips: [
    'Add your portfolio link as the FIRST thing on your resume — make it clickable',
    'List design tools: Figma, Adobe XD, Principle, Framer, Zeplin',
    'Show measurable outcomes: "Redesign increased user retention by 23%"',
    'Include 2–3 case study titles as bullet points under Projects',
    'List soft skills: User Research, Stakeholder Communication, Design Thinking',
  ],

  linkedInTips: [
    'Share weekly "what I designed today" posts with before/afters',
    'Follow design leaders: Julie Zhuo, Aarron Walter, Steve Schoger',
    'Tag companies you\'d love to work for in your posts',
    'Share your case study articles natively on LinkedIn (not just links)',
  ],
}
```

### 4.4 Data Analytics (`lib/roadmaps/data-analytics.ts`)

```typescript
export const dataAnalyticsRoadmap: Roadmap = {
  id: 'data-analytics',
  title: 'Data Analytics',
  tagline: 'Turn raw data into business decisions — internship-ready in 10 weeks',
  icon: 'BarChart3',
  color: '#34d399',
  accentGradient: 'from-emerald-500 to-teal-400',
  totalWeeks: 10,
  difficulty: 'beginner-friendly',
  averageSalary: '₹3–7 LPA (fresher)',
  jobOpenings: '60,000+ open roles in India',

  phases: [
    {
      id: 'phase-1',
      phase: 1,
      title: 'Data Foundations',
      subtitle: 'Excel · SQL · Python Basics',
      duration: 'Week 1–3',
      icon: 'Table',
      color: 'emerald',
      goal: 'I can query, clean, and analyze data using SQL and Python',
      topics: [
        'Excel: VLOOKUP, pivot tables, conditional formatting, dashboards',
        'SQL: SELECT, WHERE, GROUP BY, JOIN, subqueries, window functions',
        'Python basics for data: Pandas read_csv, head, describe, value_counts',
        'Data types: structured vs unstructured, wide vs long format',
        'Data cleaning: handling nulls, duplicates, outliers',
        'Exploratory Data Analysis (EDA) workflow',
      ],
      resources: [
        { title: 'Mode Analytics SQL Tutorial', url: 'https://mode.com/sql-tutorial', type: 'course', free: true },
        { title: 'Kaggle – Pandas & SQL Courses', url: 'https://kaggle.com/learn', type: 'course', free: true },
        { title: 'Excel for Data Analysis – ExcelJet', url: 'https://exceljet.net', type: 'article', free: true },
        { title: 'SQLBolt – Interactive SQL', url: 'https://sqlbolt.com', type: 'course', free: true },
      ],
      projects: [
        {
          title: 'Sales Data Analysis',
          description: 'Analyze 1–2 years of retail sales data with SQL + Pandas. Find top products, seasonal trends, and customer segments.',
          skills: ['SQL', 'Pandas', 'Excel'],
          difficulty: 'beginner',
          estimatedTime: '12–18 hours',
        },
      ],
      milestone: 'SQL queries and EDA notebook published on GitHub',
    },
    {
      id: 'phase-2',
      phase: 2,
      title: 'Data Visualization & Storytelling',
      subtitle: 'Tableau · Power BI · Matplotlib · Storytelling',
      duration: 'Week 4–6',
      icon: 'PieChart',
      color: 'teal',
      goal: 'I can build dashboards and communicate data insights visually',
      topics: [
        'Tableau Desktop basics: charts, filters, calculated fields',
        'Power BI: data import, relationships, DAX basics, reports',
        'Matplotlib & Seaborn advanced charts',
        'Data storytelling frameworks (what → so what → now what)',
        'Chart selection: when to use bar, line, scatter, heatmap',
        'Dashboard design principles for executives',
      ],
      resources: [
        { title: 'Tableau Public (Free)', url: 'https://public.tableau.com', type: 'tool', free: true },
        { title: 'Power BI Desktop (Free)', url: 'https://powerbi.microsoft.com', type: 'tool', free: true },
        { title: 'Data Visualization Society', url: 'https://datavizproject.com', type: 'article', free: true },
        { title: 'Storytelling with Data (Book)', url: 'https://storytellingwithdata.com', type: 'book', free: false },
      ],
      projects: [
        {
          title: 'COVID-19 / Cricket / IPL Data Dashboard',
          description: 'Build an interactive Tableau or Power BI dashboard with 5+ charts. Publish on Tableau Public.',
          skills: ['Tableau', 'Power BI', 'Data Storytelling'],
          difficulty: 'intermediate',
          estimatedTime: '15–25 hours',
        },
      ],
      milestone: 'Dashboard live on Tableau Public with shareable link',
    },
    {
      id: 'phase-3',
      phase: 3,
      title: 'Advanced Analytics & Statistics',
      subtitle: 'A/B Testing · Statistical Inference · Forecasting',
      duration: 'Week 7–9',
      icon: 'TrendingUp',
      color: 'cyan',
      goal: 'I can apply statistical thinking to real business problems',
      topics: [
        'Hypothesis testing: t-test, chi-square, p-values',
        'A/B testing design and analysis',
        'Regression analysis for prediction',
        'Time series basics: trend, seasonality, forecasting',
        'Google Analytics / Mixpanel basics for product analytics',
        'Business metrics: CAC, LTV, churn rate, NPS, retention cohorts',
      ],
      resources: [
        { title: 'Khan Academy – Statistics & Probability', url: 'https://khanacademy.org/math/statistics-probability', type: 'course', free: true },
        { title: 'Lean Analytics (Book)', url: 'https://leananalyticsbook.com', type: 'book', free: false },
        { title: 'Google Analytics Academy', url: 'https://analytics.google.com/analytics/academy', type: 'course', free: true },
      ],
      projects: [
        {
          title: 'E-commerce A/B Test Analysis',
          description: 'Analyze a simulated A/B test dataset. Determine statistical significance, compute confidence intervals, and make a business recommendation.',
          skills: ['Statistics', 'Python', 'Pandas', 'Hypothesis Testing'],
          difficulty: 'advanced',
          estimatedTime: '18–28 hours',
        },
      ],
      milestone: '3 projects in GitHub, 1 dashboard on Tableau Public, ready for interviews',
    },
    {
      id: 'phase-4',
      phase: 4,
      title: 'Internship Launch',
      subtitle: 'Resume · Portfolio · Analytics Interviews',
      duration: 'Week 10',
      icon: 'Rocket',
      color: 'emerald',
      goal: 'I am actively interviewing for data analyst internship roles',
      topics: [
        'Resume for data analyst: technical skills section, project metrics',
        'SQL interview prep: 30 common questions',
        'Business case interviews: STAR method',
        'Portfolio: Kaggle, Tableau Public, GitHub, Notion',
      ],
      resources: [
        { title: 'StrataScratch – SQL Interview Practice', url: 'https://stratascratch.com', type: 'tool', free: true },
        { title: 'DataLemur – Data Science Interview', url: 'https://datalemur.com', type: 'tool', free: true },
      ],
      projects: [],
      milestone: '10 applications sent, SQL interview practice complete',
    },
  ],

  internshipGuide: [
    {
      step: 1,
      title: 'Target Analytics-Heavy Industries First',
      description: 'E-commerce, fintech, edtech, and SaaS companies have dedicated analytics teams and frequently hire student interns.',
    },
    {
      step: 2,
      title: 'Best Platforms for Data Internships',
      platforms: [
        { name: 'Internshala', url: 'https://internshala.com' },
        { name: 'LinkedIn', url: 'https://linkedin.com/jobs' },
        { name: 'Analytics Vidhya Jobs', url: 'https://jobs.analyticsvidhya.com' },
        { name: 'Naukri.com', url: 'https://naukri.com' },
        { name: 'Indeed India', url: 'https://indeed.co.in' },
      ],
    },
    {
      step: 3,
      title: 'Show Your Analytical Thinking Publicly',
      description: 'Publish one data analysis per month on LinkedIn or Medium. Analyze trending topics: IPL stats, startup funding, movie box office. Data insights go viral.',
      template: `Hi [Name], I came across [Company] while researching analytics roles in [industry]. I noticed your team is focused on [product/metric]. I built an analysis on [related dataset] and thought it might be interesting to you. I'm looking for a data analytics internship — would love to learn from your team. Here's my Tableau portfolio: [link]`,
    },
  ],

  resumeTips: [
    'List tools explicitly: SQL, Python (Pandas, NumPy), Tableau, Power BI, Excel',
    'Use numbers: "Analyzed 500K+ rows of sales data", "Built dashboard used by 5 departments"',
    'Mention specific databases: MySQL, PostgreSQL, BigQuery, Snowflake',
    'Include Kaggle profile and Tableau Public profile links',
    'Show business impact, not just technical output',
  ],

  linkedInTips: [
    'Post monthly data insights on trending Indian datasets (IPL, Nifty50, election results)',
    'Share "TIL in SQL" posts — hugely popular with recruiters',
    'Connect with analytics managers and data team leads at target companies',
    'Write about your data cleaning struggles — authenticity builds audience',
  ],
}
```

### 4.5 App Development (`lib/roadmaps/app-development.ts`)

```typescript
export const appDevelopmentRoadmap: Roadmap = {
  id: 'app-development',
  title: 'App Development',
  tagline: 'Build cross-platform mobile apps and ship to the Play Store — 12 weeks',
  icon: 'Smartphone',
  color: '#fb923c',
  accentGradient: 'from-orange-500 to-amber-400',
  totalWeeks: 12,
  difficulty: 'intermediate',
  averageSalary: '₹4–9 LPA (fresher)',
  jobOpenings: '40,000+ open roles in India',

  phases: [
    {
      id: 'phase-1',
      phase: 1,
      title: 'Dart & Flutter Foundations',
      subtitle: 'Dart Language · Flutter Widgets · State',
      duration: 'Week 1–3',
      icon: 'Code2',
      color: 'orange',
      goal: 'I can build multi-screen Flutter apps with proper state management',
      topics: [
        'Dart: variables, functions, classes, null safety, async/await',
        'Flutter widget tree: Stateless vs Stateful widgets',
        'Layout widgets: Column, Row, Stack, Container, Expanded',
        'Navigation: Navigator 2.0 and go_router',
        'State management: Provider (start here), then Riverpod',
        'Flutter themes and custom typography',
        'Handling forms and user input',
      ],
      resources: [
        { title: 'Flutter Official Docs – flutter.dev', url: 'https://flutter.dev/docs', type: 'article', free: true },
        { title: 'Dart Official Tour', url: 'https://dart.dev/guides/language/language-tour', type: 'article', free: true },
        { title: 'Flutter & Dart – The Complete Guide (Udemy – buy on sale)', url: 'https://udemy.com', type: 'course', free: false },
        { title: 'FilledStacks YouTube Channel', url: 'https://youtube.com/@FilledStacks', type: 'video', free: true },
        { title: 'Flutter Community – Medium', url: 'https://medium.com/flutter', type: 'article', free: true },
      ],
      projects: [
        {
          title: 'Expense Tracker App',
          description: 'Multi-screen Flutter app to add, categorize, and visualize personal expenses. Use Provider for state and SharedPreferences for persistence.',
          skills: ['Flutter', 'Dart', 'Provider', 'SharedPreferences'],
          difficulty: 'intermediate',
          estimatedTime: '15–25 hours',
        },
      ],
      milestone: 'App running on physical device + emulator, APK exportable',
    },
    {
      id: 'phase-2',
      phase: 2,
      title: 'Backend Integration & Firebase',
      subtitle: 'Firebase · REST APIs · Auth · Firestore',
      duration: 'Week 4–7',
      icon: 'Cloud',
      color: 'amber',
      goal: 'I can build apps with real backends, authentication, and live data',
      topics: [
        'Firebase Auth (Google, email/password)',
        'Cloud Firestore: documents, collections, real-time listeners',
        'Firebase Storage for file uploads',
        'HTTP package: GET/POST with REST APIs',
        'dio package for advanced API calls',
        'Push notifications with Firebase Messaging',
        'Error handling and loading states',
      ],
      resources: [
        { title: 'Firebase Flutter Codelab', url: 'https://firebase.google.com/codelabs/firebase-get-to-know-flutter', type: 'course', free: true },
        { title: 'Flutter Fire Documentation', url: 'https://firebase.flutter.dev', type: 'article', free: true },
        { title: 'Fireship.io – Firebase + Flutter Videos', url: 'https://youtube.com/@Fireship', type: 'video', free: true },
      ],
      projects: [
        {
          title: 'Social Media Clone (Simplified)',
          description: 'Instagram-like app: sign up/in, create posts with images, like/comment, view feed. Full Firebase backend.',
          skills: ['Flutter', 'Firebase', 'Cloud Firestore', 'Storage', 'Auth'],
          difficulty: 'advanced',
          estimatedTime: '30–50 hours',
        },
        {
          title: 'Real-Time Chat App',
          description: 'WhatsApp-like group and direct messaging app with Firestore real-time updates, typing indicators, and push notifications.',
          skills: ['Flutter', 'Firestore', 'Firebase Messaging'],
          difficulty: 'advanced',
          estimatedTime: '25–40 hours',
        },
      ],
      milestone: 'Two full-stack Flutter apps in GitHub with Firebase integration',
    },
    {
      id: 'phase-3',
      phase: 3,
      title: 'Publishing & Advanced Topics',
      subtitle: 'Play Store · App Store · Performance · Animations',
      duration: 'Week 8–11',
      icon: 'Upload',
      color: 'yellow',
      goal: 'I have a live app on the Play Store and understand Flutter internals',
      topics: [
        'Flutter animations: AnimatedContainer, Hero, Lottie',
        'Performance: lazy loading, image caching, list optimization',
        'Flutter Flavors for dev/staging/prod environments',
        'Google Play Store: app signing, ASO, screenshots',
        'Apple App Store basics (if available)',
        'Code architecture: clean architecture / MVVM',
        'Unit and widget testing in Flutter',
      ],
      resources: [
        { title: 'Flutter Performance Best Practices', url: 'https://docs.flutter.dev/perf/best-practices', type: 'article', free: true },
        { title: 'Lottie for Flutter', url: 'https://pub.dev/packages/lottie', type: 'tool', free: true },
        { title: 'pub.dev – Flutter Package Registry', url: 'https://pub.dev', type: 'tool', free: true },
      ],
      projects: [],
      milestone: 'App published on Google Play (even with 1–10 downloads)',
    },
    {
      id: 'phase-4',
      phase: 4,
      title: 'Internship Launch',
      subtitle: 'Portfolio · Play Store · Interview Prep',
      duration: 'Week 12',
      icon: 'Rocket',
      color: 'emerald',
      goal: 'My Play Store listing and GitHub portfolio get me interview calls',
      topics: [
        'Flutter interview questions (widget lifecycle, setState vs Provider)',
        'Demonstrating app to interviewers: screen recording + Loom',
        'Freelance as alternative entry (Fiverr, Toptal)',
      ],
      resources: [
        { title: 'Flutter Interview Questions – GitHub Awesome List', url: 'https://github.com/Raj27p/flutter-interview-questions', type: 'article', free: true },
      ],
      projects: [],
      milestone: '10 applications sent, 1 live Play Store app in resume',
    },
  ],

  internshipGuide: [
    {
      step: 1,
      title: 'Your App IS Your Resume',
      description: 'A published Play Store app beats any certification. Even 10 downloads is legitimate. Put the Play Store URL directly on your resume.',
    },
    {
      step: 2,
      title: 'Where to Apply',
      platforms: [
        { name: 'Internshala', url: 'https://internshala.com' },
        { name: 'LinkedIn', url: 'https://linkedin.com/jobs' },
        { name: 'Wellfound', url: 'https://wellfound.com' },
        { name: 'Naukri.com', url: 'https://naukri.com' },
        { name: 'Freelancer.com', url: 'https://freelancer.com' },
      ],
    },
    {
      step: 3,
      title: 'Target Mobile-First Startups',
      description: 'EdTech, HealthTech, FinTech startups all need Flutter developers. They move fast and give real responsibility.',
      template: `Hi [Name], I'm a Flutter developer (student) who just shipped my first app on the Play Store — [App Name]. I'd love to contribute to [Company]'s mobile team, even as an unpaid/low-stipend intern. Play Store link: [link] | GitHub: [link]`,
    },
  ],

  resumeTips: [
    'List the Play Store URL of your published app — it\'s your biggest credibility signal',
    'List: Flutter, Dart, Firebase, REST APIs, Provider/Riverpod',
    'Show number of downloads or ratings if above zero',
    'Screenshot your best app screen and include it in portfolio PDF',
    'Mention: Git, Android Studio, Xcode (even basic familiarity)',
  ],

  linkedInTips: [
    'Post a short screen recording of your app every time you ship a new feature',
    'Write about your Flutter learning journey — highly searched content',
    'Engage in Flutter communities on Discord and Reddit (r/FlutterDev)',
    'Tag your app posts with #Flutter #MobileAppDevelopment #Android',
  ],
}
```

---

## 5. PAGE-BY-PAGE IMPLEMENTATION

### 5.1 Landing Page (`/`) — Sections

#### SECTION A: Navbar
```
- Left: Logo (CareerPath) with a small animated path icon
- Center: Links — Home · Roadmaps · Resources · About
- Right: "Get Started" CTA button (glowing blue)
- Behavior: transparent → frosted glass backdrop-blur on scroll
- Mobile: hamburger → slide-out drawer
```

#### SECTION B: Hero
```
- Full viewport height
- Background: animated CSS mesh gradient + subtle grid lines (CSS only)
- Floating particle field (50 small dots, subtle movement via GSAP)
- Headline (Syne font): "Your Personalized Career Roadmap"
  - Each word animates in with staggered GSAP fromTo (y:40 → y:0, opacity: 0→1)
- Subtext: "Stop scrolling. Start building. Go from zero to internship-ready."
- Two CTAs: "Explore Roadmaps" (primary glow button) + "How It Works" (ghost button)
- Bottom scroll indicator: bouncing arrow
- Right side: Floating 3D-ish card showing a roadmap phase (CSS perspective transform)
```

#### SECTION C: Stats Bar
```
- 4 animated counters triggered on scroll entry:
  - "5 Career Paths"
  - "50+ Learning Resources"
  - "12 Weeks Avg to Internship"
  - "10,000+ Students Guided"
- Separated by vertical dividers
- Background: subtle blue-tinted glass strip
```

#### SECTION D: Role Cards Grid
```
- Heading: "Choose Your Path"
- 5 cards in a responsive grid (1 col mobile → 2 col tablet → 3 col desktop with 1 featured)
- Each card:
  - Large role icon (Lucide, colored per role)
  - Role name + tagline
  - Total weeks + difficulty badge
  - Salary range
  - CTA: "Start Roadmap →"
  - Hover: glow border, card lifts (translateY -8px), icon scales
- GSAP: cards stagger-reveal on scroll (scale 0.9 → 1, opacity 0 → 1)
```

#### SECTION E: How It Works
```
- 4-step horizontal (desktop) / vertical (mobile) flow:
  1. Choose Your Role
  2. Follow the Roadmap
  3. Build Projects
  4. Get Hired
- Each step: numbered circle, icon, title, description
- Connector line animates (width/height grows) on scroll
```

#### SECTION F: Features Showcase
```
- Split layout: alternating image/mockup left + text right
- Feature 1: Progress Tracker (checkbox UI mockup)
- Feature 2: AI Mentor Chat (chat interface mockup)
- Feature 3: Internship Feed (job card mockup)
- Each section animates in from left/right on scroll
```

#### SECTION G: Testimonials
```
- Heading: "Real Students, Real Outcomes"
- Horizontal marquee (infinite scroll, CSS animation) — 6 testimonial cards
- Each card: avatar (gradient placeholder), name, role achieved, quote, company logo
```

#### SECTION H: CTA Section
```
- Full-width section with dramatic blue glow background
- Large: "Ready to Start?" headline
- Button: "Pick Your Roadmap →"
- Subtle: animated blue orb in background
```

---

### 5.2 Roadmap Selector Page (`/roadmap`)
```
- Hero: "What do you want to become?"
- 5 large interactive role cards (more detailed than homepage)
- Each shows: icon, title, weeks, difficulty, salary, job count, top skills badges
- Filter/sort bar: by difficulty, duration
- Hover: full card lights up with role's accent color
```

### 5.3 Individual Roadmap Page (`/roadmap/[role]`)

```
LAYOUT:
- Sticky sidebar (desktop): progress tracker showing phases
- Main content: scrollable roadmap phases

COMPONENTS:

1. RoadmapHeader
   - Role title + tagline
   - 3 quick stats: weeks, difficulty, avg salary
   - "Start Tracking Progress" button → saves to localStorage
   - Share button (copy URL)

2. RoadmapTimeline (vertical)
   - For each phase: PhaseCard component
   - Timeline line on left (grows on scroll via GSAP)
   - Phase node (circle with number) pulses when in viewport

3. PhaseCard (for each phase)
   - Phase badge: "Phase 1 · Week 1–2"
   - Title + subtitle
   - Goal statement: highlighted blue box
   - Topics list: checkboxes (tracked in localStorage)
   - Resources: tabbed (Free / Paid) with type icons
   - Projects section: ProjectCard components
   - Milestone: achievement-style completion box

4. ProjectCard
   - Title + description
   - Skills badges
   - Difficulty badge (colored)
   - Estimated time
   - "Mark Complete" button

5. ProgressTracker (sidebar / mobile bottom bar)
   - Overall % complete
   - Per-phase progress bars
   - "X of Y topics checked"

6. InternshipGuide Section (after phases)
   - Step-by-step internship guide
   - Platforms: clickable logo chips → open in new tab
   - Cold outreach template: copy-to-clipboard button

7. ResumeTips Section
   - Accordion-style expandable tips
   - Each tip with a checkbox to track

8. AiMentor Widget (floating or inline)
   - "Ask the AI Mentor" chat bubble
   - Powered by Anthropic API (claude-sonnet-4-20250514)
   - System prompt:
     "You are CareerPath AI, a career mentor for students in [role]. 
      Based on their progress (completed: [x phases]), give them their 
      most important next action in 2-3 sentences. Be specific, encouraging, 
      and practical. Never be vague."
   - User can type questions, AI responds in-context
```

---

## 6. GSAP ANIMATIONS

Install: `npm install gsap @gsap/react`

### 6.1 Core Animations Utility (`lib/gsap-utils.ts`)

```typescript
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function fadeUpOnScroll(selector: string, options = {}) {
  return gsap.fromTo(
    selector,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      ...options,
    }
  )
}

export function slideInFromLeft(selector: string) {
  return gsap.fromTo(
    selector,
    { x: -80, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    }
  )
}

export function growLine(selector: string) {
  return gsap.fromTo(
    selector,
    { scaleY: 0, transformOrigin: 'top center' },
    {
      scaleY: 1,
      duration: 1.5,
      ease: 'none',
      scrollTrigger: {
        trigger: selector,
        start: 'top 90%',
        end: 'bottom 10%',
        scrub: true,
      },
    }
  )
}

export function counterAnimation(element: Element, end: number, duration = 2) {
  const obj = { value: 0 }
  return gsap.to(obj, {
    value: end,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString() + '+'
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      once: true,
    },
  })
}

export function heroTextReveal(containerSelector: string) {
  const tl = gsap.timeline()
  tl.fromTo(
    `${containerSelector} .hero-word`,
    { y: 100, opacity: 0, rotationX: -45 },
    {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'back.out(1.4)',
    }
  )
  return tl
}
```

### 6.2 Page-specific animations to implement:
- **Hero**: `heroTextReveal` on mount
- **Stats**: `counterAnimation` for each counter on scroll
- **Role Cards**: `fadeUpOnScroll` with stagger
- **Timeline line**: `growLine` on roadmap page
- **PhaseCards**: `slideInFromLeft` alternating with `slideInFromRight`
- **Section headings**: `fadeUpOnScroll` each
- **Testimonials**: CSS `marquee` infinite scroll (no GSAP needed)
- **Scroll Progress bar**: thin blue bar at top tracking page scroll position

---

## 7. KEY COMPONENT IMPLEMENTATIONS

### 7.1 GridBackground Component

```tsx
// components/ui/GridBackground.tsx
export function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* SVG dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
        <defs>
          <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--blue-vivid)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      {/* Radial fade overlay so grid fades at edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,transparent_20%,var(--bg-void)_100%)]" />
    </div>
  )
}
```

### 7.2 GlowButton Component

```tsx
// components/ui/GlowButton.tsx
import { cn } from '@/lib/utils'

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function GlowButton({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children,
  ...props 
}: GlowButtonProps) {
  return (
    <button
      className={cn(
        'relative inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300',
        'before:absolute before:inset-0 before:rounded-full before:transition-opacity before:duration-300',
        variant === 'primary' && [
          'bg-[var(--blue-vivid)] text-white',
          'hover:bg-[var(--blue-glow)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]',
          'active:scale-[0.97]',
        ],
        variant === 'ghost' && [
          'border border-[var(--border-default)] text-[var(--text-secondary)]',
          'hover:border-[var(--blue-vivid)] hover:text-[var(--text-primary)]',
          'hover:bg-[var(--blue-subtle)]',
        ],
        size === 'sm' && 'px-4 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-base',
        size === 'lg' && 'px-8 py-4 text-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
```

### 7.3 Progress Tracker Hook

```typescript
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
```

### 7.4 AI Mentor Component

```tsx
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
```

### 7.5 API Route for AI Mentor (`app/api/mentor/route.ts`)

```typescript
import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

export async function POST(req: Request) {
  const { question, context } = await req.json()
  
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 300,
    system: `You are CareerPath AI, a career mentor for students learning ${context.roleTitle}. 
The student has completed ${context.completedPhases} of ${context.totalPhases} phases.
Give practical, specific, encouraging advice in 2-3 sentences max. 
Never be vague. Always suggest a concrete next action.`,
    messages: [{ role: 'user', content: question }],
  })

  const answer = message.content[0].type === 'text' ? message.content[0].text : ''
  return NextResponse.json({ answer })
}
```

---

## 8. SHADCN/UI COMPONENTS TO USE

Run these install commands:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add progress
npx shadcn@latest add tabs
npx shadcn@latest add accordion
npx shadcn@latest add dialog
npx shadcn@latest add sheet
npx shadcn@latest add tooltip
npx shadcn@latest add checkbox
npx shadcn@latest add separator
npx shadcn@latest add scroll-area
```

Override shadcn defaults in `components.json`:
```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "baseColor": "slate",
    "cssVariables": true
  }
}
```

---

## 9. PERFORMANCE & SEO

```typescript
// Every roadmap page needs:
export async function generateMetadata({ params }: { params: { role: string } }) {
  const roadmap = getRoadmapById(params.role)
  return {
    title: `${roadmap.title} Roadmap | CareerPath`,
    description: roadmap.tagline,
    openGraph: {
      title: `${roadmap.title} Roadmap`,
      description: roadmap.tagline,
      type: 'website',
    },
  }
}
```

Performance checklist:
- [ ] All images use `next/image` with proper `sizes` prop
- [ ] GSAP loaded only on client (`'use client'` + dynamic import with `{ ssr: false }`)
- [ ] Roadmap data is static (no API call on load)
- [ ] Progress state in localStorage (no server round-trip)
- [ ] Fonts loaded with `next/font/google` (self-hosted, no FOUT)
- [ ] `loading.tsx` files for all page routes

---

## 10. DEPLOYMENT

```bash
# Install dependencies
npm install gsap @gsap/react @anthropic-ai/sdk lucide-react framer-motion

# Environment variables (.env.local)
ANTHROPIC_API_KEY=your_key_here

# Deploy
vercel deploy --prod
```

---

## 11. FINAL QUALITY CHECKLIST

Before shipping, verify:
- [ ] All 5 roadmap pages render with full data (no placeholder text)
- [ ] Progress tracker persists on page refresh (localStorage)
- [ ] AI Mentor responds in < 3 seconds
- [ ] GSAP animations fire correctly on scroll (no jitter)
- [ ] Mobile: Navbar collapses, cards stack, timeline is vertical
- [ ] All external resource links open in `_blank` with `rel="noopener noreferrer"`
- [ ] Cold outreach templates have a working "Copy to Clipboard" button
- [ ] Platform links on internship guide open correct URLs
- [ ] Dark mode is the only mode (no light mode toggle needed)
- [ ] Lighthouse score: Performance ≥ 85, Accessibility ≥ 90
- [ ] Page transitions: smooth (add `next-view-transitions` if needed)

---

*Built for students who stop scrolling and start building.*
