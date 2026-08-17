import type { AttributedQuote } from '@/lib/sanity/types'

export function QuoteBlock({ quote }: { quote: AttributedQuote }) {
  return (
    <blockquote className="quote-block">
      <p>{quote.quote}</p>
      <footer>
        {quote.name}
        {quote.role ? `, ${quote.role}` : null}
      </footer>
    </blockquote>
  )
}
