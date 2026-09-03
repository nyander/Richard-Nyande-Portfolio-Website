import type { AltImage, ArchiveProject } from '@/lib/sanity/types'

export type OtherWorkEntry = ArchiveProject & {
  slug: string
  liveUrl: string | null
  liveNote?: string
  liveLabel?: string
  subtitle?: string
  tools?: string
  employer?: string
  paragraphs: string[]
  origin?: string
}

function still(slug: string, alt: string): AltImage {
  return {
    src: `/images/other-work/${slug}.png`,
    alt,
  }
}

function entry(
  project: Omit<OtherWorkEntry, 'linkType' | 'href' | 'tags'> & {
    kind: string
  }
): OtherWorkEntry {
  return {
    linkType: 'internal',
    href: `/work/${project.slug}`,
    tags: [project.kind],
    ...project,
  }
}

export const LOCAL_ARCHIVE: OtherWorkEntry[] = [
  entry({
    _id: 'archive-damu',
    slug: 'damu',
    title: 'Damu',
    year: 2025,
    role: 'UX/UI Designer, Web Developer',
    listRole: 'Designer, Developer',
    kind: 'Webflow',
    employer: 'Palm PR',
    liveUrl: 'https://www.damu.uk/',
    thumbnail: still(
      'damu',
      'DAMU campaign still — tattooed arms and sheer fabric against a dark studio ground'
    ),
    subtitle: 'The spa site for The Mandrake',
    tools: 'Webflow',
    summary:
      'UX/UI and a Webflow site for DAMU, the spa at The Mandrake — designed with the hotel team. Built at Palm PR.',
    paragraphs: [
      'DAMU is the spa at The Mandrake, a hotel in Fitzrovia. The site is the spa’s public presence — tied to the house, not a separate brochure.',
      'I designed the UX and UI, working closely with The Mandrake team, and built the site in Webflow while at Palm PR.',
      'The live site is damu.uk.',
    ],
  }),
  entry({
    _id: 'archive-dj-tricz',
    slug: 'dj-tricz',
    title: 'DJ Tricz',
    year: 2025,
    role: 'Full Stack Developer, 3D Web Development, UX/UI Designer, Product Designer',
    listRole: 'Designer, Developer',
    kind: 'Three.js',
    liveUrl: 'https://my.spline.design/djtriczroom-f131a1ac403c00c61728301e598f0096/',
    liveLabel: '3D room',
    liveNote: 'The public site was taken down. This is the room in Spline.',
    thumbnail: still(
      'dj-tricz',
      'DJ Tricz landing — chrome TRICZ lettering over a blurred landscape, with a Discover control'
    ),
    summary:
      'A 3D apartment for DJ Tricz — vinyls, decks and an events wall as navigation — combining Webflow with Three.js, Blender and Spline.',
    paragraphs: [
      'The brief was an artist site that behaved like a room rather than a page. Visitors move through a 3D apartment: vinyls on the floor, decks, a wall calendar for upcoming dates. Those objects are the navigation.',
      'The marketing site was Webflow. The room is Three.js and Blender, with Spline used to prototype the spatial interactions. Camera moves, hovers on crates and vinyls, and lighting were built in the product. Worked with the DJ on the look of the room and the flow.',
      'The public site is no longer live — she took it down. What remains to walk is the room in Spline, which is the link on this page.',
    ],
    origin:
      'This sits with the Three.js projects I built while learning WebGL. Tricz is the one that went out as an artist world rather than a scene study.',
  }),
  entry({
    _id: 'archive-upper-crust',
    slug: 'upper-crust',
    title: 'Upper Crust',
    year: 2024,
    role: 'Frontend Developer, WordPress Developer',
    listRole: 'Developer',
    kind: 'WordPress',
    employer: 'Greyzip',
    liveUrl: 'https://uppercrust.co.uk/',
    thumbnail: still(
      'upper-crust',
      'Upper Crust homepage — baguette photography with menu and store-finder controls'
    ),
    subtitle: 'A multi-location restaurant site on WordPress',
    tools: 'WordPress, Divi, WooCommerce, Google Maps, HTML, CSS, JavaScript',
    summary:
      'WordPress for a multi-location baguette chain — Google Maps store finder, newsletter pop-ups, and a WooCommerce menu as a catalogue rather than checkout.',
    paragraphs: [
      'Upper Crust is an international baguette chain, concentrated along commuter routes. They needed a site that could hold multiple locations without turning the menu into a shop checkout. I led the WordPress build at Greyzip.',
      'Store finder is an embedded Google Map of the locations. Newsletter and promotion forms sit as pop-ups. The menu uses WooCommerce product listing as a catalogue — browse the food, not a basket and pay flow.',
      'Divi, HTML, CSS and JavaScript on top of WordPress. The job was to keep the existing brand on the page while making location, menu and sign-up work as one site.',
    ],
  }),
  entry({
    _id: 'archive-mandrake',
    slug: 'mandrake',
    title: 'Mandrake',
    year: 2024,
    role: 'Web Developer',
    listRole: 'Developer',
    kind: 'WordPress',
    employer: 'Palm PR',
    liveUrl: 'https://themandrake.com/',
    thumbnail: still(
      'mandrake',
      'The Mandrake homepage — hotel courtyard photography and booking controls'
    ),
    subtitle: 'A Fitzrovia hotel site on WordPress',
    tools: 'WordPress, Divi',
    summary:
      'WordPress Divi site for The Mandrake, a Fitzrovia hotel. Built at Palm PR.',
    paragraphs: [
      'The Mandrake is a hotel in Fitzrovia. The public site holds rooms, dining, events, wellbeing and the spa — including DAMU.',
      'I built the site in WordPress with Divi while at Palm PR. The live hotel site is themandrake.com.',
    ],
  }),
  entry({
    _id: 'archive-field-and-sons',
    slug: 'field-and-sons',
    title: 'Field & Sons',
    year: 2024,
    role: 'Web Developer',
    listRole: 'Developer',
    kind: 'Webflow',
    employer: 'Palm PR',
    liveUrl: 'https://www.fieldandsons.biz/',
    thumbnail: still(
      'field-and-sons',
      'Field & Sons Commercial homepage — London skyline with property navigation'
    ),
    subtitle: 'A commercial property site on Webflow',
    tools: 'Webflow',
    summary:
      'A Webflow site for Field & Sons, a London commercial property agency. Built at Palm PR.',
    paragraphs: [
      'Field & Sons is a commercial estate agency in Central London — sales, lettings and landlord and tenant work, based on Borough High Street.',
      'I built the public site in Webflow while at Palm PR. The live site is fieldandsons.biz.',
    ],
  }),
  entry({
    _id: 'archive-palm-pr',
    slug: 'palm-pr',
    title: 'Palm PR',
    year: 2024,
    role: 'Web Developer',
    listRole: 'Developer',
    kind: 'WordPress',
    employer: 'Palm PR',
    liveUrl: 'https://www.palm-pr.com/',
    thumbnail: still(
      'palm-pr',
      'Palm PR homepage — split photography, agency positioning and services'
    ),
    subtitle: 'The agency site, built in-house',
    tools: 'WordPress, Avada',
    summary:
      'Company site for Palm PR, built in WordPress with the Avada theme while I worked there.',
    paragraphs: [
      'Palm PR is a London communications agency working across luxury travel, hospitality, property and food and drink. I was there in 2024–25.',
      'I built the company site in WordPress with Avada — the public face of the agency, not Palm Dashboard, which is a separate product. The live site is palm-pr.com.',
    ],
  }),
  entry({
    _id: 'archive-chevrolet',
    slug: 'chevrolet-immersive-experience',
    title: 'Chevrolet Immersive Experience',
    year: 2024,
    role: '3D Web Development, Frontend Developer',
    listRole: '3D, Frontend',
    kind: 'Three.js',
    liveUrl: 'https://3-d-chevrolet-showcase.vercel.app/',
    liveLabel: 'Live project',
    thumbnail: still(
      'chevrolet-immersive-experience',
      'Chevrolet Three.js showroom — Corvette on a dark grid with orbit controls'
    ),
    subtitle: 'A web-based 3D vehicle showcase',
    tools: 'Three.js, Blender, JavaScript, Vite',
    summary:
      'A conceptual Three.js Chevrolet showroom — orbit, inspect and hotspot interaction in the browser. Blender for the model, Vite for the build.',
    paragraphs: [
      'A conceptual automotive brief: show a Chevrolet in the browser instead of a still. Orbit the model, inspect the body, hit hotspots on features. Built for desktop and phone, with touch on both.',
      'Blender for the model. Three.js for the render. Vite for the build. The work was shader setup, real-time lighting, camera transitions and the hotspot layer, kept light enough to run in a tab.',
      'Not a Chevrolet commission. A prototype for how a vehicle could be shown on the web.',
    ],
    origin: 'Built while learning Three.js and WebGL.',
  }),
  entry({
    _id: 'archive-main-gates',
    slug: 'the-main-gates',
    title: 'The Main Gates',
    year: 2024,
    role: 'Full Stack Developer, 3D Web Development, Creative Technologist',
    listRole: '3D, Developer',
    kind: 'Three.js',
    liveUrl: 'https://38-importing-and-optimizing-the-scene-sandy.vercel.app/',
    liveLabel: 'Live project',
    thumbnail: still(
      'the-main-gates',
      'The Main Gates — low-poly stone portal with particle glow and Open Controls'
    ),
    subtitle: 'An interactive portal in the browser',
    tools: 'Three.js, Blender, HTML, CSS',
    summary:
      'A Three.js portal — particle atmosphere, fog, glow and camera motion, with a large point cloud rendered in the browser.',
    paragraphs: [
      'A portal scene built in Three.js: animated particles, atmospheric depth and camera motion, running in the browser. The geometry is point-based. The scene logic is custom — not a stock environment dropped in.',
      'The work was getting a large particle field to move without dropping the frame, then layering fog, glow and additive blending on top. Open Controls on the live build exposes the scene parameters.',
    ],
    origin: 'Built while learning Three.js and WebGL.',
  }),
  entry({
    _id: 'archive-galactic-fragment',
    slug: 'galactic-fragment',
    title: 'Galactic Fragment',
    year: 2024,
    role: 'Full Stack Developer, 3D Web Development, Creative Technologist',
    listRole: '3D, Developer',
    kind: 'Three.js',
    liveUrl: 'https://galactic-fragments.vercel.app/',
    liveLabel: 'Live project',
    thumbnail: still(
      'galactic-fragment',
      'Galactic Fragment — procedural Three.js galaxy with parameter controls'
    ),
    subtitle: 'A procedural galaxy from particles in Three.js',
    tools: 'Three.js, Blender, HTML, CSS',
    summary:
      'A procedural galaxy in Three.js, with lil-gui controls for star count, size, spin, branch curvature and colour.',
    paragraphs: [
      'A galaxy made only of particles — no mesh, no skybox. Arms, scatter and depth come from polar coordinates and procedural noise. Each point is a vertex, coloured and placed in the GPU.',
      'lil-gui exposes the generator live: star count, size, spin, branch curvature, randomness and inner/outer colour. Colour runs from a warm core to a cool rim.',
      'The constraint was GPU budget versus how dense the field could read. Particle attributes, material blending and vertex colour were the levers.',
    ],
    origin: 'Built while learning Three.js and WebGL. This was the first large-scale particle system I built in WebGL.',
  }),
]

export function otherWorkBySlug(slug: string): OtherWorkEntry | undefined {
  return LOCAL_ARCHIVE.find((project) => project.slug === slug)
}

export function otherWorkSlugs(): string[] {
  return LOCAL_ARCHIVE.map((project) => project.slug)
}
