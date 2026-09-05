import { blocks, decision, fact } from '@/lib/case-study-blocks'
import type { CaseStudyCard, CaseStudyPage } from '@/lib/sanity/types'

export const RECRUITEWARE_SLUG = 'recruiteware'

export const RECRUITEWARE_LIVE_URL =
  'https://squid-app-vp2lq.ondigitalocean.app/login'

export const RECRUITEWARE_LIVE_NOTE =
  'Login required. Accessible upon request.'

const RECRUITEWARE_SUMMARY =
  'An office CRM for Thomas Grant and Apex that helped consultants search candidates, manage compliance and work with bookings on the existing recruitment system, while creating a shared product foundation for public applications and future candidate self-service.'

export const RECRUITEWARE_CARD: CaseStudyCard = {
  _id: 'caseStudy-recruiteware',
  title: 'Recruiteware',
  slug: RECRUITEWARE_SLUG,
  role: 'Product Designer, Full Stack Developer',
  year: 2025,
  summary: RECRUITEWARE_SUMMARY,
  status: 'shipped',
  heroImage: null,
}

export const RECRUITEWARE_STUDY: CaseStudyPage = {
  _id: 'caseStudy-recruiteware',
  title: 'Recruiteware',
  slug: RECRUITEWARE_SLUG,
  role: 'Product Designer, Full Stack Developer',
  year: 2025,
  summary: RECRUITEWARE_SUMMARY,
  status: 'shipped',
  contextFacts: [
    fact('Client', 'Thomas Grant Recruitment, with Apex'),
    fact('Type', 'Office CRM on an existing recruitment backend'),
    fact('Stack', 'Laravel 11, React, Inertia.js, Tailwind, MySQL'),
    fact('Team', 'Greyzip, with Fungai Motezu on the existing APIs'),
  ],
  heroImages: [],
  seoTitle: 'Recruiteware — Product Design & Build Case Study | Richard Nyande',
  seoDescription:
    'Greyzip, 2024–25. An office CRM for Thomas Grant and Apex that kept RecruitWare’s processing and redesigned the consultant interface so public applications and a later candidate portal could share one product foundation.',
  ogImage: null,
  reframing: {
    eyebrow: 'On an established backend',
    heading:
      'The design challenge was deciding what to preserve, what to replace, and how three audiences could share one system.',
    intro:
      'Recruitment consultants were running healthcare workflows through an office system shaped around older logistics processes. I designed a new interface on top of the existing backend, creating a clearer consultant experience while establishing a foundation that public applications and future candidate self-service could share. Where the backend represented real operational states, I preserved that model rather than designing an interface the system could not truthfully support.',
    initialProposal: blocks(
      'Host a new front on WordPress, follow an existing layout, and spend the first 2.5 months mostly on look and feel, with some front-end behaviour added on top of the current system.'
    ),
    discovery: blocks(
      'There were three audiences on one recruitment operation: applicants on the public site, consultants in the office, and candidates who had no surface yet. Apex asked when they could have the CRM to organise candidates. Public registration lived in WordPress form builders — one live form could only email details, so tests never reached the database. The office already had a dashboard spec for last-week versus this-week bookings by client. The candidate portal was in the brief and did not exist yet.'
    ),
    productResponse: blocks(
      'I treated those three experiences as parts of one product system, and proposed an interface layer on the existing RecruitWare processing so they could share APIs later. Validation, scheduled jobs, payroll and reports stayed where they already ran. The office product was designed around consultant work — pipeline, candidate status, compliance — and built in that order. Fungai stayed on the APIs. I designed and built the office interface.'
    ),
  },
  productModules: {
    eyebrow: 'Mapping the reality.',
    heading: 'The office product, then the surfaces that still had to join it.',
    intro:
      'Built at Greyzip with Fungai Motezu on the RecruitWare APIs, July to September 2024. The live product is the office CRM and public registration into that system. Candidate self-service was in the brief and is out of scope here.',
    items: [
      {
        title: 'Access and roles',
        shortLabel: 'Roles',
        teaser:
          'Apex asked for candidate records before the rest of the product existed. Consultants had to enter through the login they already used.',
        status: 'shipped',
        problem: blocks(
          'Apex asked when they could have the CRM to organise candidates. The office product had to use the existing RecruitWare identity, so consultants were not given a second account. Wrong credentials returned the HTML login page. Right credentials returned a 404 — the login succeeded, the handoff into the new interface did not.'
        ),
        solution: blocks(
          'The new office interface follows that existing login, keeps the session, then lands consultants in role-gated modules. Logout uses the same session. Consultants, compliance and admins see different slices of the same records. The wiring that made this possible — following the Notes redirect and keeping the session cookie — is in Design to code.'
        ),
        before: [
          'Successful login dropped consultants out of the new interface',
          'Identity lived in the existing CRM session',
          'No candidate login',
        ],
        after: [
          'Consultants enter through the login they already had',
          'Role-gated navigation once they are in',
          'Candidate access left for a later surface',
        ],
      },
      {
        title: 'Candidate lists',
        shortLabel: 'Candidates',
        teaser:
          'Consultants already understood candidates through Live, Pending, Compliance, Audit, Leavers and Archive. I kept those states and redesigned how they searched and scanned them.',
        status: 'shipped',
        problem: blocks(
          'Consultants already worked in those operational states. The previous office view made the lists hard to search and scan, and an early live connection only showed Live Candidates whichever view was requested. Those states came from the existing backend, including the Notes and menu configuration.'
        ),
        solution: blocks(
          'I retained the status split and redesigned search, columns, filters and a visible live-updates state. Tables were designed against fixture data first, then connected to live views. The navigation reads the existing menu configuration — including malformed prefixes — so the interface stays truthful to the operational model.'
        ),
        before: [
          'Status lists that were hard to search and scan',
          'Each section as a separate office page',
          'An early live view that only returned Live Candidates',
        ],
        after: [
          'The same status split, with search, columns and filters',
          'A visible Live Updates state',
          'Navigation driven by the existing operational menu',
        ],
      },
      {
        title: 'Candidate profile',
        shortLabel: 'Profile',
        teaser:
          'Healthcare compliance had to sit on the everyday candidate record, alongside the logistics fields the system already held.',
        status: 'shipped',
        problem: blocks(
          'Profiles were still shaped for warehouse and driving. Healthcare work needed compliance, attachments and auditing on the same candidate. Labels and tabs had to be authored in the interface; fields and actions still come from the current form API.'
        ),
        solution: blocks(
          'A single candidate with inner navigation: details, core documents, employment history, medical, convictions, payroll, jobs compliance, compliance check, expiry check, audit check, attachments and bookings. Edit and leaver stay on the record. Availability, preferred client and assigned jobs stay visible next to the compliance tabs.'
        ),
        before: [
          'Warehouse and driving fields as the default profile',
          'Compliance easy to miss beside the everyday record',
          'Audit timestamp away from the details view',
        ],
        after: [
          'Healthcare and logistics fields on the same candidate',
          'Convictions, medical and expiry as first-class tabs',
          'Last audit shown on the details view',
        ],
      },
      {
        title: 'Booking dashboards',
        shortLabel: 'KPIs',
        teaser:
          'The office needed last-week versus this-week bookings on screen, as the first destination, matching a spec that already existed.',
        status: 'shipped',
        problem: blocks(
          'Booking volume lived in background reports. A dashboard spec already asked for last-week versus this-week counts by client. The backend could describe chart type, labels, data and order. The office did not yet show them.'
        ),
        solution: blocks(
          'The dashboard became the first office screen. Graphs were proven on fixture data, then pointed at live bookings. Finance and weekend costings stay as sibling areas in the chrome.'
        ),
        before: [
          'Report generation buried in background processing',
          'A dashboard spec with no office screen to render it',
        ],
        after: [
          'Dashboard as the first office destination',
          'Day and week bookings by client, including the weekly difference',
          'Charts following the spec the backend already described',
        ],
      },
      {
        title: 'Locations and clients',
        shortLabel: 'Locations',
        teaser:
          'Clients, contacts and jobs already sat next to candidates in the operational model. They needed the same kind of scannable table.',
        status: 'shipped',
        problem: blocks(
          'Those records already existed in the backend. The menu listed All Clients, Contacts and Jobs beside candidates. Booking and availability still depended on knowing the previous office screens, because there was no consistent table for browsing them.'
        ),
        solution: blocks(
          'Locations as a live table — branch, reference, manager, town — with the same search and columns as candidates. Clients and jobs stay in the same sidebar because that is how the backend already grouped them.'
        ),
        before: [
          'Locations only reachable through the previous office screens',
          'No shared table pattern across candidates and branches',
        ],
        after: [
          'Locations list with live updates',
          'Clients and jobs as sibling modules',
          'Branch references such as TG0005 kept from the existing data',
        ],
      },
      {
        title: 'Website registration',
        shortLabel: 'Registration',
        teaser:
          'An application has to become a candidate the office can see. Emailing the form fields is not enough.',
        status: 'shipped',
        problem: blocks(
          'Apex and Thomas Grant already had registration and DBS forms on the public site. One live plugin could only email details, so tests never reached the database. Apex’s requirement was that candidates could complete the pack and the office could see the data. The CRM expected field names — identity, next of kin, employment history, medical, DBS, GDPR — that had to match exactly or someone would map them by hand.'
        ),
        solution: blocks(
          'Greyzip restored the Avada forms so entries stayed on the site and could be linked. Field names were set to the CRM placeholders. The pack was split into sections with a next step, because a single page could not hold it. Signature pages became documents the applicant ticks to confirm.'
        ),
        before: [
          'Multiple form builders on the same site',
          'A live path that only emailed the office',
          'Field names that would have needed manual matching',
        ],
        after: [
          'Avada live again, with CRM field names',
          'Stored entries as a fallback when the live write fails',
          'A multi-section pack, with policy documents ticked',
        ],
      },
      {
        title: 'Candidate portal',
        shortLabel: 'Portal',
        outcomeLabel: 'Candidate self-service portal',
        teaser:
          'The third audience: candidates seeing their own profile, documents and bookings. Architecturally prepared, not shipped.',
        status: 'concept',
        problem: blocks(
          'Candidates had no access to the system. The intended loop was: register on the website, get a profile in the CRM, then use a later surface for profile, documents and booking info. Whether uploads happened at registration or after vetting was still being decided.'
        ),
        solution: blocks(
          'The office product shipped first. The interface layer was shaped so a later portal could read the same profile and booking data. That surface is out of scope for this case study.'
        ),
        before: [
          'No candidate login',
          'Documents and availability handled inside the office only',
        ],
        after: [
          'Office CRM shipped first',
          'Shared APIs left ready for a later portal',
          'No candidate-facing screens presented as finished',
        ],
      },
    ],
  },
  deepDives: {
    eyebrow: '04 / Deep dives',
    heading: 'Three decisions that shaped the office product',
    intro:
      'The visible interface needed replacing. The backend still held years of working recruitment logic. The work that mattered was deciding what to keep, how an application becomes a candidate, and how consultants already organised their day.',
    items: [
      {
        title: 'Keep the backend, replace the office',
        shortLabel: 'Office layer',
        problem: blocks(
          'The first hosting idea was WordPress, because that is where the public site already lived. The office UI was already PHP templates on that stack. The backend still ran validation, scheduled work, payroll and reports. A visual refresh on the same shell would have left website, office and a later portal as separate experiences on top of that processing.'
        ),
        contribution:
          'I asked whether we were working on the candidate portal or the office system, then proposed an interface layer that could share APIs later, without rebuilding the processing Fungai already ran. In July I designed the dashboard against the existing booking spec on fixture data, so we could agree the office destination before login was wired. Fungai stayed on the APIs while Greyzip took the office front.',
        constraints:
          'Do not re-do background processing, validation, scheduled tasks or report generation.\nThe existing database and session model had to keep working.\nThe dashboard API would indicate chart type, labels, data and order — the front had to render whatever that described.\nFirst phase ran July to September 2024.',
        decisions: [
          decision(
            'Keep the processing, replace the office shell',
            'The new interface sits in front of the existing RecruitWare work. Payroll and reports stay where they already run.'
          ),
          decision(
            'Prove the dashboard before the session works',
            'Graphs on fixture data meant we could agree layout without waiting on login. The live dashboard is that spec: last-week versus this-week bookings by client.'
          ),
          decision(
            'Read the existing views before drawing new ones',
            'Fungai sent the PHP candidates view and the view process — type, URL, columns, query, return list, then per-user settings. The Live / Pending / Compliance split in the new UI is that view.'
          ),
        ],
        outcome: blocks(
          'The office CRM shipped on DigitalOcean as an interface layer on the existing backend. Website, office and a later portal can share that processing. The stack is in Design to code.'
        ),
      },
      {
        title: 'Registration has to create a candidate',
        shortLabel: 'Registration',
        problem: blocks(
          'Registration on the public site was supposed to create a candidate in the system. Tests did not. The live form used a plugin that could only email details. Avada already stored entries. Apex needed it easy for candidates to complete and possible for the office to see the data. The CRM then sent an application pack: identity, next of kin, three jobs of history, medical, DBS, GDPR and the rest — each placeholder had to be the Avada field name or it would be matched by hand.'
        ),
        contribution:
          'I was not the WordPress form author — that sat with Greyzip colleagues on the agencies’ sites. My job was to treat intake as a CRM write: restore a builder that stores entries, match field names, and split a pack that could not live on one page.',
        constraints:
          'Do not throw away forms candidates already know.\nField names must match the CRM placeholders.\nSignature sections become linked documents with a tick, not in-form signatures.\nUploads at registration versus after vetting was still an open call.',
        decisions: [
          decision(
            'Put Avada back, with CRM field names',
            'Joe signed off the switch. Entries stay on the site if the live write fails, and the names line up without a mapping spreadsheet.'
          ),
          decision(
            'Split the pack, tick the policies',
            'A next-step form holds the questions. Each signed section in the pack is a document the applicant confirms they have read.'
          ),
          decision(
            'Treat the public form as intake into RecruitWare',
            'The outcome of registration is a candidate the office can see. The public site stores the entry; the CRM decides pending versus live.'
          ),
        ],
        outcome: blocks(
          'Avada live again, field names aligned to the pack, pending versus live still decided in the office. An application can become a candidate record.'
        ),
      },
      {
        title: 'Use the existing mental model',
        shortLabel: 'Operational IA',
        problem: blocks(
          'Apex asked when they could have the CRM to organise candidates. Consultants already used Live, Pending, Compliance, Audit, Leavers and Archive. An early live connection only returned Live Candidates. The menu arrived as a configuration string that was missing a prefix and had stray punctuation on Jobs.'
        ),
        contribution:
          'I designed the candidate tables first, then connected them to live views once login worked. When the menu configuration was wrong, I sent it back so the interface would keep showing the real operational states. Profile tabs were authored next; fields and buttons still come from the API.',
        constraints:
          'Apex wanted candidate use while other parts were still being built.\nLogin had to return cookie and folder from the existing server.\nPer-user settings can override URL, columns and query for a view.\nCandidate-facing access was a later surface.',
        decisions: [
          decision(
            'Keep the existing status split',
            'Those categories represented genuine operational states. I improved search, scanning and movement through them, and left the underlying process in place.'
          ),
          decision(
            'Fixture tables, then live views, then the form',
            'Candidates UI first. Data on screen second. Profile tabs authored in the front, fields from the API, submit back to the server.'
          ),
          decision(
            'Correct the menu configuration',
            'Live, Pending, Compliance, Audit, Leavers, Archive, then Clients, Contacts and Jobs. The office nav is that model, corrected where the string was malformed.'
          ),
        ],
        outcome: blocks(
          'The office CRM is behind a login that shares the RecruitWare session, with role-gated modules and live tables. Candidate self-service was scoped and is not presented here as a finished screen.'
        ),
      },
    ],
  },
  designToCode: {
    eyebrow: '05 / Design to code',
    heading: 'Where building protected the design',
    framing: blocks(
      'Owning both the interface and its implementation meant consultant workflows could be tested against the behaviour of the real RecruitWare system as they were designed, rather than assuming the backend could support an idealised interface. The existing shell taught the data model: cookie session, Notes views, settings-driven columns, a menu string.'
    ),
    decisions: [
      decision(
        'Follow the Notes login, keep the cookie and folder',
        'An external authentication guard with session sync keeps RecruitWare as the source of who someone is. A 404 after good credentials was the redirect, not a failed password.'
      ),
      decision(
        'Let the API describe the chart, then render it',
        'Chart type, labels, data and order come from the backend. The dashboard spec already asked for last-week versus this-week bookings by client. Dummy data proved the graphs; live data replaced them.'
      ),
      decision(
        'Author tabs, bind fields',
        'Candidate form labels and tabs are placed in the interface because they have to match the current system. Data and buttons arrive on an API call and submit back. Healthcare fields can grow on that record.'
      ),
    ],
    stackTags: [
      'Laravel 11',
      'PHP',
      'React',
      'Inertia.js',
      'Tailwind CSS',
      'MySQL',
      'Chart.js',
      'DigitalOcean',
    ],
  },
  outcomeStatus: {
    eyebrow: '06 / Outcome and status',
    heading: 'Where the product stands',
    statusSummary:
      'The office could move onto a purpose-built recruitment interface without replacing the backend responsible for existing reporting and operational processes. Public registration was aligned so an application could become a candidate record the office can see. Candidate self-service was in the original brief and remains unshipped.',
    statusLabels: {
      concept: 'Out of scope',
    },
    whatsNextHeading: 'Product boundary',
    whatsNext:
      'The shipped service is the consultant office product and public intake into that CRM. Candidate self-service for profile, documents, availability and bookings was prepared for in the architecture and is not part of the delivered product. If that surface became the next priority, it should use the shared APIs.',
    quotes: [],
    evidence: [
      'Shipped: consultant access, candidate statuses, profiles, compliance fields, booking dashboard, locations, and public registration into the CRM.',
      'Observed: the office app is live on DigitalOcean, behind the existing RecruitWare login, available on request.',
      'Design evidence: Live / Pending / Compliance / Audit / Leavers / Archive retained as the consultant model, with search, columns and live updates.',
      'Launch architecture: an interface layer on the existing processing. Laravel, React and Inertia are in Design to code.',
    ],
    evidenceBoundary:
      'Post-handover analytics were not available to me, so I do not attribute speed, conversion or time-saved figures to the work.',
    reflection: blocks(
      'The visible interface needed replacing. The backend still held years of working recruitment logic. Given the same brief I would still keep that processing and redesign the office on top of it. The distinction is knowing that an office product for consultants is not the same as a finished three-audience system.'
    ),
  },
  liveUrl: RECRUITEWARE_LIVE_URL,
  liveNote: RECRUITEWARE_LIVE_NOTE,
}
