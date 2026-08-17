import { Reveal } from '@/components/motion/Reveal'
import { RestrictedPortableText } from '@/components/portable-text/RestrictedPortableText'
import { ImagePair } from '@/components/work/ImagePair'
import type { DesignToCode } from '@/lib/sanity/types'

type CaseStudyDesignToCodeProps = {
  section: DesignToCode
}

export function CaseStudyDesignToCode({ section }: CaseStudyDesignToCodeProps) {
  const decisions = section.decisions ?? []
  const tags = section.stackTags ?? []
  const caption =
    section.figmaImage?.caption || section.shippedImage?.caption

  return (
    <section id="design-to-code" className="case-study-build" aria-labelledby="build-heading">
      <Reveal>
        {section.eyebrow ? (
          <p className="section-eyebrow">{section.eyebrow}</p>
        ) : null}
        {section.heading ? (
          <h2 id="build-heading">{section.heading}</h2>
        ) : (
          <h2 id="build-heading">Design to code</h2>
        )}
        {section.intro ? <p className="section-intro">{section.intro}</p> : null}
        {section.framing?.length ? (
          <div className="build-framing">
            <RestrictedPortableText value={section.framing} />
          </div>
        ) : null}
      </Reveal>

      {decisions.length > 0 ? (
        <ol className="build-decisions">
          {decisions.map((decision, index) => (
            <Reveal as="li" key={decision._key ?? decision.title} delay={index * 80}>
              <span className="build-decision-mark" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{decision.title}</h3>
                {decision.detail ? <p>{decision.detail}</p> : null}
              </div>
            </Reveal>
          ))}
        </ol>
      ) : null}

      <h4 className="image-pair-label">Figma to shipped</h4>
      <ImagePair
        before={section.figmaImage}
        after={section.shippedImage}
        beforeLabel="Figma"
        afterLabel="Shipped"
        beforeTodo="Add the Figma state for this pair."
        afterTodo="Add the shipped state for this pair."
      />
      {caption ? <p className="image-pair-caption">{caption}</p> : null}

      {tags.length > 0 ? (
        <ul className="stack-pills">
          {tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
