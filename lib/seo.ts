import type { Metadata } from 'next'

import { urlFor } from '@/lib/sanity/image'
import type { AltImage } from '@/lib/sanity/types'

export const SITE_URL = 'https://www.richardnyande.co.uk'
export const SITE_NAME = 'Richard Nyande'
export const PERSON_ID = `${SITE_URL}/#person`

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

const DESCRIPTION_LIMIT = 160

export function clipMetaDescription(value: string, limit = DESCRIPTION_LIMIT) {
  const text = value.trim()
  if (text.length <= limit) {
    return text
  }

  return `${text.slice(0, limit - 1).replace(/\s+\S*$/, '')}…`
}

export function ogImageUrl(image?: AltImage | null) {
  if (!image) {
    return undefined
  }

  if (image.src) {
    return image.src
  }

  if (image.asset) {
    return urlFor(image).width(1200).height(630).url()
  }

  return undefined
}

export function routeMetadata({
  title,
  seoTitle,
  description,
  path,
  image,
  type = 'website',
}: {
  title: string
  seoTitle?: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article'
}): Metadata {
  const brandedTitle = seoTitle?.trim() || `${title} — ${SITE_NAME}`
  const clipped = clipMetaDescription(description)

  return {
    title: seoTitle?.trim() ? { absolute: seoTitle.trim() } : title,
    description: clipped,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      locale: 'en_GB',
      siteName: SITE_NAME,
      title: brandedTitle,
      description: clipped,
      url: path,
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: brandedTitle,
      description: clipped,
      images: image ? [image] : undefined,
    },
  }
}
