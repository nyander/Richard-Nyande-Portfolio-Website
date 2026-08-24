'use client'

import { useEffect, useRef } from 'react'

import { ABOUT } from '@/lib/about'

export function AboutCoverFilm() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
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
    return () => media.removeEventListener('change', sync)
  }, [])

  return (
    <figure className="about-cover-bleed">
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
