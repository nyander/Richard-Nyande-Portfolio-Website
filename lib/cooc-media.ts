import type { AltImage, CaseStudyCard, CaseStudyPage } from '@/lib/sanity/types'
import { COOC_CARD, COOC_LIVE_URL, COOC_SLUG, COOC_STUDY } from '@/lib/cooc'

const ROOT = '/images/cooc'

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

const COOC_COVER = localImage(
  'cover.png',
  'Cooc live hero with club photography, site navigation and a membership pass overlay'
)

const COOC_DRAFTS = localImage(
  'conceptual-drafts.png',
  'Figma board of Cooc high-fidelity pages, membership tiers, account screens and wireframes'
)

const COOC_CARD_STILL = localImage(
  'membership-card.png',
  'Cooc wallet pass design with member type, identity fields, QR code and member ID',
  'Test member Mario Brown / mario.brown@test.co.uk — not a live member screenshot.',
  'test-data'
)

const COOC_WIREFRAME = localImage(
  'wireframe.png',
  'Five-step membership wireframe from landing and tiers through application, email and wallet pass'
)

const COOC_TIMELINE = localImage(
  'timeline.png',
  'Project timeline from May 2024 proposal through December 2024 site launch and March 2025 membership platform'
)

const COOC_COMPARE = localImage(
  'wordpress-vs-custom-app.png',
  'Comparison table of a custom app versus WordPress across flexibility, UX, scale, cost and security'
)

const COOC_TYPE = localImage(
  'typography.png',
  'SangBlue Sans character set specified for Cooc'
)

const COOC_COLOUR = localImage(
  'colour-scheme.png',
  'Cooc colour tiles: burnt orange, light pink, salmon red and dark green'
)

const COOC_LOGO = localImage(
  'logo.png',
  'Cooc mark as four overlapping crescents, in gradient and in solid black'
)

const COOC_THUMB = localImage(
  'thumbnail.png',
  'Cooc wordmark — four orange and pink crescents on black'
)

const COOC_REFS = localImage(
  'references.png',
  'Cooc mood references: collage photography, texture and palette studies'
)

const COOC_HERO: AltImage[] = [
  COOC_COVER,
  COOC_DRAFTS,
  COOC_CARD_STILL,
  COOC_WIREFRAME,
  COOC_TIMELINE,
  COOC_TYPE,
  COOC_COLOUR,
  COOC_LOGO,
  COOC_REFS,
]

const MODULE_SCREENSHOTS: Record<string, AltImage> = {
  'brand and visual system': COOC_DRAFTS,
  'membership journey': COOC_WIREFRAME,
  'registration and approval': COOC_TIMELINE,
  'plans and billing': COOC_COVER,
  'digital membership pass': COOC_CARD_STILL,
  'club operations wordpress cannot hold': COOC_COMPARE,
}

const MODULE_AFTER: Record<string, AltImage> = {
  'brand and visual system': COOC_COVER,
  'membership journey': COOC_CARD_STILL,
  'digital membership pass': COOC_CARD_STILL,
}

const DEEP_DIVE_AFTER: Record<string, { image: AltImage; caption: string }> = {
  'from a live brand site to a membership system in weeks': {
    image: COOC_TIMELINE,
    caption:
      'May 2024 to March 2025. Brand site live in December. Membership platform requested in February and live in March.',
  },
  'from a custom club app to wordpress on purpose': {
    image: COOC_COMPARE,
    caption:
      'Custom app versus WordPress. Speed and CMS won the February window. Attendance, messaging and SevenRooms stayed on the custom-app side.',
  },
  'from a form fill to a pass in the wallet': {
    image: COOC_WIREFRAME,
    caption:
      'Options, tiers, application, approval mail, wallet pass. That sequence is what MemberPress, Zapier and Passcreator had to follow.',
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

export function applyCoocLocalMedia(study: CaseStudyPage): CaseStudyPage {
  if (study.slug !== COOC_SLUG) {
    return study
  }

  const source = COOC_STUDY
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
    heroImages: heroImages.length > 0 ? heroImages : COOC_HERO,
    productModules,
    deepDives,
    designToCode: source.designToCode
      ? {
          ...source.designToCode,
          figmaImage: preferExisting(study.designToCode?.figmaImage, COOC_DRAFTS),
          shippedImage: preferExisting(study.designToCode?.shippedImage, COOC_COVER),
        }
      : source.designToCode,
    ogImage: preferExisting(study.ogImage, COOC_COVER),
    liveUrl: study.liveUrl || COOC_LIVE_URL,
    outcomeStatus: source.outcomeStatus,
  }
}

export function applyCoocCardMedia(study: CaseStudyCard): CaseStudyCard {
  if (study.slug !== COOC_SLUG) {
    return study
  }

  return {
    ...study,
    summary: COOC_CARD.summary,
    heroImage: hasVisual(study.heroImage) ? study.heroImage : COOC_THUMB,
  }
}
