import { NextResponse } from 'next/server'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  const body = await req.json() as { email?: string }
  const email = body.email?.trim().toLowerCase()

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Email no válido' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (apiKey && audienceId) {
    const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    })

    if (!res.ok) {
      const data = await res.json()
      console.error('Resend error:', data)
      return NextResponse.json({ error: 'Error al registrar el email' }, { status: 500 })
    }
  } else {
    console.log(`[Newsletter] Nuevo suscriptor (sin Resend): ${email}`)
  }

  return NextResponse.json({ success: true })
}
