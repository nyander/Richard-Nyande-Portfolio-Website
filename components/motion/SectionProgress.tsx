'use client'

import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'

type SectionProgressItem = {
  id: string
  label: string
}

const SECTIONS: SectionProgressItem[] = [
  { id: 'hero', label: 'Overview' },
  { id: 'reframing', label: 'Reframing' },
  { id: 'modules', label: 'Product modules' },
  { id: 'deep-dives', label: 'Design deep-dives' },
  { id: 'design-to-code', label: 'Design to code' },
  { id: 'outcome', label: 'Outcome and status' },
]

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function SectionProgress() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id)

  useEffect(() => {
    const elements = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (el): el is HTMLElement => el !== null
    )

    if (elements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length === 0) {
          return
        }
        const best = visible.reduce((a, b) =>
          a.intersectionRatio >= b.intersectionRatio ? a : b
        )
        setActiveId(best.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function handleClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id)
    if (!el) {
      return
    }
    event.preventDefault()
    el.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <nav className="section-progress" aria-label="Section progress">
      <ol>
        {SECTIONS.map((section, index) => {
          const isActive = section.id === activeId
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="section-progress-marker"
                aria-current={isActive ? 'true' : undefined}
                aria-label={`Jump to ${section.label}`}
                onClick={(event) => handleClick(event, section.id)}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
