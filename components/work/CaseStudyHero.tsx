import { hasImageAsset } from '@/components/media/MediaSlot'
import { SanityImage } from '@/components/media/SanityImage'
import { TodoPlaceholder } from '@/components/work/TodoPlaceholder'
import type { CaseStudyPage } from '@/lib/sanity/types'

const BENTO_SLOTS = 9

type CaseStudyHeroProps = {
  study: CaseStudyPage
}

export function CaseStudyHero({ study }: CaseStudyHeroProps) {
  const images = (study.heroImages ?? []).filter((image) => hasImageAsset(image))
  const hasImages = images.length > 0
  const slotCount = Math.max(images.length, BENTO_SLOTS)

  return (
    <section id="hero" className="case-study-hero" aria-labelledby="case-study-title">
      {(study.contextFacts?.length ?? 0) > 0 ? (
        <dl className="case-study-facts">
          {study.contextFacts?.map((fact) => (
            <div key={`${fact.label}-${fact.value}`}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="hero-bento" aria-hidden={hasImages ? undefined : true}>
        <div className="hero-bento-track">
          {Array.from({ length: slotCount }, (_, index) => {
            const image = hasImages ? images[index % images.length] : undefined
            const slot = (index % BENTO_SLOTS) + 1

            return (
              <div key={index} className={`hero-bento-item hero-bento-item-${slot}`}>
                {image ? (
                  <SanityImage
                    image={image}
                    sizes="(min-width: 800px) 20vw, 45vw"
                    priority={index === 0}
                  />
                ) : (
                  <div className="hero-bento-placeholder" />
                )}
              </div>
            )
          })}
        </div>
      </div>
      {!hasImages ? (
        <TodoPlaceholder
          className="hero-bento-todo"
          label="Add the project's collection of images for the hero carousel."
        />
      ) : null}
    </section>
  )
}
