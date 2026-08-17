import { groq } from 'next-sanity'

import { client } from './client'
import { isValidInternalHref } from './href'
import type { ArchiveProject, CaseStudyCard, CaseStudyPage } from './types'

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

const caseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)]{
    "slug": slug.current
  }
`

const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
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

export async function getFeaturedCaseStudies(): Promise<CaseStudyCard[]> {
  return client.fetch<CaseStudyCard[]>(featuredCaseStudiesQuery)
}

export async function getCaseStudySlugs(): Promise<string[]> {
  const rows = await client.fetch<{ slug: string }[]>(caseStudySlugsQuery)
  return rows.map((row) => row.slug)
}

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudyPage | null> {
  return client.fetch<CaseStudyPage | null>(caseStudyBySlugQuery, { slug })
}

export async function getArchiveProjects(): Promise<ArchiveProject[]> {
  const [projects, slugs] = await Promise.all([
    client.fetch<ArchiveProject[]>(archiveProjectsQuery),
    getCaseStudySlugs(),
  ])

  return projects.filter((project) => {
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
}
