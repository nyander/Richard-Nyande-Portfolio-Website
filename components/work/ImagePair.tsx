'use client'

import { useState } from 'react'

import { Lightbox } from '@/components/media/Lightbox'
import { hasImageAsset, MediaSlot } from '@/components/media/MediaSlot'
import { Reveal } from '@/components/motion/Reveal'
import type { AltImage } from '@/lib/sanity/types'

type ImagePairProps = {
  before?: AltImage | null
  after?: AltImage | null
  beforeLabel?: string
  afterLabel?: string
  beforeTodo: string
  afterTodo: string
}

type LightboxState = {
  image: AltImage
  label: string
}

export function ImagePair({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
  beforeTodo,
  afterTodo,
}: ImagePairProps) {
  const [active, setActive] = useState<LightboxState | null>(null)

  return (
    <>
      <div className="image-pair">
        <ImagePairSlot
          image={before}
          label={beforeLabel}
          todo={beforeTodo}
          delay={0}
          onExpand={() =>
            before && hasImageAsset(before) && setActive({ image: before, label: beforeLabel })
          }
        />
        <span className="image-pair-arrow" aria-hidden="true">
          →
        </span>
        <ImagePairSlot
          image={after}
          label={afterLabel}
          todo={afterTodo}
          delay={90}
          onExpand={() =>
            after && hasImageAsset(after) && setActive({ image: after, label: afterLabel })
          }
        />
      </div>
      {active ? (
        <Lightbox image={active.image} label={active.label} onClose={() => setActive(null)} />
      ) : null}
    </>
  )
}

function ImagePairSlot({
  image,
  label,
  todo,
  delay,
  onExpand,
}: {
  image?: AltImage | null
  label: string
  todo: string
  delay: number
  onExpand: () => void
}) {
  if (hasImageAsset(image)) {
    return (
      <Reveal className="media-reveal" delay={delay}>
        <button
          type="button"
          className="image-pair-expand"
          onClick={onExpand}
          aria-label={`Expand ${label} image`}
        >
          <MediaSlot image={image} label={label} todo={todo} />
        </button>
      </Reveal>
    )
  }

  return <MediaSlot image={image} label={label} todo={todo} />
}
