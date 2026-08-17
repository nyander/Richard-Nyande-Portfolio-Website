/**
 * Public pathnames this site will serve.
 * archiveProject internal hrefs are validated in lib/sanity/href.ts
 * against this map plus `/work/[slug]` for a published caseStudy.
 */
export const STATIC_PATHS = [
  '/',
  '/work',
  '/about',
  '/services',
  '/playground',
  '/contact',
] as const

export const CASE_STUDY_PATH_PREFIX = '/work'
