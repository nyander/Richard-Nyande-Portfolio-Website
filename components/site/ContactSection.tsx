'use client'

import { useRef, useState, type FormEvent } from 'react'

import { Reveal } from '@/components/motion/Reveal'
import { MENU_CONTACT, MENU_SOCIALS } from '@/lib/nav'

const SOCIAL_HANDLES: Record<string, string> = {
  LinkedIn: 'Richard Nyande',
  Instagram: 'richxrt_',
  Behance: 'richardnyande',
  GitHub: 'nyander',
}

function socialHandle(label: string) {
  return SOCIAL_HANDLES[label] ?? label
}

type FormStatus = 'idle' | 'sending' | 'sent' | 'error'

type ContactSectionProps = {
  standalone?: boolean
}

export function ContactSection({ standalone = false }: ContactSectionProps) {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')
  const startedAt = useRef(Date.now())

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') ?? '').trim(),
          email: String(data.get('email') ?? '').trim(),
          subject: String(data.get('subject') ?? '').trim(),
          message: String(data.get('message') ?? '').trim(),
          website: String(data.get('website') ?? '').trim(),
          startedAt: startedAt.current,
        }),
      })

      const result = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        setStatus('error')
        setError(result?.error || 'The message could not be sent. Please email me directly.')
        return
      }

      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
      setError('The message could not be sent. Please email me directly.')
    }
  }

  return (
    <section
      id="contact"
      className={standalone ? 'home-contact is-page' : 'home-contact'}
      aria-labelledby="contact-heading"
    >
      <div className="home-contact-grid">
        <Reveal className="home-contact-copy">
          <h2 id="contact-heading">Get in touch</h2>
          <p className="section-intro">
            If you have a product to design and build, or a brief that needs someone who can do
            both — write to me. I read everything that comes through.
          </p>

          <form className="home-contact-form" onSubmit={handleSubmit}>
            <input
              className="home-contact-honeypot"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <label>
              Full name
              <input type="text" name="name" autoComplete="name" required maxLength={80} />
            </label>
            <label>
              Email
              <input type="email" name="email" autoComplete="email" required maxLength={120} />
            </label>
            <label>
              Subject
              <input type="text" name="subject" maxLength={120} />
            </label>
            <label>
              Message
              <textarea name="message" rows={5} required minLength={10} maxLength={4000} />
            </label>
            <button type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'}>
              {status === 'sending' ? 'Sending' : 'Submit'}
            </button>
            <p className="home-contact-note" role="status" aria-live="polite">
              {status === 'sent' ? "Sent — I'll write back to the address you left." : null}
              {status === 'error' ? (
                <>
                  {error}{' '}
                  <a href={MENU_CONTACT.mailto}>{MENU_CONTACT.email}</a>
                </>
              ) : null}
            </p>
          </form>
        </Reveal>

        <Reveal delay={80}>
          <aside className="home-contact-aside">
            <p className="home-contact-place">{MENU_CONTACT.place}</p>
            <dl className="home-contact-links">
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={MENU_CONTACT.mailto}>{MENU_CONTACT.email}</a>
                </dd>
              </div>
              {MENU_SOCIALS.map((social) => (
                <div key={social.label}>
                  <dt>{social.label}</dt>
                  <dd>
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      {socialHandle(social.label)}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </Reveal>
      </div>
    </section>
  )
}
