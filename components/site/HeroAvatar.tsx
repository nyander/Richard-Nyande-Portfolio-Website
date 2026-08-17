'use client'

import { useState } from 'react'
import Spline from '@splinetool/react-spline'

export const HERO_SPLINE_SCENE =
  'https://prod.spline.design/cf4tHib-G1rG-iww/scene.splinecode'

export function HeroAvatar() {
  const [ready, setReady] = useState(false)

  return (
    <div className={ready ? 'hero-stamp-scene is-ready' : 'hero-stamp-scene'}>
      <div className="hero-stamp-model">
        <Spline
          scene={HERO_SPLINE_SCENE}
          className="hero-stamp-spline"
          renderOnDemand={false}
          onLoad={() => setReady(true)}
        />
      </div>
    </div>
  )
}
