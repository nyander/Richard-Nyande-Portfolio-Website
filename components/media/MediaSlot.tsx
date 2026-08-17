import { SanityImage } from '@/components/media/SanityImage'
import { TodoPlaceholder } from '@/components/work/TodoPlaceholder'
import type { AltImage } from '@/lib/sanity/types'

type MediaSlotProps = {
  image?: AltImage | null
  todo: string
  label?: string
}

export function hasImageAsset(image?: AltImage | null) {
  return Boolean(image?.asset)
}

export function MediaSlot({ image, todo, label }: MediaSlotProps) {
  if (hasImageAsset(image) && image) {
    return <SanityImage image={image} sizes="(min-width: 800px) 40vw, 100vw" />
  }

  return (
    <figure className="media-slot media-slot-empty">
      <div className="media-slot-frame" aria-hidden="true" />
      {label ? <figcaption>{label}</figcaption> : null}
      <TodoPlaceholder label={todo} />
    </figure>
  )
}
