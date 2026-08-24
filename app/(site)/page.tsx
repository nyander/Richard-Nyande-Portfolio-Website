import { HomeHero } from '@/components/site/HomeHero'
import { FeaturedCaseStudyList } from '@/components/work/FeaturedCaseStudyList'
import { getFeaturedCaseStudies } from '@/lib/sanity/queries'

export default async function HomePage() {
  const studies = await getFeaturedCaseStudies()

  return (
    <main>
      <HomeHero />
      <FeaturedCaseStudyList studies={studies} />
    </main>
  )
}
