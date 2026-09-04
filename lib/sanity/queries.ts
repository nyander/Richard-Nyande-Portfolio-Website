import { groq } from 'next-sanity'

import {
  applyPalmCardMedia,
  applyPalmLocalMedia,
  PALM_CARD,
  PALM_SLUG,
  PALM_STUDY,
} from '@/lib/palm-media'
import { applyCoocCardMedia, applyCoocLocalMedia } from '@/lib/cooc-media'
import { COOC_CARD, COOC_SLUG, COOC_STUDY } from '@/lib/cooc'
import {
  applyRecruitewareCardMedia,
  applyRecruitewareLocalMedia,
} from '@/lib/recruiteware-media'
import {
  RECRUITEWARE_CARD,
  RECRUITEWARE_SLUG,
  RECRUITEWARE_STUDY,
} from '@/lib/recruiteware'
import { applySesahubCardMedia, applySesahubLocalMedia } from '@/lib/sesahub-media'
import { SESAHUB_CARD, SESAHUB_SLUG, SESAHUB_STUDY } from '@/lib/sesahub'
import { applyYandeCardMedia, applyYandeLocalMedia } from '@/lib/yande-media'
import {
  YANDE_GADGETS_CARD,
  YANDE_GADGETS_SLUG,
  YANDE_GADGETS_STUDY,
} from '@/lib/yande-gadgets'
import {
  applyYandeStudioCardMedia,
  applyYandeStudioLocalMedia,
} from '@/lib/yande-studio-media'
import {
  YANDE_STUDIO_CARD,
  YANDE_STUDIO_SLUG,
  YANDE_STUDIO_STUDY,
} from '@/lib/yande-studio'
import { LOCAL_ARCHIVE, otherWorkSlugs } from '@/lib/other-work'
import { CASE_STUDY_PATH_PREFIX } from '@/lib/routes'

import { client } from './client'
import { isValidInternalHref } from './href'
import type { ArchiveProject, CaseStudyCard, CaseStudyPage, WorkIndexData } from './types'

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T
): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params)
    return result ?? fallback
  } catch (error) {
    const cause =
      error instanceof Error && 'cause' in error && error.cause instanceof Error
        ? error.cause.message
        : null
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.warn(
      `[sanity] request failed; using local content (${message}${cause ? `: ${cause}` : ''})`,
    )
    return fallback
  }
}

function localStudyForSlug(slug: string): CaseStudyPage | null {
  if (slug === PALM_SLUG) {
    return PALM_STUDY
  }

  if (slug === COOC_SLUG) {
    return COOC_STUDY
  }

  if (slug === RECRUITEWARE_SLUG) {
    return RECRUITEWARE_STUDY
  }

  if (slug === SESAHUB_SLUG) {
    return SESAHUB_STUDY
  }

  if (slug === YANDE_STUDIO_SLUG) {
    return YANDE_STUDIO_STUDY
  }

  if (slug === YANDE_GADGETS_SLUG) {
    return YANDE_GADGETS_STUDY
  }

  return null
}

const altImageProjection = groq`{
  alt,
  caption,
  provenance,
  asset,
  hotspot,
  crop
}`

const featuredCaseStudiesQuery = groq`
  *[_type == "caseStudy" && featured == true && defined(slug.current)]
    | order(order asc, year desc) {
      _id,
      title,
      "slug": slug.current,
      role,
      year,
      summary,
      status,
      "heroImage": heroImages[0]${altImageProjection}
    }
`

const workIndexStudiesQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)]
    | order(order asc, year desc) {
      _id,
      title,
      "slug": slug.current,
      role,
      year,
      summary,
      status,
      "heroImage": heroImages[0]${altImageProjection}
    }
`

const caseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)]{
    "slug": slug.current
  }
`

const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    _updatedAt,
    title,
    "slug": slug.current,
    role,
    year,
    summary,
    status,
    contextFacts[]{ label, value },
    heroImages[]${altImageProjection},
    reframing{
      eyebrow,
      heading,
      intro,
      initialProposal,
      discovery,
      productResponse
    },
    productModules{
      eyebrow,
      heading,
      intro,
      items[]{
        _key,
        title,
        shortLabel,
        teaser,
        status,
        problem,
        solution,
        screenshot${altImageProjection},
        before,
        after,
        beforeAfterImages{
          label,
          caption,
          before${altImageProjection},
          after${altImageProjection}
        }
      }
    },
    deepDives{
      eyebrow,
      heading,
      intro,
      items[]{
        _key,
        title,
        shortLabel,
        problem,
        quote{ quote, name, role },
        contribution,
        constraints,
        decisions[]{ _key, title, detail },
        beforeAfter{
          label,
          caption,
          before${altImageProjection},
          after${altImageProjection}
        },
        outcome
      }
    },
    designToCode{
      eyebrow,
      heading,
      intro,
      framing,
      decisions[]{ _key, title, detail },
      figmaImage${altImageProjection},
      shippedImage${altImageProjection},
      stackTags
    },
    outcomeStatus{
      eyebrow,
      heading,
      intro,
      statusSummary,
      whatsNext,
      quotes[]{ quote, name, role },
      evidence,
      reflection
    },
    liveUrl,
    liveNote,
    walkthroughUrl,
    walkthroughTitle,
    seoTitle,
    seoDescription,
    ogImage${altImageProjection}
  }
`

const archiveProjectsQuery = groq`
  *[_type == "archiveProject"] | order(order asc, year desc) {
    _id,
    title,
    year,
    summary,
    thumbnail${altImageProjection},
    linkType,
    href,
    tags
  }
`

const sitemapCaseStudiesQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt
  }
`

const sitemapArchiveQuery = groq`
  *[_type == "archiveProject" && linkType == "internal" && defined(href)]{
    href,
    _updatedAt
  }
`

const LOCAL_FEATURED: CaseStudyCard[] = [
  applyYandeStudioCardMedia(YANDE_STUDIO_CARD),
  applyPalmCardMedia(PALM_CARD),
  applyCoocCardMedia(COOC_CARD),
  applySesahubCardMedia(SESAHUB_CARD),
  applyRecruitewareCardMedia(RECRUITEWARE_CARD),
  applyYandeCardMedia(YANDE_GADGETS_CARD),
]

export async function getFeaturedCaseStudies(): Promise<CaseStudyCard[]> {
  const studies = await sanityFetch<CaseStudyCard[]>(
    featuredCaseStudiesQuery,
    {},
    []
  )
  return mergeLocalCaseStudies(studies)
}

function applyLocalCardMedia(study: CaseStudyCard) {
  return applyYandeStudioCardMedia(
    applySesahubCardMedia(
      applyRecruitewareCardMedia(
        applyYandeCardMedia(applyPalmCardMedia(applyCoocCardMedia(study)))
      )
    )
  )
}

function mergeLocalCaseStudies(studies: CaseStudyCard[]) {
  const withLocal = studies.map(applyLocalCardMedia)
  const order = LOCAL_FEATURED.map((study) => study.slug)

  for (const local of LOCAL_FEATURED) {
    if (!withLocal.some((study) => study.slug === local.slug)) {
      withLocal.push(local)
    }
  }

  return withLocal.sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year
    }

    const aIndex = order.indexOf(a.slug)
    const bIndex = order.indexOf(b.slug)
    if (aIndex === -1 && bIndex === -1) {
      return 0
    }
    if (aIndex === -1) {
      return 1
    }
    if (bIndex === -1) {
      return -1
    }
    return aIndex - bIndex
  })
}

export async function getWorkIndex(): Promise<WorkIndexData> {
  const [studies, otherWork] = await Promise.all([
    sanityFetch<CaseStudyCard[]>(workIndexStudiesQuery, {}, []),
    getArchiveProjects(),
  ])

  return {
    caseStudies: mergeLocalCaseStudies(studies),
    otherWork,
  }
}

export async function getCaseStudySlugs(): Promise<string[]> {
  const rows = await sanityFetch<{ slug: string }[]>(caseStudySlugsQuery, {}, [])
  const slugs = rows.map((row) => row.slug)

  for (const local of LOCAL_FEATURED) {
    if (!slugs.includes(local.slug)) {
      slugs.push(local.slug)
    }
  }

  for (const slug of otherWorkSlugs()) {
    if (!slugs.includes(slug)) {
      slugs.push(slug)
    }
  }

  return slugs
}

export type SitemapWorkEntry = {
  path: string
  lastModified?: string
}

function workSlugFromHref(href: string) {
  const prefix = `${CASE_STUDY_PATH_PREFIX}/`
  if (!href.startsWith(prefix)) {
    return null
  }

  const slug = href.slice(prefix.length)
  if (!slug || slug.includes('/')) {
    return null
  }

  return slug
}

export async function getSitemapWorkEntries(): Promise<SitemapWorkEntry[]> {
  const [studies, archives] = await Promise.all([
    sanityFetch<{ slug: string; _updatedAt?: string }[]>(
      sitemapCaseStudiesQuery,
      {},
      []
    ),
    sanityFetch<{ href: string; _updatedAt?: string }[]>(
      sitemapArchiveQuery,
      {},
      []
    ),
  ])

  const entries = new Map<string, string | undefined>()

  for (const study of studies) {
    entries.set(`/work/${study.slug}`, study._updatedAt)
  }

  for (const local of LOCAL_FEATURED) {
    if (!entries.has(`/work/${local.slug}`)) {
      entries.set(`/work/${local.slug}`, undefined)
    }
  }

  for (const project of archives) {
    const slug = workSlugFromHref(project.href)
    if (!slug) {
      continue
    }

    const path = `/work/${slug}`
    entries.set(path, project._updatedAt ?? entries.get(path))
  }

  for (const slug of otherWorkSlugs()) {
    const path = `/work/${slug}`
    if (!entries.has(path)) {
      entries.set(path, undefined)
    }
  }

  return [...entries.entries()].map(([path, lastModified]) => ({
    path,
    lastModified,
  }))
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudyPage | null> {
  const fetched = await sanityFetch<CaseStudyPage | null>(
    caseStudyBySlugQuery,
    { slug },
    null
  )
  const study = fetched ?? localStudyForSlug(slug)

  if (!study) {
    return null
  }

  return applyYandeStudioLocalMedia(
    applySesahubLocalMedia(
      applyRecruitewareLocalMedia(
        applyYandeLocalMedia(applyPalmLocalMedia(applyCoocLocalMedia(study)))
      )
    )
  )
}

export async function getArchiveProjects(): Promise<ArchiveProject[]> {
  const [projects, slugs] = await Promise.all([
    sanityFetch<ArchiveProject[]>(archiveProjectsQuery, {}, []),
    getCaseStudySlugs(),
  ])

  const fromCms = projects.filter((project) => {
    if (project.linkType !== 'internal') {
      return true
    }

    const valid = isValidInternalHref(project.href, slugs)
    if (!valid && process.env.NODE_ENV !== 'production') {
      console.warn(
        `[archiveProject] skipped "${project.title}": internal href "${project.href}" is not a known route`
      )
    }
    return valid
  })

  return mergeLocalArchive(fromCms)
}

function mergeLocalArchive(projects: ArchiveProject[]) {
  const merged = [...projects]

  for (const local of LOCAL_ARCHIVE) {
    const index = merged.findIndex(
      (project) => project._id === local._id || project.title === local.title
    )
    if (index === -1) {
      merged.push(local)
      continue
    }

    merged[index] = { ...merged[index], ...local }
  }

  const localOrder = LOCAL_ARCHIVE.map((project) => project._id)

  return merged.sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year
    }
    const aIndex = localOrder.indexOf(a._id)
    const bIndex = localOrder.indexOf(b._id)
    if (aIndex === -1 && bIndex === -1) {
      return 0
    }
    if (aIndex === -1) {
      return 1
    }
    if (bIndex === -1) {
      return -1
    }
    return aIndex - bIndex
  })
}
