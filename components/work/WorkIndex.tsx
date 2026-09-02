'use client'

import { useState } from 'react'
import Link from 'next/link'

import { hasImageAsset } from '@/components/media/MediaSlot'
import { SanityImage } from '@/components/media/SanityImage'
import { Reveal } from '@/components/motion/Reveal'
import { ClientLogoMarquee } from '@/components/site/ClientLogoMarquee'
import type { AltImage, ArchiveProject, CaseStudyCard, Status } from '@/lib/sanity/types'

type WorkIndexProps = {
  caseStudies: CaseStudyCard[]
  otherWork: ArchiveProject[]
}

type PreviewItem = {
  id: string
  title: string
  summary?: string
  image: AltImage | null
}

const SUMMARY_LIMIT = 140

function clipSummary(value: string) {
  const text = value.trim()
  if (text.length <= SUMMARY_LIMIT) {
    return text
  }

  return `${text.slice(0, SUMMARY_LIMIT).replace(/\s+\S*$/, '')}…`
}

function statusLabel(status: Status) {
  if (status === 'shipped') {
    return 'Case study'
  }

  if (status === 'in-progress') {
    return 'In progress'
  }

  return 'Concept'
}

function statusClassName(status: Status | 'archive') {
  if (status === 'shipped') {
    return 'work-folio-status is-shipped'
  }

  if (status === 'in-progress') {
    return 'work-folio-status is-progress'
  }

  if (status === 'concept') {
    return 'work-folio-status is-concept'
  }

  return 'work-folio-status is-archive'
}

export function WorkIndex({ caseStudies, otherWork }: WorkIndexProps) {
  const firstPreview: PreviewItem | null = caseStudies[0]
    ? {
        id: caseStudies[0]._id,
        title: caseStudies[0].title,
        summary: caseStudies[0].summary,
        image: caseStudies[0].heroImage,
      }
    : otherWork[0]
      ? {
          id: otherWork[0]._id,
          title: otherWork[0].title,
          image: otherWork[0].thumbnail,
        }
      : null

  const [active, setActive] = useState<PreviewItem | null>(firstPreview)
  const [openId, setOpenId] = useState<string | null>(caseStudies[0]?._id ?? null)

  if (caseStudies.length === 0 && otherWork.length === 0) {
    return <ClientLogoMarquee />
  }

  function toggleRow(id: string) {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section id="work" className="work-section" aria-labelledby="featured-work-heading">
      <ClientLogoMarquee />
      <Reveal>
        <header className="work-section-head">
          <p className="section-eyebrow">Portfolio</p>
          <h2 id="featured-work-heading">Selected work</h2>
          <p className="section-intro">
            Products I designed and built — from the first notes through to software in use.
          </p>
        </header>
      </Reveal>
      <div className="work-folio">
        <div className="work-folio-desktop">
          <div className="work-folio-layout">
            <div className="work-folio-list">
              {caseStudies.length > 0 ? (
                <div>
                  <p className="work-folio-tier">Case studies</p>
                  {caseStudies.map((study) => (
                    <WorkRow
                      key={study._id}
                      href={`/work/${study.slug}`}
                      title={study.title}
                      year={String(study.year)}
                      role={study.role}
                      status={statusLabel(study.status)}
                      statusClassName={statusClassName(study.status)}
                      active={active?.id === study._id}
                      onActivate={() =>
                        setActive({
                          id: study._id,
                          title: study.title,
                          summary: study.summary,
                          image: study.heroImage,
                        })
                      }
                    />
                  ))}
                </div>
              ) : null}
              {otherWork.length > 0 ? (
                <div>
                  <p className="work-folio-tier">Other work</p>
                  {otherWork.map((project) => (
                    <WorkRow
                      key={project._id}
                      href={project.href}
                      title={project.title}
                      year={String(project.year)}
                      status="Archive"
                      statusClassName={statusClassName('archive')}
                      compact
                      external={project.linkType === 'external'}
                      active={active?.id === project._id}
                      onActivate={() =>
                        setActive({
                          id: project._id,
                          title: project.title,
                          image: project.thumbnail,
                        })
                      }
                    />
                  ))}
                </div>
              ) : null}
            </div>
            {active ? <PreviewPane item={active} /> : null}
          </div>
        </div>

        <div className="work-folio-mobile">
          {caseStudies.length > 0 ? (
            <div>
              <p className="work-folio-tier">Case studies</p>
              {caseStudies.map((study) => (
                <WorkAccordionRow
                  key={study._id}
                  study={study}
                  open={openId === study._id}
                  onToggle={() => toggleRow(study._id)}
                />
              ))}
            </div>
          ) : null}
          {otherWork.length > 0 ? (
            <div>
              <p className="work-folio-tier">Other work</p>
              {otherWork.map((project) => (
                <Link
                  key={project._id}
                  href={project.href}
                  className="work-folio-row is-compact"
                  target={project.linkType === 'external' ? '_blank' : undefined}
                  rel={project.linkType === 'external' ? 'noopener noreferrer' : undefined}
                >
                  <span className="work-folio-title">{project.title}</span>
                  <span className="work-folio-meta">
                    {project.year} · Archive
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

type WorkRowProps = {
  href: string
  title: string
  year: string
  role?: string
  status: string
  statusClassName: string
  compact?: boolean
  external?: boolean
  active: boolean
  onActivate: () => void
}

function WorkRow({
  href,
  title,
  year,
  role,
  status,
  statusClassName,
  compact = false,
  external = false,
  active,
  onActivate,
}: WorkRowProps) {
  const className = [
    'work-folio-row',
    compact ? 'is-compact' : '',
    active ? 'is-active' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Link
      href={href}
      className={className}
      aria-current={active ? 'true' : undefined}
      aria-describedby="work-folio-preview"
      onMouseEnter={onActivate}
      onPointerEnter={onActivate}
      onFocus={onActivate}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
    >
      {compact ? null : <span className={statusClassName}>{status}</span>}
      <span className="work-folio-title">{title}</span>
      <span className="work-folio-meta">
        {compact ? `${year} · ${status}` : year}
        {role ? <span className="work-folio-role">{role}</span> : null}
      </span>
    </Link>
  )
}

function WorkAccordionRow({
  study,
  open,
  onToggle,
}: {
  study: CaseStudyCard
  open: boolean
  onToggle: () => void
}) {
  const panelId = `work-panel-${study._id}`
  const image = hasImageAsset(study.heroImage) && study.heroImage ? study.heroImage : null

  return (
    <div className={open ? 'work-folio-accordion is-open' : 'work-folio-accordion'}>
      <button
        type="button"
        className="work-folio-m-row"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="work-folio-m-copy">
          <span className={statusClassName(study.status)}>{statusLabel(study.status)}</span>
          <span className="work-folio-m-head">
            <span className="work-folio-title">{study.title}</span>
            <span className="work-folio-chevron" aria-hidden="true">
              ⌄
            </span>
          </span>
        </span>
      </button>
      <div
        id={panelId}
        className={open ? 'work-folio-panel is-open' : 'work-folio-panel'}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <div className="work-folio-panel-inner">
          <div className="work-folio-preview-media">
            {image ? (
              <SanityImage image={image} sizes="100vw" hideProvenance />
            ) : (
              <p className="work-folio-placeholder">Image coming soon</p>
            )}
          </div>
          <p className="work-folio-summary">{clipSummary(study.summary)}</p>
          <p className="work-folio-m-meta">
            {study.year}
            {study.role ? ` · ${study.role}` : ''}
          </p>
          <Link
            href={`/work/${study.slug}`}
            className="work-folio-m-link"
            tabIndex={open ? undefined : -1}
          >
            Read the case study →
          </Link>
        </div>
      </div>
    </div>
  )
}

function PreviewPane({ item }: { item: PreviewItem }) {
  const image = hasImageAsset(item.image) && item.image ? item.image : null

  return (
    <aside className="work-folio-preview" id="work-folio-preview" aria-live="polite">
      <div className="work-folio-preview-media">
        {image ? (
          <SanityImage
            image={image}
            sizes="(min-width: 768px) 28vw, 100vw"
            hideProvenance
          />
        ) : (
          <p className="work-folio-placeholder">Image coming soon</p>
        )}
      </div>
      <p className="work-folio-preview-copy">
        <strong>{item.title}</strong>
        {item.summary ? clipSummary(item.summary) : null}
      </p>
    </aside>
  )
}
