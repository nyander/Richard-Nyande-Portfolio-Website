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
  const hasBefore = hasImageAsset(before)
  const hasAfter = hasImageAsset(after)

  if (!hasBefore && !hasAfter) {
    return null
  }

  const pair = hasBefore && hasAfter

  return (
    <>
      <div className={pair ? 'image-pair' : 'image-pair is-single'}>
        {hasBefore ? (
          <ImagePairSlot
            image={before}
            label={beforeLabel}
            todo={beforeTodo}
            delay={0}
            sizes={pair ? '(min-width: 800px) 40vw, 100vw' : '(min-width: 800px) 92vw, 100vw'}
            onExpand={() =>
              before && setActive({ image: before, label: beforeLabel })
            }
          />
        ) : null}
        {pair ? (
          <span className="image-pair-arrow" aria-hidden="true">
            →
          </span>
        ) : null}
        {hasAfter ? (
          <ImagePairSlot
            image={after}
            label={afterLabel}
            todo={afterTodo}
            delay={hasBefore ? 90 : 0}
            sizes={pair ? '(min-width: 800px) 40vw, 100vw' : '(min-width: 800px) 92vw, 100vw'}
            onExpand={() =>
              after && setActive({ image: after, label: afterLabel })
            }
          />
        ) : null}
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
  sizes,
  onExpand,
}: {
  image?: AltImage | null
  label: string
  todo: string
  delay: number
  sizes: string
  onExpand: () => void
}) {
  if (!hasImageAsset(image) || !image) {
    return null
  }

  return (
    <Reveal className="media-reveal" delay={delay}>
      <button
        type="button"
        className="image-pair-expand"
        onClick={onExpand}
        aria-label={`Expand ${label} image`}
      >
        <MediaSlot image={image} label={label} todo={todo} sizes={sizes} />
      </button>
    </Reveal>
  )
}
