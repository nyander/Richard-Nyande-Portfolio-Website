export const CONTACT_TO_EMAIL = 'rich.nyande@gmail.com'
export const RESEND_TEST_FROM = 'Richard Nyande <onboarding@resend.dev>'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const URL_PATTERN = /https?:\/\/[^\s]+|www\.[^\s]+/i
const MIN_SUBMIT_MS = 1500
const MAX_SUBMIT_MS = 6 * 60 * 60 * 1000

const DISPOSABLE_EMAIL_HOSTS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamail.net',
  '10minutemail.com',
  'tempmail.com',
  'temp-mail.org',
  'trashmail.com',
  'yopmail.com',
  'sharklasers.com',
  'getnada.com',
])

const SPAM_PHRASES = [
  'buy backlinks',
  'crypto airdrop',
  'guaranteed ranking',
  'increase your traffic',
  'seo package',
  'weight loss',
  'viagra',
  'casino bonus',
]

export type ContactFields = {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactFieldErrors = Partial<Record<keyof ContactFields, string>>

export function parseContactFields(input: unknown): {
  fields?: ContactFields
  errors?: ContactFieldErrors
} {
  if (!input || typeof input !== 'object') {
    return { errors: { message: 'Please complete the form.' } }
  }

  const data = input as Record<string, unknown>
  const name = typeof data.name === 'string' ? data.name.trim() : ''
  const email = typeof data.email === 'string' ? data.email.trim() : ''
  const subject = typeof data.subject === 'string' ? data.subject.trim() : ''
  const message = typeof data.message === 'string' ? data.message.trim() : ''

  const errors: ContactFieldErrors = {}

  if (name.length < 2 || name.length > 80) {
    errors.name = 'Enter your name.'
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 120) {
    errors.email = 'Enter a valid email.'
  }

  if (subject.length > 120) {
    errors.subject = 'Keep the subject under 120 characters.'
  }

  if (message.length < 10 || message.length > 4000) {
    errors.message = 'Write a short message — at least a sentence.'
  }

  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  return { fields: { name, email, subject, message } }
}

export function hasHoneypot(input: unknown) {
  if (!input || typeof input !== 'object') {
    return false
  }

  const website = (input as Record<string, unknown>).website
  return typeof website === 'string' && website.trim().length > 0
}

export function isUnusableFromAddress(from: string) {
  const host = from.split('@').pop()?.replace(/[>].*$/, '').trim().toLowerCase()
  return !host || host === 'example.com' || host.endsWith('.example.com')
}

function urlCount(value: string) {
  return value.match(/https?:\/\/[^\s]+|www\.[^\s]+/gi)?.length ?? 0
}

export function isLikelySpam(fields: ContactFields) {
  const blob = `${fields.name}\n${fields.subject}\n${fields.message}`.toLowerCase()
  const urls = urlCount(blob)

  if (urls >= 3) {
    return true
  }

  if (urls >= 2 && fields.message.length < 120) {
    return true
  }

  if (URL_PATTERN.test(fields.name) || URL_PATTERN.test(fields.email.split('@')[0] ?? '')) {
    return true
  }

  const host = fields.email.split('@')[1]?.toLowerCase()
  if (host && DISPOSABLE_EMAIL_HOSTS.has(host)) {
    return true
  }

  return SPAM_PHRASES.some((phrase) => blob.includes(phrase))
}

export function readSubmitTiming(input: unknown): 'ok' | 'fast' | 'stale' {
  if (!input || typeof input !== 'object' || !('startedAt' in input)) {
    return 'fast'
  }

  const raw = (input as { startedAt: unknown }).startedAt
  const startedAt = typeof raw === 'number' ? raw : typeof raw === 'string' ? Number(raw) : NaN

  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return 'fast'
  }

  const elapsed = Date.now() - startedAt

  if (elapsed < MIN_SUBMIT_MS) {
    return 'fast'
  }

  if (elapsed > MAX_SUBMIT_MS) {
    return 'stale'
  }

  return 'ok'
}

export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function contactEmailContent(fields: ContactFields) {
  const title = fields.subject || `Message from ${fields.name}`
  const safeName = escapeHtml(fields.name)
  const safeEmail = escapeHtml(fields.email)
  const safeSubject = escapeHtml(title)
  const safeMessage = escapeHtml(fields.message).replaceAll('\n', '<br />')

  const text = [
    `From: ${fields.name} <${fields.email}>`,
    `Subject: ${title}`,
    '',
    fields.message,
  ].join('\n')

  const html = `
    <p><strong>From:</strong> ${safeName} &lt;${safeEmail}&gt;</p>
    <p><strong>Subject:</strong> ${safeSubject}</p>
    <p>${safeMessage}</p>
  `

  return { title, text, html }
}
