'use client'

import { useEffect, useRef } from 'react'

import { SanityImage } from '@/components/media/SanityImage'
import type { AltImage } from '@/lib/sanity/types'

type LightboxProps = {
  image: AltImage
  label?: string
  onClose: () => void
}

export function Lightbox({ image, label, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={label || 'Expanded image'}>
      <button
        type="button"
        className="lightbox-backdrop"
        onClick={onClose}
        aria-label="Close expanded image"
      />
      <div className="lightbox-content">
        <button
          type="button"
          ref={closeRef}
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close expanded image"
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <SanityImage image={image} sizes="90vw" priority />
        {label ? <p className="lightbox-caption">{label}</p> : null}
      </div>
    </div>
  )
}
