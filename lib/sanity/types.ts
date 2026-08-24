export type Status = 'shipped' | 'in-progress' | 'concept'

export type Provenance = 'actual' | 'representative' | 'test-data'

export type AltImage = {
  _type?: 'image'
  src?: string
  asset?: {
    _ref: string
    _type: 'reference'
  }
  alt: string
  caption?: string
  provenance?: Provenance
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export type RestrictedPortableText = unknown[]

export type ContextFact = {
  label: string
  value: string
}

export type SectionChrome = {
  eyebrow?: string
  heading?: string
  intro?: string
}

export type Reframing = SectionChrome & {
  initialProposal?: RestrictedPortableText
  discovery?: RestrictedPortableText
  productResponse?: RestrictedPortableText
}

export type CaseStudyCard = {
  _id: string
  title: string
  slug: string
  role: string
  year: number
  summary: string
  status: Status
  heroImage: AltImage | null
}

export type ProductModule = {
  _key?: string
  title: string
  shortLabel?: string
  teaser?: string
  status: Status
  problem?: RestrictedPortableText
  solution?: RestrictedPortableText
  screenshot?: AltImage | null
  before?: string[] | null
  after?: string[] | null
  beforeAfterImages?: BeforeAfterPair | null
}

export type ProductModulesSection = SectionChrome & {
  items?: ProductModule[] | null
}

export type AttributedQuote = {
  quote: string
  name: string
  role?: string
}

export type DecisionItem = {
  _key?: string
  title: string
  detail?: string
}

export type BeforeAfterPair = {
  label?: string
  before?: AltImage | null
  after?: AltImage | null
  caption?: string
}

export type DeepDive = {
  _key?: string
  title: string
  shortLabel?: string
  problem?: RestrictedPortableText
  quote?: AttributedQuote | null
  contribution?: string
  constraints?: string
  decisions?: DecisionItem[] | null
  beforeAfter?: BeforeAfterPair | null
  outcome?: RestrictedPortableText
}

export type DeepDivesSection = SectionChrome & {
  items?: DeepDive[] | null
}

export type DesignToCode = SectionChrome & {
  framing?: RestrictedPortableText
  decisions?: DecisionItem[] | null
  figmaImage?: AltImage | null
  shippedImage?: AltImage | null
  stackTags?: string[] | null
}

export type OutcomeStatus = SectionChrome & {
  statusSummary?: string
  whatsNext?: string
  quotes?: AttributedQuote[] | null
  evidence?: string[] | null
  reflection?: RestrictedPortableText
}

export type CaseStudyPage = {
  _id: string
  title: string
  slug: string
  role: string
  year: number
  summary: string
  status: Status
  contextFacts: ContextFact[] | null
  heroImages: AltImage[] | null
  reframing: Reframing | null
  productModules: ProductModulesSection | null
  deepDives: DeepDivesSection | null
  designToCode: DesignToCode | null
  outcomeStatus: OutcomeStatus | null
  liveUrl?: string | null
  liveNote?: string | null
  seoTitle?: string
  seoDescription?: string
  ogImage: AltImage | null
}

export type ArchiveProject = {
  _id: string
  title: string
  year: number
  summary: string
  thumbnail: AltImage | null
  linkType: 'internal' | 'external'
  href: string
  tags: string[]
}
