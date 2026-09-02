import Image from 'next/image'

type PageLoaderProps = {
  caption?: string
}

export function PageLoader({ caption = 'Product designer' }: PageLoaderProps) {
  return (
    <div className="page-loader">
      <Image
        src="/hero/logo-black.png"
        alt="Richard Nyande"
        width={366}
        height={177}
        priority
        className="page-loader-logo"
      />
      <span className="page-loader-rule" aria-hidden="true">
        <span className="page-loader-rule-fill" />
      </span>
      <p className="page-loader-caption">{caption}</p>
    </div>
  )
}
