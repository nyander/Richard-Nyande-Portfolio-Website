'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

type OffClockReelProps = {
  clips: readonly string[]
  label: string
}

export function OffClockReel({ clips, label }: OffClockReelProps) {
  const [active, setActive] = useState(0)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = () => {
      videoRefs.current.forEach((video, index) => {
        if (!video) {
          return
        }

        if (media.matches || index !== active) {
          video.pause()
          return
        }

        void video.play()
      })
    }

    const activeVideo = videoRefs.current[active]
    const advance = () => {
      if (media.matches || clips.length < 2) {
        if (activeVideo) {
          activeVideo.currentTime = 0
          void activeVideo.play()
        }
        return
      }

      setActive((current) => (current + 1) % clips.length)
    }

    sync()
    activeVideo?.addEventListener('ended', advance)
    activeVideo?.addEventListener('loadeddata', sync)
    media.addEventListener('change', sync)

    return () => {
      activeVideo?.removeEventListener('ended', advance)
      activeVideo?.removeEventListener('loadeddata', sync)
      media.removeEventListener('change', sync)
    }
  }, [active, clips.length])

  return (
    <div
      className="about-offclock-reel"
      style={{ '--reel-index': active } as CSSProperties}
      aria-label={label}
    >
      <div className="about-offclock-reel-track">
        {clips.map((src, index) => (
          <div className="about-offclock-reel-slide" key={src}>
            <video
              ref={(node) => {
                videoRefs.current[index] = node
              }}
              className="about-offclock-clip"
              src={encodeURI(src)}
              muted
              playsInline
              autoPlay={index === 0}
              loop={clips.length < 2}
              preload={index === 0 ? 'auto' : 'metadata'}
              aria-hidden={index === active ? undefined : true}
            />
          </div>
        ))}
      </div>
      {clips.length > 1 ? (
        <div className="about-offclock-reel-nav" role="group" aria-label="Reel clips">
          {clips.map((src, index) => (
            <button
              key={src}
              type="button"
              className="about-offclock-reel-tick"
              aria-label={`Show clip ${index + 1} of ${clips.length}`}
              aria-current={index === active ? 'true' : undefined}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
