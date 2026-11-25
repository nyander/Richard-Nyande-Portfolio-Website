'use client'

import { useState } from 'react'
import Link from 'next/link'

import { hasImageAsset } from '@/components/media/MediaSlot'
import { SanityImage } from '@/components/media/SanityImage'
import { Reveal } from '@/components/motion/Reveal'
import { ClientLogoMarquee } from '@/components/site/ClientLogoMarquee'
import { groupWorkIndex, type WorkListItem } from '@/lib/work-groups'
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

function toPreview(item: WorkListItem): PreviewItem {
  return {
    id: item.id,
    title: item.title,
    summary: item.summary,
    image: item.image,
  }
}

export function WorkIndex({ caseStudies, otherWork }: WorkIndexProps) {
  const groups = groupWorkIndex(caseStudies, otherWork)
  const firstItem = groups[0]?.items[0] ?? null
  const [active, setActive] = useState<PreviewItem | null>(
    firstItem ? toPreview(firstItem) : null
  )
  const [openId, setOpenId] = useState<string | null>(firstItem?.id ?? null)

  if (groups.length === 0) {
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
            Product systems, interactive experiences and websites, grouped by the kind of work.
          </p>
        </header>
      </Reveal>
      <div className="work-folio">
        <div className="work-folio-desktop">
          <div className="work-folio-layout">
            <div className="work-folio-list">
              {groups.map((group) => (
                <div key={group.id} className="work-folio-group">
                  <p className="work-folio-tier">{group.label}</p>
                  {group.items.map((item) => (
                    <WorkRow
                      key={item.id}
                      href={item.href}
                      title={item.title}
                      year={String(item.year)}
                      role={item.role}
                      status={item.status}
                      statusClassName={statusClassName(item.statusKind)}
                      external={item.external}
                      active={active?.id === item.id}
                      onActivate={() => setActive(toPreview(item))}
                    />
                  ))}
                </div>
              ))}
            </div>
            {active ? <PreviewPane item={active} /> : null}
          </div>
        </div>

        <div className="work-folio-mobile">
          {groups.map((group) => (
            <div key={group.id} className="work-folio-group">
              <p className="work-folio-tier">{group.label}</p>
              {group.items.map((item) => (
                <WorkAccordionRow
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  year={item.year}
                  role={item.role}
                  summary={item.summary}
                  href={item.href}
                  image={item.image}
                  status={item.status}
                  statusClassName={statusClassName(item.statusKind)}
                  cta={
                    item.external
                      ? 'Visit the studio →'
                      : item.kind === 'case'
                        ? 'Read the case study →'
                        : 'View the project →'
                  }
                  external={item.external}
                  open={openId === item.id}
                  onToggle={() => toggleRow(item.id)}
                />
              ))}
            </div>
          ))}
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
  external = false,
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
  external?: boolean
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
          <Link
            href={href}
            className="work-folio-m-link"
            tabIndex={open ? undefined : -1}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
          >
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
