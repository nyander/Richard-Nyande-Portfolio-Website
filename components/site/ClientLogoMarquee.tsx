import Image from 'next/image'
import type { CSSProperties } from 'react'

import { CLIENT_LOGOS } from '@/lib/client-logos'

function fillSequence<T>(items: readonly T[], minCount: number) {
  if (items.length === 0) {
    return []
  }

  const times = Math.max(1, Math.ceil(minCount / items.length))
  return Array.from({ length: times }, () => items).flat()
}

export function ClientLogoMarquee() {
  const sequence = fillSequence(CLIENT_LOGOS, 8)

  return (
    <div className="work-marquee" role="region" aria-label="Selected clients">
      <div
        className="work-marquee-track"
        style={{ '--marquee-count': sequence.length } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="work-marquee-group"
            aria-hidden={copy > 0 ? true : undefined}
          >
            {sequence.map((logo, index) => {
              const duplicate = copy > 0 || index >= CLIENT_LOGOS.length
              const classes = ['work-marquee-item', 'is-logo', `is-${logo.fit}`]

              if (logo.ink) {
                classes.push('is-ink')
              }

              if (duplicate) {
                classes.push('is-loop')
              }

              return (
                <div
                  key={`${logo.name}-${copy}-${index}`}
                  className={classes.join(' ')}
                >
                  <Image
                    src={logo.src}
                    alt={duplicate ? '' : logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="work-marquee-logo"
                    sizes="180px"
                    unoptimized={logo.name === 'Upper Crust'}
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
