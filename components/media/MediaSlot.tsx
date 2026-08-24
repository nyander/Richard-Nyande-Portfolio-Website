import { SanityImage } from '@/components/media/SanityImage'
import { TodoPlaceholder } from '@/components/work/TodoPlaceholder'
import type { AltImage } from '@/lib/sanity/types'

type MediaSlotProps = {
  image?: AltImage | null
  todo: string
  label?: string
  hideProvenance?: boolean
  sizes?: string
}

export function hasImageAsset(image?: AltImage | null) {
  return Boolean(image?.asset || image?.src)
}

export function MediaSlot({
  image,
  todo,
  label,
  hideProvenance = false,
  sizes = '(min-width: 800px) 40vw, 100vw',
}: MediaSlotProps) {
  if (hasImageAsset(image) && image) {
    return (
      <SanityImage
        image={image}
        caption={label}
        hideProvenance={hideProvenance || Boolean(label)}
        sizes={sizes}
      />
    )
  }

  return (
    <figure className="media-slot media-slot-empty">
      <div className="media-slot-frame" aria-hidden="true" />
      {label ? <figcaption>{label}</figcaption> : null}
      <TodoPlaceholder label={todo} />
    </figure>
  )
}
