import { YANDE_STUDIO_LIVE_URL, YANDE_STUDIO_SLUG } from '@/lib/yande-studio'
import type { AltImage, ArchiveProject, CaseStudyCard, Status } from '@/lib/sanity/types'

export type WorkGroupId = 'product' | 'creative' | 'web'

export type WorkListItem = {
  id: string
  slug: string
  title: string
  year: number
  role?: string
  summary: string
  image: AltImage | null
  href: string
  status: string
  statusKind: Status | 'archive'
  external?: boolean
  kind: 'case' | 'archive'
}

export type WorkGroup = {
  id: WorkGroupId
  label: string
  slugs: string[]
}

export const WORK_GROUPS: WorkGroup[] = [
  {
    id: 'product',
    label: 'Product Design & UX',
    slugs: [
      'palm-dashboard',
      'recruiteware',
      'cooc',
      'sesahub',
      'yande-gadgets',
    ],
  },
  {
    id: 'creative',
    label: 'Creative Development & Experiences',
    slugs: [
      'yande-studio',
      'dj-tricz',
      'chevrolet-immersive-experience',
      'the-main-gates',
      'galactic-fragment',
    ],
  },
  {
    id: 'web',
    label: 'Web Design & CMS',
    slugs: ['damu', 'field-and-sons', 'upper-crust', 'mandrake', 'palm-pr'],
  },
]

function slugFromHref(href: string) {
  const match = href.match(/\/work\/([^/?#]+)/)
  return match?.[1] ?? href
}

function caseStudyStatus(status: Status) {
  if (status === 'shipped') {
    return 'Case study'
  }

  if (status === 'in-progress') {
    return 'In progress'
  }

  return 'Concept'
}

function fromCaseStudy(study: CaseStudyCard): WorkListItem {
  const isStudio = study.slug === YANDE_STUDIO_SLUG

  return {
    id: study._id,
    slug: study.slug,
    title: study.title,
    year: study.year,
    role: study.role,
    summary: study.summary,
    image: study.heroImage,
    href: isStudio ? YANDE_STUDIO_LIVE_URL : `/work/${study.slug}`,
    status: caseStudyStatus(study.status),
    statusKind: study.status,
    external: isStudio,
    kind: 'case',
  }
}

function fromArchive(project: ArchiveProject): WorkListItem {
  const slug = project.slug ?? slugFromHref(project.href)

  return {
    id: project._id,
    slug,
    title: project.title,
    year: project.year,
    role: project.listRole ?? project.role,
    summary: project.summary,
    image: project.thumbnail,
    href: project.href,
    status: project.kind ?? 'Project',
    statusKind: 'archive',
    external: project.linkType === 'external',
    kind: 'archive',
  }
}

export function groupWorkIndex(
  caseStudies: CaseStudyCard[],
  otherWork: ArchiveProject[]
) {
  const bySlug = new Map<string, WorkListItem>()

  for (const study of caseStudies) {
    bySlug.set(study.slug, fromCaseStudy(study))
  }

  for (const project of otherWork) {
    const item = fromArchive(project)
    if (!bySlug.has(item.slug)) {
      bySlug.set(item.slug, item)
    }
  }

  const assigned = new Set<string>()
  const groups = WORK_GROUPS.map((group) => {
    const items = group.slugs.flatMap((slug) => {
      const item = bySlug.get(slug)
      if (!item) {
        return []
      }

      assigned.add(slug)
      return [item]
    })

    return { id: group.id, label: group.label, items }
  })

  for (const study of caseStudies) {
    if (assigned.has(study.slug)) {
      continue
    }

    groups[0]?.items.push(fromCaseStudy(study))
    assigned.add(study.slug)
  }

  for (const project of otherWork) {
    const item = fromArchive(project)
    if (assigned.has(item.slug)) {
      continue
    }

    const target = project.tags.includes('Three.js') ? 'creative' : 'web'
    groups.find((group) => group.id === target)?.items.push(item)
  }

  return groups.filter((group) => group.items.length > 0)
}
