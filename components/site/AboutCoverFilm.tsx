'use client'

import { useEffect, useRef, useState } from 'react'

import { LoadScreen } from '@/components/site/SplineStage'
import { ABOUT } from '@/lib/about'

export function AboutCoverFilm() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    const markReady = () => setReady(true)
    if (video.readyState >= 2) {
      markReady()
    } else {
      video.addEventListener('loadeddata', markReady)
      video.addEventListener('canplay', markReady)
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      if (media.matches) {
        video.pause()
        return
      }

      void video.play()
    }

    sync()
    media.addEventListener('change', sync)
    return () => {
      video.removeEventListener('loadeddata', markReady)
      video.removeEventListener('canplay', markReady)
      media.removeEventListener('change', sync)
    }
  }, [])

  return (
    <figure className={ready ? 'about-cover-bleed is-ready' : 'about-cover-bleed'}>
      {ready ? null : <LoadScreen label="Loading film" />}
      <video
        ref={videoRef}
        className="about-cover-video"
        src={ABOUT.drive.film}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label="Cover film of Richard Nyande"
      />
    </figure>
  )
}
