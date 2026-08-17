'use client'

import { useId, useState } from 'react'
import type { KeyboardEvent } from 'react'

import { QuoteBlock } from '@/components/work/QuoteBlock'
import type { AttributedQuote } from '@/lib/sanity/types'

type QuoteCarouselProps = {
  quotes: AttributedQuote[]
}

export function QuoteCarousel({ quotes }: QuoteCarouselProps) {
  const idPrefix = useId()
  const [index, setIndex] = useState(0)

  if (quotes.length === 0) {
    return null
  }

  if (quotes.length === 1) {
    return (
      <div className="outcome-quotes">
        <QuoteBlock quote={quotes[0]} />
      </div>
    )
  }

  function goTo(nextIndex: number) {
    setIndex((nextIndex + quotes.length) % quotes.length)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(index + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(index - 1)
    }
  }

  const activeQuote = quotes[index]
  const slideId = `${idPrefix}-quote-slide`

  return (
    <div
      className="quote-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Client quotes"
      onKeyDown={handleKeyDown}
    >
      <div className="quote-carousel-viewport">
        <div
          key={index}
          id={slideId}
          className="quote-carousel-slide"
          aria-live="polite"
        >
          <QuoteBlock quote={activeQuote} />
        </div>
      </div>

      <div className="quote-carousel-controls">
        <button
          type="button"
          className="quote-carousel-arrow"
          aria-label="Previous quote"
          aria-controls={slideId}
          onClick={() => goTo(index - 1)}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div className="quote-carousel-dots">
          {quotes.map((quote, dotIndex) => (
            <button
              key={quote.name + dotIndex}
              type="button"
              className="quote-carousel-dot"
              aria-label={`Show quote ${dotIndex + 1} of ${quotes.length}, ${quote.name}`}
              aria-current={dotIndex === index ? 'true' : undefined}
              aria-controls={slideId}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>

        <button
          type="button"
          className="quote-carousel-arrow"
          aria-label="Next quote"
          aria-controls={slideId}
          onClick={() => goTo(index + 1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
