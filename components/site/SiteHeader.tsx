'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SiteMenu } from '@/components/site/SiteMenu'
import { NAV_ITEMS, isCurrentNav } from '@/lib/nav'

export function SiteHeader() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header className={pathname === '/' ? 'site-bar-shell is-overlay' : 'site-bar-shell'}>
        <div className="site-bar">
          <div className="site-bar-start">
            <button
              type="button"
              className="site-bar-menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen(true)}
            >
              <span className="site-bar-menu-bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="visually-hidden">Open menu</span>
            </button>
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
                const current = isCurrentNav(pathname, item.href, 'external' in item)

                if (item.id === 'yande') {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className="site-bar-yande"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src="/images/Yande Logo - 1024px.png"
                        alt="Yande"
                        width={3167}
                        height={1265}
                        className="site-bar-yande-logo"
                      />
                    </a>
                  )
                }

                const className = current ? 'site-bar-link is-current' : 'site-bar-link'

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

          <a
            className={pathname === '/contact' ? 'site-bar-contact is-current' : 'site-bar-contact'}
            href="/contact"
            aria-current={pathname === '/contact' ? 'page' : undefined}
          >
            Contact
          </a>
        </div>
      </header>
      <SiteMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
