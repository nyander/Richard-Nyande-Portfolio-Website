import type { AltImage, CaseStudyCard, CaseStudyPage } from '@/lib/sanity/types'
import {
  RECRUITEWARE_CARD,
  RECRUITEWARE_LIVE_NOTE,
  RECRUITEWARE_LIVE_URL,
  RECRUITEWARE_SLUG,
  RECRUITEWARE_STUDY,
} from '@/lib/recruiteware'

const ROOT = '/images/recruiteware'

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

const RECRUITEWARE_HERO: AltImage[] = [
  localImage(
    'dashboard.png',
    'Office dashboard with day and week booking tables and charts by client'
  ),
  localImage(
    'live-candidates.png',
    'Live Candidates table with search, column toggles and a Live Updates On badge'
  ),
  localImage(
    'employee-details.png',
    'Candidate details with availability, assigned jobs and a last-audit timestamp'
  ),
  localImage(
    'convictions-docs.png',
    'Prosecutions and convictions fields on a candidate edit record'
  ),
  localImage(
    'locations.png',
    'Locations table listing branches with reference, manager and town'
  ),
]

const MODULE_SCREENSHOTS: Record<string, AltImage> = {
  'access and roles': localImage(
    'live-candidates.png',
    'Office CRM after login, with role-gated modules in the sidebar'
  ),
  'candidate lists': localImage(
    'live-candidates.png',
    'Live Candidates list with search, filters and live updates'
  ),
  'candidate profile': localImage(
    'employee-details.png',
    'Candidate details including assigned jobs, availability and last audit'
  ),
  'booking dashboards': localImage(
    'dashboard.png',
    'Booking KPI dashboard with tables and Chart.js views by client'
  ),
  'locations and clients': localImage(
    'locations.png',
    'Locations table for branches, references and managers'
  ),
  'website registration': localImage(
    'live-candidates.png',
    'Live Candidates after intake — pending versus live is a CRM status, not an inbox'
  ),
}

const MODULE_AFTER: Record<string, AltImage> = {
  'access and roles': localImage(
    'dashboard.png',
    'Dashboard as the first office screen after a gated login'
  ),
  'candidate lists': localImage(
    'live-candidates.png',
    'Searchable candidate table with live updates'
  ),
  'candidate profile': localImage(
    'convictions-docs.png',
    'Convictions tab on the same candidate as details and bookings'
  ),
  'booking dashboards': localImage(
    'dashboard.png',
    'Day and week bookings by client, including last-week difference'
  ),
  'locations and clients': localImage(
    'locations.png',
    'Branch list using the same table pattern as candidates'
  ),
  'website registration': localImage(
    'employee-details.png',
    'A candidate record in the CRM, which is where registration has to land'
  ),
}

const DEEP_DIVE_AFTER: Record<string, { image: AltImage; caption: string }> = {
  'keep the backend, replace the office': {
    image: localImage(
      'dashboard.png',
      'Office dashboard on the existing RecruitWare booking data'
    ),
    caption:
      'Office dashboard. Last-week versus this-week bookings by client, on the existing backend.',
  },
  'registration has to create a candidate': {
    image: localImage(
      'live-candidates.png',
      'Live Candidates table after a registration has become a CRM row'
    ),
    caption:
      'Live Candidates. This is where a completed application has to land for the office to use it.',
  },
  'use the existing mental model': {
    image: localImage(
      'employee-details.png',
      'Candidate record behind office login, with edit and leaver actions'
    ),
    caption:
      'Candidate details after login. Consultants enter through the existing RecruitWare session.',
  },
}

function hasVisual(image?: AltImage | null): image is AltImage {
  return Boolean(image?.asset || image?.src)
}

function preferExisting(existing: AltImage | null | undefined, fallback: AltImage): AltImage {
  return hasVisual(existing) ? existing : fallback
}

function moduleKey(title: string) {
  return title.trim().toLowerCase()
}

export function applyRecruitewareLocalMedia(study: CaseStudyPage): CaseStudyPage {
  if (study.slug !== RECRUITEWARE_SLUG) {
    return study
  }

  const source = RECRUITEWARE_STUDY
  const heroImages = (study.heroImages ?? []).filter(hasVisual)
  const productModules = source.productModules
    ? {
        ...source.productModules,
        items: source.productModules.items?.map((item) => {
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
    : source.productModules

  const deepDives = source.deepDives
    ? {
        ...source.deepDives,
        items: source.deepDives.items?.map((item) => {
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
    : source.deepDives

  return {
    ...source,
    heroImages: heroImages.length > 0 ? heroImages : RECRUITEWARE_HERO,
    productModules,
    deepDives,
    designToCode: source.designToCode
      ? {
          ...source.designToCode,
          shippedImage: preferExisting(
            study.designToCode?.shippedImage,
            RECRUITEWARE_HERO[0]
          ),
        }
      : source.designToCode,
    ogImage: preferExisting(study.ogImage, RECRUITEWARE_HERO[0]),
    liveUrl: study.liveUrl || RECRUITEWARE_LIVE_URL,
    liveNote: study.liveNote || RECRUITEWARE_LIVE_NOTE,
  }
}

export function applyRecruitewareCardMedia(study: CaseStudyCard): CaseStudyCard {
  if (study.slug !== RECRUITEWARE_SLUG) {
    return study
  }

  return {
    ...study,
    summary: RECRUITEWARE_CARD.summary,
    heroImage: hasVisual(study.heroImage) ? study.heroImage : RECRUITEWARE_HERO[0],
  }
}
