'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { useControls } from 'leva'

type SheetUnrollProps = {
  labelledBy: string
  standard: ReactNode
  children: ReactNode
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function SheetUnroll({ labelledBy, standard, children }: SheetUnrollProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const paperRef = useRef<HTMLElement>(null)
  const revealRef = useRef(0)
  const readHeadRef = useRef(0)

  const sheet = useControls('Experience sheet', {
    paddingX: {
      value: 2,
      min: 0,
      max: 6,
      step: 0.05,
      label: 'Padding L/R (rem)',
    },
    scrollLock: {
      value: true,
      label: 'Lock scroll until read',
    },
  })

  useEffect(() => {
    const scene = sceneRef.current
    const inner = innerRef.current
    const paper = paperRef.current
    if (!scene || !inner || !paper) {
      return
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let running = true

    const metrics = () => {
      const viewHeight = window.innerHeight
      const pin = scene.querySelector('.sheet-unroll-pin')
      const frame = inner.parentElement
      const insetY = parseFloat(getComputedStyle(paper).top) || 0
      const padY = frame ? parseFloat(getComputedStyle(frame).paddingTop) || 0 : 0
      const fullPaper = inner.scrollHeight + padY * 2
      const pinHeight = pin instanceof HTMLElement ? pin.getBoundingClientRect().height : viewHeight
      const viewPaper = Math.max(120, pinHeight - insetY * 2)
      const travel = Math.max(viewHeight * 0.9, Math.min(fullPaper, viewPaper) * 0.85)
      const remainder = Math.max(0, fullPaper - viewPaper)
      const play = travel + remainder
      return {
        viewHeight,
        fullPaper,
        viewPaper,
        travel,
        remainder,
        play,
        sceneHeight: play + viewHeight,
      }
    }

    const sceneDocTop = () => scene.getBoundingClientRect().top + window.scrollY

    const apply = (smoothing: boolean) => {
      const m = metrics()

      if (reduce.matches) {
        scene.style.height = 'auto'
        paper.style.height = 'auto'
        inner.style.transform = 'none'
        scene.style.setProperty('--sheet-reveal', `${inner.scrollHeight}px`)
        scene.dataset.unroll = 'static'
        return
      }

      scene.style.height = `${m.sceneHeight}px`

      let scrolled = clamp(-scene.getBoundingClientRect().top, 0, m.play)

      if (sheet.scrollLock && readHeadRef.current < m.play - 1) {
        const cap = Math.min(m.play, readHeadRef.current + m.viewHeight)
        if (scrolled > cap + 1) {
          window.scrollTo({ top: sceneDocTop() + cap, behavior: 'auto' })
          scrolled = cap
        }
      }

      if (scrolled > readHeadRef.current) {
        readHeadRef.current = scrolled
      }

      const unroll = easeInOut(clamp(scrolled / m.travel, 0, 1))
      const target = unroll * Math.min(m.fullPaper, m.viewPaper)
      const next = smoothing ? revealRef.current + (target - revealRef.current) * 0.38 : target
      revealRef.current = Math.abs(target - next) < 0.4 ? target : next

      const shift = scrolled > m.travel ? Math.min(scrolled - m.travel, m.remainder) : 0

      paper.style.height = `${revealRef.current}px`
      inner.style.transform = shift ? `translate3d(0, ${-shift}px, 0)` : 'none'
      scene.style.setProperty('--sheet-unroll', unroll.toFixed(4))
      scene.style.setProperty('--sheet-reveal', `${revealRef.current}px`)
      scene.style.setProperty(
        '--sheet-curl-opacity',
        unroll > 0.02 && unroll < 0.98 ? '1' : unroll >= 0.98 ? String(clamp((1 - unroll) / 0.02, 0, 1)) : '0',
      )
      scene.dataset.unroll =
        unroll <= 0.01 ? 'idle' : unroll < 0.995 || shift < m.remainder - 1 ? 'active' : 'done'
    }

    const tick = () => {
      frame = 0
      apply(true)
      if (!running) {
        return
      }
      const m = metrics()
      const scrolled = clamp(-scene.getBoundingClientRect().top, 0, m.play)
      const target = easeInOut(clamp(scrolled / m.travel, 0, 1)) * Math.min(m.fullPaper, m.viewPaper)
      if (Math.abs(target - revealRef.current) > 0.4) {
        frame = window.requestAnimationFrame(tick)
      }
    }

    const queue = () => {
      if (frame) {
        return
      }
      frame = window.requestAnimationFrame(tick)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (!sheet.scrollLock || reduce.matches) {
        return
      }
      const m = metrics()
      if (readHeadRef.current >= m.play - 1) {
        return
      }
      if (event.key !== 'End' && event.key !== 'Home') {
        return
      }
      event.preventDefault()
      const top = sceneDocTop()
      if (event.key === 'Home') {
        window.scrollTo({ top, behavior: 'auto' })
        return
      }
      window.scrollTo({
        top: top + Math.min(m.play, readHeadRef.current + m.viewHeight),
        behavior: 'auto',
      })
    }

    apply(false)
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    window.addEventListener('keydown', onKeyDown)
    const onReduce = () => apply(false)
    reduce.addEventListener('change', onReduce)

    const observer = new ResizeObserver(queue)
    observer.observe(inner)

    return () => {
      running = false
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
      window.removeEventListener('keydown', onKeyDown)
      reduce.removeEventListener('change', onReduce)
      observer.disconnect()
      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [sheet.scrollLock])

  return (
    <div
      ref={sceneRef}
      className="sheet-unroll-scene"
      data-unroll="idle"
      style={{ '--sheet-pad-x': `${sheet.paddingX}rem` } as CSSProperties}
    >
      <div className="sheet-unroll-pin">
        <div className="sheet-unroll-backdrop">{standard}</div>
        <section
          ref={paperRef}
          id="experience"
          className="about-sheet-band sheet-unroll-paper"
          aria-labelledby={labelledBy}
        >
          <div className="sheet-unroll-frame">
            <div ref={innerRef} className="sheet-unroll-inner">
              {children}
            </div>
          </div>
          <div className="sheet-unroll-roll" aria-hidden="true" />
        </section>
      </div>
    </div>
  )
}
