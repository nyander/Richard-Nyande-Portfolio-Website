export const NAV_ITEMS = [
  {
    id: 'work',
    label: 'Work',
    href: '/',
    preview:
      'Case studies with real depth — the ideas that grew past the sketchbook and into products.',
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    preview:
      'A product designer and creative technologist working between notes, sketches, and shipped software.',
  },
  {
    id: 'cv',
    label: 'CV',
    href: '/cv/richard-nyande.pdf',
    download: 'richard-nyande.pdf',
    preview:
      'The current CV — employment, capability, and the work behind the case studies.',
  },
  {
    id: 'yande',
    label: 'Yande',
    href: 'https://yande.uk',
    external: true,
    preview: 'The studio for making and publishing work outside the portfolio.',
  },
] as const

export const MENU_CONTACT = {
  email: 'rich.nyande@gmail.com',
  mailto: 'mailto:rich.nyande@gmail.com',
  place: 'Essex, United Kingdom',
} as const

export const MENU_SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/richard-nyande-1aa32a133' },
  { label: 'Instagram', href: 'https://www.instagram.com/richxrt_/' },
  { label: 'GitHub', href: 'https://github.com/nyander' },
] as const

export function isOffsiteNav(item: (typeof NAV_ITEMS)[number]) {
  return 'external' in item || 'download' in item
}

export function isCurrentNav(pathname: string, href: string, offsite?: boolean) {
  if (offsite) {
    return false
  }
  if (href === '/') {
    return pathname === '/' || pathname.startsWith('/work')
  }
  return pathname.startsWith(href)
}
