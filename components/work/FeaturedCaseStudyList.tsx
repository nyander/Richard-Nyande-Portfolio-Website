'use client'

import { useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { useControls } from 'leva'

import { hasImageAsset } from '@/components/media/MediaSlot'
import { SanityImage } from '@/components/media/SanityImage'
import { Reveal } from '@/components/motion/Reveal'
import { ClientLogoMarquee } from '@/components/site/ClientLogoMarquee'
import type { CaseStudyCard } from '@/lib/sanity/types'

type WorkPreviewCard = CaseStudyCard & {
  mark?: string
  tone?: string
}

type FeaturedCaseStudyListProps = {
  studies: CaseStudyCard[]
}

type WorkLayout = 'Bento' | 'Index' | 'Strip'

function withPreviewMeta(study: CaseStudyCard): WorkPreviewCard {
  if (study.slug === 'palm-dashboard') {
    return { ...study, mark: 'Palm', tone: '#164834' }
  }

  if (study.slug === 'yande-gadgets') {
    return { ...study, mark: 'Yande', tone: '#1C1914' }
  }

  if (study.slug === 'recruiteware') {
    return { ...study, mark: 'RW', tone: '#16233A' }
  }

  return study
}

function tileClassName(study: WorkPreviewCard, index: number) {
  const classes = ['featured-work-tile']

  if (index === 0) {
    classes.push('is-feature')
  }

  if (study.slug === 'palm-dashboard') {
    classes.push('is-brand')
  } else if (hasImageAsset(study.heroImage)) {
    classes.push('is-preview')
  } else if (study.mark) {
    classes.push('is-swatch')
  }

  return classes.join(' ')
}

function WorkSectionHead() {
  return (
    <Reveal>
      <header className="work-section-head">
        <p className="section-eyebrow">Portfolio</p>
        <h2 id="featured-work-heading">Selected work</h2>
        <p className="section-intro">
          Products I designed and built — from the first notes through to software in use.
        </p>
      </header>
    </Reveal>
  )
}

function fillSequence<T>(items: T[], minCount: number) {
  if (items.length === 0) {
    return []
  }

  const times = Math.max(1, Math.ceil(minCount / items.length))
  return Array.from({ length: times }, () => items).flat()
}

function WorkIndex({ studies }: { studies: WorkPreviewCard[] }) {
  const [active, setActive] = useState(0)
  const current = studies[active] ?? studies[0]

  if (!current) {
    return null
  }

  return (
    <div className="work-index">
      <div className="work-index-layout">
        <WorkPoster key={current.slug} study={current} />
        <ol className="work-index-list">
          {studies.map((study, index) => {
            const isActive = index === active
            const className = isActive ? 'work-index-link is-active' : 'work-index-link'

            return (
              <li key={study._id}>
                <Link
                  href={`/work/${study.slug}`}
                  className={className}
                  aria-current={isActive ? 'true' : undefined}
                  onPointerEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <span className="work-index-num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="work-index-name">{study.title}</span>
                  <span className="work-index-year">{study.year}</span>
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

function WorkPoster({ study }: { study: WorkPreviewCard }) {
  const image = hasImageAsset(study.heroImage) && study.heroImage ? study.heroImage : null
  const isBrand = study.slug === 'palm-dashboard'

  return (
    <Link
      href={`/work/${study.slug}`}
      className={isBrand || !image ? 'work-index-poster is-mark' : 'work-index-poster is-photo'}
      style={{ '--work-tone': study.tone ?? '#164834' } as CSSProperties}
    >
      <div className="work-index-poster-media">
        {image ? (
          <SanityImage image={image} sizes="(min-width: 900px) 52vw, 100vw" />
        ) : (
          <p className="work-index-poster-mark" aria-hidden="true">
            {study.mark ?? study.title}
          </p>
        )}
      </div>
      <div className="work-index-poster-copy">
        <p className="featured-work-kicker">
          {study.year}
          {study.role ? ` · ${study.role}` : ''}
        </p>
        <h3>{study.title}</h3>
        <p className="work-index-poster-summary">{study.summary || `${study.year} · ${study.role}`}</p>
        <span className="featured-work-explore">Explore project →</span>
      </div>
    </Link>
  )
}

function WorkBento({ studies }: { studies: WorkPreviewCard[] }) {
  return (
    <div className="featured-work">
      <ul className="featured-work-bento" data-count={studies.length}>
        {studies.map((study, index) => {
          const image =
            hasImageAsset(study.heroImage) && study.heroImage ? study.heroImage : null

          return (
            <li
              key={study._id}
              className={tileClassName(study, index)}
              style={study.tone ? ({ '--work-tone': study.tone } as CSSProperties) : undefined}
            >
              <Link href={`/work/${study.slug}`} className="featured-work-link">
                <div className="featured-work-media">
                  {image ? (
                    <SanityImage
                      image={image}
                      sizes={
                        index === 0
                          ? '(min-width: 900px) 72vw, 100vw'
                          : '(min-width: 900px) 34vw, 100vw'
                      }
                    />
                  ) : (
                    <div className="featured-work-media-placeholder" aria-hidden="true">
                      {study.mark ? <span className="featured-work-mark">{study.mark}</span> : null}
                    </div>
                  )}
                </div>
                <div className="featured-work-copy">
                  <p className="featured-work-kicker">{study.year}</p>
                  <h3 className="featured-work-display">{study.title}</h3>
                  <div className="featured-work-reveal">
                    <div className="featured-work-reveal-inner">
                      <p className="featured-work-meta">
                        {study.summary || `${study.year} · ${study.role}`}
                      </p>
                      <span className="featured-work-explore">Explore project →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function WorkStrip({ studies }: { studies: WorkPreviewCard[] }) {
  const sequence = fillSequence(studies, 6)

  return (
    <div className="work-strip">
      <div className="work-strip-viewport">
        <div
          className="work-strip-track"
          style={{ '--marquee-count': sequence.length } as CSSProperties}
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="work-strip-group"
              aria-hidden={copy > 0 ? true : undefined}
            >
              {sequence.map((study, index) => {
                const image =
                  hasImageAsset(study.heroImage) && study.heroImage ? study.heroImage : null
                const isBrand = study.slug === 'palm-dashboard'
                const duplicate = copy > 0 || index >= studies.length

                return (
                  <li
                    key={`${study._id}-strip-${copy}-${index}`}
                    className={duplicate ? 'is-loop' : undefined}
                  >
                    <Link
                      href={`/work/${study.slug}`}
                      className={
                        isBrand || !image ? 'work-strip-card is-mark' : 'work-strip-card is-photo'
                      }
                      tabIndex={duplicate ? -1 : undefined}
                      style={study.tone ? ({ '--work-tone': study.tone } as CSSProperties) : undefined}
                    >
                      <div className="work-strip-media">
                        {image ? (
                          <SanityImage image={image} sizes="(min-width: 900px) 36vw, 80vw" />
                        ) : (
                          <p className="work-strip-mark" aria-hidden="true">
                            {study.mark ?? study.title}
                          </p>
                        )}
                      </div>
                      <div className="work-strip-meta">
                        <span className="work-strip-num">
                          / {String((index % studies.length) + 1).padStart(3, '0')}
                        </span>
                        <span className="work-strip-name">{study.title}</span>
                        <span className="work-strip-year">{study.year}</span>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}

export function FeaturedCaseStudyList({ studies }: FeaturedCaseStudyListProps) {
  const { layout } = useControls('Work', {
    layout: {
      value: 'Bento',
      options: ['Bento', 'Index', 'Strip'] as WorkLayout[],
      label: 'Desktop',
    },
  })

  const items = studies.map(withPreviewMeta)

  if (items.length === 0) {
    return <ClientLogoMarquee />
  }

  const desktop =
    layout === 'Index' ? 'index' : layout === 'Strip' ? 'strip' : 'bento'

  return (
    <section
      id="work"
      className="work-section"
      aria-labelledby="featured-work-heading"
      data-desktop={desktop}
    >
      <ClientLogoMarquee />
      <WorkSectionHead />
      <div className="work-layouts">
        <div className="work-layout is-index">
          <WorkIndex studies={items} />
        </div>
        <div className="work-layout is-bento">
          <WorkBento studies={items} />
        </div>
        <div className="work-layout is-strip">
          <WorkStrip studies={items} />
        </div>
      </div>
    </section>
  )
}
