import Image from 'next/image'

import { urlFor } from '@/lib/sanity/image'
import type { AltImage } from '@/lib/sanity/types'

type SanityImageProps = {
  image: AltImage
  className?: string
  sizes?: string
  priority?: boolean
  caption?: string
  hideProvenance?: boolean
}

export function SanityImage({
  image,
  className,
  sizes,
  priority = false,
  caption,
  hideProvenance = false,
}: SanityImageProps) {
  const src = image.src
    ? image.src
    : image.asset
      ? urlFor(image).width(2000).quality(80).url()
      : null

  if (!src) {
    return null
  }

  const resolvedCaption = caption ?? image.caption
  const showProvenance =
    !hideProvenance && image.provenance && image.provenance !== 'actual'

  return (
    <figure>
      <Image
        src={src}
        alt={image.alt}
        width={2000}
        height={1250}
        className={className}
        sizes={sizes}
        priority={priority}
      />
      {(resolvedCaption || showProvenance) && (
        <figcaption>
          {resolvedCaption}
          {showProvenance ? ` (${image.provenance})` : null}
        </figcaption>
      )}
    </figure>
  )
}
