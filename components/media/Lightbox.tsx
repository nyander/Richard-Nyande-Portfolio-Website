'use client'

import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { createPortal } from 'react-dom'

import { urlFor } from '@/lib/sanity/image'
import type { AltImage } from '@/lib/sanity/types'

type LightboxProps = {
  image: AltImage
  label?: string
  onClose: () => void
}

const ZOOM_MIN = 10
const ZOOM_MAX = 250

function inspectSrc(image: AltImage) {
  if (image.src) {
    return image.src
  }

  if (image.asset) {
    return urlFor(image).width(3200).quality(90).url()
  }

  return null
}

function fitScale(stage: HTMLElement, width: number, height: number) {
  if (!width || !height) {
    return 1
  }

  return Math.min(stage.clientWidth / width, stage.clientHeight / height)
}

export function Lightbox({ image, label, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ x: number; y: number; left: number; top: number } | null>(
    null
  )
  const naturalRef = useRef({ width: 0, height: 0 })
  const [percent, setPercent] = useState(100)
  const [fitPercent, setFitPercent] = useState(100)
  const [naturalWidth, setNaturalWidth] = useState(0)
  const [mounted, setMounted] = useState(false)
  const src = inspectSrc(image)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  function applyFit(width: number, height: number, snap: boolean) {
    const stage = stageRef.current
    if (!stage || !width || !height) {
      return
    }

    const nextFit = Math.max(
      ZOOM_MIN,
      Math.min(ZOOM_MAX, Math.round(fitScale(stage, width, height) * 100))
    )
    setFitPercent(nextFit)
    if (snap) {
      setPercent(nextFit)
    }
  }

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) {
      return
    }

    const observer = new ResizeObserver(() => {
      const { width, height } = naturalRef.current
      applyFit(width, height, false)
    })
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const stage = stageRef.current
    if (!stage || event.button !== 0) {
      return
    }

    stage.setPointerCapture(event.pointerId)
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: stage.scrollLeft,
      top: stage.scrollTop,
    }
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const stage = stageRef.current
    const drag = dragRef.current
    if (!stage || !drag) {
      return
    }

    stage.scrollLeft = drag.left - (event.clientX - drag.x)
    stage.scrollTop = drag.top - (event.clientY - drag.y)
  }

  function handlePointerUp() {
    dragRef.current = null
  }

  if (!src || !mounted) {
    return null
  }

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={label || image.alt || 'Expanded image'}
    >
      <button
        type="button"
        className="lightbox-backdrop"
        onClick={onClose}
        aria-label="Close expanded image"
      />
      <div className="lightbox-bar">
        <p className="lightbox-caption">{label || image.alt}</p>
        <div className="lightbox-zoom">
          <button type="button" onClick={() => setPercent(fitPercent)}>
            Fit
          </button>
          <label className="lightbox-zoom-range">
            <span className="visually-hidden">Zoom</span>
            <input
              type="range"
              min={ZOOM_MIN}
              max={ZOOM_MAX}
              step={5}
              value={percent}
              onChange={(event) => setPercent(Number(event.target.value))}
            />
          </label>
          <span className="lightbox-zoom-value">{percent}%</span>
        </div>
        <button
          type="button"
          ref={closeRef}
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close expanded image"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div
        ref={stageRef}
        className="lightbox-stage"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Full-resolution inspect view; next/image would downscale this. */}
        <img
          src={src}
          alt={image.alt}
          className="lightbox-image"
          draggable={false}
          onLoad={(event) => {
            const width = event.currentTarget.naturalWidth
            const height = event.currentTarget.naturalHeight
            naturalRef.current = { width, height }
            setNaturalWidth(width)
            applyFit(width, height, true)
          }}
          style={
            naturalWidth
              ? { width: `${Math.round((naturalWidth * percent) / 100)}px` }
              : undefined
          }
        />
      </div>
    </div>,
    document.body
  )
}
