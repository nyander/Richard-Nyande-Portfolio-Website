import type { Metadata } from 'next'

import { AboutPage } from '@/components/site/AboutPage'
import { ABOUT } from '@/lib/about'

export const metadata: Metadata = {
  title: 'About — Richard Nyande',
  description: ABOUT.opening.lede,
}

export default function AboutRoute() {
  return (
    <main>
      <AboutPage />
    </main>
  )
}
