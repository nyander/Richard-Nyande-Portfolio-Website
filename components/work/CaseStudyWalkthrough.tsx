import { Reveal } from '@/components/motion/Reveal'

type CaseStudyWalkthroughProps = {
  url: string
  title?: string | null
}

function youtubeId(url: string) {
  const fromQuery = url.match(/[?&]v=([^&]+)/)
  if (fromQuery?.[1]) {
    return fromQuery[1]
  }

  const fromShort = url.match(/youtu\.be\/([^?&]+)/)
  return fromShort?.[1] ?? null
}

function youtubeStart(url: string) {
  const match = url.match(/[?&]t=([^&]+)/)
  if (!match?.[1]) {
    return null
  }

  const value = match[1]
  if (/^\d+$/.test(value)) {
    return value
  }

  const parts = value.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/)
  if (!parts) {
    return null
  }

  const hours = Number(parts[1] ?? 0)
  const minutes = Number(parts[2] ?? 0)
  const seconds = Number(parts[3] ?? 0)
  const total = hours * 3600 + minutes * 60 + seconds
  return total > 0 ? String(total) : null
}

function embedUrl(url: string) {
  const id = youtubeId(url)
  if (!id) {
    return url
  }

  const start = youtubeStart(url)
  const params = new URLSearchParams({ rel: '0' })
  if (start) {
    params.set('start', start)
  }

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`
}

export function CaseStudyWalkthrough({ url, title }: CaseStudyWalkthroughProps) {
  const src = embedUrl(url)
  const label = title || 'Project walkthrough'

  return (
    <section
      id="walkthrough"
      className="case-study-walkthrough"
      aria-labelledby="walkthrough-heading"
    >
      <Reveal>
        <p className="section-eyebrow">Walkthrough</p>
        <h2 id="walkthrough-heading">How the product works</h2>
        <p className="section-intro">
          A recorded pass through the live student build — stock, shipments, requests and
          reports.
        </p>
      </Reveal>
      <div className="walkthrough-frame">
        <iframe
          src={src}
          title={label}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <p className="walkthrough-note">
        <a href={url} target="_blank" rel="noopener noreferrer">
          Watch on YouTube ↗
        </a>
      </p>
    </section>
  )
}
