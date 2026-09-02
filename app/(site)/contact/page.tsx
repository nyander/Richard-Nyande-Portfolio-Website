import type { Metadata } from 'next'

import { ContactSection } from '@/components/site/ContactSection'

export const metadata: Metadata = {
  title: 'Contact — Richard Nyande',
  description:
    'Write to Richard Nyande about product design and build work.',
}

export default function ContactPage() {
  return (
    <main>
      <ContactSection standalone />
    </main>
  )
}
