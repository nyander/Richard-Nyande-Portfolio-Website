'use client'

import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

import { hasImageAsset } from '@/components/media/MediaSlot'
import { Reveal } from '@/components/motion/Reveal'
import { RestrictedPortableText } from '@/components/portable-text/RestrictedPortableText'
import { ImagePair } from '@/components/work/ImagePair'
import { QuoteBlock } from '@/components/work/QuoteBlock'
import { TodoPlaceholder } from '@/components/work/TodoPlaceholder'
import { toAnchor } from '@/lib/slug'
import type { DeepDive, DeepDivesSection } from '@/lib/sanity/types'

function constraintItems(value?: string) {
  if (!value) {
    return []
  }

  return value
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean)
}

// Fallback abbreviations for the Palm Dashboard case study, kept only so
// existing content keeps its short tab labels until `shortLabel` is filled
// in via Studio. New case studies should set `shortLabel` on each deep dive
// instead of extending this map.
const JUMP_LABELS: Record<string, string> = {
  'from scattered documents to one connected timeline':
    'Objectives & strategy',
  'from a flooded inbox to a filtered review queue': 'Coverage tracking',
  'from bespoke documents to one scoring structure': 'KPI criteria',
}

function jumpLabel(item: DeepDive) {
  return item.shortLabel || JUMP_LABELS[item.title.toLowerCase()] || item.title
}

function itemKey(item: DeepDive) {
  return item._key ?? item.title
}

type CaseStudyDeepDivesProps = {
  section: DeepDivesSection
}

export function CaseStudyDeepDives({ section }: CaseStudyDeepDivesProps) {
  const items = section.items ?? []
  const idPrefix = useId()
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [activeKey, setActiveKey] = useState<string | undefined>(
    items[0] ? itemKey(items[0]) : undefined
  )

  if (items.length === 0 && !section.heading && !section.eyebrow) {
    return null
  }

  const activeItem = items.find((item) => itemKey(item) === activeKey) ?? items[0]

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % items.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + items.length) % items.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = items.length - 1
    }

    if (nextIndex !== null) {
      event.preventDefault()
      const nextKey = itemKey(items[nextIndex])
      setActiveKey(nextKey)
      tabRefs.current[nextKey]?.focus()
    }
  }

  return (
    <section id="deep-dives" className="case-study-dives" aria-labelledby="dives-heading">
      <Reveal>
        {section.eyebrow ? (
          <p className="section-eyebrow">{section.eyebrow}</p>
        ) : null}
        {section.heading ? (
          <h2 id="dives-heading">{section.heading}</h2>
        ) : (
          <h2 id="dives-heading">Deep dives</h2>
        )}
        {section.intro ? <p className="section-intro">{section.intro}</p> : null}
      </Reveal>

      {items.length > 0 ? (
        <div className="dive-jump" role="tablist" aria-label="Deep dives">
          {items.map((item, index) => {
            const key = itemKey(item)
            const isActive = key === activeKey
            const tabId = `${idPrefix}-tab-${toAnchor(item.title)}`
            const panelId = `${idPrefix}-panel-${toAnchor(item.title)}`

            return (
              <button
                key={key}
                ref={(el) => {
                  tabRefs.current[key] = el
                }}
                type="button"
                role="tab"
                id={tabId}
                className="dive-jump-tab"
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveKey(key)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {jumpLabel(item)}
              </button>
            )
          })}
        </div>
      ) : null}

      {activeItem ? (
        <DeepDiveBlock
          item={activeItem}
          tabId={`${idPrefix}-tab-${toAnchor(activeItem.title)}`}
          panelId={`${idPrefix}-panel-${toAnchor(activeItem.title)}`}
        />
      ) : null}
    </section>
  )
}

function DeepDiveBlock({
  item,
  tabId,
  panelId,
}: {
  item: DeepDive
  tabId: string
  panelId: string
}) {
  const decisions = item.decisions ?? []
  const pair = item.beforeAfter
  const constraints = constraintItems(item.constraints)

  return (
    <article
      className="dive-block"
      id={panelId}
      role="tabpanel"
      aria-labelledby={tabId}
      tabIndex={0}
    >
      <h3>{item.title}</h3>
      {item.problem?.length ? (
        <div className="dive-problem">
          <h4>Problem</h4>
          <RestrictedPortableText value={item.problem} />
        </div>
      ) : null}

      {item.quote?.quote ? <QuoteBlock quote={item.quote} /> : null}

      <div className="dive-split">
        <div>
          <h4>Contribution</h4>
          {item.contribution ? (
            <p>{item.contribution}</p>
          ) : (
            <TodoPlaceholder label="Add contribution." />
          )}
        </div>
        <div>
          <h4>Constraints</h4>
          {constraints.length > 0 ? (
            <ul className="dive-constraints">
              {constraints.map((constraint) => (
                <li key={constraint}>{constraint}</li>
              ))}
            </ul>
          ) : (
            <TodoPlaceholder label="Add constraints." />
          )}
        </div>
      </div>

      {decisions.length > 0 ? (
        <ol className="decision-cards">
          {decisions.map((decision, index) => (
            <Reveal as="li" key={decision._key ?? decision.title} delay={index * 80}>
              <h4>{decision.title}</h4>
              {decision.detail ? <p>{decision.detail}</p> : null}
            </Reveal>
          ))}
        </ol>
      ) : null}

      {hasImageAsset(pair?.before) || hasImageAsset(pair?.after) ? (
        <>
          {hasImageAsset(pair?.before) && hasImageAsset(pair?.after) ? (
            <h4 className="image-pair-label">{pair?.label || 'Before / after'}</h4>
          ) : null}
          <ImagePair
            before={pair?.before}
            after={pair?.after}
            beforeTodo="Add a before image, or an honest note if none exists."
            afterTodo="Add an after image."
          />
          {pair?.caption ? <p className="image-pair-caption">{pair.caption}</p> : null}
        </>
      ) : null}

      <div className="dive-outcome">
        <h4>Outcome</h4>
        {item.outcome?.length ? (
          <RestrictedPortableText value={item.outcome} />
        ) : (
          <TodoPlaceholder label="Add outcome." />
        )}
      </div>
    </article>
  )
}
