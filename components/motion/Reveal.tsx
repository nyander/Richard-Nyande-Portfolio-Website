'use client'

import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode, Ref } from 'react'

type RevealTag = 'div' | 'li' | 'article'

type RevealProps = {
  as?: RevealTag
  children: ReactNode
  className?: string
  delay?: number
  id?: string
}

/**
 * Fades an element up into place the first time it scrolls into view.
 * Animates once (does not replay on scroll-back) and is fully inert
 * under prefers-reduced-motion, where the CSS simply renders it visible.
 */
export function Reveal({ as = 'div', children, className, delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  // Always starts false so the server-rendered markup matches the client's
  // first render; anything IntersectionObserver-related only runs post-mount.
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }

    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const classes = ['reveal', visible ? 'reveal-visible' : '', className]
    .filter(Boolean)
    .join(' ')
  const style = delay
    ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties)
    : undefined

  if (as === 'li') {
    return (
      <li id={id} ref={ref as Ref<HTMLLIElement>} className={classes} style={style}>
        {children}
      </li>
    )
  }

  if (as === 'article') {
    return (
      <article id={id} ref={ref as Ref<HTMLElement>} className={classes} style={style}>
        {children}
      </article>
    )
  }

  return (
    <div id={id} ref={ref as Ref<HTMLDivElement>} className={classes} style={style}>
      {children}
    </div>
  )
}
