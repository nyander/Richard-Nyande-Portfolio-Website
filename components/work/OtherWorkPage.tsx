import type { ReactNode } from 'react'

import { hasImageAsset } from '@/components/media/MediaSlot'
import { SanityImage } from '@/components/media/SanityImage'
import type { OtherWorkEntry } from '@/lib/other-work'

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="other-work-fact">
      <span className="other-work-fact-label">{label}</span>
      <span className="other-work-fact-value">{children}</span>
    </div>
  )
}

export function OtherWorkPage({ project }: { project: OtherWorkEntry }) {
  const still = hasImageAsset(project.thumbnail) && project.thumbnail ? project.thumbnail : null
  const dek = project.subtitle ?? project.summary
  const liveLabel = project.liveLabel ?? 'Live site'

  return (
    <article className="other-work-page">
      <header className="other-work-hero">
        {still ? (
          <div className="other-work-hero-media">
            <SanityImage
              image={still}
              sizes="100vw"
              hideProvenance
              priority
            />
          </div>
        ) : null}
        <div className="other-work-hero-copy">
          <p className="other-work-hero-eyebrow">Other work</p>
          <h1 id="case-study-title">{project.title}</h1>
          {dek ? <p className="other-work-hero-dek">{dek}</p> : null}
          <p className="other-work-hero-year">{project.year}</p>
          {project.liveUrl ? (
            <>
              <a
                className="other-work-hero-live"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {liveLabel} ↗
              </a>
              {project.liveNote ? (
                <p className="other-work-hero-note">{project.liveNote}</p>
              ) : null}
            </>
          ) : null}
        </div>
      </header>
      <div className="other-work-ledger">
        <dl className="other-work-facts">
          <Fact label="Role">{project.role}</Fact>
          {project.tools || project.kind ? (
            <Fact label="Tools">{project.tools ?? project.kind ?? ''}</Fact>
          ) : null}
          {project.employer ? <Fact label="With">{project.employer}</Fact> : null}
        </dl>
        <div className="other-work-body">
          {project.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          {project.origin ? <p className="other-work-origin">{project.origin}</p> : null}
        </div>
      </div>
    </article>
  )
}
