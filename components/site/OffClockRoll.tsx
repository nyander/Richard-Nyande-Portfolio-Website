'use client'

import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react'

type OffClockRollProps = {
  children: ReactNode
}

export function OffClockRoll({ children }: OffClockRollProps) {
  const rollRef = useRef<HTMLOListElement>(null)
  const grabOffsetRef = useRef<number | null>(null)
  const thumbRef = useRef(1)
  const progressRef = useRef(0)
  const [overflow, setOverflow] = useState(false)
  const [progress, setProgress] = useState(0)
  const [thumb, setThumb] = useState(1)
  const [dragging, setDragging] = useState(false)

  const sync = useCallback(() => {
    const roll = rollRef.current
    if (!roll) {
      return
    }

    const max = roll.scrollWidth - roll.clientWidth
    const nextOverflow = max > 1
    const nextThumb = nextOverflow ? roll.clientWidth / roll.scrollWidth : 1
    const nextProgress = nextOverflow ? roll.scrollLeft / max : 0
    thumbRef.current = nextThumb
    progressRef.current = nextProgress
    setOverflow(nextOverflow)
    setThumb(nextThumb)
    setProgress(nextProgress)
  }, [])

  useEffect(() => {
    const roll = rollRef.current
    if (!roll) {
      return
    }

    sync()
    roll.addEventListener('scroll', sync, { passive: true })
    const observer = new ResizeObserver(sync)
    observer.observe(roll)

    return () => {
      roll.removeEventListener('scroll', sync)
      observer.disconnect()
    }
  }, [sync])

  function seek(clientX: number, track: HTMLDivElement, offset: number) {
    const roll = rollRef.current
    if (!roll) {
      return
    }

    const rect = track.getBoundingClientRect()
    const thumbPx = Math.max(56, thumbRef.current * rect.width)
    const usable = Math.max(1, rect.width - thumbPx)
    const left = Math.min(usable, Math.max(0, clientX - rect.left - offset))
    roll.scrollLeft = (left / usable) * (roll.scrollWidth - roll.clientWidth)
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const roll = rollRef.current
    const track = event.currentTarget
    if (!roll) {
      return
    }

    event.preventDefault()
    track.setPointerCapture(event.pointerId)

    const rect = track.getBoundingClientRect()
    const thumbPx = Math.max(56, thumbRef.current * rect.width)
    const thumbLeft = progressRef.current * (rect.width - thumbPx)
    const x = event.clientX - rect.left
    const onThumb = x >= thumbLeft && x <= thumbLeft + thumbPx
    const offset = onThumb ? x - thumbLeft : thumbPx / 2

    grabOffsetRef.current = offset
    setDragging(true)
    seek(event.clientX, track, offset)
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (grabOffsetRef.current === null) {
      return
    }

    seek(event.clientX, event.currentTarget, grabOffsetRef.current)
  }

  function handlePointerUp() {
    grabOffsetRef.current = null
    setDragging(false)
  }

  return (
    <div className="about-offclock-scroller">
      <ol
        ref={rollRef}
        className={dragging ? 'about-offclock-roll is-dragging' : 'about-offclock-roll'}
      >
        {children}
      </ol>
      {overflow ? (
        <div
          className={dragging ? 'about-offclock-scroll is-dragging' : 'about-offclock-scroll'}
          role="scrollbar"
          aria-controls="off-the-clock"
          aria-label="Off the clock frames"
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <span
            className="about-offclock-scroll-thumb"
            style={{
              width: `${thumb * 100}%`,
              left: `${progress * (1 - thumb) * 100}%`,
            }}
          />
        </div>
      ) : null}
    </div>
  )
}
