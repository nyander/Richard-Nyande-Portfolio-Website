'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { FooterWordmark } from '@/components/site/FooterWordmark'
import { MENU_SOCIALS, NAV_ITEMS, isCurrentNav } from '@/lib/nav'

const BIO =
  "I'm a multidisciplinary designer and developer working across product design, creative technology and digital experiences. My practice combines design and engineering, taking ideas from early concepts and user experience through to fully realised digital products, while drawing inspiration from fashion, music, art and culture to explore new ways of building, interacting and communicating through technology."

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </>
  ),
  Behance: (
    <>
      <path
        d="M3 5.75h5.4c2.2 0 3.6 1 3.6 2.9 0 1.15-.55 1.95-1.5 2.4 1.3.37 2.05 1.35 2.05 2.75 0 2.2-1.7 3.2-3.95 3.2H3V5.75Zm2.3 4.5h2.6c.85 0 1.4-.4 1.4-1.15 0-.8-.55-1.15-1.4-1.15H5.3v2.3Zm0 4.55h2.85c.95 0 1.5-.4 1.5-1.25s-.55-1.3-1.5-1.3H5.3v2.55Z"
        fill="currentColor"
      />
      <path d="M15 6.4h5.4v1.6H15z" fill="currentColor" />
      <path
        d="M17.6 9.4c2.35 0 3.9 1.6 3.9 4.05 0 .2-.01.4-.03.6h-5.6c.1 1.1.75 1.7 1.8 1.7.7 0 1.3-.3 1.55-.9h2.05c-.5 1.75-1.85 2.6-3.65 2.6-2.4 0-4-1.65-4-4.05 0-2.35 1.65-4 3.98-4Zm-1.7 3.3h3.35c-.13-.95-.7-1.5-1.62-1.5-.95 0-1.55.55-1.73 1.5Z"
        fill="currentColor"
      />
    </>
  ),
  GitHub: (
    <path
      d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.38 6.84 9.74.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.13 10.13 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
      fill="currentColor"
    />
  ),
  LinkedIn: (
    <>
      <path
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 9.5h5.16v11.9H2.4z"
        fill="currentColor"
      />
      <path
        d="M10.4 9.5h4.94v1.63h.07c.69-1.2 2.37-2.02 4.06-2.02 4.34 0 5.13 2.71 5.13 6.24v6.05H19.4v-5.36c0-1.28-.02-2.93-1.83-2.93-1.84 0-2.12 1.4-2.12 2.84v5.45H10.4z"
        fill="currentColor"
      />
    </>
  ),
}

export function SiteFooter() {
  const pathname = usePathname()

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-top">
          <Link href="/" className="site-footer-identity">
            <Image
              src="/hero/logo-black.png"
              alt="Richard Nyande"
              width={366}
              height={177}
              className="site-footer-logo"
            />
          </Link>

          <ul className="site-footer-socials">
            {MENU_SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    {SOCIAL_ICONS[social.label]}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer-body">
          <div className="site-footer-primary">
            <p className="site-footer-bio">{BIO}</p>
            <p className="site-footer-copyright">
              <span>Copyright</span>
              <span className="site-footer-copyright-mark" aria-hidden="true">
                C
              </span>
              <span>Richard Nyande</span>
            </p>
          </div>

          <nav className="site-footer-nav" aria-label="Footer">
            <ul>
              {NAV_ITEMS.map((item) => {
                const current = isCurrentNav(pathname, item.href, 'external' in item)

                if (item.id === 'yande') {
                  return [
                    <li key="contact">
                      <Link
                        className={
                          pathname === '/contact' ? 'site-footer-link is-current' : 'site-footer-link'
                        }
                        href="/contact"
                        aria-current={pathname === '/contact' ? 'page' : undefined}
                      >
                        Contact
                      </Link>
                    </li>,
                    <li key={item.id}>
                      <a
                        href={item.href}
                        className="site-footer-yande"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src="/images/Yande Logo - 1024px.png"
                          alt="Yande"
                          width={3167}
                          height={1265}
                          className="site-footer-yande-logo"
                        />
                      </a>
                    </li>,
                  ]
                }

                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={current ? 'site-footer-link is-current' : 'site-footer-link'}
                      aria-current={current ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <FooterWordmark />
      </div>
    </footer>
  )
}
