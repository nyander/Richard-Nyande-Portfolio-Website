'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

import type { ContextFact } from '@/lib/sanity/types'

type CaseStudyFactsSliderProps = {
  facts: ContextFact[]
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function CaseStudyFactsSlider({ facts }: CaseStudyFactsSliderProps) {
  const trackRef = useRef<HTMLDListElement>(null)
  const labelId = useId()
  const [index, setIndex] = useState(0)
  const [overflows, setOverflows] = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const sync = useCallback(() => {
    const track = trackRef.current
    if (!track) {
      return
    }

    const cards = Array.from(track.children) as HTMLElement[]
    const left = track.scrollLeft
    const card = cards[0]
    const styles = window.getComputedStyle(track)
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
    const stride = card ? card.getBoundingClientRect().width + gap : 1
    const nextIndex = Math.max(
      0,
      Math.min(cards.length - 1, Math.round(left / stride))
    )

    setIndex(nextIndex)
    setAtStart(left <= 8)
    setAtEnd(left + track.clientWidth >= track.scrollWidth - 8)
    setOverflows(track.scrollWidth > track.clientWidth + 8)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) {
      return
    }

    const observer = new ResizeObserver(sync)
    observer.observe(track)
    track.addEventListener('scroll', sync, { passive: true })
    track.addEventListener('scrollend', sync)

    return () => {
      observer.disconnect()
      track.removeEventListener('scroll', sync)
      track.removeEventListener('scrollend', sync)
    }
  }, [facts, sync])

  function scrollByCard(direction: -1 | 1) {
    const track = trackRef.current
    const card = track?.querySelector('div')
    if (!track || !card) {
      return
    }

    const styles = window.getComputedStyle(track)
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
    const amount = card.getBoundingClientRect().width + gap
    track.scrollBy({
      left: direction * amount,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
    window.requestAnimationFrame(sync)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!overflows) {
      return
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollByCard(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollByCard(-1)
    }
  }

  const position = `${String(index + 1).padStart(2, '0')} / ${String(facts.length).padStart(2, '0')}`

  return (
    <div
      className={[
        'case-study-facts-slider',
        overflows ? null : 'is-fit',
        atEnd ? 'is-at-end' : null,
      ]
        .filter(Boolean)
        .join(' ')}
      role="region"
      aria-labelledby={labelId}
      aria-roledescription={overflows ? 'carousel' : undefined}
      onKeyDown={handleKeyDown}
    >
      <p id={labelId} className="visually-hidden">
        Project overview
      </p>
      <dl
        ref={trackRef}
        className="case-study-facts"
        tabIndex={overflows ? 0 : undefined}
      >
        {facts.map((fact) => (
          <div key={`${fact.label}-${fact.value}`}>
            <dt>{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      {overflows ? (
        <div className="case-study-facts-controls">
          <p className="case-study-facts-position" aria-hidden="true">
            {position}
          </p>
          <button
            type="button"
            className="case-study-facts-arrow"
            aria-label="Previous overview facts"
            disabled={atStart}
            onClick={() => scrollByCard(-1)}
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="case-study-facts-arrow"
            aria-label="Next overview facts"
            disabled={atEnd}
            onClick={() => scrollByCard(1)}
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}
    </div>
  )
}
