import { PortableText, type PortableTextComponents } from '@portabletext/react'

import type { RestrictedPortableText as RestrictedPortableTextValue } from '@/lib/sanity/types'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href as string | undefined
      if (!href) {
        return children
      }

      return (
        <a href={href} rel="noreferrer">
          {children}
        </a>
      )
    },
  },
}

type RestrictedPortableTextProps = {
  value?: RestrictedPortableTextValue | null
}

export function RestrictedPortableText({ value }: RestrictedPortableTextProps) {
  if (!value?.length) {
    return null
  }

  return <PortableText value={value} components={components} />
}
