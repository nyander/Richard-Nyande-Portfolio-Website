import type { AltImage, CaseStudyCard, CaseStudyPage } from '@/lib/sanity/types'
import {
  YANDE_STUDIO_LIVE_NOTE,
  YANDE_STUDIO_LIVE_URL,
  YANDE_STUDIO_SLUG,
} from '@/lib/yande-studio'

const ROOT = '/images/yande-studio'

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

export const GATE = localImage(
  'gate-collage.png',
  'Collage password gate with ripped-paper panels, a red stamp card and an empty password field'
)

export const EXTERIOR = localImage(
  'studio-exterior.png',
  '3D studio exterior after unlock, night sky, building poster and camcorder chrome, no debug UI'
)

export const EXTERIOR_MOBILE = localImage(
  'studio-exterior-mobile.png',
  'Same exterior at phone width, with the studio poster filling the portrait frame'
)

export const PRACTICE = localImage(
  'practice-index.png',
  'Practice index with studio work-type filters and an empty project list'
)

export const ABOUT = localImage(
  'about-studio.png',
  'About page with the Yande mark, founded by Richard Nyande, London'
)

export const LIBRARY = localImage(
  'library-index.png',
  'Library index showing zero archive entries'
)

export const ROTATION = localImage(
  'rotation-crate.png',
  'Rotation page with album crate, De La Soul record and a 3D turntable'
)

export const CONTACT = localImage(
  'contact-form.png',
  'Contact form with collaboration, project, press and general enquiry types'
)

const YANDE_STUDIO_HERO: AltImage[] = [GATE, EXTERIOR, PRACTICE, ABOUT]

const MODULE_SCREENSHOTS: Record<string, AltImage> = {
  'enter (collage gate)': GATE,
  'immersive studio (home)': EXTERIOR,
  'studio (about)': ABOUT,
  practice: PRACTICE,
  library: LIBRARY,
  rotation: ROTATION,
  'contact and publishing': CONTACT,
}

const DEEP_DIVE_AFTER: Record<string, { image: AltImage; caption: string }> = {
  'one studio, three names, no second site to duplicate': {
    image: PRACTICE,
    caption:
      'Practice filters are studio work types. This is not Yande Gadgets and not this portfolio.',
  },
  'a 3d studio that has to run on a phone': {
    image: EXTERIOR_MOBILE,
    caption: 'Same exterior at phone width.',
  },
  'build the platform while the studio is still forming — lock the door honestly': {
    image: GATE,
    caption: 'This is what yande.uk is today: a password collage, not an open studio visit.',
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

export function applyYandeStudioLocalMedia(study: CaseStudyPage): CaseStudyPage {
  if (study.slug !== YANDE_STUDIO_SLUG) {
    return study
  }

  const heroImages = (study.heroImages ?? []).filter(hasVisual)
  const productModules = study.productModules
    ? {
        ...study.productModules,
        items: study.productModules.items?.map((item) => {
          const screenshot = MODULE_SCREENSHOTS[moduleKey(item.title)]

          return {
            ...item,
            screenshot: screenshot
              ? preferExisting(item.screenshot, screenshot)
              : item.screenshot,
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
    heroImages: heroImages.length > 0 ? heroImages : YANDE_STUDIO_HERO,
    productModules,
    deepDives,
    designToCode: study.designToCode
      ? {
          ...study.designToCode,
          shippedImage: preferExisting(study.designToCode.shippedImage, GATE),
        }
      : study.designToCode,
    ogImage: preferExisting(study.ogImage, GATE),
    liveUrl: study.liveUrl || YANDE_STUDIO_LIVE_URL,
    liveNote: study.liveNote || YANDE_STUDIO_LIVE_NOTE,
  }
}

export function applyYandeStudioCardMedia(study: CaseStudyCard): CaseStudyCard {
  if (study.slug !== YANDE_STUDIO_SLUG) {
    return study
  }

  return {
    ...study,
    heroImage: hasVisual(study.heroImage) ? study.heroImage : GATE,
  }
}
