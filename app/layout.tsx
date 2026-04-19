import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono, Syne } from 'next/font/google'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'

const syne = Syne({
  variable: '--font-display',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-body',
  subsets: ['latin'],
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CareerPath',
  description: 'Your Personalized Career Roadmap',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}
