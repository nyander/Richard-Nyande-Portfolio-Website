'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from 'react'

type ModuleShotFrameProps = {
  children: ReactNode
  label?: string
  x: number
  y: number
  onInspect?: () => void
}

export function ModuleShotFrame({
  children,
  label,
  x,
  y,
  onInspect,
}: ModuleShotFrameProps) {
  const viewRef = useRef<HTMLDivElement>(null)
  const grabYRef = useRef<number | null>(null)
  const grabXRef = useRef<number | null>(null)
  const thumbYRef = useRef(1)
  const thumbXRef = useRef(1)
  const progressYRef = useRef(0)
  const progressXRef = useRef(0)
  const [overflowY, setOverflowY] = useState(false)
  const [overflowX, setOverflowX] = useState(false)
  const [progressY, setProgressY] = useState(0)
  const [progressX, setProgressX] = useState(0)
  const [thumbY, setThumbY] = useState(1)
  const [thumbX, setThumbX] = useState(1)
  const [draggingY, setDraggingY] = useState(false)
  const [draggingX, setDraggingX] = useState(false)

  const sync = useCallback(() => {
    const view = viewRef.current
    if (!view) {
      return
    }

    const maxY = view.scrollHeight - view.clientHeight
    const maxX = view.scrollWidth - view.clientWidth
    const nextOverflowY = maxY > 1
    const nextOverflowX = maxX > 1
    const nextThumbY = nextOverflowY ? view.clientHeight / view.scrollHeight : 1
    const nextThumbX = nextOverflowX ? view.clientWidth / view.scrollWidth : 1
    const nextProgressY = nextOverflowY ? view.scrollTop / maxY : 0
    const nextProgressX = nextOverflowX ? view.scrollLeft / maxX : 0

    thumbYRef.current = nextThumbY
    thumbXRef.current = nextThumbX
    progressYRef.current = nextProgressY
    progressXRef.current = nextProgressX
    setOverflowY(nextOverflowY)
    setOverflowX(nextOverflowX)
    setThumbY(nextThumbY)
    setThumbX(nextThumbX)
    setProgressY(nextProgressY)
    setProgressX(nextProgressX)
  }, [])

  const sizeImage = useCallback(() => {
    const view = viewRef.current
    const image = view?.querySelector('img')
    if (!view || !image || !image.naturalWidth) {
      return
    }

    const scale = Math.max(
      view.clientWidth / image.naturalWidth,
      view.clientHeight / image.naturalHeight
    )
    image.style.width = `${Math.round(image.naturalWidth * scale)}px`
    image.style.height = `${Math.round(image.naturalHeight * scale)}px`
    image.style.maxWidth = 'none'
  }, [])

  const applyStart = useCallback(() => {
    const view = viewRef.current
    if (!view) {
      return
    }

    sizeImage()
    view.scrollLeft = (x / 100) * Math.max(0, view.scrollWidth - view.clientWidth)
    view.scrollTop = (y / 100) * Math.max(0, view.scrollHeight - view.clientHeight)
    sync()
  }, [sizeImage, sync, x, y])

  useEffect(() => {
    const view = viewRef.current
    if (!view) {
      return
    }

    const applyWhenReady = () => {
      applyStart()
    }

    applyWhenReady()
    view.addEventListener('scroll', sync, { passive: true })
    const observer = new ResizeObserver(applyWhenReady)
    observer.observe(view)
    const image = view.querySelector('img')
    image?.addEventListener('load', applyWhenReady)

    return () => {
      view.removeEventListener('scroll', sync)
      observer.disconnect()
      image?.removeEventListener('load', applyWhenReady)
    }
  }, [applyStart, sync])

  function seekY(clientY: number, track: HTMLDivElement, offset: number) {
    const view = viewRef.current
    if (!view) {
      return
    }

    const rect = track.getBoundingClientRect()
    const thumbPx = Math.max(40, thumbYRef.current * rect.height)
    const usable = Math.max(1, rect.height - thumbPx)
    const top = Math.min(usable, Math.max(0, clientY - rect.top - offset))
    view.scrollTop = (top / usable) * (view.scrollHeight - view.clientHeight)
  }

  function seekX(clientX: number, track: HTMLDivElement, offset: number) {
    const view = viewRef.current
    if (!view) {
      return
    }

    const rect = track.getBoundingClientRect()
    const thumbPx = Math.max(40, thumbXRef.current * rect.width)
    const usable = Math.max(1, rect.width - thumbPx)
    const left = Math.min(usable, Math.max(0, clientX - rect.left - offset))
    view.scrollLeft = (left / usable) * (view.scrollWidth - view.clientWidth)
  }

  function handlePointerDownY(event: PointerEvent<HTMLDivElement>) {
    const view = viewRef.current
    const track = event.currentTarget
    if (!view) {
      return
    }

    event.preventDefault()
    track.setPointerCapture(event.pointerId)

    const rect = track.getBoundingClientRect()
    const thumbPx = Math.max(40, thumbYRef.current * rect.height)
    const thumbTop = progressYRef.current * (rect.height - thumbPx)
    const yPos = event.clientY - rect.top
    const onThumb = yPos >= thumbTop && yPos <= thumbTop + thumbPx
    const offset = onThumb ? yPos - thumbTop : thumbPx / 2

    grabYRef.current = offset
    setDraggingY(true)
    seekY(event.clientY, track, offset)
  }

  function handlePointerDownX(event: PointerEvent<HTMLDivElement>) {
    const view = viewRef.current
    const track = event.currentTarget
    if (!view) {
      return
    }

    event.preventDefault()
    track.setPointerCapture(event.pointerId)

    const rect = track.getBoundingClientRect()
    const thumbPx = Math.max(40, thumbXRef.current * rect.width)
    const thumbLeft = progressXRef.current * (rect.width - thumbPx)
    const xPos = event.clientX - rect.left
    const onThumb = xPos >= thumbLeft && xPos <= thumbLeft + thumbPx
    const offset = onThumb ? xPos - thumbLeft : thumbPx / 2

    grabXRef.current = offset
    setDraggingX(true)
    seekX(event.clientX, track, offset)
  }

  return (
    <div className="modules-shot">
      <div ref={viewRef} className="modules-shot-view" tabIndex={0}>
        {children}
      </div>
      {overflowY ? (
        <div
          className={
            draggingY ? 'modules-shot-scroll-y is-dragging' : 'modules-shot-scroll-y'
          }
          role="scrollbar"
          aria-label={label ? `Scroll ${label} screenshot` : 'Scroll screenshot'}
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressY * 100)}
          onPointerDown={handlePointerDownY}
          onPointerMove={(event) => {
            if (grabYRef.current === null) {
              return
            }
            seekY(event.clientY, event.currentTarget, grabYRef.current)
          }}
          onPointerUp={() => {
            grabYRef.current = null
            setDraggingY(false)
          }}
          onPointerCancel={() => {
            grabYRef.current = null
            setDraggingY(false)
          }}
        >
          <span
            className="modules-shot-scroll-thumb"
            style={{
              height: `${thumbY * 100}%`,
              top: `${progressY * (1 - thumbY) * 100}%`,
            }}
          />
        </div>
      ) : null}
      {overflowX ? (
        <div
          className={
            draggingX ? 'modules-shot-scroll-x is-dragging' : 'modules-shot-scroll-x'
          }
          role="scrollbar"
          aria-label={label ? `Pan ${label} screenshot` : 'Pan screenshot'}
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressX * 100)}
          onPointerDown={handlePointerDownX}
          onPointerMove={(event) => {
            if (grabXRef.current === null) {
              return
            }
            seekX(event.clientX, event.currentTarget, grabXRef.current)
          }}
          onPointerUp={() => {
            grabXRef.current = null
            setDraggingX(false)
          }}
          onPointerCancel={() => {
            grabXRef.current = null
            setDraggingX(false)
          }}
        >
          <span
            className="modules-shot-scroll-thumb"
            style={{
              width: `${thumbX * 100}%`,
              left: `${progressX * (1 - thumbX) * 100}%`,
            }}
          />
        </div>
      ) : null}
      {label || onInspect ? (
        <div className="modules-shot-meta">
          {label ? <p className="modules-media-caption">{label}</p> : null}
          {onInspect ? (
            <button type="button" className="modules-shot-expand" onClick={onInspect}>
              View full size
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
