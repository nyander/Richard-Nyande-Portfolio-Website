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
import { YandeStudioEditorial } from '@/components/work/YandeStudioEditorial'
import { urlFor } from '@/lib/sanity/image'
import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/sanity/queries'
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
  const study = await getCaseStudyBySlug(slug)

  if (!study) {
    return {}
  }

  const title = study.seoTitle || study.title
  const description = study.seoDescription || study.summary
  const ogImage = study.ogImage?.src
    ? study.ogImage.src
    : study.ogImage?.asset
      ? urlFor(study.ogImage).width(1200).height(630).url()
      : undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyRouteProps) {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)

  if (!study) {
    notFound()
  }

  if (slug === YANDE_STUDIO_SLUG) {
    return <YandeStudioEditorial study={study} />
  }

  return (
    <article className="case-study">
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
