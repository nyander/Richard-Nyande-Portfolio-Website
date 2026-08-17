import Image from 'next/image'

export function HeroSignature() {
  return (
    <div className="hero-signature" aria-hidden="true">
      <Image
        src="/hero/Richard Nyande Logo (Black).png"
        alt=""
        width={366}
        height={177}
        className="hero-signature-logo"
      />
    </div>
  )
}
