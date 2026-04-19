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
