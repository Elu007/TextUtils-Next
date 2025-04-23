import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { topic } = await request.json()
  if (!topic) {
    return NextResponse.json({ error: 'Missing topic' }, { status: 400 })
  }

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an AI assistant that generates blog posts.' },
          { role: 'user', content: `Write a detailed blog post about: ${topic}` },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    })

    if (!res.ok) {
      const error = await res.json()
      return NextResponse.json({ error }, { status: res.status })
    }

    const json = await res.json()
    const content = json.choices?.[0]?.message?.content || ''
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate blog post.' },
      { status: 500 }
    )
  }
}
