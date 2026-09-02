/**
 * Sheet numbering for the About page and case-study cross-references.
 * Indices, totals, and A-nn codes are derived from these ordered lists —
 * never authored next to a record.
 *
 * Opening (masthead) and Contact (close) sit outside this set.
 * What I do is absorbed into the Experience sheet.
 */
export const ABOUT_SHEETS = [
  { id: 'now', label: 'Now' },
  { id: 'how-i-work', label: 'How I work' },
  { id: 'who-i-am', label: 'Who I Am' },
  { id: 'what-drives-me', label: 'What Drives Me' },
  { id: 'the-standard', label: 'The standard' },
  { id: 'experience', label: 'Experience' },
  { id: 'off-the-clock', label: 'Off the clock' },
] as const

export type AboutSheetId = (typeof ABOUT_SHEETS)[number]['id']

/** Ordered published (or soon-published) case studies. Index 0 → A-01. */
export const CASE_STUDY_SHEETS = [
  { slug: 'palm-dashboard' },
  { slug: 'yande-gadgets' },
  { slug: 'recruiteware' },
] as const

export type CaseStudySheetSlug = (typeof CASE_STUDY_SHEETS)[number]['slug']

export function padSheet(value: number, width = 2) {
  return String(value).padStart(width, '0')
}

export function aboutSheetIndex(id: AboutSheetId) {
  const index = ABOUT_SHEETS.findIndex((sheet) => sheet.id === id)
  if (index < 0) {
    throw new Error(`Unknown About sheet: ${id}`)
  }
  return index + 1
}

export function aboutSheetTotal() {
  return ABOUT_SHEETS.length
}

export function aboutSheetEyebrow(id: AboutSheetId) {
  return padSheet(aboutSheetIndex(id))
}

export function aboutSheetLabel(id: AboutSheetId) {
  const sheet = ABOUT_SHEETS[aboutSheetIndex(id) - 1]
  return `${aboutSheetEyebrow(id)} / ${sheet.label}`
}

export function aboutSheetOf(id: AboutSheetId) {
  return `Sheet ${padSheet(aboutSheetIndex(id))} of ${padSheet(aboutSheetTotal())}`
}

export function recordCode(prefix: string, index: number, width = 3) {
  return `${prefix}-${padSheet(index + 1, width)}`
}

export function caseStudyCode(slug: string) {
  const index = CASE_STUDY_SHEETS.findIndex((sheet) => sheet.slug === slug)
  if (index < 0) {
    throw new Error(`Unknown case-study sheet: ${slug}`)
  }
  return `A-${padSheet(index + 1)}`
}

export function caseStudyPath(slug: string) {
  return `/work/${slug}`
}

export function caseStudyCodeFromHref(href: string) {
  const match = href.match(/^\/work\/([^/]+)$/)
  if (!match) {
    return null
  }
  const slug = match[1]
  if (!CASE_STUDY_SHEETS.some((sheet) => sheet.slug === slug)) {
    return null
  }
  return caseStudyCode(slug)
}
