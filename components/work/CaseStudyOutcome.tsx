import { Reveal } from '@/components/motion/Reveal'
import { RestrictedPortableText } from '@/components/portable-text/RestrictedPortableText'
import { QuoteBlock } from '@/components/work/QuoteBlock'
import { StatusTag } from '@/components/work/StatusTag'
import { TodoPlaceholder } from '@/components/work/TodoPlaceholder'
import type { OutcomeStatus, ProductModule, Status } from '@/lib/sanity/types'

const STATUS_ORDER: Status[] = ['shipped', 'in-progress', 'concept']

// Fallback labels for the Palm Dashboard case study, kept only so existing
// content keeps its current grouping labels until `shortLabel` is filled in
// via Studio. New case studies should set `shortLabel` on each module
// instead of extending this map.
const MODULE_SHORT_LABEL: Record<string, string> = {
  'client onboarding': 'Onboarding',
  'objectives and strategy': 'Objectives & strategy',
  'customer profiling': 'Customer profiling',
  'coverage tracking': 'Coverage tracking',
  'performance analysis': 'Performance analysis',
  'coverage reporting': 'Coverage reporting',
}

function moduleLabel(module: ProductModule) {
  return (
    module.outcomeLabel ||
    module.shortLabel ||
    MODULE_SHORT_LABEL[module.title.toLowerCase()] ||
    module.title
  )
}

type CaseStudyOutcomeProps = {
  section: OutcomeStatus
  modules?: ProductModule[] | null
}

export function CaseStudyOutcome({ section, modules }: CaseStudyOutcomeProps) {
  const quotes = section.quotes ?? []
  const evidence = section.evidence ?? []
  const grouped = STATUS_ORDER.map((status) => ({
    status,
    titles:
      modules
        ?.filter((module) => module.status === status)
        .map((module) => moduleLabel(module)) ?? [],
  })).filter((group) => group.titles.length > 0)

  return (
    <section id="outcome" className="case-study-outcome" aria-labelledby="outcome-heading">
      <Reveal>
        {section.eyebrow ? (
          <p className="section-eyebrow">{section.eyebrow}</p>
        ) : null}
        {section.heading ? (
          <h2 id="outcome-heading">{section.heading}</h2>
        ) : (
          <h2 id="outcome-heading">Outcome</h2>
        )}
        {section.intro ? <p className="section-intro">{section.intro}</p> : null}
      </Reveal>

      {grouped.length > 0 || section.statusSummary ? (
        <Reveal className="outcome-status" delay={60}>
          {grouped.length > 0 ? (
            <ul className="outcome-status-tags">
              {grouped.map((group) => (
                <li key={group.status}>
                  <StatusTag
                    status={group.status}
                    label={section.statusLabels?.[group.status]}
                  />
                  <span>{group.titles.join(', ')}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.statusSummary ? (
            <p className="outcome-status-summary">{section.statusSummary}</p>
          ) : null}
        </Reveal>
      ) : null}

      {quotes.length > 0 ? (
        <Reveal delay={120}>
          <div className="outcome-quotes">
            {quotes.map((quote) => (
              <QuoteBlock key={`${quote.name}-${quote.quote.slice(0, 24)}`} quote={quote} />
            ))}
          </div>
        </Reveal>
      ) : null}

      <Reveal className="outcome-split" delay={60}>
        <div>
          <h3>Evidence</h3>
          {evidence.length > 0 ? (
            <ul>
              {evidence.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : (
            <TodoPlaceholder label="Add evidence points." />
          )}
          {section.evidenceBoundary ? (
            <div className="outcome-evidence-boundary">
              <h3>Evidence boundary</h3>
              <p>{section.evidenceBoundary}</p>
            </div>
          ) : null}
        </div>
        <div>
          <h3>{section.whatsNextHeading ?? "What's next"}</h3>
          {section.whatsNext ? (
            <p>{section.whatsNext}</p>
          ) : (
            <TodoPlaceholder label="Add what's next." />
          )}
        </div>
      </Reveal>

      <Reveal className="outcome-reflection">
        <h3>Reflection</h3>
        {section.reflection?.length ? (
          <RestrictedPortableText value={section.reflection} />
        ) : (
          <TodoPlaceholder label="Add reflection." />
        )}
      </Reveal>
    </section>
  )
}
