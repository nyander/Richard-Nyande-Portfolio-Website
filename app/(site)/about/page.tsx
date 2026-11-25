import type { Metadata } from 'next'

import { AboutPage } from '@/components/site/AboutPage'
import { routeMetadata } from '@/lib/seo'

export const metadata: Metadata = routeMetadata({
  title: 'About',
  description:
    'Full-stack engineer and creative technologist. I design and build digital products, then ship them. Based in Essex; currently a contractor at Hutchison Ports UK and founder of Yande Studio.',
  path: '/about',
})

export default function AboutRoute() {
  return (
    <main>
      <AboutPage />
    </main>
  )
}
