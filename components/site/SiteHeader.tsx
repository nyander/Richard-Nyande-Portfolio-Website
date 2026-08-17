'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { id: 'work', label: 'Work', href: '/' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'yande', label: 'Yande', href: 'https://yande.uk', external: true },
] as const

const CONTACT_MAILTO = 'mailto:contact@richardnyande.co.uk'

function isCurrent(pathname: string, href: string, external?: boolean) {
  if (external) {
    return false
  }
  if (href === '/') {
    return pathname === '/' || pathname.startsWith('/work')
  }
  return pathname.startsWith(href)
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className={pathname === '/' ? 'site-bar-shell is-overlay' : 'site-bar-shell'}>
      <div className="site-bar">
        <div className="site-bar-start">
          <Link href="/" className="site-bar-identity">
            <Image
              src="/hero/logo-black.png"
              alt="Richard Nyande"
              width={366}
              height={177}
              priority
              className="site-bar-logo"
            />
          </Link>
          <nav className="site-bar-nav" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const current = isCurrent(pathname, item.href, 'external' in item)
              const className = current ? 'site-bar-link is-current' : 'site-bar-link'

              if ('external' in item) {
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={className}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                )
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={className}
                  aria-current={current ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <a className="site-bar-contact" href={CONTACT_MAILTO}>
          Contact
        </a>
      </div>
    </header>
  )
}
