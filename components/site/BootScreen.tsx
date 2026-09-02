'use client'

import { useEffect, useState } from 'react'
import { PageLoader } from '@/components/site/PageLoader'

const MIN_MS = 900
const MAX_MS = 2400
const LEAVE_MS = 520

export function BootScreen() {
  const [phase, setPhase] = useState<'in' | 'out' | 'off'>('in')

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('is-booting')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const started = Date.now()
    let leaveTimer = 0
    let offTimer = 0
    let cancelled = false
    let settled = false

    const dismiss = () => {
      if (cancelled) return
      setPhase('out')
      offTimer = window.setTimeout(() => {
        if (!cancelled) setPhase('off')
      }, reduced ? 0 : LEAVE_MS)
    }

    const finish = () => {
      if (cancelled || settled) return
      settled = true
      window.clearTimeout(cap)
      const elapsed = Date.now() - started
      const wait = reduced ? 0 : Math.max(0, MIN_MS - elapsed)
      leaveTimer = window.setTimeout(dismiss, wait)
    }

    const cap = window.setTimeout(finish, reduced ? 0 : MAX_MS)
    const fonts = document.fonts?.ready ?? Promise.resolve()
    void fonts.then(finish)

    return () => {
      cancelled = true
      window.clearTimeout(cap)
      window.clearTimeout(leaveTimer)
      window.clearTimeout(offTimer)
      root.classList.remove('is-booting')
    }
  }, [])

  useEffect(() => {
    if (phase === 'off') {
      document.documentElement.classList.remove('is-booting')
    }
  }, [phase])

  if (phase === 'off') return null

  return (
    <div
      className={phase === 'out' ? 'page-boot is-leaving' : 'page-boot'}
      role="status"
      aria-live="polite"
      aria-busy={phase === 'in'}
      aria-label="Loading"
    >
      <div className="page-boot-texture" aria-hidden="true" />
      <PageLoader />
    </div>
  )
}
