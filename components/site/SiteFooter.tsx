import Link from 'next/link'

import { PlusMark } from '@/components/site/PlusMark'

const BIO =
  "I'm a multidisciplinary developer with a focus on product design, user experience, and hand-held digital drawing. I enjoy exploring new creative avenues, such as fashion and music production, and I'm always looking to push boundaries and provoke new thinking with my work."

const FOLLOW_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/richxrt_/' },
  { label: 'Behance', href: 'https://www.behance.net/richardnyande' },
  { label: 'GitHub', href: 'https://github.com/nyander' },
] as const

const WORK_LINKS = [
  { label: 'About', href: '/about', external: false },
  { label: 'Contact', href: '/contact', external: false },
  { label: 'Yande', href: 'https://yande.uk', external: true },
] as const

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-primary">
          <Link href="/" className="site-footer-identity">
            <PlusMark className="site-footer-mark" />
            <span>
              <span className="site-footer-title">Designed By Richard</span>
              <span className="site-footer-kicker">Portfolio</span>
            </span>
          </Link>

          <p className="site-footer-bio">{BIO}</p>

          <hr className="site-footer-rule" />

          <a className="site-footer-email" href="mailto:rich.nyande@gmail.com">
            rich.nyande@gmail.com
          </a>
        </div>

        <nav className="site-footer-nav" aria-label="Footer">
          <div className="site-footer-col">
            <h2>Follow</h2>
            <ul>
              {FOLLOW_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer-col">
            <h2>
              <span className="site-footer-work-mark" aria-hidden="true" />
              Work
            </h2>
            <ul>
              {WORK_LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </footer>
  )
}
