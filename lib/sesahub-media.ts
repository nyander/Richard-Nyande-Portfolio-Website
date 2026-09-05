import type { AltImage, CaseStudyCard, CaseStudyPage } from '@/lib/sanity/types'
import { SESAHUB_CARD, SESAHUB_SLUG, SESAHUB_STUDY } from '@/lib/sesahub'

const ROOT = '/images/sesahub'

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

const SESAHUB_HERO: AltImage[] = [
  localImage(
    'general-ledger.png',
    'General ledger for TechCorp Solutions Ltd test company, with zeroed balances, journal entry and trial balance'
  ),
  localImage(
    'sites-list.png',
    'Sites grid with Lagos, Abuja, Nairobi and Mombasa locations and generated codes'
  ),
  localImage(
    'employees-list.png',
    'Employees table with job role, department and company, including TechCorp and East Africa Trading test records'
  ),
  localImage(
    'customers-list.png',
    'Customer cards for Zenith Bank and MTN Nigeria on the TechCorp test company'
  ),
  localImage(
    'products-list.png',
    'Product management table with SKU, category, company and prices in USD, naira and Kenyan shillings'
  ),
  localImage(
    'currencies-list.png',
    'Currency management with a converter and an exchange-rate table against USD'
  ),
]

const MODULE_SCREENSHOTS: Record<string, AltImage> = {
  sites: SESAHUB_HERO[1],
  employees: SESAHUB_HERO[2],
  'customers and suppliers': SESAHUB_HERO[3],
  'products and inventory': SESAHUB_HERO[4],
  currency: SESAHUB_HERO[5],
  'core financials': SESAHUB_HERO[0],
}

const DEEP_DIVE_AFTER: Record<string, { image: AltImage; caption: string }> = {
  'access follows role and organisation': {
    image: SESAHUB_HERO[2],
    caption:
      'Employees list. Company is a column on the record — TechCorp and East Africa Trading are seed data, not a shared staff table.',
  },
  'keep financial records in the same product': {
    image: SESAHUB_HERO[0],
    caption:
      'General ledger. TechCorp Solutions Ltd is seed data, balances at zero — not a named client.',
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

export function applySesahubLocalMedia(study: CaseStudyPage): CaseStudyPage {
  if (study.slug !== SESAHUB_SLUG) {
    return study
  }

  const source = SESAHUB_STUDY
  const heroImages = (study.heroImages ?? []).filter(hasVisual)
  const productModules = source.productModules
    ? {
        ...source.productModules,
        items: source.productModules.items?.map((item) => {
          const screenshot = MODULE_SCREENSHOTS[moduleKey(item.title)]

          return {
            ...item,
            screenshot: screenshot
              ? preferExisting(item.screenshot, screenshot)
              : item.screenshot,
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
    heroImages: heroImages.length > 0 ? heroImages : SESAHUB_HERO,
    productModules,
    deepDives,
    designToCode: source.designToCode
      ? {
          ...source.designToCode,
          shippedImage: preferExisting(study.designToCode?.shippedImage, SESAHUB_HERO[0]),
        }
      : source.designToCode,
    ogImage: preferExisting(study.ogImage, SESAHUB_HERO[0]),
    liveUrl: study.liveUrl || source.liveUrl,
    liveNote: study.liveNote || source.liveNote,
  }
}

export function applySesahubCardMedia(study: CaseStudyCard): CaseStudyCard {
  if (study.slug !== SESAHUB_SLUG) {
    return study
  }

  return {
    ...study,
    summary: SESAHUB_CARD.summary,
    heroImage: hasVisual(study.heroImage) ? study.heroImage : SESAHUB_HERO[0],
  }
}
