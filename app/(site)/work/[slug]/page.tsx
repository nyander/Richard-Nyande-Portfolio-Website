import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SectionProgress } from '@/components/motion/SectionProgress'
import { CaseStudyDeepDives } from '@/components/work/CaseStudyDeepDives'
import { CaseStudyDesignToCode } from '@/components/work/CaseStudyDesignToCode'
import { CaseStudyHero } from '@/components/work/CaseStudyHero'
import { CaseStudyOutcome } from '@/components/work/CaseStudyOutcome'
import { CaseStudyProductModules } from '@/components/work/CaseStudyProductModules'
import { CaseStudyReframing } from '@/components/work/CaseStudyReframing'
import { CaseStudyWalkthrough } from '@/components/work/CaseStudyWalkthrough'
import { OtherWorkPage } from '@/components/work/OtherWorkPage'
import { YandeStudioComingSoon } from '@/components/work/YandeStudioComingSoon'
import { JsonLd } from '@/components/site/JsonLd'
import { otherWorkBySlug } from '@/lib/other-work'
import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/sanity/queries'
import { ogImageUrl, routeMetadata } from '@/lib/seo'
import {
  breadcrumbJsonLd,
  creativeWorkJsonLd,
} from '@/lib/structured-data'
import { YANDE_STUDIO_SLUG } from '@/lib/yande-studio'

type CaseStudyRouteProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs()
  return slugs.map((slug) => ({ slug }))
}

export const dynamicParams = true

export async function generateMetadata({
  params,
}: CaseStudyRouteProps): Promise<Metadata> {
  const { slug } = await params

  if (slug === YANDE_STUDIO_SLUG) {
    return routeMetadata({
      title: 'Yande Studio',
      description:
        'Yande is a creative digital studio. The case study is being rewritten — the studio is live at yande.uk.',
      path: `/work/${slug}`,
    })
  }

  const other = otherWorkBySlug(slug)

  if (other) {
    return routeMetadata({
      title: other.title,
      description: other.summary,
      path: `/work/${slug}`,
      image: ogImageUrl(other.thumbnail),
      type: 'article',
    })
  }

  const study = await getCaseStudyBySlug(slug)

  if (!study) {
    return {}
  }

  return routeMetadata({
    title: study.title,
    seoTitle: study.seoTitle,
    description: study.seoDescription || study.summary,
    path: `/work/${slug}`,
    image: ogImageUrl(study.ogImage) || ogImageUrl(study.heroImages?.[0]),
    type: 'article',
  })
}

function WorkJsonLd({
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
  return (
    <>
      <JsonLd
        data={creativeWorkJsonLd({
          name,
          description,
          path,
          image,
          datePublished,
          dateModified,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(name, path)} />
    </>
  )
}

export default async function CaseStudyPage({ params }: CaseStudyRouteProps) {
  const { slug } = await params
  const path = `/work/${slug}`

  if (slug === YANDE_STUDIO_SLUG) {
    return (
      <>
        <WorkJsonLd
          name="Yande Studio"
          description="Yande is a creative digital studio. The case study is being rewritten — the studio is live at yande.uk."
          path={path}
          datePublished="2026"
        />
        <YandeStudioComingSoon />
      </>
    )
  }

  const other = otherWorkBySlug(slug)

  if (other) {
    return (
      <>
        <WorkJsonLd
          name={other.title}
          description={other.summary}
          path={path}
          image={ogImageUrl(other.thumbnail)}
          datePublished={String(other.year)}
        />
        <OtherWorkPage project={other} />
      </>
    )
  }

  const study = await getCaseStudyBySlug(slug)

  if (!study) {
    notFound()
  }

  return (
    <article className="case-study">
      <WorkJsonLd
        name={study.title}
        description={study.seoDescription || study.summary}
        path={path}
        image={ogImageUrl(study.ogImage) || ogImageUrl(study.heroImages?.[0])}
        datePublished={String(study.year)}
        dateModified={study._updatedAt}
      />
      <SectionProgress />
      <header className="case-study-masthead">
        <div className="case-study-masthead-main">
          <h1 id="case-study-title">{study.title}</h1>
          <p className="case-study-hero-summary">{study.summary}</p>
          <p className="case-study-year">{study.year}</p>
        </div>
        <div className="case-study-masthead-meta">
          <div className="case-study-role">
            <span className="case-study-role-label">Role</span>
            <span className="case-study-role-value">{study.role}</span>
          </div>
          {study.liveUrl ? (
            <div className="case-study-live">
              <a
                className="case-study-live-link"
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="case-study-role-label">
                  {study.walkthroughUrl && study.liveUrl === study.walkthroughUrl
                    ? 'Walkthrough'
                    : 'Live site'}
                </span>
                <span className="case-study-role-value">
                  {study.walkthroughUrl && study.liveUrl === study.walkthroughUrl
                    ? 'Watch ↗'
                    : 'Visit ↗'}
                </span>
              </a>
              {study.liveNote ? (
                <p className="case-study-live-note">{study.liveNote}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </header>
      <CaseStudyHero study={study} />
      {study.walkthroughUrl ? (
        <CaseStudyWalkthrough
          url={study.walkthroughUrl}
          title={study.walkthroughTitle}
        />
      ) : null}
      {study.reframing ? (
        <CaseStudyReframing reframing={study.reframing} />
      ) : null}
      {study.productModules ? (
        <CaseStudyProductModules section={study.productModules} />
      ) : null}
      {study.deepDives ? (
        <CaseStudyDeepDives section={study.deepDives} />
      ) : null}
      {study.designToCode ? (
        <CaseStudyDesignToCode section={study.designToCode} />
      ) : null}
      {study.outcomeStatus ? (
        <CaseStudyOutcome
          section={study.outcomeStatus}
          modules={study.productModules?.items}
        />
      ) : null}
    </article>
  )
}
