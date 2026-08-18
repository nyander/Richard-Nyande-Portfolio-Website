'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PlusMark } from '@/components/site/PlusMark'
import {
  MENU_CONTACT,
  MENU_SOCIALS,
  NAV_ITEMS,
  isCurrentNav,
} from '@/lib/nav'

type SiteMenuProps = {
  open: boolean
  onClose: () => void
}

export function SiteMenu({ open, onClose }: SiteMenuProps) {
  const pathname = usePathname()
  const titleId = useId()
  const current =
    NAV_ITEMS.find((item) => isCurrentNav(pathname, item.href, 'external' in item)) ??
    NAV_ITEMS[0]
  const [previewId, setPreviewId] = useState(current.id)
  const preview = NAV_ITEMS.find((item) => item.id === previewId) ?? current

  useEffect(() => {
    if (open) {
      setPreviewId(current.id)
    }
  }, [open, current.id])

  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div
      className="site-menu"
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="site-menu-texture" aria-hidden="true" />

      <div className="site-menu-top">
        <Link href="/" className="site-menu-identity" onClick={onClose}>
          <PlusMark className="site-menu-mark" />
          <span id={titleId}>Richard Nyande | Portfolio</span>
        </Link>
        <button type="button" className="site-menu-close" onClick={onClose} aria-label="Close menu">
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="site-menu-body">
        <nav className="site-menu-nav" aria-label="Menu">
          {NAV_ITEMS.map((item) => {
            const currentItem = isCurrentNav(pathname, item.href, 'external' in item)
            const className =
              previewId === item.id || currentItem
                ? 'site-menu-link is-active'
                : 'site-menu-link'

            const shared = {
              className,
              onMouseEnter: () => setPreviewId(item.id),
              onFocus: () => setPreviewId(item.id),
              onClick: onClose,
            }

            if ('external' in item) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...shared}
                >
                  {item.label} <span aria-hidden="true">/</span>
                </a>
              )
            }

            return (
              <Link key={item.id} href={item.href} {...shared}>
                {item.label} <span aria-hidden="true">/</span>
              </Link>
            )
          })}
        </nav>

        <div className="site-menu-panel">
          <h2 className="site-menu-heading">{preview.label}</h2>
          <p className="site-menu-copy">{preview.preview}</p>

          <div className="site-menu-meta">
            <a href={MENU_CONTACT.mailto}>{MENU_CONTACT.email}</a>
            <p>{MENU_CONTACT.place}</p>
          </div>

          <ul className="site-menu-socials">
            {MENU_SOCIALS.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-menu-foot" aria-hidden="true" />
    </div>
  )
}
