import type { Reframing } from '@/lib/sanity/types'
import { RestrictedPortableText } from '@/components/portable-text/RestrictedPortableText'
import { Reveal } from '@/components/motion/Reveal'

type CaseStudyReframingProps = {
  reframing: Reframing
}

const BLOCKS = [
  { key: 'initialProposal', title: 'Initial proposal' },
  { key: 'discovery', title: 'Discovery' },
  { key: 'productResponse', title: 'Product response' },
] as const

export function CaseStudyReframing({ reframing }: CaseStudyReframingProps) {
  const hasColumns = BLOCKS.some((block) => reframing[block.key]?.length)
  const hasChrome = Boolean(
    reframing.eyebrow || reframing.heading || reframing.intro
  )

  if (!hasColumns && !hasChrome) {
    return null
  }

  const headingId = reframing.heading ? 'reframing-heading' : undefined

  return (
    <section id="reframing" className="case-study-reframing" aria-labelledby={headingId}>
      <Reveal>
        {reframing.eyebrow ? (
          <p className="section-eyebrow">{reframing.eyebrow}</p>
        ) : null}
        {reframing.heading ? (
          <h2 id={headingId}>{reframing.heading}</h2>
        ) : null}
        {reframing.intro ? (
          <p className="section-intro">{reframing.intro}</p>
        ) : null}
      </Reveal>
      {hasColumns ? (
        <div className="reframing-columns">
          {BLOCKS.map((block, index) => {
            const value = reframing[block.key]
            if (!value?.length) {
              return null
            }

            return (
              <Reveal key={block.key} delay={index * 90}>
                <h3>{block.title}</h3>
                <RestrictedPortableText value={value} />
              </Reveal>
            )
          })}
        </div>
      ) : null}
    </section>
  )
}
