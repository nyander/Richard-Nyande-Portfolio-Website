import { SectionProgress, type SectionProgressItem } from '@/components/motion/SectionProgress'
import { SanityImage } from '@/components/media/SanityImage'
import {
  ABOUT,
  CONTACT,
  EXTERIOR,
  EXTERIOR_MOBILE,
  GATE,
  LIBRARY,
  PRACTICE,
  ROTATION,
} from '@/lib/yande-studio-media'
import type { AltImage, CaseStudyPage } from '@/lib/sanity/types'

const CHAPTERS: SectionProgressItem[] = [
  { id: 'yande-open', label: 'Opening' },
  { id: 'yande-proposition', label: 'The proposition' },
  { id: 'yande-world', label: 'Designing the world' },
  { id: 'yande-experience', label: 'The experience' },
  { id: 'yande-system', label: 'The system' },
  { id: 'yande-process', label: 'The making' },
  { id: 'yande-unresolved', label: 'Unresolved' },
]

function Discipline({ name, children }: { name: string; children: string }) {
  return (
    <p className="yande-ed-discipline">
      <span className="yande-ed-discipline-name">{name}</span>
      {children}
    </p>
  )
}

function Spread({
  image,
  caption,
  priority = false,
}: {
  image: AltImage
  caption?: string
  priority?: boolean
}) {
  return (
    <div className="yande-ed-spread">
      <SanityImage
        image={image}
        caption={caption}
        sizes="100vw"
        priority={priority}
        hideProvenance
        intrinsic
      />
    </div>
  )
}

function Pair({
  left,
  right,
  leftCaption,
  rightCaption,
}: {
  left: AltImage
  right: AltImage
  leftCaption?: string
  rightCaption?: string
}) {
  return (
    <div className="yande-ed-pair">
      <SanityImage
        image={left}
        caption={leftCaption}
        sizes="(min-width: 800px) 50vw, 100vw"
        hideProvenance
        intrinsic
      />
      <SanityImage
        image={right}
        caption={rightCaption}
        sizes="(min-width: 800px) 50vw, 100vw"
        hideProvenance
        intrinsic
      />
    </div>
  )
}

export function YandeStudioEditorial({ study }: { study: CaseStudyPage }) {
  return (
    <article className="yande-ed">
      <SectionProgress sections={CHAPTERS} />

      <header className="yande-ed-mast" id="yande-open">
        <p className="yande-ed-kicker">Production notes · {study.year}</p>
        <h1>Yandè Studio</h1>
        <p className="yande-ed-deck">
          Building a digital studio as a place, not a portfolio.
        </p>
        <p className="yande-ed-split">
          <a href={study.liveUrl ?? 'https://yande.uk'} target="_blank" rel="noopener noreferrer">
            yande.uk — experience the world
          </a>
          <span>This page — how the world was made</span>
        </p>
        {study.liveNote ? <p className="yande-ed-gate-note">{study.liveNote}</p> : null}
      </header>

      <Spread
        image={EXTERIOR}
        priority
        caption="The studio after unlock. Exterior is the public home; interior enter is still development-only."
      />

      <div className="yande-ed-inner">
        <blockquote className="yande-ed-pull">
          <p>
            Yandè began with a question: what if a creative studio website behaved less like a
            collection of pages and more like the studio itself?
          </p>
          <p>
            I designed and developed an interactive digital environment where work, references,
            experiments and unfinished ideas can coexist — using spatial interaction, editorial
            systems and real-time 3D to create a studio that can continually evolve.
          </p>
        </blockquote>
      </div>

      <section className="yande-ed-chapter" id="yande-proposition" aria-labelledby="yande-proposition-h">
        <div className="yande-ed-inner">
          <p className="yande-ed-num">01</p>
          <h2 id="yande-proposition-h">The proposition</h2>
          <div className="yande-ed-prose">
            <p>
              Yandè is my London studio. There was no client brief. I was defining the
              proposition, the brand, the product and the technology at the same time. A
              conventional agency site — pages, a work grid, a contact form — would have made
              the studio a logo on top of this portfolio.
            </p>
            <p>
              yande.uk had to carry unfinished interiors and a still-forming offer without
              lying about a public launch. Work had to be publishable without cloning the
              personal work list. Home had to run on a phone, not only on a desktop GPU. Yande
              Gadgets, the 2020 Accra shop app, is a different product that happens to share a
              first name.
            </p>
          </div>
          <Discipline name="Creative direction">
            I established the spatial metaphor: the site is a studio you arrive in, not a
            brochure you scroll.
          </Discipline>
          <Discipline name="Product design">
            I split the living artefact (yande.uk) from this page (how it was made), so the
            portfolio does not duplicate the studio.
          </Discipline>
        </div>
      </section>

      <section className="yande-ed-chapter" id="yande-world" aria-labelledby="yande-world-h">
        <div className="yande-ed-inner">
          <p className="yande-ed-num">02</p>
          <h2 id="yande-world-h">Designing the world</h2>
          <div className="yande-ed-prose">
            <p>
              The visual language is the studio: night exterior, a building poster, camcorder
              chrome, weather from a live UK forecast, a crate and a turntable for what is
              playing. About is editorial — founded by me, London — not a personal bio copied
              from this site. Rotation is a surface, not an Instagram dump.
            </p>
            <p>
              Atmosphere is not decoration. Sky and fog respond to Open-Meteo. Device-tier
              quality keeps the same place readable on a phone. The collage gate — ripped
              paper, stamp card, empty password — is the current public face, designed in
              Figma at 1440×1024 and then rebuilt for iOS keyboards and WebGL overlays.
            </p>
          </div>
          <Discipline name="Creative direction">
            I set the objects, type and weather so the studio has a climate, not a theme
            toggle.
          </Discipline>
        </div>
        <Pair
          left={ABOUT}
          right={ROTATION}
          leftCaption="About. The studio’s ‘who’, not this portfolio’s bio."
          rightCaption="Rotation. Crate and turntable — what is playing in the room."
        />
      </section>

      <section className="yande-ed-chapter" id="yande-experience" aria-labelledby="yande-experience-h">
        <div className="yande-ed-inner">
          <p className="yande-ed-num">03</p>
          <h2 id="yande-experience-h">Designing the experience</h2>
          <div className="yande-ed-prose">
            <p>
              A visitor without a password lands on the collage. That is honest: the interiors
              and some project pages are incomplete. After unlock they arrive in the exterior,
              then can move into About, Practice, Library, Rotation and Contact. Practice is
              filtered by studio work types — Digital Products, Immersive Experiences,
              Creative Direction — not job titles.
            </p>
            <p>
              Rooms are for discovery, not a game. The camera stays with the zone. Work-table
              slots are pickable; if a slot has no document it stays visible and inert.
              Composition of objects on the table is owned in code so a CMS author is not
              placing furniture every week. I did not open interior enter to the public —
              furniture is still in progress, and shipping that as a launch would have been
              the 3D equivalent of a fake coming-soon.
            </p>
          </div>
          <Discipline name="Interaction design">
            I designed the handoff between environment and interface: stay in the zone, don’t
            turn the studio into a quest.
          </Discipline>
          <Discipline name="Product design">
            I defined how visitors move between the place, the work index and the process
            archive — and when the door stays locked.
          </Discipline>
        </div>
        <Pair
          left={PRACTICE}
          right={LIBRARY}
          leftCaption="Practice. Work types, empty list — the content pass is not finished."
          rightCaption="Library. The archive exists as a route. Volume is not claimed."
        />
      </section>

      <section className="yande-ed-chapter" id="yande-system" aria-labelledby="yande-system-h">
        <div className="yande-ed-inner">
          <p className="yande-ed-num">04</p>
          <h2 id="yande-system-h">Building the system</h2>
          <div className="yande-ed-prose">
            <p>
              The studio needed continuity as people move between exterior, editorial pages
              and the CMS. I kept global scene state in Zustand so transitions stay light and
              the 3D environment is not coupled to every interface panel. Scene versions,
              Practice, Library and Rotation are Sanity documents; I publish from an embedded
              Studio at /studio. This portfolio shares the same production dataset — queries
              stay type-scoped so case studies here do not leak into Yandè.
            </p>
            <p>
              Home is the product, so payload is a design decision. Dead EXR, displacement and
              .blend files came out of public/. Draco GLBs and KTX2 textures stayed. Quality
              knobs live in one device-tier module: DPR, shadows, a city .mobile.glb. Leva
              shipped to visitors once; it is development-only now. Weather uniforms come from
              one fetch, not per-frame JavaScript. Next first-load win is exterior HDR, not
              more unlit interior silhouettes.
            </p>
            <p>
              The gate is middleware and an httpOnly cookie for seven days. /studio stays
              exempt so publishing continues while the street is locked. Reduced-motion applies
              to the About particle logo. Auth, payments, members and a shop are written down
              and not built.
            </p>
          </div>
          <Discipline name="Development">
            I built the platform and treated performance, isolation and the lock as part of
            the design, not a later polish pass.
          </Discipline>
        </div>
        <Pair
          left={EXTERIOR_MOBILE}
          right={GATE}
          leftCaption="Same exterior at phone width. Device-tier is a product choice."
          rightCaption="The live URL today. Collage, password, noindex."
        />
      </section>

      <section className="yande-ed-chapter" id="yande-process" aria-labelledby="yande-process-h">
        <div className="yande-ed-inner">
          <p className="yande-ed-num">05</p>
          <h2 id="yande-process-h">The production table</h2>
          <p className="yande-ed-lede">
            Evidence of thinking, not a polished recap. Blender viewports, discarded layouts
            and texture tests are not on this page yet.
          </p>
          <h3>Things that survived the process</h3>
        </div>
        <div className="yande-ed-survived">
          <Spread image={GATE} caption="The collage. Figma frame, then iOS, then the public enter." />
          <Spread image={EXTERIOR} caption="Exterior as the home the visitor can actually have." />
          <Spread image={CONTACT} caption="Contact. Enquiries on the product, not a separate inbox." />
        </div>
        <div className="yande-ed-inner">
          <h3>Things that didn’t</h3>
          <ul className="yande-ed-cut">
            <li>Leaving the unfinished 3D studio open on the live domain.</li>
            <li>Leva as a visitor-facing control.</li>
            <li>Job-title filters that read as freelance, not a studio.</li>
            <li>Cloning this portfolio’s case studies onto yande.uk.</li>
            <li>Interior enter for the public while furniture is still being placed.</li>
            <li>Membership, drops, shop, auth and payments as if they were this phase.</li>
            <li>A ~190 MB public folder of raw assets.</li>
          </ul>
        </div>
      </section>

      <section className="yande-ed-chapter is-close" id="yande-unresolved" aria-labelledby="yande-unresolved-h">
        <div className="yande-ed-inner">
          <p className="yande-ed-num">06</p>
          <h2 id="yande-unresolved-h">What Yandè became / what remains unresolved</h2>
          <div className="yande-ed-prose">
            <p>
              yande.uk is live and gated. Behind the enter screen: the 3D studio, About,
              Practice, Library, Rotation, Contact, and the CMS I publish into. I am the sole
              designer and developer. There is no usage metric on this page, and no named
              paying client for the platform build.
            </p>
            <p>
              Spectacle versus use: the gate is more honest than an open, half-dressed room.
              Performance is not a score — it is whether the exterior stays a place on a
              phone. Brand as interaction is the work-type IA and the table rule
              (composition in code, content in the CMS). The system is flexible enough to
              take a content pass and a furniture sequence without a second product.
            </p>
            <p>
              Next, actually: interior furniture, Practice and Library copy, exterior HDR.
              Not next: auth, payments, drops, a member layer. I would still keep Gadgets and
              this portfolio as separate studies. I would not describe the gate as a public
              studio visit.
            </p>
          </div>
          <p className="yande-ed-close-links">
            <a href={study.liveUrl ?? 'https://yande.uk'} target="_blank" rel="noopener noreferrer">
              Experience the world on yande.uk
            </a>
          </p>
        </div>
      </section>
    </article>
  )
}
