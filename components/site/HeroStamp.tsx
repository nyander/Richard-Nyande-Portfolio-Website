'use client'

import { useCallback, useRef, type PointerEvent } from 'react'
import Image from 'next/image'
import { HeroAvatar } from '@/components/site/HeroAvatar'
import { HeroSignature } from '@/components/site/HeroSignature'

function Postmark() {
  return (
    <div className="hero-postmark" aria-hidden="true">
      <Image
        src="/hero/Stamp Design.png"
        alt=""
        width={555}
        height={685}
        loading="eager"
        fetchPriority="high"
        className="hero-postmark-mark"
      />
    </div>
  )
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

export function HeroStamp() {
  const stampRef = useRef<HTMLDivElement>(null)

  const aimPeel = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const stamp = stampRef.current
    if (!stamp) return

    const rect = stamp.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return

    const dx = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1))
    const dy = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1))
    const edge = smoothstep(0.16, 0.52, Math.hypot(dx, dy))
    const originX = 50 - dx * 50 * edge
    const originY = 50 - dy * 50 * edge

    stamp.style.setProperty('--stamp-dir-x', dx.toFixed(4))
    stamp.style.setProperty('--stamp-dir-y', dy.toFixed(4))
    stamp.style.setProperty('--stamp-edge', edge.toFixed(4))
    stamp.style.setProperty('--stamp-ox', `${originX.toFixed(2)}%`)
    stamp.style.setProperty('--stamp-oy', `${originY.toFixed(2)}%`)
  }, [])

  return (
    <div className="hero-stamp-block">
      <Postmark />
      <HeroSignature />
      <div
        ref={stampRef}
        className="hero-stamp-move"
        onPointerEnter={aimPeel}
        onPointerMove={aimPeel}
      >
        <div className="hero-stamp-shadows" aria-hidden="true">
          <div className="hero-stamp-shadow is-soft" />
          <div className="hero-stamp-shadow is-contact" />
        </div>
        <div className="hero-stamp-lift">
          <div className="hero-stamp-underside" aria-hidden="true" />
          <div className="hero-stamp" aria-label="Interactive 3D portrait of Richard Nyande">
            <div className="hero-stamp-paper">
              <HeroAvatar />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
