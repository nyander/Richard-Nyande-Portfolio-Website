import type { AltImage, CaseStudyCard, CaseStudyPage } from '@/lib/sanity/types'
import {
  RECRUITEWARE_LIVE_NOTE,
  RECRUITEWARE_LIVE_URL,
  RECRUITEWARE_SLUG,
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
  'from a wordpress shell to a front that can share apis': {
    image: localImage(
      'dashboard.png',
      'Laravel office dashboard on the existing RecruitWare data'
    ),
    caption:
      'Office dashboard. Chart.js on Laravel and React — not a WordPress template over the old PHP table.',
  },
  'from an email of form fields to a row in the crm': {
    image: localImage(
      'live-candidates.png',
      'Live Candidates table after a registration has become a CRM row'
    ),
    caption:
      'Live Candidates. A registration that only emails the office never appears here.',
  },
  'from use-it-now to roles before screens': {
    image: localImage(
      'employee-details.png',
      'Candidate record behind office login, with edit and leaver actions'
    ),
    caption:
      'Candidate details after login. Correct credentials used to return a 404 until the Notes redirect and session cookie were kept.',
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
    heroImages: heroImages.length > 0 ? heroImages : RECRUITEWARE_HERO,
    productModules,
    deepDives,
    designToCode: study.designToCode
      ? {
          ...study.designToCode,
          shippedImage: preferExisting(study.designToCode.shippedImage, RECRUITEWARE_HERO[0]),
        }
      : study.designToCode,
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
    heroImage: hasVisual(study.heroImage) ? study.heroImage : RECRUITEWARE_HERO[0],
  }
}
