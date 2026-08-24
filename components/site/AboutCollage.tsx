'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { Leva, useControls } from 'leva'
import Spline from '@splinetool/react-spline'
import type { Application } from '@splinetool/runtime'

// Local copy of the published export so Chrome extensions cannot block prod.spline.design.
export const ABOUT_COLLAGE_SCENE = '/spline/who-i-am.splinecode'

// Keep the authored camera, but leave object hover / click to the scene.
function lockCamera(app: Application) {
  const orbit = (app.controls as { orbitControls?: Record<string, unknown> } | undefined)
    ?.orbitControls

  if (orbit) {
    orbit.enableZoom = false
    orbit.enablePan = false
    orbit.enableRotate = false
  }

  const canvas = app.canvas
  if (canvas) {
    canvas.style.pointerEvents = 'auto'
    canvas.style.touchAction = 'pan-y'
  }
}

export function AboutCollage() {
  const frameRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<Application | null>(null)
  const [ready, setReady] = useState(false)
  const [phoneLayout, setPhoneLayout] = useState(false)

  const syncSize = useCallback(() => {
    const app = appRef.current
    const stage = stageRef.current
    if (!app || !stage) {
      return
    }

    const width = stage.clientWidth
    const height = stage.clientHeight
    if (width < 1 || height < 1) {
      return
    }

    app.setSize(width, height)
    app.play()
    app.requestRender()
  }, [])

  const handleLoad = useCallback(
    (app: Application) => {
      appRef.current = app
      lockCamera(app)
      syncSize()
      setReady(true)
    },
    [syncSize],
  )

  useEffect(() => {
    const frame = frameRef.current
    const stage = stageRef.current
    if (!frame || !stage) {
      return
    }

    const observer = new ResizeObserver(() => syncSize())
    observer.observe(frame)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [syncSize])

  // Chrome drops the first WebGL present while the canvas is off-screen or was
  // hidden during load. Paint again when the section enters the viewport.
  useEffect(() => {
    const frame = frameRef.current
    if (!frame) {
      return
    }

    const paint = () => {
      if (ready) {
        syncSize()
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          paint()
        }
      },
      { threshold: 0.01 },
    )
    io.observe(frame)

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        paint()
      }
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [ready, syncSize])

  useEffect(() => {
    if (!ready) {
      return
    }

    let cancelled = false
    const paint = () => {
      if (!cancelled) {
        syncSize()
      }
    }

    const frameA = window.requestAnimationFrame(() => {
      paint()
      window.requestAnimationFrame(paint)
    })
    const later = window.setTimeout(paint, 250)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(frameA)
      window.clearTimeout(later)
    }
  }, [ready, syncSize])

  // Spline keeps pointer events for hover/click, but also swallows wheel.
  // Forward the wheel to the page so the collage does not trap scroll.
  useEffect(() => {
    if (!ready) {
      return
    }

    const node =
      appRef.current?.canvas ??
      stageRef.current?.querySelector('canvas') ??
      stageRef.current

    if (!node) {
      return
    }

    const onWheel = (event: Event) => {
      if (!(event instanceof WheelEvent) || event.ctrlKey) {
        return
      }

      event.preventDefault()
      event.stopPropagation()

      let dx = event.deltaX
      let dy = event.deltaY
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        dx *= 16
        dy *= 16
      } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        dx *= window.innerWidth
        dy *= window.innerHeight
      }

      window.scrollBy({ top: dy, left: dx, behavior: 'auto' })
    }

    node.addEventListener('wheel', onWheel, { passive: false, capture: true })
    return () => {
      node.removeEventListener('wheel', onWheel, true)
    }
  }, [ready])

  const phone = useControls('Who I Am collage (phone)', {
    width: {
      value: 24,
      min: 10,
      max: 40,
      step: 0.5,
      label: 'Width',
    },
    height: {
      value: 25.5,
      min: 8,
      max: 40,
      step: 0.5,
      label: 'Height',
    },
    size: {
      value: 1.85,
      min: 0.4,
      max: 3,
      step: 0.01,
      label: 'Size',
    },
    x: {
      value: 0,
      min: -16,
      max: 16,
      step: 0.1,
      label: 'X',
    },
    y: {
      value: 0,
      min: -16,
      max: 16,
      step: 0.1,
      label: 'Y',
    },
    preview: {
      value: false,
      label: 'Preview at phone width',
    },
  })

  useEffect(() => {
    const section = frameRef.current?.closest('#who-i-am')
    const media = window.matchMedia('(max-width: 800px)')
    const sync = () => {
      if (section instanceof HTMLElement) {
        section.classList.toggle('is-mobile-preview', phone.preview)
      }
      setPhoneLayout(phone.preview || media.matches)
    }

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [phone.preview])

  const collage = useControls('Who I Am collage', {
    width: {
      value: 35,
      min: 18,
      max: 80,
      step: 0.5,
      label: 'Width',
    },
    height: {
      value: 48,
      min: 18,
      max: 80,
      step: 0.5,
      label: 'Height',
    },
    size: {
      value: 1.4,
      min: 0.4,
      max: 3,
      step: 0.01,
      label: 'Size',
    },
    x: {
      value: -5.8,
      min: -24,
      max: 24,
      step: 0.1,
      label: 'X',
    },
    y: {
      value: 1.8,
      min: -24,
      max: 24,
      step: 0.1,
      label: 'Y',
    },
  })

  const active = phoneLayout ? phone : collage

  return (
    <>
      <Leva
        hidden={false}
        collapsed={false}
        titleBar={{ title: 'About', filter: false }}
        theme={{
          sizes: { rootWidth: '240px' },
        }}
      />
      <div
        ref={frameRef}
        className={ready ? 'about-collage-scene is-ready' : 'about-collage-scene'}
        style={
          {
            width: phoneLayout ? '100%' : `${active.width}rem`,
            height: `${active.height}rem`,
            '--collage-size': String(active.size),
            '--collage-x': `${active.x}rem`,
            '--collage-y': `${active.y}rem`,
          } as CSSProperties
        }
      >
        <div ref={stageRef} className="about-collage-move">
          <Spline
            scene={ABOUT_COLLAGE_SCENE}
            className="about-collage-spline"
            style={{ pointerEvents: 'auto' }}
            renderOnDemand={false}
            onLoad={handleLoad}
          />
        </div>
      </div>
    </>
  )
}
