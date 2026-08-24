'use client'

import { useEffect, useRef } from 'react'

type MutedClipProps = {
  src: string
  label: string
  className?: string
}

export function MutedClip({ src, label, className }: MutedClipProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const play = () => {
      if (media.matches) {
        video.pause()
        return
      }

      void video.play()
    }

    const restart = () => {
      if (media.matches) {
        return
      }

      video.currentTime = 0
      void video.play()
    }

    video.loop = true
    play()
    video.addEventListener('ended', restart)
    video.addEventListener('loadeddata', play)
    media.addEventListener('change', play)

    return () => {
      video.removeEventListener('ended', restart)
      video.removeEventListener('loadeddata', play)
      media.removeEventListener('change', play)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className={className}
      src={encodeURI(src)}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-label={label}
    />
  )
}
