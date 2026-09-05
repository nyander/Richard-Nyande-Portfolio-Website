import type { AltImage, CaseStudyCard, CaseStudyPage } from '@/lib/sanity/types'
import { blocks } from '@/lib/case-study-blocks'

const ROOT = '/images/palm-dashboard'

function localImage(
  file: string,
  alt: string,
  caption?: string,
  provenance: AltImage['provenance'] = 'test-data'
): AltImage {
  return {
    src: `${ROOT}/${file}`,
    alt,
    caption,
    provenance,
  }
}

export const PALM_SLUG = 'palm-dashboard'

const PALM_COVER = localImage(
  'palm-logo.png',
  'Palm wordmark',
  undefined,
  'actual'
)

const PALM_LIVE_URL = 'https://palm-dashboard-lg3wc.ondigitalocean.app/'

const PALM_STATUS_SUMMARY =
  'Four modules shipped while I was there: onboarding, objectives and strategy, customer profiling, and coverage tracking. Performance analysis and coverage reporting had their structure. I left Palm PR. I am not working on this, and there is no developer continuing it.'

const PALM_WHATS_NEXT =
  "The next step identified was an LLM to compare incoming articles against a client's keywords and KPI criteria. I left before that work started, and there is no developer on the product now."

const PALM_DESIGN_TO_CODE_FRAMING =
  'Owning both design and implementation meant interaction decisions could be tested against the behaviour of the real system as they were made.'

export const PALM_CARD: CaseStudyCard = {
  _id: 'caseStudy-palm-dashboard',
  title: 'Palm Dashboard',
  slug: PALM_SLUG,
  role: 'Product Designer, Full Stack Developer',
  year: 2025,
  summary:
    'A multi-tenant PR workspace that brought campaign planning, coverage tracking and performance reporting into one place for teams and clients.',
  status: 'shipped',
  heroImage: null,
}

export const PALM_STUDY: CaseStudyPage = {
  _id: PALM_CARD._id,
  title: PALM_CARD.title,
  slug: PALM_CARD.slug,
  role: PALM_CARD.role,
  year: PALM_CARD.year,
  summary: PALM_CARD.summary,
  status: PALM_CARD.status,
  contextFacts: [
    { label: 'Client', value: 'Palm PR' },
    { label: 'Type', value: 'Multi-tenant SaaS workspace' },
    { label: 'Stack', value: 'Laravel, Inertia + React, MySQL' },
    { label: 'Team', value: 'Sole designer and developer' },
  ],
  heroImages: [],
  reframing: null,
  productModules: null,
  deepDives: null,
  designToCode: null,
  outcomeStatus: null,
  liveUrl: PALM_LIVE_URL,
  liveNote: null,
  seoTitle: 'Palm Dashboard — Product Design & Build Case Study | Richard Nyande',
  seoDescription:
    'A multi-tenant PR workspace bringing campaign planning, coverage tracking and performance reporting into one place. Product design and full-stack build for Palm PR.',
  ogImage: null,
}

const PALM_HERO: AltImage[] = [
  localImage(
    'metrics-dashboard.png',
    'Palm Dashboard metrics view showing pillar scorecards for a test client'
  ),
  localImage(
    'objectives-list.png',
    'Objectives table listing campaigns with dates and approval status'
  ),
  localImage(
    'timeline-view.png',
    'Campaign timeline showing tactics, activities and timeplans across weeks'
  ),
  localImage(
    'kpi-criteria.png',
    'KPI settings screen showing media types with global and client-specific scope tags'
  ),
  localImage(
    'landing-page.png',
    'Admin dashboard overview with client counts, pending articles and overdue work'
  ),
  localImage(
    'client-overview.png',
    'Hyatt Regency London test-client overview with performance and contact cards'
  ),
  localImage(
    'coverage-scan.png',
    'Coverage discovery screen with scan controls and pending, approved and rejected counts'
  ),
  localImage(
    'onboarding-client.png',
    'Three-step client onboarding flow on the client information step'
  ),
  localImage(
    'brand-awareness-score.png',
    'Brand Awareness Score modal showing the overall score and component breakdown'
  ),
]

const CHARLOTTE_QUOTE = {
  quote:
    'The KPI Management really helps us identify and manage articles much more quickly, and the fact that all the articles found are in one place is great. Not to mention the fact that we can upload our own as well.',
  name: 'Charlotte',
  role: 'Account Director, Palm PR',
}

const DIVE_CONSTRAINTS: Record<string, string> = {
  'from scattered documents to one connected timeline':
    'Users were largely non-technical, so navigation had to stay familiar.\nTerminology from existing client documents had to carry over so onboarding did not require retraining.',
  'from a flooded inbox to a filtered review queue':
    'Detection quality depends on what the scraping and keyword scope can reliably catch, so the interface had to make uncertainty visible rather than imply perfect coverage.\nVolume meant triage speed mattered as much as detail.',
  'from bespoke documents to one scoring structure':
    'Criteria genuinely differ by client, so the system needed real flexibility, not a fixed template.\nHad to mirror existing document logic closely enough that onboarding required no retraining.',
}

const MODULE_SCREENSHOTS: Record<string, AltImage> = {
  'client onboarding': localImage(
    'onboarding-client.png',
    'Client onboarding form collecting company details, industry and primary contact'
  ),
  'objectives and strategy': localImage(
    'objectives-list.png',
    'Objectives list for a test client, with campaign names, dates and approval status'
  ),
  'customer profiling': localImage(
    'customer-profile.png',
    'Customer profile cards for a test client, with audience segments, demographics and media'
  ),
  'coverage tracking': localImage(
    'coverage-scan.png',
    'Coverage discovery and scanning controls, with article status counts'
  ),
  'performance analysis': localImage(
    'metrics-dashboard.png',
    'Metrics dashboard with the Brand Awareness pillar active and later pillars marked coming soon'
  ),
  'coverage reporting': localImage(
    'approving-coverage-report.png',
    'Assign KPI Criteria modal for approving coverage, with media type, tier and placement fields'
  ),
}

const MODULE_AFTER: Record<string, AltImage> = {
  'client onboarding': localImage(
    'onboarding-keyword.png',
    'Keyword listing step in client onboarding, where brand terms are configured'
  ),
  'objectives and strategy': localImage(
    'timeline-view.png',
    'Objective timeline generated from tactics, activities and timeplans'
  ),
  'customer profiling': localImage(
    'customer-profile-edit.png',
    'Edit customer profile modal with structured fields for a Business Travellers segment'
  ),
  'coverage tracking': localImage(
    'coverage-history.png',
    'Completed coverage scan report with article count, keywords processed and progress log'
  ),
  'performance analysis': localImage(
    'brand-awareness-score.png',
    'Brand Awareness Score breakdown for a test client, before full data population'
  ),
  'coverage reporting': localImage(
    'approved-coverage-report.png',
    'Approved article details with keyword highlighting, KPI status and PDF and PowerPoint export'
  ),
}

const DEEP_DIVE_AFTER: Record<string, { image: AltImage; caption: string }> = {
  'from scattered documents to one connected timeline': {
    image: localImage(
      'timeline-view.png',
      'Campaign timeline showing tactic, activity and timeplan hierarchy across weeks'
    ),
    caption:
      'Designed directly through iteration in code rather than in Figma first — a deliberate trade-off given the timeline. After: objective detail, timeline view. Colour marks layer (tactic, activity, timeplan), not status.',
  },
  'from a flooded inbox to a filtered review queue': {
    image: localImage(
      'coverage-scan.png',
      'Coverage discovery space with scan controls and pending, approved and rejected counts'
    ),
    caption:
      'Coverage discovery and scanning. Articles land pending before anyone approves or rejects them.',
  },
  'from bespoke documents to one scoring structure': {
    image: localImage(
      'kpi-criteria.png',
      'KPI criteria table with media types, point values and Global scope tags'
    ),
    caption:
      'KPI criteria settings. Tabs follow the source documents; Global versus client-specific is an inline tag.',
  },
}

const DESIGN_TO_CODE_SHIPPED = localImage(
  'digital-search-reach.png',
  'Brand Awareness Score modal open on the Digital Search Reach tab',
  'Shown with a test client before full data population. Score ranges, subcomponent breakdown and tab structure carried through from design to build.'
)

function hasVisual(image?: AltImage | null): image is AltImage {
  return Boolean(image?.asset || image?.src)
}

function preferExisting(existing: AltImage | null | undefined, fallback: AltImage): AltImage {
  return hasVisual(existing) ? existing : fallback
}

function moduleKey(title: string) {
  return title.trim().toLowerCase()
}

export function applyPalmLocalMedia(study: CaseStudyPage): CaseStudyPage {
  if (study.slug !== 'palm-dashboard') {
    return study
  }

  const productModules = study.productModules
    ? {
        ...study.productModules,
        eyebrow: 'The PR workflow.',
        items: study.productModules.items?.map((item) => {
          const key = moduleKey(item.title)
          const screenshot = MODULE_SCREENSHOTS[key]
          const after = MODULE_AFTER[key]

          return {
            ...item,
            screenshot: screenshot
              ? preferExisting(item.screenshot, screenshot)
              : item.screenshot,
            beforeAfterImages: after
              ? {
                  ...item.beforeAfterImages,
                  after: preferExisting(item.beforeAfterImages?.after, after),
                }
              : item.beforeAfterImages,
          }
        }),
      }
    : study.productModules

  const deepDives = study.deepDives
    ? {
        ...study.deepDives,
        items: study.deepDives.items?.map((item) => {
          const key = item.title.trim().toLowerCase()
          const match = DEEP_DIVE_AFTER[key]
          const constraints = DIVE_CONSTRAINTS[key]
          const isCoverage = key === 'from a flooded inbox to a filtered review queue'
          const isKpi = key === 'from bespoke documents to one scoring structure'
          const isTimeline = key === 'from scattered documents to one connected timeline'

          return {
            ...item,
            quote: isCoverage
              ? CHARLOTTE_QUOTE
              : isKpi
                ? null
                : item.quote,
            constraints: constraints || item.constraints,
            outcome: isTimeline
              ? blocks(
                  'Shipped while I was there. Internal feedback credited the timeline automation specifically with removing a task that used to take around an hour per client.'
                )
              : item.outcome,
            beforeAfter: match
              ? {
                  ...item.beforeAfter,
                  after: preferExisting(item.beforeAfter?.after, match.image),
                  caption: match.caption,
                }
              : item.beforeAfter,
          }
        }),
      }
    : study.deepDives

  const outcomeStatus = study.outcomeStatus
    ? {
        ...study.outcomeStatus,
        statusSummary: PALM_STATUS_SUMMARY,
        whatsNext: PALM_WHATS_NEXT,
        quotes: (study.outcomeStatus.quotes ?? []).filter(
          (item) => item.name.trim().toLowerCase() !== 'charlotte'
        ),
      }
    : study.outcomeStatus

  return {
    ...study,
    status: PALM_CARD.status,
    heroImages: PALM_HERO,
    outcomeStatus,
    productModules,
    deepDives,
    reframing: study.reframing
      ? {
          ...study.reframing,
          eyebrow: 'Under the reporting request',
        }
      : study.reframing,
    designToCode: study.designToCode
      ? {
          ...study.designToCode,
          heading: 'Testing decisions against the live workflow',
          framing: blocks(PALM_DESIGN_TO_CODE_FRAMING),
          shippedImage: preferExisting(
            study.designToCode.shippedImage,
            DESIGN_TO_CODE_SHIPPED
          ),
        }
      : study.designToCode,
    ogImage: preferExisting(study.ogImage, PALM_HERO[0]),
    liveUrl: study.liveUrl || PALM_LIVE_URL,
    liveNote: null,
  }
}

export function applyPalmCardMedia(study: CaseStudyCard): CaseStudyCard {
  if (study.slug !== 'palm-dashboard') {
    return study
  }

  return {
    ...study,
    status: PALM_CARD.status,
    heroImage: PALM_COVER,
  }
}
