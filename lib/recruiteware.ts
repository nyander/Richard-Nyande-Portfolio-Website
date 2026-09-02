import { blocks, decision, fact } from '@/lib/case-study-blocks'
import type { CaseStudyCard, CaseStudyPage } from '@/lib/sanity/types'

export const RECRUITEWARE_SLUG = 'recruiteware'

export const RECRUITEWARE_LIVE_URL =
  'https://squid-app-vp2lq.ondigitalocean.app/login'

export const RECRUITEWARE_LIVE_NOTE =
  'Login required. Accessible upon request.'

export const RECRUITEWARE_CARD: CaseStudyCard = {
  _id: 'caseStudy-recruiteware',
  title: 'Recruiteware',
  slug: RECRUITEWARE_SLUG,
  role: 'Product Designer, Full Stack Developer',
  year: 2025,
  summary:
    'An office CRM for Thomas Grant and Apex Recruitment — a Laravel and React front on the existing RecruitWare backend, so consultants could search, book and check compliance without the old PHP shell.',
  status: 'shipped',
  heroImage: null,
}

export const RECRUITEWARE_STUDY: CaseStudyPage = {
  _id: 'caseStudy-recruiteware',
  title: 'Recruiteware',
  slug: RECRUITEWARE_SLUG,
  role: 'Product Designer, Full Stack Developer',
  year: 2025,
  summary:
    'An office CRM for Thomas Grant and Apex Recruitment — a Laravel and React front on the existing RecruitWare backend, so consultants could search, book and check compliance without the old PHP shell.',
  status: 'shipped',
  contextFacts: [
    fact('Client', 'Thomas Grant Recruitment, with Apex'),
    fact('Type', 'Office CRM on a legacy recruitment backend'),
    fact('Stack', 'Laravel 11, React, Inertia.js, Tailwind, MySQL'),
    fact('Team', 'Greyzip, with Fungai Motezu on the existing APIs'),
  ],
  heroImages: [],
  seoTitle: 'Recruiteware — Product Design & Build Case Study | Richard Nyande',
  seoDescription:
    'Greyzip, 2024–25. A Laravel and React office CRM for Thomas Grant and Apex Recruitment, sitting on the existing RecruitWare processing instead of replacing it.',
  ogImage: null,
  reframing: {
    eyebrow: 'Beyond a WordPress skin',
    heading: 'The work was three audiences sharing one backend, not a prettier template.',
    intro:
      'RecruitWare already held candidates, clients, bookings and payroll. Thomas Grant used it for warehouse and driving; Apex needed the same system for healthcare. The office screens were a PHP WordPress shell talking to a Notes database over session cookies.',
    initialProposal: blocks(
      'Host a new front on WordPress, follow an existing layout, and spend the first 2.5 months mostly on look and feel, with some front-end behaviour added on top of the current system.'
    ),
    discovery: blocks(
      'The product had three surfaces: a public website that had to write registrations into the CRM, an office system for consultants, and a candidate portal that did not exist yet. Apex wanted candidate records usable immediately. Public registration lived in WordPress form builders — some could only email — until Avada went back live with field names that matched the application pack. The office dashboard already had a spec: last-week versus this-week bookings by client.'
    ),
    productResponse: blocks(
      'I proposed Laravel so the website, office CRM and portal could share APIs without re-implementing validation, scheduled jobs and reports. The office build then ran in a fixed order: Chart.js dashboards against the existing booking spec, Notes login and session cookies, candidate tables swapping fixture data for live views, then menus and the candidate form. Fungai stayed on the APIs and the existing processing. I designed and built the SPA in React and Inertia.'
    ),
  },
  productModules: {
    eyebrow: 'Mapping the reality.',
    heading: 'The office CRM, then the surfaces that still had to talk to it.',
    intro:
      'Built at Greyzip with Fungai Motezu on the RecruitWare APIs, July to September 2024. Dashboard charts first, then login, then tables and menus, then the candidate form. The live deployment is the office system. The candidate portal was in the brief; it is not in these screenshots.',
    items: [
      {
        title: 'Access and roles',
        shortLabel: 'Roles',
        teaser: 'Security had to ship first. Correct credentials still returned a 404 until the Notes redirect and session cookie were handled.',
        status: 'shipped',
        problem: blocks(
          'Apex needed people on candidate records before the rest of the product existed. The office app had to log into the existing RecruitWare session, not mint a second identity. Wrong credentials returned the HTML login page. Right credentials returned a 404 — the login was succeeding, the redirect was not.'
        ),
        solution: blocks(
          'An external CRM authentication guard that follows the Notes login redirect, keeps the session cookie and folder, then lands in the SPA. Logout sits on the same rails. Consultants, compliance and admins then see different slices of the same records.'
        ),
        before: [
          'WordPress PHP templates on a shared session cookie',
          'Successful login looking like a 404',
          'No candidate login',
        ],
        after: [
          'Laravel auth following the existing redirect and cookie',
          'Login and logout in the office app',
          'Role-gated navigation once the session is real',
        ],
      },
      {
        title: 'Candidate lists',
        shortLabel: 'Candidates',
        teaser: 'Live, pending, compliance, audit, leavers and archive — parsed from the backend menu string, not invented as a new IA.',
        status: 'shipped',
        problem: blocks(
          'The previous candidates view was a PHP DataTable over a pipe-delimited Notes response. Columns came from per-user settings. The office nav was a delimited menu string: Live, Pending, Compliance Checks, Audit Checks, Leavers, Archive, then clients, contacts and jobs. A first live hook only showed Live Candidates no matter which view was requested.'
        ),
        solution: blocks(
          'Tables were designed against fixture data first, then swapped for the live payload once login worked. Views keep those statuses. Column toggles, search, advanced filters and a live-updates badge sit in the SPA. The nav parses the menu string — including catching missing prefixes and stray punctuation — instead of drawing a new information architecture.'
        ),
        before: [
          'PHP table assembled from cookie-authenticated curl',
          'One WordPress page per section, switching by reload',
          'Menu items as a delimited string the front had to interpret',
        ],
        after: [
          'Live Candidates with search, columns and advanced filters',
          'Polling with a visible Live Updates state',
          'Same status split, driven by the existing menu ops',
        ],
      },
      {
        title: 'Candidate profile',
        shortLabel: 'Profile',
        teaser: 'Tabs and labels authored in the SPA. Fields and buttons come from the API, against the current system’s form.',
        status: 'shipped',
        problem: blocks(
          'Profiles were still shaped for warehouse and driving. Healthcare needed compliance, attachments and auditing on the same candidate. The form could not be fully generated: labels and tabs had to be placed by hand, while data and action buttons would arrive on an API call, then submit back to the server.'
        ),
        solution: blocks(
          'A single candidate with inner navigation authored in the front: details, core documents, employment history, medical, convictions, payroll, jobs compliance, compliance check, expiry check, audit check, attachments and bookings. Edit and leaver stay on the record. Availability, preferred client and assigned jobs stay visible next to the compliance tabs.'
        ),
        before: [
          'Warehouse and driving fields as the default profile',
          'Compliance treated as a separate, easy-to-miss workflow',
          'Audit timestamp not part of the everyday record',
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
        teaser: 'Day and week bookings by client, with last-week versus this-week difference — the first thing built, against the existing dashboard spec.',
        status: 'shipped',
        problem: blocks(
          'The office needed pipeline and booking volume on screen, not as an export. A dashboard spec already asked for last-week versus this-week day counts by client, bookings this week versus last, and a weekly difference. The backend could describe chart type, labels, data and order. The front did not yet render them.'
        ),
        solution: blocks(
          'Chart.js first, with dummy candidates, clients and bookings so the graphs could be proven before login worked. Then the same tables and charts — bar, line, gauge, pie — against live data. Finance and weekend costings stay siblings in the chrome, not mixed into this view.'
        ),
        before: [
          'Report generation buried in background processing',
          'A dashboard spec with no office front to render it',
        ],
        after: [
          'Dashboard as the first office destination',
          'Tables and Chart.js views of the same booking split',
          'API-described chart type, labels, data and order',
        ],
      },
      {
        title: 'Locations and clients',
        shortLabel: 'Locations',
        teaser: 'Clients, contacts and jobs sit on the same menu string as candidates — All Clients, then locations as a live table.',
        status: 'shipped',
        problem: blocks(
          'Clients, jobs and locations already existed in the backend. The menu ops listed them next to candidates: All Clients, Contacts, Jobs. The office shell did not give a consistent table for browsing them, so booking and availability still depended on knowing the old screens.'
        ),
        solution: blocks(
          'Locations as a live table: branch, reference, manager, town, with the same search, columns and polling as candidates. Clients and jobs sit in the same sidebar because that is how the backend already grouped them.'
        ),
        before: [
          'Locations only reachable through the legacy shell',
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
        teaser: 'Avada went back live so field names could match the CRM. The form had to collect an application pack, not a contact email.',
        status: 'shipped',
        problem: blocks(
          'Apex and Thomas Grant already had registration and DBS forms on the public site. One plugin could only email details, so tests never hit the database. Apex’s bar was that candidates could complete it and the office could see the data. The CRM expected a long list of field names — identity, next of kin, employment history, medical, DBS, GDPR — that had to match exactly or someone would map them by hand.'
        ),
        solution: blocks(
          'Greyzip restored the Avada forms so entries stayed on the site and could be linked. Field names were set to the CRM placeholders. The pack was split into sections with a next step, because a single page could not hold it. Signature pages became documents the applicant ticks to confirm, not fields inside the form.'
        ),
        before: [
          'Multiple form builders on the same site',
          'Submissions that only arrived as email',
          'Field names that would have needed manual matching',
        ],
        after: [
          'Avada live again, with CRM field names',
          'Stored entries as a fallback when the live write fails',
          'A multi-section pack, with policy documents ticked not signed in-form',
        ],
      },
      {
        title: 'Candidate portal',
        shortLabel: 'Portal',
        teaser: 'The third surface in the brief: candidates seeing their own profile, documents and bookings. Not in the live office screenshots.',
        status: 'concept',
        problem: blocks(
          'Candidates had no access to the system. The intended loop was: register on the website, get a profile in the CRM, then use an app for profile, documents and booking info. Whether uploads happened at registration or after vetting was still being decided.'
        ),
        solution: blocks(
          'Laravel was chosen so a later portal could use the same APIs as the office SPA. The screens here are the office product that shipped. A candidate-facing portal remains the third audience, not a screen I am presenting as finished.'
        ),
        before: [
          'No candidate login',
          'Documents and availability handled inside the office only',
        ],
        after: [
          'APIs shaped so a portal can read profile and bookings',
          'Office CRM shipped first',
          'Portal left as the next surface, not a fake module screenshot',
        ],
      },
    ],
  },
  deepDives: {
    eyebrow: '04 / Deep dives',
    heading: 'Three problems that were not a new CRM',
    intro:
      'The brief looked like a UI refresh on WordPress. The work that mattered was Chart.js against a booking spec, Notes login that looked like a 404, tables that only showed Live, and Avada field names that had to match the CRM.',
    items: [
      {
        title: 'From a WordPress shell to a front that can share APIs',
        shortLabel: 'Laravel front',
        problem: blocks(
          'Fungai’s first hosting thought was WordPress, because that is where the public site already lived. The office UI was already PHP templates on WordPress, curling recruitware.uk with a session cookie and parsing pipe-delimited Notes views. Re-skinning that would have left website, office and portal as three disconnected fronts.'
        ),
        contribution:
          'I asked whether we were working on the candidate portal or the office system, then proposed Laravel so the three surfaces could talk through APIs without rebuilding validation, scheduled tasks and reports. In July I stood up Chart.js on dummy candidates, clients and bookings against the existing dashboard spec, and shared a Laravel and React app so we could plan how those graphs would take the API. Fungai agreed to focus on the APIs while Greyzip took the office front.',
        constraints:
          'Do not re-do background processing, validation, scheduled tasks or report generation.\nThe existing database and session model had to keep working.\nThe dashboard API would indicate chart type, labels, data and order — the front had to render whatever that described.\nFirst phase ran July to September 2024.',
        decisions: [
          decision(
            'Keep the processing, replace the office shell',
            'Laravel sits in front of the existing RecruitWare work. Payroll and reports stay where they already run.'
          ),
          decision(
            'Prove the graphs before the session works',
            'Bar, gauge and line charts on fixture data meant we could argue about layout without waiting on login. The live dashboard is that spec: last-week versus this-week bookings by client.'
          ),
          decision(
            'Read the old calls before inventing new ones',
            'Fungai sent the PHP candidates view, the curl helper, and the view process — type, URL, columns, query, return list, then per-user settings. The Live / Pending / Compliance split in the new UI is that view.'
          ),
        ],
        outcome: blocks(
          'Shipped as the office CRM on DigitalOcean. The live product is Laravel 11, React, Inertia and Tailwind against the existing backend — not Divi, MemberPress, or a WordPress plugin stack.'
        ),
      },
      {
        title: 'From an email of form fields to a row in the CRM',
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
            'Do not pretend WordPress is the CRM',
            'Divi and membership plugins were never this product. Recruiteware’s registration story is intake into RecruitWare.'
          ),
        ],
        outcome: blocks(
          'Avada live again, field names aligned to the pack, pending versus live still decided in the office. Not an inbox of unstructured emails.'
        ),
      },
      {
        title: 'From use-it-now to roles before screens',
        shortLabel: 'Access first',
        problem: blocks(
          'Apex asked when they could just have the CRM to organise candidates. The office app had to use the existing login. Wrong credentials returned the HTML login page. Correct credentials returned a 404 until the redirect, cookie and folder were handled. After that, tables still only showed Live Candidates when other views were called. Menus arrived as a delimited string that was missing a Candidates prefix and had stray punctuation on Jobs.'
        ),
        contribution:
          'I designed the Candidates tables against fixture data so they were ready for fields, then spent August on login, logout and swapping that fixture for live rows. When the menu string was wrong, I sent it back rather than inventing a nav. Forms came next: wrap the menus, author tabs and labels, take data and buttons from the API.',
        constraints:
          'Apex wanted candidate use while other parts were still being built.\nLogin had to return cookie and folder from the existing server, not a new Laravel user table.\nPer-user settings can override URL, columns and query for a view.\nCandidate-facing access was a later surface.',
        decisions: [
          decision(
            'Treat a 404 after good credentials as a redirect bug',
            'The login was working. The SPA had to follow it and keep the session, not show a missing page.'
          ),
          decision(
            'Fixture tables, then live views, then the form',
            'Candidates UI first. Data on screen second. Profile tabs authored in the front, fields from the API, submit back to the server.'
          ),
          decision(
            'Parse the menu, do not redesign it',
            'Live, Pending, Compliance, Audit, Leavers, Archive, then Clients, Contacts and Jobs. The office nav is that string, corrected where it was malformed.'
          ),
        ],
        outcome: blocks(
          'Shipped. The office CRM is behind a login that shares the RecruitWare session, with role-gated modules and live tables. Candidate self-service was scoped, not presented here as a finished screen.'
        ),
      },
    ],
  },
  designToCode: {
    eyebrow: '05 / Design to code',
    heading: 'Where building protected the design',
    framing: blocks(
      'The existing shell taught the data model: cookie session, Notes views, settings-driven columns, a menu string. Laravel, Inertia and React were how that model became an office SPA. Chart.js came first because the dashboard spec already knew the questions.'
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
        'Candidate form labels and tabs are placed in the SPA because they have to match the current system. Data and buttons arrive on an API call and submit back. Healthcare fields can grow without a new information architecture.'
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
    heading: 'Where the product stood',
    statusSummary:
      'The office CRM shipped on DigitalOcean for Thomas Grant and Apex. Login is available on request. Public registration went back to Avada with CRM field names. A candidate portal was in the original three-part brief and is not claimed as a finished module here.',
    whatsNext:
      'Candidate self-service for profile, documents, availability and bookings, using the same APIs. Keep registration write-back on the Avada field names so intake never depends on an email plugin.',
    quotes: [],
    evidence: [
      'The live office app is on DigitalOcean. Access is behind a login that shares the RecruitWare session, available on request.',
      'Candidate lists keep Live / Pending / Compliance / Audit / Leavers / Archive from the existing menu ops, with search, column toggles and a visible live-updates state.',
      'The dashboard matches the original spec: day and week bookings by client, including last-week versus this-week difference, rendered in Chart.js.',
    ],
    reflection: blocks(
      'The honest version of this project is a front on a working backend, built in order: graphs, then login, then tables, then the form. Mapping the Notes calls, the menu string and the Avada field names mattered more than the first hosting suggestion. I would still start there. I would not publish percentage load-time claims I cannot evidence, and I would not describe Divi or MemberPress as this stack.'
    ),
  },
  liveUrl: RECRUITEWARE_LIVE_URL,
  liveNote: RECRUITEWARE_LIVE_NOTE,
}
