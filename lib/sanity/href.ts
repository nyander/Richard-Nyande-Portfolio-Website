import { CASE_STUDY_PATH_PREFIX, STATIC_PATHS } from '@/lib/routes'

export function isValidInternalHref(
  href: string,
  caseStudySlugs: readonly string[]
): boolean {
  if ((STATIC_PATHS as readonly string[]).includes(href)) {
    return true
  }

  const prefix = `${CASE_STUDY_PATH_PREFIX}/`
  if (!href.startsWith(prefix)) {
    return false
  }

  const slug = href.slice(prefix.length)
  return slug.length > 0 && !slug.includes('/') && caseStudySlugs.includes(slug)
}
