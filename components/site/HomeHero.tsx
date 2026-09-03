'use client'

import type { CSSProperties } from 'react'
import { useControls } from 'leva'
import { HeroStamp } from '@/components/site/HeroStamp'

const LEDE =
  'I design and build digital products, systems and interactive experiences, working across product thinking, UX/UI, design systems and creative technology. From discovery and prototyping through to React, TypeScript, Next.js, APIs and production, I work across the full journey from an early idea to something people can actually use.'

function HeroRail({
  left,
  mid,
  right,
}: {
  left: string
  mid: string
  right: string
}) {
  return (
    <p className="hero-rail">
      <span>{left}</span>
      <span className="hero-rail-rule" aria-hidden="true" />
      <span>{mid}</span>
      <span className="hero-rail-rule" aria-hidden="true" />
      <span>{right}</span>
    </p>
  )
}

export function HomeHero() {
  const { version } = useControls('Layout', {
    version: {
      value: 'Original',
      options: ['Original', 'New'],
      label: 'Version',
    },
  })
  const isArchive = version === 'New'

  const stamp = useControls('Stamp', {
    size: {
      value: 0.85,
      min: 0.5,
      max: 1.6,
      step: 0.01,
      label: 'Size',
    },
    x: {
      value: 2.9,
      min: -24,
      max: 24,
      step: 0.1,
      label: 'X',
    },
    y: {
      value: 0,
      min: -24,
      max: 24,
      step: 0.1,
      label: 'Y',
    },
  })

  const postmark = useControls('Postmark', {
    x: {
      value: -2.8,
      min: -24,
      max: 24,
      step: 0.1,
      label: 'X',
    },
    y: {
      value: 12,
      min: -24,
      max: 24,
      step: 0.1,
      label: 'Y',
    },
    rotate: {
      value: -21,
      min: -180,
      max: 180,
      step: 0.5,
      label: 'Rotate',
    },
    scale: {
      value: 1.34,
      min: 0.3,
      max: 2.5,
      step: 0.01,
      label: 'Scale',
    },
    fade: {
      value: 0.55,
      min: 0,
      max: 1,
      step: 0.01,
      label: 'Fade',
    },
  })

  const logo = useControls('Logo', {
    x: {
      value: 8,
      min: -200,
      max: 200,
      step: 0.5,
      label: 'X',
    },
    y: {
      value: 132,
      min: -200,
      max: 200,
      step: 0.5,
      label: 'Y',
    },
    rotate: {
      value: -12,
      min: -180,
      max: 180,
      step: 0.5,
      label: 'Rotate',
    },
    scale: {
      value: 1,
      min: 0.3,
      max: 2,
      step: 0.01,
      label: 'Scale',
    },
  })

  const title = useControls('Title', {
    x: {
      value: 1.3,
      min: -24,
      max: 24,
      step: 0.1,
      label: 'X',
    },
    y: {
      value: 0,
      min: -24,
      max: 24,
      step: 0.1,
      label: 'Y',
    },
    size: {
      value: 2.4,
      min: 0.8,
      max: 6,
      step: 0.05,
      label: 'Size',
    },
    width: {
      value: 36.8,
      min: 8,
      max: 48,
      step: 0.1,
      label: 'Width',
    },
    weight: {
      value: 800,
      min: 400,
      max: 900,
      step: 100,
      label: 'Weight',
    },
    tracking: {
      value: 0,
      min: -0.08,
      max: 0.3,
      step: 0.005,
      label: 'Tracking',
    },
    leading: {
      value: 1.05,
      min: 0.8,
      max: 1.6,
      step: 0.01,
      label: 'Leading',
    },
  })

  const description = useControls('Description', {
    x: {
      value: 1.3,
      min: -24,
      max: 24,
      step: 0.1,
      label: 'X',
    },
    y: {
      value: 0,
      min: -24,
      max: 24,
      step: 0.1,
      label: 'Y',
    },
    width: {
      value: 31.8,
      min: 8,
      max: 40,
      step: 0.1,
      label: 'Width',
    },
    size: {
      value: 0.88,
      min: 0.6,
      max: 2.4,
      step: 0.01,
      label: 'Size',
    },
    weight: {
      value: 400,
      min: 300,
      max: 800,
      step: 100,
      label: 'Weight',
    },
    tracking: {
      value: 0,
      min: -0.05,
      max: 0.2,
      step: 0.005,
      label: 'Tracking',
    },
    leading: {
      value: 1.55,
      min: 1,
      max: 2.2,
      step: 0.01,
      label: 'Leading',
    },
  })

  return (
    <section
      className={isArchive ? 'home-hero is-archive' : 'home-hero'}
      aria-labelledby="home-hero-heading"
    >
      <div className="home-hero-texture" aria-hidden="true" />

      <div
        className="hero-stage"
        style={
          {
            '--stamp-size': String(stamp.size),
            '--stamp-x': `${stamp.x}rem`,
            '--stamp-y': `${stamp.y}rem`,
            '--postmark-x': `${postmark.x}rem`,
            '--postmark-y': `${postmark.y}rem`,
            '--postmark-rotate': `${postmark.rotate}deg`,
            '--postmark-scale': String(postmark.scale),
            '--postmark-fade': String(postmark.fade),
            '--logo-x': `${logo.x}%`,
            '--logo-y': `${logo.y}%`,
            '--logo-rotate': `${logo.rotate}deg`,
            '--logo-scale': String(logo.scale),
            '--title-x': `${title.x}rem`,
            '--title-y': `${title.y}rem`,
            '--title-size': `${title.size}rem`,
            '--title-width': `${title.width}rem`,
            '--title-weight': String(title.weight),
            '--title-tracking': `${title.tracking}em`,
            '--title-leading': String(title.leading),
            '--lede-x': `${description.x}rem`,
            '--lede-y': `${description.y}rem`,
            '--lede-width': `${description.width}rem`,
            '--lede-size': `${description.size}rem`,
            '--lede-weight': String(description.weight),
            '--lede-tracking': `${description.tracking}em`,
            '--lede-leading': String(description.leading),
          } as CSSProperties
        }
      >
        {isArchive ? null : <HeroStamp />}

        {isArchive ? (
          <div className="hero-archive">
            <div className="hero-archive-col">
              <HeroRail left="R.N.Portfolio" mid="22 / 08 / 26" right="Work" />
              <h1 id="home-hero-heading" className="hero-archive-heading">
                <span className="hero-archive-kicker">
                  <span>Product</span>
                  <span>Designer</span>
                </span>
                <span className="hero-archive-title">and Creative Technologist</span>
              </h1>
            </div>
            <div className="hero-archive-col is-copy">
              <HeroRail left="R.N.Portfolio" mid="08 / 26" right="V. 001" />
              <p className="hero-lede">{LEDE}</p>
            </div>
          </div>
        ) : (
          <div className="hero-copy">
            <div className="hero-title">
              <h1 id="home-hero-heading">Product Designer and Creative Technologist</h1>
            </div>
            <p className="hero-lede">{LEDE}</p>
          </div>
        )}
      </div>
    </section>
  )
}
