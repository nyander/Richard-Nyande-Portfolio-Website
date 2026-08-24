import type { AltImage, CaseStudyCard, CaseStudyPage } from '@/lib/sanity/types'

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

const PALM_COVER = localImage(
  'palm-logo.png',
  'Palm wordmark',
  undefined,
  'actual'
)

const PALM_LIVE_URL = 'https://palm-dashboard-lg3wc.ondigitalocean.app/'
const PALM_LIVE_NOTE = 'Login required. Accessible upon request.'

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
      'Objective detail, timeline view. Colour marks layer (tactic, activity, timeplan), not status.',
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

  const heroImages = (study.heroImages ?? []).filter(hasVisual)
  const productModules = study.productModules
    ? {
        ...study.productModules,
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
          const match = DEEP_DIVE_AFTER[item.title.trim().toLowerCase()]
          if (!match) {
            return item
          }

          return {
            ...item,
            beforeAfter: {
              ...item.beforeAfter,
              after: preferExisting(item.beforeAfter?.after, match.image),
              caption: item.beforeAfter?.caption || match.caption,
            },
          }
        }),
      }
    : study.deepDives

  return {
    ...study,
    heroImages: heroImages.length > 0 ? heroImages : PALM_HERO,
    productModules,
    deepDives,
    designToCode: study.designToCode
      ? {
          ...study.designToCode,
          shippedImage: preferExisting(
            study.designToCode.shippedImage,
            DESIGN_TO_CODE_SHIPPED
          ),
        }
      : study.designToCode,
    ogImage: preferExisting(study.ogImage, PALM_HERO[0]),
    liveUrl: study.liveUrl || PALM_LIVE_URL,
    liveNote: study.liveNote || PALM_LIVE_NOTE,
  }
}

export function applyPalmCardMedia(study: CaseStudyCard): CaseStudyCard {
  if (study.slug !== 'palm-dashboard') {
    return study
  }

  return {
    ...study,
    heroImage: PALM_COVER,
  }
}
