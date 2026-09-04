import { MENU_SOCIALS } from '@/lib/nav'
import {
  PERSON_ID,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  clipMetaDescription,
} from '@/lib/seo'

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    jobTitle: 'Product Designer and Creative Technologist',
    url: SITE_URL,
    sameAs: MENU_SOCIALS.map((social) => social.href),
    worksFor: {
      '@type': 'Organization',
      name: 'Yande Studio',
      url: 'https://yande.uk',
    },
  }
}

export function creativeWorkJsonLd({
  name,
  description,
  path,
  image,
  datePublished,
  dateModified,
}: {
  name: string
  description: string
  path: string
  image?: string
  datePublished?: string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name,
    description: clipMetaDescription(description),
    url: absoluteUrl(path),
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(image ? { image: absoluteUrl(image) } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  }
}

export function breadcrumbJsonLd(name: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Work',
        item: `${SITE_URL}/work`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name,
        item: absoluteUrl(path),
      },
    ],
  }
}
