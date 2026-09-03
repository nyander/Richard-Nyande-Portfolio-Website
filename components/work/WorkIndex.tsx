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
          summary: otherWork[0].summary,
          image: otherWork[0].thumbnail,
        }
      : null

  const [active, setActive] = useState<PreviewItem | null>(firstPreview)
  const [openId, setOpenId] = useState<string | null>(caseStudies[0]?._id ?? null)
  const [otherOpen, setOtherOpen] = useState(false)

  if (caseStudies.length === 0 && otherWork.length === 0) {
    return <ClientLogoMarquee />
  }

  function toggleRow(id: string) {
    setOpenId((current) => (current === id ? null : id))
  }

  function toggleOther() {
    setOtherOpen((open) => {
      const next = !open
      if (!next && caseStudies[0]) {
        setActive({
          id: caseStudies[0]._id,
          title: caseStudies[0].title,
          summary: caseStudies[0].summary,
          image: caseStudies[0].heroImage,
        })
      }
      return next
    })
  }

  const otherFolder = (listId: string) => (
    <OtherWorkFolder
      listId={listId}
      projects={otherWork}
      open={otherOpen}
      onToggle={toggleOther}
      activeId={active?.id}
      onActivate={(project) =>
        setActive({
          id: project._id,
          title: project.title,
          summary: project.summary,
          image: project.thumbnail,
        })
      }
    />
  )

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
              {otherWork.length > 0 ? otherFolder('other-work-list-desktop') : null}
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
                  id={study._id}
                  title={study.title}
                  year={study.year}
                  role={study.role}
                  summary={study.summary}
                  href={`/work/${study.slug}`}
                  image={study.heroImage}
                  status={statusLabel(study.status)}
                  statusClassName={statusClassName(study.status)}
                  cta="Read the case study →"
                  open={openId === study._id}
                  onToggle={() => toggleRow(study._id)}
                />
              ))}
            </div>
          ) : null}
          {otherWork.length > 0 ? otherFolder('other-work-list-mobile') : null}
        </div>
      </div>
    </section>
  )
}

const OTHER_WORK_LEDE =
  'WordPress and Webflow sites, and Three.js projects built while learning WebGL.'

function OtherWorkFolder({
  listId,
  projects,
  open,
  onToggle,
  activeId,
  onActivate,
}: {
  listId: string
  projects: ArchiveProject[]
  open: boolean
  onToggle: () => void
  activeId?: string
  onActivate: (project: ArchiveProject) => void
}) {
  return (
    <div className={open ? 'work-folio-other is-open' : 'work-folio-other'}>
      <button
        type="button"
        className="work-folio-other-toggle"
        aria-expanded={open}
        aria-controls={listId}
        onClick={onToggle}
      >
        <span className="work-folio-tier">Other work</span>
        <span className="work-folio-other-lede">{OTHER_WORK_LEDE}</span>
        <span className="work-folio-chevron" aria-hidden="true">
          ⌄
        </span>
      </button>
      <div
        id={listId}
        className={open ? 'work-folio-panel is-open' : 'work-folio-panel'}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <div className="work-folio-panel-inner work-folio-other-list">
          {projects.map((project) => (
            <WorkRow
              key={project._id}
              href={project.href}
              title={project.title}
              year={String(project.year)}
              role={project.listRole ?? project.role}
              status="Other work"
              statusClassName={statusClassName('archive')}
              external={project.linkType === 'external'}
              active={activeId === project._id}
              onActivate={() => onActivate(project)}
            />
          ))}
        </div>
      </div>
    </div>
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
        {year}
        {role ? <span className="work-folio-role">{role}</span> : null}
      </span>
    </Link>
  )
}

function WorkAccordionRow({
  id,
  title,
  year,
  role,
  summary,
  href,
  image,
  status,
  statusClassName,
  cta,
  open,
  onToggle,
}: {
  id: string
  title: string
  year: number
  role?: string
  summary: string
  href: string
  image: AltImage | null
  status: string
  statusClassName: string
  cta: string
  open: boolean
  onToggle: () => void
}) {
  const panelId = `work-panel-${id}`
  const media = hasImageAsset(image) && image ? image : null

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
          <span className={statusClassName}>{status}</span>
          <span className="work-folio-m-head">
            <span className="work-folio-title">{title}</span>
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
            {media ? (
              <SanityImage image={media} sizes="100vw" hideProvenance />
            ) : (
              <p className="work-folio-placeholder">Image coming soon</p>
            )}
          </div>
          <p className="work-folio-summary">{clipSummary(summary)}</p>
          <p className="work-folio-m-meta">
            {year}
            {role ? ` · ${role}` : ''}
          </p>
          <Link href={href} className="work-folio-m-link" tabIndex={open ? undefined : -1}>
            {cta}
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
