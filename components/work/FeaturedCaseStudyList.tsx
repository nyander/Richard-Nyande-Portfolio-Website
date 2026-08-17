import Link from 'next/link'

import type { CaseStudyCard } from '@/lib/sanity/types'
import { SanityImage } from '@/components/media/SanityImage'
import { StatusTag } from '@/components/work/StatusTag'

type FeaturedCaseStudyListProps = {
  studies: CaseStudyCard[]
}

export function FeaturedCaseStudyList({ studies }: FeaturedCaseStudyListProps) {
  if (studies.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="featured-work-heading" className="featured-work">
      <h2 id="featured-work-heading" className="section-eyebrow">
        Featured work
      </h2>
      <ul className="featured-work-list">
        {studies.map((study) => (
          <li key={study._id} className="featured-work-card">
            <Link href={`/work/${study.slug}`} className="featured-work-link">
              <div className="featured-work-media">
                {study.heroImage ? (
                  <SanityImage
                    image={study.heroImage}
                    sizes="(min-width: 640px) 40vw, 100vw"
                  />
                ) : (
                  <div className="featured-work-media-placeholder" aria-hidden="true" />
                )}
              </div>
              <div className="featured-work-body">
                <div className="featured-work-heading-row">
                  <h3>{study.title}</h3>
                  <StatusTag status={study.status} />
                </div>
                <p className="featured-work-meta">
                  {study.year} · {study.role}
                </p>
                <p className="featured-work-summary">{study.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
