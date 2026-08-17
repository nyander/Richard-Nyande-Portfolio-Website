import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SectionProgress } from '@/components/motion/SectionProgress'
import { CaseStudyDeepDives } from '@/components/work/CaseStudyDeepDives'
import { CaseStudyDesignToCode } from '@/components/work/CaseStudyDesignToCode'
import { CaseStudyHero } from '@/components/work/CaseStudyHero'
import { CaseStudyOutcome } from '@/components/work/CaseStudyOutcome'
import { CaseStudyProductModules } from '@/components/work/CaseStudyProductModules'
import { CaseStudyReframing } from '@/components/work/CaseStudyReframing'
import { urlFor } from '@/lib/sanity/image'
import { getCaseStudyBySlug, getCaseStudySlugs } from '@/lib/sanity/queries'

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
  const ogImage = study.ogImage?.asset
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

  return (
    <article className="case-study">
      <SectionProgress />
      <header className="case-study-masthead">
        <h1 id="case-study-title">{study.title}</h1>
        <div className="case-study-role">
          <span className="case-study-role-label">Role</span>
          <span className="case-study-role-value">{study.role}</span>
        </div>
      </header>
      <CaseStudyHero study={study} />
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
