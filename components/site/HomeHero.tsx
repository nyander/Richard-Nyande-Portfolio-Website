'use client'

import type { CSSProperties } from 'react'
import { Leva, useControls } from 'leva'
import { HeroStamp } from '@/components/site/HeroStamp'

const LEDE =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'

export function HomeHero() {
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
      value: -1.8,
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
      value: 36,
      min: -200,
      max: 200,
      step: 0.5,
      label: 'X',
    },
    y: {
      value: 117,
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
    weight: {
      value: 800,
      min: 400,
      max: 900,
      step: 100,
      label: 'Weight',
    },
    tracking: {
      value: -0.01,
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
    eyebrowSize: {
      value: 0.82,
      min: 0.5,
      max: 2,
      step: 0.01,
      label: 'Eyebrow size',
    },
    eyebrowTracking: {
      value: 0.16,
      min: 0,
      max: 0.4,
      step: 0.005,
      label: 'Eyebrow tracking',
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
    <section className="home-hero" aria-labelledby="home-hero-heading">
      <Leva
        collapsed={false}
        titleBar={{ title: 'Hero', filter: false }}
        theme={{
          sizes: { rootWidth: '240px' },
        }}
      />
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
            '--title-weight': String(title.weight),
            '--title-tracking': `${title.tracking}em`,
            '--title-leading': String(title.leading),
            '--eyebrow-size': `${title.eyebrowSize}rem`,
            '--eyebrow-tracking': `${title.eyebrowTracking}em`,
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
        <HeroStamp />

        <div className="hero-copy">
          <div className="hero-title">
            <p className="hero-eyebrow">Digital</p>
            <h1 id="home-hero-heading">Product Designer</h1>
          </div>
          <p className="hero-lede">{LEDE}</p>
        </div>
      </div>
    </section>
  )
}
