import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'm0jxfzl3'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  throw new Error('SANITY_API_WRITE_TOKEN is required to seed')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-11-26',
  token,
  useCdn: false,
})

let keyCount = 0
function key(prefix = 'k') {
  keyCount += 1
  return `${prefix}${keyCount}`
}

function blocks(text: string) {
  return [
    {
      _type: 'block' as const,
      _key: key('b'),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span' as const,
          _key: key('s'),
          text,
          marks: [],
        },
      ],
    },
  ]
}

function decision(title: string, detail: string) {
  return {
    _type: 'decisionItem' as const,
    _key: key('d'),
    title,
    detail,
  }
}

function quote(quoteText: string, name: string, role?: string) {
  return {
    _type: 'attributedQuote' as const,
    _key: key('q'),
    quote: quoteText,
    name,
    role,
  }
}

const doc = {
  _id: 'caseStudy-palm-dashboard',
  _type: 'caseStudy',
  title: 'Palm Dashboard',
  slug: { _type: 'slug', current: 'palm-dashboard' },
  role: 'Product Designer, Full Stack Developer',
  year: 2025,
  summary:
    'A multi-tenant PR workspace that brought campaign planning, coverage tracking and performance reporting into one place for teams and clients.',
  status: 'shipped',
  featured: true,
  order: 0,
  liveUrl: 'https://palm-dashboard-lg3wc.ondigitalocean.app/',
  liveNote: '',
  contextFacts: [
    { _type: 'contextFact', _key: key('f'), label: 'Client', value: 'Palm PR' },
    {
      _type: 'contextFact',
      _key: key('f'),
      label: 'Type',
      value: 'Multi-tenant SaaS workspace',
    },
    {
      _type: 'contextFact',
      _key: key('f'),
      label: 'Stack',
      value: 'Laravel, Inertia + React, MySQL',
    },
    {
      _type: 'contextFact',
      _key: key('f'),
      label: 'Team',
      value: 'Sole designer and developer',
    },
  ],
  seoTitle: 'Palm Dashboard — Product Design & Build Case Study | Richard Nyande',
  seoDescription:
    'A multi-tenant PR workspace bringing campaign planning, coverage tracking and performance reporting into one place. Product design and full-stack build for Palm PR.',
  reframing: {
    _type: 'reframing',
    eyebrow: 'Under the reporting request',
    heading: 'Connecting the work behind PR performance.',
    intro:
      'Palm started as a request to improve reporting. What we found underneath it was a bigger operational problem.',
    initialProposal: blocks(
      'Bring performance data into one place for clearer client reporting.'
    ),
    discovery: blocks(
      'Campaign planning, coverage tracking and reporting were spread across spreadsheets, documents and disconnected tools, creating repetitive work and limited visibility.'
    ),
    productResponse: blocks(
      'Replace the fragmented process with one connected workspace.'
    ),
  },
  productModules: {
    _type: 'productModulesSection',
    eyebrow: 'The PR workflow.',
    heading: 'The work happened everywhere.',
    items: [
      {
        _type: 'productModule',
        _key: key('m'),
        title: 'Client onboarding',
        shortLabel: 'Onboarding',
        teaser: 'Client setup moved from scattered documents into one structured flow.',
        status: 'shipped',
        problem: blocks(
          'Client information lived across Word documents, emails and internal notes, so the team re-entered the same details at every stage. This created inconsistent client context and duplicated admin.'
        ),
        solution: blocks(
          'A structured onboarding flow centralising client information, finance details and PR tracking configuration, including keywords and brand terms.'
        ),
        before: [
          'Brief documents',
          'Excel spreadsheets',
          'Finance information held separately',
          'Internal setup notes',
        ],
        after: [
          'Three-step onboarding flow',
          'Client information structure',
          'Finance and contact setup',
          'Keyword and brand-term configuration',
        ],
      },
      {
        _type: 'productModule',
        _key: key('m'),
        title: 'Objectives and strategy',
        shortLabel: 'Objectives',
        teaser: 'Goals, KPIs and activity connected in one workspace.',
        status: 'shipped',
        problem: blocks(
          'Objectives, KPIs and campaign strategy were documented separately from the day-to-day work of running a campaign. This made it harder to keep activity connected to the original client goals, and meant strategic decisions could drift from planning and coverage activity.'
        ),
        solution: blocks(
          'An objectives and strategy area connecting campaign goals, KPI targets, tactics, activities and timeplans into the same workspace as planning and coverage.'
        ),
        before: [
          'Strategy documents',
          'KPI spreadsheets',
          'Client objective documents',
          'Manual progress tracking',
        ],
        after: [
          'Objectives structure',
          'KPI target mapping',
          'Tactic to activity to timeplan flow',
          'Coverage linked back to objectives',
        ],
      },
      {
        _type: 'productModule',
        _key: key('m'),
        title: 'Customer profiling',
        shortLabel: 'Profiling',
        teaser: 'Audience insight restructured into scannable profile cards.',
        status: 'shipped',
        problem: blocks(
          'Customer information was available but hard to navigate. Audience details, behaviours, pain points and messaging were often grouped together without clear structure, making it difficult to understand segments or find insight during planning.'
        ),
        solution: blocks(
          'A dedicated customer profiling module separating customer information into clearer profile cards and structured fields, making audience insight easier to scan and reference during campaign planning.'
        ),
        before: [
          'Clustered audience notes',
          'Unstructured customer information',
          'Persona documents',
          'Client briefing notes',
        ],
        after: [
          'Customer profile cards',
          'Structured audience fields',
          'Profile creation and editing flow',
          'Scan-friendly layout',
        ],
      },
      {
        _type: 'productModule',
        _key: key('m'),
        title: 'Coverage tracking',
        shortLabel: 'Coverage',
        teaser: 'Automated discovery replaced manual link-chasing.',
        status: 'shipped',
        problem: blocks(
          'The team relied on a third-party tool that emailed every article matching agreed client keywords, landing in the same inbox used for the rest of the business. Most returned articles were not relevant, so every mention had to be read and filtered manually before anyone could act on it. Coverage records became inconsistent and relevant links could be missed.'
        ),
        solution: blocks(
          'A keyword-driven coverage tracking workflow using automated Google News search via ScrapingBee. Relevant client and keyword mentions are brought into a review space where the team can approve, reject, classify and organise coverage before connecting approved articles to KPI points and brand-awareness scoring.'
        ),
        before: [
          'Separate media monitoring platform',
          'Manual article review by email',
          'Coverage links saved across documents',
          'Keyword mentions missed or duplicated',
        ],
        after: [
          'Automated coverage discovery',
          'Pending / approved / rejected workflow',
          'Media type, tier and category taxonomy',
          'KPI-linked approval workflow',
        ],
      },
      {
        _type: 'productModule',
        _key: key('m'),
        title: 'Performance analysis',
        shortLabel: 'Performance',
        teaser: 'GA, Search Console and SEMrush brought into pillar scorecards.',
        status: 'in-progress',
        problem: blocks(
          'Performance data lived across multiple platforms including analytics, search and SEO tools. The team had to gather and interpret data manually before turning it into a client update. The challenge was not only bringing data into one place, but making it easier to understand what changed and why it mattered.'
        ),
        solution: blocks(
          'A metrics area bringing GA, Search Console, SEMrush and coverage data into pillar-based scorecards. The active Brand Awareness pillar connects search visibility, coverage and scoring logic into a clearer performance view. Additional metric pillars are structured as future areas.'
        ),
        before: [
          'Google Analytics',
          'Google Search Console',
          'SEMrush',
          'Manual reporting spreadsheets',
        ],
        after: [
          'Metrics area structure',
          'Pillar-based scorecards',
          'Brand Awareness scoring',
          'Coming-soon metric pillars',
        ],
      },
      {
        _type: 'productModule',
        _key: key('m'),
        title: 'Coverage reporting',
        shortLabel: 'Reporting',
        teaser: 'Approved coverage exports as branded, client-ready output.',
        status: 'in-progress',
        problem: blocks(
          'Turning coverage activity into branded client-facing materials was manual. Because coverage information came from different places, the process was repetitive and inconsistent, especially when preparing article summaries, exports or presentation-ready outputs.'
        ),
        solution: blocks(
          'A coverage reporting workflow allowing approved coverage to be turned into branded, presentation-ready exports. The live flow supported individual article exports. Broader period-based coverage reports were explored as part of the product direction.'
        ),
        before: [
          'Manual report documents',
          'Presentation decks',
          'Copied screenshots',
          'Manually formatted article summaries',
        ],
        after: [
          'Approved coverage records',
          'Branded article export flow',
          'PDF / PPTX article output',
          'Period-reporting concept',
        ],
      },
    ],
  },
  deepDives: {
    _type: 'deepDivesSection',
    eyebrow: '04 / Design deep-dives',
    heading: 'Inside three decisions that shaped the product',
    intro:
      'Three areas where the workflow model became a real interface. Each one covers the problem as the team experienced it, the decisions I made and why, and what shipped.',
    items: [
      {
        _type: 'deepDive',
        _key: key('v'),
        title: 'From scattered documents to one connected timeline',
        shortLabel: 'Objectives & strategy',
        problem: blocks(
          'Objectives, tactics and timelines lived in templates rebuilt from scratch for every client, split across documents and spreadsheets.'
        ),
        quote: quote(
          'It was the longest process on the team, time better spent generating income than duplicating paperwork.',
          'Charley',
          'Palm PR'
        ),
        contribution:
          "Product designer, working from Palm's existing four-layer structure — objective, tactic, activity, timeplan — rather than inventing a new one.",
        constraints:
          'Users were largely non-technical, so navigation had to stay familiar.\nTerminology from existing client documents had to carry over so onboarding did not require retraining.',
        decisions: [
          decision(
            'Two views, one data model',
            'A nested list for detail work and an auto-generated timeline for overview, rather than forcing one view to do both jobs.'
          ),
          decision(
            'Colour by layer, not by status',
            'Tactic, activity and timeplan each hold a fixed colour so hierarchy reads at a glance, deliberately kept separate from status or priority coding.'
          ),
          decision(
            'Automate the schedule, not the thinking',
            'The system builds the visual timeline from entered activities. What to plan stays a human decision.'
          ),
        ],
        outcome: blocks(
          'Shipped while I was there. Internal feedback credited the timeline automation specifically with removing a task that used to take around an hour per client.'
        ),
      },
      {
        _type: 'deepDive',
        _key: key('v'),
        title: 'From a flooded inbox to a filtered review queue',
        shortLabel: 'Coverage tracking',
        problem: blocks(
          'The team relied on a third-party tool that emailed every article matching agreed client keywords, landing in the same inbox used for the rest of the business. Most returned articles were not relevant, so every mention had to be read and filtered out of a crowded inbox before anyone could act on it.'
        ),
        quote: quote(
          'The KPI Management really helps us identify and manage articles much more quickly, and the fact that all the articles found are in one place is great. Not to mention the fact that we can upload our own as well.',
          'Charlotte',
          'Account Director, Palm PR'
        ),
        contribution:
          'End to end. I interviewed staff and managers and shadowed them running the existing process, then defined requirements, researched the filtering approach, and built the backend and frontend. The team tested the new workflow and signed it off before rollout.',
        constraints:
          'Detection quality depends on what the scraping and keyword scope can reliably catch, so the interface had to make uncertainty visible rather than imply perfect coverage.\nVolume meant triage speed mattered as much as detail.',
        decisions: [
          decision(
            "Pull, don't wait for email",
            'Daily scraping via ScrapingBee replaced the inbound-email model, moving discovery into a dedicated review space instead of a personal inbox.'
          ),
          decision(
            'Filter before it reaches a person',
            'The hardest part of the project was working out how to separate relevant from irrelevant matches before they reached the team, based on what shadowing revealed about how staff actually judged relevance.'
          ),
          decision(
            'Queue, not inbox',
            'Coverage lands in a pending state for approval. A person still makes the final call, but starts from a filtered set rather than a flooded one.'
          ),
        ],
        outcome: blocks(
          'Shipped, tested with the team, and approved before rollout.'
        ),
      },
      {
        _type: 'deepDive',
        _key: key('v'),
        title: 'From bespoke documents to one scoring structure',
        shortLabel: 'KPI criteria',
        problem: blocks(
          "Each client's scoring criteria for coverage lived in separate Word files and spreadsheets, rebuilt and cross-checked by hand."
        ),
        contribution:
          'Product designer, translating a document structure the team already trusted into a reusable in-app system.',
        constraints:
          'Criteria genuinely differ by client, so the system needed real flexibility, not a fixed template.\nHad to mirror existing document logic closely enough that onboarding required no retraining.',
        decisions: [
          decision(
            'Global template, client override',
            'Global KPI criteria act as a starting point; client-specific criteria override only what differs, avoiding full duplication per client.'
          ),
          decision(
            'Tabs mirror the source documents',
            'Media types, tiers, categories and titles map directly onto the sections PR staff already used, so the mental model transferred.'
          ),
          decision(
            'Visibility tags over separate screens',
            'Global versus client-specific is shown as an inline tag rather than a separate area, keeping everything in one table.'
          ),
        ],
        outcome: blocks(
          'Shipped. Onboarding new clients into the KPI system was noticeably faster than onboarding them into the original document-based process, based on how quickly staff picked it up.'
        ),
      },
    ],
  },
  designToCode: {
    _type: 'designToCode',
    eyebrow: '05 / Design to code',
    heading: 'Testing decisions against the live workflow',
    framing: blocks(
      'Owning both design and implementation meant interaction decisions could be tested against the behaviour of the real system as they were made.'
    ),
    decisions: [
      decision(
        'Finding coverage without slowing the team down',
        "Coverage Tracking scans the web daily for articles that mention a client's agreed keywords, brand names, products or topics. Because that scan runs against an external search service, it can take time, so it runs in the background rather than making anyone wait. The team can keep working while a scan is running, and check back once results are ready to review. This replaced a process where staff had to manually search for and read through mentions one at a time."
      ),
      decision(
        'Handling scans that stall',
        "External scans can occasionally fail or take longer than expected, often due to caching issues or stale results from the search service. To keep the process reliable, we built in a visible scan status and a cancel action, so the team can see what's happening and step in if a scan gets stuck, rather than being left waiting with no explanation."
      ),
      decision(
        'Scoring coverage against each client, not the article itself',
        "An article's value isn't fixed, it depends on which client and which objective it's being measured against. So instead of scoring the article on its own, the score is tied to the specific client relationship. That decision directly shaped the review screen: when staff approve a piece of coverage, they're scoring what it's worth to that client, not giving the article a single, generic rating."
      ),
    ],
    stackTags: [
      'Laravel',
      'Inertia + React',
      'MySQL',
      'ScrapingBee',
      'Tailwind',
    ],
  },
  outcomeStatus: {
    _type: 'outcomeStatus',
    eyebrow: '06 / Outcome and status',
    heading: 'Where the product stands',
    statusSummary:
      'Four modules shipped while I was there: onboarding, objectives and strategy, customer profiling, and coverage tracking. Performance analysis and coverage reporting had their structure. I left Palm PR. I am not working on this, and there is no developer continuing it.',
    whatsNext:
      "The next step identified was an LLM to compare incoming articles against a client's keywords and KPI criteria. I left before that work started, and there is no developer on the product now.",
    quotes: [
      quote(
        'This is going to reposition Palm into the front-row leaders of PR tracking. We have an application that not only helps the client understand performance but also allows them to see their fallback and how they could improve and leverage their current keywords.',
        'Emily',
        'Founder, Palm PR'
      ),
      quote(
        'This has made the onboarding process a lot easier, and the fact that we can have this all manageable in a single document is amazing. Before, when we made one update, we would have to make it in different documents, which made the process so long. This automates and speeds things up so much more.',
        'Hannah',
        'Account Executive, Palm PR'
      ),
    ],
    evidence: [
      'Building an Excel timeline manually took around an hour per client. That step was removed entirely once the timeline was generated automatically from entered activity.',
      'Word document use was reduced across onboarding and reporting, cutting time previously spent re-entering the same information into separate templates.',
    ],
    reflection: blocks(
      "The biggest lesson was underestimating how much time data retrieval would take, working out how to extract and structure the analytics data properly, and building the right formulas around it. That slowed the original plan more than expected. If I did this again, I'd also want a larger tech team from earlier on, so development work could be delegated and I could spend more time focused on UX and UI rather than splitting attention across both."
    ),
  },
}

async function main() {
  const result = await client.createOrReplace(doc)
  console.log(`Wrote ${result._id} (${result._type})`)
}

void main()
