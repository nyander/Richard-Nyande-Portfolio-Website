'use client'

import { useRef } from 'react'
import Image from 'next/image'
import type { PointerEvent as ReactPointerEvent } from 'react'

import { GATE } from '@/lib/yande-studio-media'
import { YANDE_STUDIO_LIVE_URL } from '@/lib/yande-studio'

export function YandeStudioComingSoon() {
  const stageRef = useRef<HTMLElement>(null)

  function look(event: ReactPointerEvent<HTMLElement>) {
    const stage = stageRef.current
    if (!stage || window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    const rect = stage.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    stage.style.setProperty('--look-x', x.toFixed(3))
    stage.style.setProperty('--look-y', y.toFixed(3))
  }

  function rest() {
    const stage = stageRef.current
    if (!stage) {
      return
    }

    stage.style.setProperty('--look-x', '0')
    stage.style.setProperty('--look-y', '0')
  }

  return (
    <article
      ref={stageRef}
      className="yande-soon"
      onPointerMove={look}
      onPointerLeave={rest}
    >
      <div className="yande-soon-world" aria-hidden="true">
        <div className="yande-soon-still">
          <Image
            src={GATE.src ?? '/images/yande-studio/gate-collage.png'}
            alt=""
            fill
            priority
            sizes="100vw"
            className="yande-soon-still-image"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>

      <div className="yande-soon-notice">
        <p className="yande-soon-kicker">In progress · 2026</p>
        <h1 className="yande-soon-heading">
          <Image
            src="/images/Yande Logo - 1024px.png"
            alt="Yande Studio"
            width={3167}
            height={1265}
            className="yande-soon-mark"
          />
        </h1>
        <p className="yande-soon-copy">
          Yande is a creative digital studio. It works across production, identity
          and experience.
        </p>
        <p className="yande-soon-copy">The case study is being rewritten.</p>
        <a
          className="yande-soon-live"
          href={YANDE_STUDIO_LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          yande.uk ↗
        </a>
        <span className="yande-soon-stamp" aria-hidden="true">
          Soon
        </span>
      </div>
    </article>
  )
}
