import Image from 'next/image'

import { urlFor } from '@/lib/sanity/image'
import type { AltImage } from '@/lib/sanity/types'

type SanityImageProps = {
  image: AltImage
  className?: string
  sizes?: string
  priority?: boolean
}

export function SanityImage({
  image,
  className,
  sizes,
  priority = false,
}: SanityImageProps) {
  if (!image.asset) {
    return null
  }

  const src = urlFor(image).width(2000).quality(80).url()
  const showProvenance =
    image.provenance && image.provenance !== 'actual'

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
      {(image.caption || showProvenance) && (
        <figcaption>
          {image.caption}
          {showProvenance ? ` (${image.provenance})` : null}
        </figcaption>
      )}
    </figure>
  )
}
