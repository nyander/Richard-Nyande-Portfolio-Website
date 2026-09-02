import { NextResponse } from 'next/server'
import { Resend } from 'resend'

import {
  CONTACT_TO_EMAIL,
  RESEND_TEST_FROM,
  contactEmailContent,
  hasHoneypot,
  isLikelySpam,
  isUnusableFromAddress,
  parseContactFields,
  readSubmitTiming,
} from '@/lib/contact'

const WINDOW_MS = 15 * 60 * 1000
const MAX_PER_WINDOW = 4
const attempts = new Map<string, number[]>()

function clientKey(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

function isRateLimited(key: string) {
  const now = Date.now()
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS)

  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(key, recent)
    return true
  }

  recent.push(now)
  attempts.set(key, recent)
  return false
}

function dropQuietly() {
  return NextResponse.json({ ok: true })
}

export async function POST(request: Request) {
  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Please complete the form.' }, { status: 400 })
  }

  if (hasHoneypot(payload)) {
    return dropQuietly()
  }

  const timing = readSubmitTiming(payload)

  if (timing === 'fast') {
    return dropQuietly()
  }

  if (timing === 'stale') {
    return NextResponse.json(
      { error: 'Please refresh the page and send that again.' },
      { status: 400 }
    )
  }

  const parsed = parseContactFields(payload)

  if (parsed.errors || !parsed.fields) {
    return NextResponse.json(
      { error: Object.values(parsed.errors ?? {})[0] ?? 'Please complete the form.' },
      { status: 400 }
    )
  }

  if (isLikelySpam(parsed.fields)) {
    return dropQuietly()
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL?.trim() || RESEND_TEST_FROM
  const to = process.env.CONTACT_TO_EMAIL?.trim() || CONTACT_TO_EMAIL

  if (!apiKey || isUnusableFromAddress(from)) {
    console.error('Contact form is not configured: missing API key or placeholder From address.')
    return NextResponse.json(
      { error: 'Email is not configured yet. Write to me directly instead.' },
      { status: 503 }
    )
  }

  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { error: 'Please wait a few minutes before sending another message.' },
      { status: 429 }
    )
  }

  const { title, text, html } = contactEmailContent(parsed.fields)

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: parsed.fields.email,
      subject: title,
      text,
      html,
    })

    if (error) {
      console.error('Resend contact send failed', {
        name: error.name,
        message: error.message,
      })
      return NextResponse.json(
        { error: 'The message could not be sent. Please email me directly.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Resend contact send threw', error)
    return NextResponse.json(
      { error: 'The message could not be sent. Please email me directly.' },
      { status: 502 }
    )
  }
}
