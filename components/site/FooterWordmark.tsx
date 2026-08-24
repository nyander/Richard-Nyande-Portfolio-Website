'use client'

import { useControls } from 'leva'
import type { CSSProperties } from 'react'

const WORDMARK = 'Richard'

export function FooterWordmark() {
  // Offsets are in em so the composition holds at every viewport width, since the
  // lockup itself is sized in vw.
  const wordmark = useControls('Footer wordmark', {
    opacity: {
      value: 0.42,
      min: 0,
      max: 1,
      step: 0.01,
      label: 'Opacity',
    },
    x: {
      value: 0,
      min: -1,
      max: 1,
      step: 0.005,
      label: 'X',
    },
    y: {
      value: -0.1,
      min: -1.5,
      max: 0.5,
      step: 0.005,
      label: 'Y',
    },
  })

  return (
    <p
      className="site-footer-wordmark"
      aria-hidden="true"
      style={
        {
          '--footer-wordmark-opacity': String(wordmark.opacity),
          '--footer-wordmark-x': `${wordmark.x}em`,
          '--footer-wordmark-y': `${wordmark.y}em`,
        } as CSSProperties
      }
    >
      <span>{WORDMARK}</span>
    </p>
  )
}
