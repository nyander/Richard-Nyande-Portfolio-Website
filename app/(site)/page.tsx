import { HomeHero } from '@/components/site/HomeHero'
import { ContactSection } from '@/components/site/ContactSection'
import { WorkIndex } from '@/components/work/WorkIndex'
import { getWorkIndex } from '@/lib/sanity/queries'

export default async function HomePage() {
  const { caseStudies, otherWork } = await getWorkIndex().catch(() => ({
    caseStudies: [],
    otherWork: [],
  }))

  return (
    <main>
      <HomeHero />
      <WorkIndex caseStudies={caseStudies} otherWork={otherWork} />
      <ContactSection />
    </main>
  )
}
