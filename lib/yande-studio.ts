import { blocks, decision, fact } from '@/lib/case-study-blocks'
import type { CaseStudyCard, CaseStudyPage } from '@/lib/sanity/types'

export const YANDE_STUDIO_SLUG = 'yande-studio'

export const YANDE_STUDIO_LIVE_URL = 'https://yande.uk'

export const YANDE_STUDIO_LIVE_NOTE =
  'Password-gated promo window. The studio surfaces sit behind the enter screen.'

export const YANDE_STUDIO_CARD: CaseStudyCard = {
  _id: 'caseStudy-yande-studio',
  title: 'Yandè Studio',
  slug: YANDE_STUDIO_SLUG,
  role: 'Founder, Product Designer, Full Stack Developer',
  year: 2026,
  summary:
    'Yandè Studio is Richard’s London creative studio. yande.uk is the platform he is designing and building for it — a spatial site and CMS for the studio’s work, not a second brand and not the 2020 Accra shop app. The live URL is an enter screen; About, Practice, Library, Rotation and Contact exist behind it.',
  status: 'in-progress',
  heroImage: null,
}

export const YANDE_STUDIO_STUDY: CaseStudyPage = {
  _id: 'caseStudy-yande-studio',
  title: 'Yandè Studio',
  slug: YANDE_STUDIO_SLUG,
  role: 'Founder, Product Designer, Full Stack Developer',
  year: 2026,
  summary:
    'Yandè Studio is Richard’s London creative studio. yande.uk is the platform he is designing and building for it — a spatial site and CMS for the studio’s work, not a second brand and not the 2020 Accra shop app. The live URL is an enter screen; About, Practice, Library, Rotation and Contact exist behind it.',
  status: 'in-progress',
  liveUrl: YANDE_STUDIO_LIVE_URL,
  liveNote: YANDE_STUDIO_LIVE_NOTE,
  contextFacts: [
    fact('Client', 'Yandè Studio (Richard Nyande)'),
    fact('Type', 'Studio platform — immersive site and CMS publishing'),
    fact(
      'Stack',
      'Next.js 16, React 19, React Three Fiber, Sanity, Tailwind, Vercel (live). Auth, payments and member access are not built.'
    ),
    fact('Team', 'Sole designer and developer'),
  ],
  heroImages: [],
  seoTitle: 'Yandè Studio — Building a digital studio as a place | Richard Nyande',
  seoDescription:
    'How Yandè Studio was made: spatial home, editorial systems and a gated live site. This page is the production story; yande.uk is the living artefact.',
  ogImage: null,
  reframing: {
    eyebrow: 'Beyond a studio brochure',
    heading: 'The work was building the studio’s own platform, not another portfolio page.',
    intro:
      'Yandè is the studio. yande.uk is what has to hold it: a 3D studio you can walk, pages you can read, and a CMS Richard publishes into. This is not Yande Gadgets, and it is not this personal site.',
    initialProposal: blocks(
      'Treat yande.uk as a marketing site or a copy of the personal work list — Webflow-like pages, Instagram as the archive, the 3D studio as decoration.'
    ),
    discovery: blocks(
      'The studio needed a place that could carry unfinished interiors and a still-forming offer without lying about a public launch. Work had to be publishable without duplicating the personal portfolio. Home had to run on a phone, not only on a desktop GPU. A 2020 shop ops app in Accra is a different product with the same first name.'
    ),
    productResponse: blocks(
      'I designed and built a Next.js and React Three Fiber platform with Sanity in-app. Home is a navigable studio with scene versions and device-tier quality. Practice, Library, Rotation and Contact are real routes. In August 2026 the live site was locked to a collage password gate so the URL could exist without pretending the studio was finished. /studio stays open for publishing.'
    ),
  },
  productModules: {
    eyebrow: 'Mapping the reality.',
    heading: 'Seven surfaces of one platform, one of them facing the street.',
    intro:
      'The enter screen is what an unauthenticated visitor gets today. Behind it: the 3D studio, About, Practice, Library, Rotation, and Contact plus the CMS Richard uses. Shop, drops and membership are not modules here because they are not built.',
    items: [
      {
        title: 'Enter (collage gate)',
        shortLabel: 'Enter',
        teaser:
          'Hold the live URL during the promo window without pretending the studio is an open public launch.',
        status: 'shipped',
        problem: blocks(
          'A debug-feeling 3D site in production — including Leva shipped to visitors, later gated to development — left a choice between leaving the unfinished studio open or a generic coming-soon page.'
        ),
        solution: blocks(
          'A Figma 1440×1024 collage mapped to percentage layout: password field, ripped-paper panels, 3D hat, hand and bubbles, plus iOS keyboard and WebGL work. Middleware sets an httpOnly cookie for seven days. /studio stays exempt so publishing continues while the street is locked.'
        ),
        before: [
          'Unfinished 3D studio open on the live domain',
          'Leva visible to visitors',
          'A generic coming-soon as the other option',
        ],
        after: [
          'Collage password gate as the public face',
          'Cookie unlock, gate noindex',
          'CMS still reachable at /studio',
        ],
      },
      {
        title: 'Immersive studio (home)',
        shortLabel: 'Home',
        teaser:
          'Arrive in a place: cloud intro, exterior, enter through glass, interior zones, pick objects, inspect work-table slots.',
        status: 'in-progress',
        problem: blocks(
          'Home is the product. A learning-phase Three.js scene and a ~190 MB public folder made desktop fidelity the default, including on phones.'
        ),
        solution: blocks(
          'Camera system, weather sky from Open-Meteo, city LOD, device-tier quality, Draco and KTX2 assets. Scene versions live in Sanity. Work-table inspect keeps composition in code and copy in the CMS. Exterior and interior are in the running build; furniture placement and some zone dressing are still open.'
        ),
        before: [
          'A first-cube / learning scene as home',
          'Heavy raw assets in public/',
          'Desktop quality on every device',
        ],
        after: [
          'Navigable exterior and interior',
          'Compressed assets and device-tier knobs',
          'Furniture sequence still in progress',
        ],
      },
      {
        title: 'Studio (About)',
        shortLabel: 'About',
        teaser:
          'Say who Yandè is, that it is London-based, founded by Richard, and what the practice is for.',
        status: 'shipped',
        problem: blocks(
          'There was no public “who” for the studio that was distinct from a personal bio on this portfolio.'
        ),
        solution: blocks(
          'An editorial about page: particle logo, production-practice copy, Listen / Shape / Refine, and a CMS-backed project carousel. A team-member schema exists for 3D toys. This page does not claim a public team.'
        ),
        before: [
          'Studio identity only as a line on the personal site',
          'No dedicated about for Yandè',
        ],
        after: [
          'About as a studio surface',
          'Founded by Richard Nyande, London',
          'No invented public team',
        ],
      },
      {
        title: 'Practice',
        shortLabel: 'Practice',
        teaser:
          'Show the studio’s work as Practice, not a freelance role list. Filters are work types, not job titles.',
        status: 'shipped',
        problem: blocks(
          'The personal portfolio was the only public work record. Job-title filters read as freelance, not as a studio.'
        ),
        solution: blocks(
          '/practice and /practice/[slug] on a Sanity project schema. Categories from the vision: Digital Products & Platforms, Immersive Experiences, Creative Direction, Product Design, Brand Experiences. The surface is shipped. Some case studies still need copy and imagery in Sanity.'
        ),
        before: [
          'Personal work list as the only public record',
          'Filters that sounded like job titles',
        ],
        after: [
          'Practice index and project pages',
          'Studio work-type IA',
          'Content pass still incomplete',
        ],
      },
      {
        title: 'Library',
        shortLabel: 'Library',
        teaser:
          'A public archive of studio thinking, references and experiments — not a member lock in this phase.',
        status: 'shipped',
        problem: blocks(
          'References lived on Instagram or nowhere. There was no studio archive a visitor could read.'
        ),
        solution: blocks(
          'Index and [slug] pages on Sanity libraryEntry, category and tag types, with filters and editorial or 3D embed modules. How full the dataset is is not claimed here.'
        ),
        before: [
          'References only on Instagram',
          'No public studio archive',
        ],
        after: [
          'Library as a route and a content model',
          'Public in this phase, not member-gated',
        ],
      },
      {
        title: 'Rotation',
        shortLabel: 'Rotation',
        teaser: 'What is playing in the studio — playlists and tracks, crate and turntable, Spotify save.',
        status: 'shipped',
        problem: blocks(
          'Music was an Instagram dump, not a studio surface.'
        ),
        solution: blocks(
          '/rotation with Sanity rotationTrack, a crate browser and Spotify OAuth. A member-only “deep” Rotation is not built.'
        ),
        before: [
          'Playlists only on Instagram',
          'No studio music surface',
        ],
        after: [
          'Rotation route and Spotify save',
          'Member layer not started',
        ],
      },
      {
        title: 'Contact and publishing',
        shortLabel: 'Contact',
        teaser:
          'Enquiries by email. Richard authors scene, projects, library and rotation in-app.',
        status: 'shipped',
        problem: blocks(
          'There was no studio inbox on the product, and no in-app CMS — or a separate Sanity deploy to keep in sync.'
        ),
        solution: blocks(
          '/contact through Resend. Embedded Sanity at /studio. Scene versions are CMS documents. This app and the personal portfolio share a production dataset; studio queries stay _type-scoped so portfolio case studies do not leak in.'
        ),
        before: [
          'No studio enquiry path on the product',
          'No in-app publish for the studio',
        ],
        after: [
          'Contact form to rich@yande.uk via Resend',
          'Embedded Studio for scene, Practice, Library, Rotation',
          'Shared dataset, type-scoped queries',
        ],
      },
    ],
  },
  deepDives: {
    eyebrow: '04 / Deep dives',
    heading: 'Three problems that were not a prettier homepage',
    intro:
      'The easy misread is a personal Three.js site. The work was identity (studio vs Gadgets vs this portfolio), making the 3D home survive a phone, and locking the door honestly while furniture and project pages were still being written.',
    items: [
      {
        title: 'One studio, three names, no second site to duplicate',
        shortLabel: 'Identity',
        problem: blocks(
          'Yandè Studio, Yande Gadgets (the 2020 Accra shop app) and this personal portfolio are easy to mash into one Yande website. Publishing work only here would make the studio a logo. Cloning this work list onto yande.uk would be two lists of the same case studies.'
        ),
        contribution:
          'I built yande.uk as the studio’s product: spatial home plus Practice, Library, Rotation and Contact. Gadgets stays its own 2020 study. This site stays the personal work list. The two apps share a Sanity production dataset; every studio GROQ query stays _type-scoped.',
        constraints:
          'No member or paywall theatre in this phase.\nClient work remains the studio’s business.\nDo not merge Gadgets screens or copy.\nDo not point this case study’s live URL at the portfolio.',
        decisions: [
          decision(
            'Practice IA is studio work types, not job titles',
            'Filters describe what the studio makes. They are not a freelance role list.'
          ),
          decision(
            'Scene and editorial content live in Sanity',
            'Production copy is not hardcoded into the platform for every page.'
          ),
          decision(
            'Isolate by document type, not a second CMS project',
            'For now the shared dataset is enough if queries never cross types.'
          ),
        ],
        outcome: blocks(
          'Shipped as architecture. The studio itself is still gated. The Practice content pass is not finished.'
        ),
      },
      {
        title: 'A 3D studio that has to run on a phone',
        shortLabel: 'Mobile',
        problem: blocks(
          'The home is the product. Shipping desktop WebGL to every device made the site feel like a debug tool — Leva in production — and a payload problem, with public/ around 190 MB.'
        ),
        contribution:
          'I cut dead EXR, displacement and .blend files, then shipped Draco GLBs and KTX2 textures. Device-tier sets DPR, shadows and a city .mobile.glb. Leva and useControls are development-only. 100dvh for mobile chrome. City mounts lazily. Weather uniforms come from one fetch, not per-frame JavaScript.',
        constraints:
          'HDRI environment, no baked lighting.\nFogExp2 / shader fog.\nMobile-first.\nReduced-motion on the hero particle logo.\nNamed city meshes for signage neutralization have to survive LOD.',
        decisions: [
          decision(
            'Quality knobs live in one device-tier module',
            'Not a scatter of isMobile checks across the scene.'
          ),
          decision(
            'Compress in-repo so the next GLB cannot land raw',
            'Encode tooling follows the current budget, not a one-off export.'
          ),
          decision(
            'Next first-load win is exterior HDR, not more interior silhouettes',
            'wide_street_2k.hdr is the named target, not a new room of unlit meshes.'
          ),
        ],
        outcome: blocks(
          'Shipped as a baseline. Interior furniture is still open. HDR is still the next load win. No public performance metrics on this page.'
        ),
      },
      {
        title: 'Build the platform while the studio is still forming — lock the door honestly',
        shortLabel: 'Gate',
        problem: blocks(
          'The offer, interiors and some project pages are incomplete. Leaving the 3D studio open looked like a launch. A SaaS coming-soon funnel would be the wrong object. Composition — where a book sits on a table — cannot be a CMS author’s job every week.'
        ),
        contribution:
          'In August 2026 I shipped a promo gate: collage from Figma, password cookie, /studio still reachable. Work-table rule: composition is code-owned, content is editorial. Pickable slots without a document stay visible but inert. Scene versions are CMS documents. Auth, payments and a member layer were written down and not built.',
        constraints:
          'iOS visualViewport and keyboard against three overlay canvases.\nSanity ids with a dot are private even on a public dataset — hyphen ids required.\nThe gate is noindex.',
        decisions: [
          decision(
            'Gate the whole public site rather than fake a finished launch',
            'The live domain can exist without claiming the studio is open.'
          ),
          decision(
            'Keep the CMS reachable during the lock',
            'Publishing cannot wait for the furniture sequence to finish.'
          ),
          decision(
            'Do not implement membership, drops or checkout in this phase',
            'Those are later products. They are not this page’s modules.'
          ),
        ],
        outcome: blocks(
          'The gate shipped and is what yande.uk shows an unauthenticated visitor today. Interior furniture and Practice content are still in progress. The member layer is not started.'
        ),
      },
    ],
  },
  designToCode: {
    eyebrow: '05 / Design to code',
    heading: 'Figma for the gate. The studio was designed in the running app.',
    framing: blocks(
      'The collage was a 1440×1024 Figma frame mapped to percentage layout, then baked from Leva. The 3D studio was posed, lit and budgeted in the product: scene editor, device-tier, Draco and KTX2. Building on iOS changed the gate more than any desktop comp.'
    ),
    decisions: [
      decision(
        'Bake the collage from Figma, then from Leva',
        'The enter object had to survive iOS keyboard, pan and WebGL overlays, not only a 1440 frame.'
      ),
      decision(
        'Design the 3D studio in the running app',
        'Scene editor and device-tier replaced a static desktop file for the whole site.'
      ),
      decision(
        'Composition in code, content in the CMS',
        'Table slots are placed in the product. Copy and stills are editorial. Empty slots stay visible and inert.'
      ),
    ],
    stackTags: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'React Three Fiber',
      'Drei',
      'Three.js',
      'Zustand',
      'Tailwind CSS',
      'Framer Motion',
      'GSAP',
      'Sanity',
      'Resend',
      'Spotify',
      'Vercel',
    ],
  },
  outcomeStatus: {
    eyebrow: '06 / Outcome and status',
    heading: 'Where the product stood',
    statusSummary:
      'yande.uk is live and gated. Richard is the sole designer and developer. The 3D studio and publishing routes exist behind the enter screen. Interior furniture and some Practice copy are still in progress. Membership and commerce are not started.',
    whatsNext:
      'Interior furniture sequence, Practice and Library content pass, exterior HDR first-load. Not next: auth, payments, drops, or a member layer.',
    quotes: [],
    evidence: [
      'https://yande.uk redirects unauthenticated visitors to /gate?exp=collage (verified 1 Sep 2026).',
      'Public routes behind the gate: /, /about, /practice, /library, /rotation, /contact. CMS at /studio.',
      'No walkthrough video. No usage metrics on this page.',
    ],
    reflection: blocks(
      'The honest version is a studio platform in progress, with a designed enter object on the live domain, not a launched cultural membership and not a shop. I would still keep Gadgets and this portfolio as separate studies. I would not describe the gate as a public studio visit.'
    ),
  },
}
