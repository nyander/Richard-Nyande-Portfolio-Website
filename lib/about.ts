export const ABOUT_LINKS = {
  email: 'rich.nyande@gmail.com',
  mailto: 'mailto:rich.nyande@gmail.com',
  linkedin: 'https://www.linkedin.com/in/richard-nyande-1aa32a133',
  yande: 'https://yande.uk',
  palm: '/work/palm-dashboard',
  gadgets: '/work/yande-gadgets',
  recruiteware: '/work/recruiteware',
  cv: '/cv/richard-nyande.pdf',
} as const

export type EmploymentRecord = {
  org: string
  scope: string
  dates: string
  href?: string
  linkLabel?: string
  external?: boolean
}

export type CapabilityEntry = {
  name: string
  items: string[]
  class: 'discipline' | 'fluency'
}

export const ABOUT = {
  opening: {
    label: 'Opening',
    heading: 'About',
    lede: 'Product designer and creative technologist. I design digital products, then build them.',
    roleLabel: 'Role',
    role: 'Product Designer\nCreative Technologist',
  },
  now: {
    label: 'Now',
    facts: [
      {
        label: 'Currently',
        value: 'Front-end developer, Hutchison Ports UK · Contractor',
      },
      {
        label: 'Also',
        value: 'Founder, Yandè Studio · Creative Studio',
      },
      {
        label: 'Based',
        value: 'Essex, working with London teams',
      },
    ],
  },
  methods: {
    label: 'How I work',
    items: [
      {
        id: 'buildable',
        title: 'I design against what\'s buildable',
        body: 'Palm Dashboard — designed in Figma, shipped in Laravel. Trade-offs settled while still cheap to change.',
        project: 'Palm Dashboard',
      },
      {
        id: 'mess',
        title: 'I start with the mess, not the screen',
        body: 'Recruiteware — mapped legacy branch workflows before drawing anything.',
        project: 'Recruiteware',
      },
      {
        id: 'stay',
        title: 'I stay in it after handover',
        body: 'Fourteen months on Palm, iterating with the people using it daily.',
        project: 'Palm Dashboard',
      },
    ],
  },
  identity: {
    label: 'Who I Am',
    paragraphs: [
      'Born in Austria, raised in the UK, and rooted in Ghana — I’ve always had an eye for detail and a love for rhythm, both in sound and in design. I’ve naturally gravitated toward the intersection of art, curation, and storytelling.',
      'From being introduced to Cartoon Network, Jetix and 106 & Park, to picking up my first skateboard magazine at Attitude Inc., discovering Westside Gunn, Kendrick, and Pusha T, and sneaking my big brother’s Jordan 4s to school — I’ve always been surrounded by timeless taste.',
      'That curiosity, intention, and obsession with feel and form eventually found its home in the digital space — where I now design and build experiences that move people.',
    ],
  },
  drive: {
    label: 'What Drives Me',
    paragraphs: [
      'I’m driven by the idea of elevating how people experience life — through design that feels honest, intentional, and quietly powerful. I see the web as a canvas, and my goal is to create work that leaves a mark — now and years from now.',
      'But great design isn’t just vision — it’s showing up with consistency, collaboration, and care. Design is second nature to me, but so is being reliable, practical, and focused on impact. I want to be one of the designers who helped shift the culture — not just through creativity, but through execution.',
    ],
  },
  standard: {
    label: 'The standard',
    quote: 'Everything I do is for the 17-year-old version of myself.',
    attribution: 'Virgil Abloh',
  },
  experience: {
    label: 'Experience',
    meta: {
      brand: 'RN™',
      name: 'Richard Nyande',
      role: 'Product designer · Creative technologist',
      subject: 'Employment & capability record',
      date: '08 / 2026',
      docNo: 'RN-2026-08-007',
      location: 'Essex, UK',
      status: 'Open to contract',
      rev: '004',
    },
    records: [
      {
        org: 'Hutchison Ports UK',
        scope: 'Front-end developer, contract · React, TypeScript',
        dates: '2025 —',
      },
      {
        org: 'Yandè Studio',
        scope: 'Founder · Creative studio',
        dates: '2024 —',
        href: ABOUT_LINKS.yande,
        linkLabel: 'yande.uk',
        external: true,
      },
      {
        org: 'Palm PR',
        scope: 'Product designer + full-stack · Figma, Laravel',
        dates: '2024–25',
        href: ABOUT_LINKS.palm,
        linkLabel: 'See sheet',
      },
      {
        org: 'Greyzip',
        scope: 'Full-stack + UX · Recruiteware',
        dates: '2024',
        href: ABOUT_LINKS.recruiteware,
        linkLabel: 'See sheet',
      },
      {
        org: 'RSM',
        scope: 'Software engineer',
        dates: '2022–24',
      },
      {
        org: 'Context World',
        scope: 'Junior data analyst',
        dates: '2020–21',
      },
      {
        org: 'Yande Gadgets',
        scope: 'Product designer + full-stack · Laravel, final-year project',
        dates: '2019–20',
        href: ABOUT_LINKS.gadgets,
        linkLabel: 'See sheet',
      },
      {
        org: 'Universal Web Design',
        scope: 'Web developer',
        dates: '2019',
      },
    ] satisfies EmploymentRecord[],
    capabilities: [
      {
        name: 'Product design',
        class: 'discipline',
        items: [
          'Product design',
          'UX and IA',
          'Stakeholder discovery',
          'Workflow mapping',
          'Prototyping',
        ],
      },
      {
        name: 'Interface & design systems',
        class: 'discipline',
        items: ['Design systems', 'Figma'],
      },
      {
        name: 'Front-end engineering',
        class: 'fluency',
        items: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
      },
      {
        name: 'Backend & data',
        class: 'fluency',
        items: ['Laravel', 'REST APIs'],
      },
      {
        name: 'Creative technology',
        class: 'fluency',
        items: ['Three.js', 'Spline'],
      },
    ] satisfies CapabilityEntry[],
    key: {
      discipline: 'Discipline = practised as primary work',
      fluency: 'Fluency = built with, not sold as',
    },
    also: 'Git · CI/CD · Docker · Vercel · Sanity · Cursor',
    education: 'BSc Computing for Business, Aston · First class',
    signature: 'RichardN',
    copyright: 'Essex, © 2026',
    credit: 'Curated by Richard Nyande',
    authenticity: 'Certificate of authenticity',
  },
  offClock: {
    label: 'Off the clock',
    lede: 'Sports, travel, and whatever I\'m making.',
    note: 'Life beside the work',
    frames: [
      {
        id: 'sweden',
        kind: 'mov' as const,
        shape: 'feature' as const,
        place: 'Sweden',
        src: '/videos/Time in Sweden.mp4',
        caption:
          'I travel when I can. Sweden is still a favourite — the construction, the atmosphere, the creative pull.',
      },
      {
        id: 'basketball',
        kind: 'mov' as const,
        shape: 'narrow' as const,
        place: 'Basketball',
        src: '/videos/Basketball.mp4',
        caption:
          'On the court I live the hoop dreams. Basketball is how I test myself in the moment.',
      },
      {
        id: 'gym',
        kind: 'mov' as const,
        shape: 'wide' as const,
        place: 'Gym',
        src: '/videos/Gym Session.mp4',
        caption:
          'The gym is the other half. Court and weight room work together — better performance, same standard.',
      },
      {
        id: 'studio',
        kind: 'mov' as const,
        shape: 'wide' as const,
        place: 'Studio',
        src: '/videos/Designing in my studio.mp4',
        caption:
          'I enjoy curating and designing. Most of the time I\'m trying to create something that looks.',
      },
      {
        id: 'gallery',
        kind: 'still' as const,
        shape: 'portrait' as const,
        place: 'Gallery',
        src: '/images/Gallery.JPG',
        caption:
          'I often go to Galleries and exhibitions to discover different art forms.',
      },
    ],
  },
  close: {
    pitch: 'Open to product design and creative technology contracts.',
  },
} as const
