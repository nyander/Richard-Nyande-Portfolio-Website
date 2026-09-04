import type { MetadataRoute } from 'next'

import { getSitemapWorkEntries } from '@/lib/sanity/queries'
import { absoluteUrl } from '@/lib/seo'

const STATIC_PATHS = ['/', '/work', '/about', '/contact'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const work = await getSitemapWorkEntries()

  return [
    ...STATIC_PATHS.map((path) => ({
      url: absoluteUrl(path),
    })),
    ...work.map((entry) => ({
      url: absoluteUrl(entry.path),
      lastModified: entry.lastModified
        ? new Date(entry.lastModified)
        : undefined,
    })),
  ]
}
