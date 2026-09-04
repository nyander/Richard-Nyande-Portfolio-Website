import type { Metadata } from 'next'

import { WorkIndex } from '@/components/work/WorkIndex'
import { getWorkIndex } from '@/lib/sanity/queries'
import { routeMetadata } from '@/lib/seo'

export const metadata: Metadata = routeMetadata({
  title: 'Work',
  description:
    'Selected work — products I designed and built, from the first notes through to software in use.',
  path: '/work',
})

export default async function WorkPage() {
  const { caseStudies, otherWork } = await getWorkIndex().catch(() => ({
    caseStudies: [],
    otherWork: [],
  }))

  return (
    <main>
      <h1 className="visually-hidden">Selected work</h1>
      <WorkIndex caseStudies={caseStudies} otherWork={otherWork} />
    </main>
  )
}
