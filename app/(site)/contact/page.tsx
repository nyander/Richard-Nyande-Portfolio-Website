import type { Metadata } from 'next'

import { ContactSection } from '@/components/site/ContactSection'
import { routeMetadata } from '@/lib/seo'

export const metadata: Metadata = routeMetadata({
  title: 'Contact',
  description:
    'If you have a product to design and build, or a brief that needs someone who can do both — write to me. I read everything that comes through.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <main>
      <h1 className="visually-hidden">Get in touch</h1>
      <ContactSection standalone />
    </main>
  )
}
