import Link from 'next/link'

import { hasImageAsset } from '@/components/media/MediaSlot'
import { SanityImage } from '@/components/media/SanityImage'
import type { CaseStudyCard } from '@/lib/sanity/types'

type FeaturedCaseStudyListProps = {
  studies: CaseStudyCard[]
}

function tileClassName(study: CaseStudyCard, index: number) {
  const classes = ['featured-work-tile']

  if (index === 0) {
    classes.push('is-feature')
  }

  if (study.slug === 'palm-dashboard') {
    classes.push('is-brand')
  } else if (hasImageAsset(study.heroImage)) {
    classes.push('is-photo')
  }

  return classes.join(' ')
}

export function FeaturedCaseStudyList({ studies }: FeaturedCaseStudyListProps) {
  if (studies.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="featured-work-heading" className="featured-work">
      <h2 id="featured-work-heading" className="visually-hidden">
        Work
      </h2>
      <ul className="featured-work-bento" data-count={studies.length}>
        {studies.map((study, index) => {
          const image =
            hasImageAsset(study.heroImage) && study.heroImage
              ? study.heroImage
              : null

          return (
            <li key={study._id} className={tileClassName(study, index)}>
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
                    <div
                      className="featured-work-media-placeholder"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className="featured-work-copy">
                  <h3 className="featured-work-display">{study.title}</h3>
                  <div className="featured-work-reveal">
                    <div className="featured-work-reveal-inner">
                      <p className="featured-work-meta">
                        {study.summary || `${study.year} · ${study.role}`}
                      </p>
                      <span className="featured-work-explore">
                        Explore project →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
