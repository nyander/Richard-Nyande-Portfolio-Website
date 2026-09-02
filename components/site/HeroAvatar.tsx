'use client'

import { SplineStage } from '@/components/site/SplineStage'

export const HERO_SPLINE_SCENE = '/spline/hero-portrait.splinecode'

export function HeroAvatar() {
  return (
    <SplineStage
      scene={HERO_SPLINE_SCENE}
      label="Loading portrait"
      className="hero-stamp-scene"
      stageClassName="hero-stamp-model"
      splineClassName="hero-stamp-spline"
    />
  )
}
