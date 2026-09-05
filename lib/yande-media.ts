import type { AltImage, CaseStudyCard, CaseStudyPage } from '@/lib/sanity/types'
import {
  YANDE_GADGETS_SLUG,
  YANDE_GADGETS_STUDY,
  YANDE_WALKTHROUGH_URL,
} from '@/lib/yande-gadgets'

const ROOT = '/images/yande-gadgets'

function localImage(
  file: string,
  alt: string,
  caption?: string,
  provenance: AltImage['provenance'] = 'actual'
): AltImage {
  return {
    src: `${ROOT}/${file}`,
    alt,
    caption,
    provenance,
  }
}

const YANDE_HERO: AltImage[] = [
  localImage(
    'product-cards.png',
    'Product cards showing sold and shipped second-hand units with prices in pounds'
  ),
  localImage(
    'shipment-items.png',
    'Shipment builder listing two items with cost, selling price, save and remove actions'
  ),
  localImage(
    'staff-notification.png',
    'Staff dashboard with a notice that a new shipment needs to be confirmed as received'
  ),
  localImage(
    'shipments-empty.png',
    'Shipments empty state in the yellow and green Yande Gadgets chrome, signed in as admin'
  ),
  localImage(
    'settings-suppliers.png',
    'Settings screen with a suppliers table and add, edit and delete actions'
  ),
  localImage(
    'upload-product.png',
    'Upload product form with cost, selling price, type, supplier, condition and gallery fields',
    undefined,
    'representative'
  ),
  localImage(
    'request-product.png',
    'Request product form with type, condition, deposit and notes',
    undefined,
    'representative'
  ),
  localImage(
    'record-expenses.png',
    'Record expenses table with description, transaction type, amount and add-row controls',
    undefined,
    'representative'
  ),
]

const MODULE_SCREENSHOTS: Record<string, AltImage> = {
  'access and roles': localImage(
    'staff-notification.png',
    'Staff user dashboard with a shipment notification that stays until receipt is confirmed'
  ),
  'product catalogue': localImage(
    'product-cards.png',
    'Catalogue cards for individual units, with sold and shipped states'
  ),
  'shipping and receiving': localImage(
    'shipment-items.png',
    'Items queued for shipment, with totals and confirm shipment'
  ),
  'shop-floor sales': localImage(
    'product-cards.png',
    'Shop-floor product cards with view, purchase and status labels'
  ),
  'requests and deposits': localImage(
    'request-product.png',
    'Request product form including a deposit field',
    undefined,
    'representative'
  ),
  'transactions and reports': localImage(
    'record-expenses.png',
    'Record expenses form used to feed the generated statements',
    undefined,
    'representative'
  ),
}

const MODULE_AFTER: Record<string, AltImage> = {
  'access and roles': localImage(
    'settings-suppliers.png',
    'Admin settings with role-gated supplier records'
  ),
  'product catalogue': localImage(
    'upload-product.png',
    'Product upload with condition notes and gallery',
    undefined,
    'representative'
  ),
  'shipping and receiving': localImage(
    'shipments-empty.png',
    'Shipments screen after the queue is cleared'
  ),
  'shop-floor sales': localImage(
    'shipment-items.png',
    'Line items with cost and selling price before a sale is recorded'
  ),
  'requests and deposits': localImage(
    'request-product.png',
    'Customer request form with deposit in pounds',
    undefined,
    'representative'
  ),
  'transactions and reports': localImage(
    'record-expenses.png',
    'Multi-row expense entry used by the report period',
    undefined,
    'representative'
  ),
}

const DEEP_DIVE_AFTER: Record<string, { image: AltImage; caption: string }> = {
  'from a notebook line to one physical unit': {
    image: localImage(
      'product-cards.png',
      'Two unique units on the catalogue, not a quantity count'
    ),
    caption:
      'Catalogue cards. Sold and shipped are states on the unit, not stock remaining.',
  },
  'from abandoned requests to a deposit that holds the buy': {
    image: localImage(
      'request-product.png',
      'Request form with deposit field',
      undefined,
      'representative'
    ),
    caption:
      'Request product. The deposit field is the change that made the owner willing to take requests again.',
  },
  'from a notebook total to a period the numbers can survive': {
    image: localImage(
      'record-expenses.png',
      'Record expenses table',
      undefined,
      'representative'
    ),
    caption:
      'Transaction entry. The statements are generated from these rows plus wages, sales and shipments.',
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

export function applyYandeLocalMedia(study: CaseStudyPage): CaseStudyPage {
  if (study.slug !== YANDE_GADGETS_SLUG) {
    return study
  }

  const source = YANDE_GADGETS_STUDY
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
    : study.productModules

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
    : study.deepDives

  return {
    ...source,
    heroImages: heroImages.length > 0 ? heroImages : YANDE_HERO,
    productModules,
    deepDives,
    designToCode: source.designToCode
      ? {
          ...source.designToCode,
          shippedImage: preferExisting(
            study.designToCode?.shippedImage,
            YANDE_HERO[0]
          ),
        }
      : source.designToCode,
    ogImage: preferExisting(study.ogImage, YANDE_HERO[0]),
    liveUrl: study.liveUrl || YANDE_WALKTHROUGH_URL,
    liveNote: study.liveNote || 'Archived student build. Walkthrough on YouTube.',
    walkthroughUrl: study.walkthroughUrl || YANDE_WALKTHROUGH_URL,
    walkthroughTitle: study.walkthroughTitle || 'Yande Gadgets walkthrough',
  }
}

export function applyYandeCardMedia(study: CaseStudyCard): CaseStudyCard {
  if (study.slug !== YANDE_GADGETS_SLUG) {
    return study
  }

  return {
    ...study,
    heroImage: hasVisual(study.heroImage) ? study.heroImage : YANDE_HERO[0],
  }
}
