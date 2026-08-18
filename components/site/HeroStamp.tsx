import Image from 'next/image'
import { HeroAvatar } from '@/components/site/HeroAvatar'
import { HeroSignature } from '@/components/site/HeroSignature'

function Postmark() {
  return (
    <div className="hero-postmark" aria-hidden="true">
      <Image
        src="/hero/Stamp Design.png"
        alt=""
        width={555}
        height={685}
        loading="eager"
        fetchPriority="high"
        className="hero-postmark-mark"
      />
    </div>
  )
}

export function HeroStamp() {
  return (
    <div className="hero-stamp-block">
      <Postmark />
      <HeroSignature />
      <div className="hero-stamp-move">
        <div className="hero-stamp-shadows" aria-hidden="true">
          <div className="hero-stamp-shadow is-soft" />
          <div className="hero-stamp-shadow is-contact" />
        </div>
        <div className="hero-stamp" aria-label="Interactive 3D portrait of Richard Nyande">
          <div className="hero-stamp-paper">
            <HeroAvatar />
          </div>
        </div>
      </div>
    </div>
  )
}
