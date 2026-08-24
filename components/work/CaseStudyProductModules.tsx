'use client'

import { useControls } from 'leva'
import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { hasImageAsset, MediaSlot } from '@/components/media/MediaSlot'
import { Lightbox } from '@/components/media/Lightbox'
import { Reveal } from '@/components/motion/Reveal'
import { ModuleShotFrame } from '@/components/work/ModuleShotFrame'
import { RestrictedPortableText } from '@/components/portable-text/RestrictedPortableText'
import { ImagePair } from '@/components/work/ImagePair'
import { StatusTag } from '@/components/work/StatusTag'
import { toAnchor } from '@/lib/slug'
import type { ProductModule, ProductModulesSection } from '@/lib/sanity/types'

// Fallback abbreviations for the Palm Dashboard case study, kept only so
// existing content keeps its short pill labels until `shortLabel` is filled
// in via Studio. New case studies should set `shortLabel` on each module
// instead of extending this map.
const PILL_LABELS: Record<string, string> = {
  'client onboarding': 'Onboarding',
  'objectives and strategy': 'Objectives',
  'customer profiling': 'Profiling',
  'coverage tracking': 'Coverage',
  'performance analysis': 'Performance',
  'coverage reporting': 'Reporting',
}

function pillLabel(item: ProductModule) {
  return item.shortLabel || PILL_LABELS[item.title.toLowerCase()] || item.title
}

function moduleKey(item: ProductModule) {
  return item._key ?? item.title
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className="module-chevron"
      data-open={open}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden="true"
    >
      <path
        d="M3 5l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StringList({
  label,
  items,
}: {
  label: string
  items?: string[] | null
}) {
  if (!items?.length) {
    return null
  }

  return (
    <div>
      <h4>{label}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

/** Keeps the section heading pinned while the module list scrolls beneath it. */
function StickyHeader({ children }: { children: ReactNode }) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const node = sentinelRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 1 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinelRef} className="modules-sticky-sentinel" aria-hidden="true" />
      <div className={`modules-sticky-header${stuck ? ' is-stuck' : ''}`}>
        <Reveal>{children}</Reveal>
      </div>
    </>
  )
}

/** A capsule that slides between pills to mark the active module. */
function PillIndicator({
  containerRef,
  buttonRefs,
  activeKey,
}: {
  containerRef: React.RefObject<HTMLOListElement | null>
  buttonRefs: React.RefObject<Record<string, HTMLButtonElement | null>>
  activeKey?: string
}) {
  const [rect, setRect] = useState<{ x: number; y: number; width: number; height: number } | null>(
    null
  )

  useEffect(() => {
    function measure() {
      const container = containerRef.current
      const activeEl = activeKey ? buttonRefs.current[activeKey] : null
      if (!container || !activeEl) {
        return
      }
      const containerBox = container.getBoundingClientRect()
      const pillBox = activeEl.getBoundingClientRect()
      setRect({
        x: pillBox.left - containerBox.left,
        y: pillBox.top - containerBox.top,
        width: pillBox.width,
        height: pillBox.height,
      })
    }

    // Runs after refs commit, so the active pill's node is always
    // attached by the time this measures - including on first mount.
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [containerRef, buttonRefs, activeKey])

  if (!rect) {
    return null
  }

  return (
    <span
      className="module-pill-indicator"
      aria-hidden="true"
      style={{
        transform: `translate(${rect.x}px, ${rect.y}px)`,
        width: rect.width,
        height: rect.height,
      }}
    />
  )
}

type CaseStudyProductModulesProps = {
  section: ProductModulesSection
}

export function CaseStudyProductModules({
  section,
}: CaseStudyProductModulesProps) {
  const items = section.items ?? []
  const idPrefix = useId()
  const [openKey, setOpenKey] = useState<string | undefined>(
    items[0] ? moduleKey(items[0]) : undefined
  )
  const [moreOpen, setMoreOpen] = useState(false)
  const [inspecting, setInspecting] = useState(false)
  const pillsRef = useRef<HTMLOListElement>(null)
  const pillButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const crop = useControls('Module screenshot', {
    x: {
      value: 50,
      min: 0,
      max: 100,
      step: 1,
      label: 'X',
    },
    y: {
      value: 0,
      min: 0,
      max: 100,
      step: 1,
      label: 'Y',
    },
  })

  if (items.length === 0 && !section.heading && !section.eyebrow) {
    return null
  }

  const activeItem = items.find((item) => moduleKey(item) === openKey)
  const hasShot = hasImageAsset(activeItem?.screenshot)

  function selectModule(key: string) {
    if (key === openKey) {
      return
    }
    setOpenKey(key)
    setMoreOpen(false)
    setInspecting(false)
  }

  return (
    <>
    <section id="modules" className="case-study-modules" aria-labelledby="modules-heading">
      <div className="case-study-modules-inner">
        <StickyHeader>
          {section.eyebrow ? (
            <p className="section-eyebrow">{section.eyebrow}</p>
          ) : null}
          {section.heading ? (
            <h2 id="modules-heading">{section.heading}</h2>
          ) : (
            <h2 id="modules-heading">Product modules</h2>
          )}
        </StickyHeader>
        {section.intro ? <p className="section-intro">{section.intro}</p> : null}

        {items.length > 0 ? (
          <ol className="module-pills" aria-label="Module sequence" ref={pillsRef}>
            <PillIndicator
              containerRef={pillsRef}
              buttonRefs={pillButtonRefs}
              activeKey={openKey}
            />
            {items.map((item, index) => {
              const key = moduleKey(item)
              const isActive = key === openKey
              return (
                <li key={key}>
                  {index > 0 ? (
                    <span className="module-pill-arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                  <button
                    type="button"
                    ref={(el) => {
                      pillButtonRefs.current[key] = el
                    }}
                    className="module-pill"
                    aria-pressed={isActive}
                    onClick={() => selectModule(key)}
                  >
                    {pillLabel(item)}
                  </button>
                </li>
              )
            })}
          </ol>
        ) : null}

        <div className={hasShot ? 'modules-layout' : 'modules-layout is-copy-only'}>
          {hasShot ? (
            <div className="modules-media" aria-live="polite">
              <div key={openKey} className="modules-media-slide">
                <ModuleShotFrame
                  label={activeItem?.title}
                  x={crop.x}
                  y={crop.y}
                  onInspect={() => setInspecting(true)}
                >
                  <MediaSlot
                    image={activeItem?.screenshot}
                    hideProvenance
                    todo="Add a product screenshot for this module."
                  />
                </ModuleShotFrame>
              </div>
            </div>
          ) : null}

          <ol className="module-list">
            {items.map((item, index) => {
              const key = moduleKey(item)
              const isOpen = key === openKey
              const triggerId = `${idPrefix}-trigger-${toAnchor(item.title)}`
              const panelId = `${idPrefix}-panel-${toAnchor(item.title)}`

              return (
                <ModuleRow
                  key={key}
                  item={item}
                  number={index + 1}
                  isOpen={isOpen}
                  moreOpen={isOpen && moreOpen}
                  onToggle={() => selectModule(key)}
                  onToggleMore={() => setMoreOpen((prev) => !prev)}
                  triggerId={triggerId}
                  panelId={panelId}
                  revealDelay={Math.min(index, 5) * 70}
                />
              )
            })}
          </ol>
        </div>
      </div>
    </section>
    {inspecting && activeItem?.screenshot ? (
      <Lightbox
        image={activeItem.screenshot}
        label={activeItem.title}
        onClose={() => setInspecting(false)}
      />
    ) : null}
    </>
  )
}

function ModuleRow({
  item,
  number,
  isOpen,
  moreOpen,
  onToggle,
  onToggleMore,
  triggerId,
  panelId,
  revealDelay,
}: {
  item: ProductModule
  number: number
  isOpen: boolean
  moreOpen: boolean
  onToggle: () => void
  onToggleMore: () => void
  triggerId: string
  panelId: string
  revealDelay: number
}) {
  const morePanelId = `${panelId}-more`
  const hasMoreContent = Boolean(item.before?.length || item.after?.length)

  return (
    <Reveal as="li" className="module-row" delay={revealDelay}>
      <h3 className="module-heading">
        <button
          type="button"
          className="module-trigger"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="module-number">
            {String(number).padStart(2, '0')}
          </span>
          <span className="module-trigger-title">{item.title}</span>
          <StatusTag status={item.status} />
          <Chevron open={isOpen} />
        </button>
      </h3>
      {item.teaser ? <p className="module-teaser">{item.teaser}</p> : null}

      <div className="module-panel-wrap" data-state={isOpen ? 'open' : 'closed'}>
        <div
          className="module-panel-inner"
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          inert={!isOpen ? true : undefined}
        >
          <div className="module-copy">
            {item.problem?.length ? (
              <div>
                <h4>Problem</h4>
                <RestrictedPortableText value={item.problem} />
              </div>
            ) : null}
            {item.solution?.length ? (
              <div>
                <h4>Solution</h4>
                <RestrictedPortableText value={item.solution} />
              </div>
            ) : null}
          </div>

          {hasMoreContent ? (
            <>
              <button
                type="button"
                className="module-more-trigger"
                aria-expanded={moreOpen}
                aria-controls={morePanelId}
                onClick={onToggleMore}
              >
                Find out more
                <Chevron open={moreOpen} />
              </button>

              <div
                className="module-more-wrap"
                data-state={moreOpen ? 'open' : 'closed'}
              >
                <div
                  className="module-more-inner"
                  id={morePanelId}
                  inert={!moreOpen ? true : undefined}
                >
                  <div className="module-lists">
                    <StringList label="Before" items={item.before} />
                    <StringList label="After" items={item.after} />
                  </div>
                  <ImagePair
                    before={item.beforeAfterImages?.before}
                    after={item.beforeAfterImages?.after}
                    beforeTodo="Add a before image for this module."
                    afterTodo="Add an after image for this module."
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </Reveal>
  )
}
