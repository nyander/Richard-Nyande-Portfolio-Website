import { blocks, decision, fact } from '@/lib/case-study-blocks'
import type { CaseStudyCard, CaseStudyPage } from '@/lib/sanity/types'

export const SESAHUB_SLUG = 'sesahub'

const SESAHUB_SUMMARY =
  'For growing Ghanaian businesses becoming too complex to run from separate tools: one workspace to manage staff, review finance, control stock, handle orders and decide who can see what.'

export const SESAHUB_CARD: CaseStudyCard = {
  _id: 'caseStudy-sesahub',
  title: 'SesaHub',
  slug: SESAHUB_SLUG,
  role: 'Product Designer, Full Stack Developer',
  year: 2025,
  summary: SESAHUB_SUMMARY,
  status: 'shipped',
  heroImage: null,
}

export const SESAHUB_STUDY: CaseStudyPage = {
  _id: 'caseStudy-sesahub',
  title: 'SesaHub',
  slug: SESAHUB_SLUG,
  role: 'Product Designer, Full Stack Developer',
  year: 2025,
  summary: SESAHUB_SUMMARY,
  status: 'shipped',
  contextFacts: [
    fact('Client', 'Nyande ERP Solutions (internal)'),
    fact('Type', 'Internal operations workspace'),
    fact('Stack', 'Laravel 11, React, TypeScript, Inertia.js, Tailwind, PostgreSQL'),
    fact('Team', 'Dominic Nyande, business analyst; Amy Nyande, data analyst'),
  ],
  heroImages: [],
  seoTitle: 'SesaHub — Product Design & Build Case Study | Richard Nyande',
  seoDescription:
    'Internal product, 2024–25. For growing companies in Ghana: one workspace to manage staff, review finance, control stock, handle orders and decide who can see what.',
  ogImage: null,
  reframing: {
    eyebrow: 'A product proposition',
    heading:
      'A growing company still has to manage staff, review finance, control stock, handle orders and set policies — and those jobs do not always live in one place.',
    intro:
      'The target was growing businesses in Ghana moving from owner-led operations into something that needed more structure. SesaHub asked whether those jobs could live in one workspace, with access shaped by the person’s role and organisation. I defined that product model, designed the screens, and built the system. There was a wider ambition that the product could later be relevant in other African markets. We did not research that region, and this page does not treat that ambition as a finding. There is no external client. TechCorp Solutions Ltd in the screenshots is seeded test data, not a customer.',
    initialProposal: blocks(
      'The product started from a hypothesis: growing businesses could benefit from managing more of their operation in one place. Reviewing finance, managing staff, setting policies, controlling stock, handling orders and reporting were treated as related jobs. The question was whether they could sit in one workspace, with access changing by the person’s role and organisation, rather than requiring a separate tool for each job.'
    ),
    discovery: blocks(
      'Ghana was the starting context. The work was an internal family product for Nyande ERP Solutions. Dominic Nyande was the business analyst: he helped define business requirements, discuss what each module needed to support, and challenge how the product should work from an operational perspective. There are no formal research reports or user-interview outputs from that work. Amy Nyande worked from the data side: she helped think through the information the system needed to hold and what a business would need to understand from it. That was not external user research. I do not have a formal competitor study from the original project.'
    ),
    productResponse: blocks(
      'I designed the product around those jobs: control who can see what, manage staff, keep customer and supplier records, control stock, review finance, and handle orders — with the purchase-order path left unfinished. Owners and managers needed the overall picture; finance needed transactions and records; HR and operations needed people and organisational information; employees needed only the parts relevant to their work. Company isolation, roles and the ledger are how that product idea becomes a system. Implementation is in Design to code.'
    ),
  },
  productModules: {
    eyebrow: 'The jobs.',
    heading: 'The jobs a growing company has to do, designed so they can live together.',
    intro:
      'Built December 2024 to October 2025. The target was businesses moving from owner-led operations into something that needs structure: manage staff, review finance, control stock, handle orders, and decide who can see what. Screens are from the running app on seeded test data. Purchase-order request-to-receipt is not shipped. Company policies and recruitment were part of the original idea; they are not presented here as finished modules.',
    items: [
      {
        title: 'Companies',
        shortLabel: 'Access',
        teaser:
          'Control access by organisation: each company is its own workspace, so staff do not see another business’s records.',
        status: 'shipped',
        problem: blocks(
          'SesaHub was intended to serve many independent businesses from one product. If companies share a single set of records, isolation is only a dropdown. Permissions, currency and the books have to start from the organisation.'
        ),
        solution: blocks(
          'A company record is the workspace. Creating a company also starts its financial setup, so the books belong to that organisation from the beginning rather than arriving as a later add-on.'
        ),
        before: [
          'Separate tools per company, or one database everyone can see',
          'Access treated as a filter on a shared list',
        ],
        after: [
          'Each organisation as its own workspace',
          'Roles that can cross companies without mixing records',
          'Financial setup started with the company',
        ],
      },
      {
        title: 'Sites',
        shortLabel: 'Sites',
        teaser:
          'Locations under a company, so people and stock have a place to belong rather than floating on the organisation as a whole.',
        status: 'shipped',
        problem: blocks(
          'A growing company may run more than one location. Stock, people and fulfilment are per site. If a site is only a name on the company, inventory and employees have nothing reliable to join to.'
        ),
        solution: blocks(
          'Sites sit under the company. Each site gets a generated code. Employees and inventory attach to that record.'
        ),
        before: [
          'Location as a note on the company',
          'Hand-assigned site codes',
        ],
        after: [
          'Site list under the company',
          'Generated codes',
          'Employees and inventory join to the site',
        ],
      },
      {
        title: 'Employees',
        shortLabel: 'Staff',
        teaser:
          'Manage staff against a site and a company, with a role that decides what they can see and do.',
        status: 'shipped',
        problem: blocks(
          'A business owner, a finance person, an HR or admin employee and general staff should not have the same access. If people live in a spreadsheet beside the product, assignment, login and responsibility drift apart.'
        ),
        solution: blocks(
          'An employee record with site assignment, generated IDs, department and status, tied into the same login and permission model as the rest of the product.'
        ),
        before: [
          'Staff lists off-system',
          'No join from a person to a site or a role',
        ],
        after: [
          'People on the same product as the work',
          'Site and company on the record',
          'Login and role on the same person',
        ],
      },
      {
        title: 'Customers and suppliers',
        shortLabel: 'Customers',
        teaser:
          'Keep customer and supplier records so orders and purchasing have someone to attach to.',
        status: 'shipped',
        problem: blocks(
          'Stock and money need counterparties. Without customer and supplier records, orders and purchases have nowhere to live.'
        ),
        solution: blocks(
          'Customers with addresses and customer orders, and suppliers as their own records. That is the party layer. It is not a finished purchase-order workflow.'
        ),
        before: [
          'Counterparties in a sheet or in someone’s head',
        ],
        after: [
          'Customer records, addresses and orders',
          'Supplier records',
          'Purchase-order steps still a later module',
        ],
      },
      {
        title: 'Products and inventory',
        shortLabel: 'Stock',
        teaser:
          'Control stock per site — identity on the item, levels on the location.',
        status: 'shipped',
        problem: blocks(
          'A single quantity on the company hides which site can fulfil an order. Categories and identifiers have to survive more than one location.'
        ),
        solution: blocks(
          'Parts, product categories and inventory. Stock levels live on the site. SKU and barcode sit on the part.'
        ),
        before: [
          'One stock number for the whole company',
          'Categories remembered, not stored',
        ],
        after: [
          'Part records with SKU and barcode',
          'Category taxonomy',
          'Inventory rows per site',
        ],
      },
      {
        title: 'Currency',
        shortLabel: 'Currency',
        teaser:
          'Rates inside the product, so a company is not stuck pricing and booking in a single assumed currency.',
        status: 'shipped',
        problem: blocks(
          'A growing business may need to work in more than one currency. Looking rates up beside the system makes the books and the stock disagree.'
        ),
        solution: blocks(
          'Currency records in the same workspace, with conversion available on the company and on a transaction rather than only as a global default.'
        ),
        before: [
          'One currency assumed for every company',
          'Rates looked up off-system',
        ],
        after: [
          'Currency records in the product',
          'Conversion available in the same workspace',
          'Company and transaction overrides',
        ],
      },
      {
        title: 'Core financials',
        shortLabel: 'Finance',
        teaser:
          'Review finance from proper records — accounts, journals and a ledger — in the same product as staff and stock.',
        status: 'shipped',
        problem: blocks(
          'The finance module was trying to support proper financial records for the kind of growing business SesaHub was aimed at. Totals on a dashboard are not enough if there is no underlying record of transactions, and the books have to belong to the same organisation as the people and the stock.'
        ),
        solution: blocks(
          'Accounts, ledger, journal entries, trial balance, account analysis and a fiscal calendar as a first-class part of the product. The screenshot is the TechCorp test company with zeroed balances.'
        ),
        before: [
          'Books in a separate tool, or not at all',
          'No fiscal period on the company',
        ],
        after: [
          'Chart of accounts and general ledger',
          'Journal entries and trial balance',
          'Fiscal calendar on the same login',
        ],
      },
      {
        title: 'Purchase orders',
        shortLabel: 'Orders',
        outcomeLabel: 'Handle orders',
        teaser:
          'Handling orders was part of the original picture. Suppliers and customer orders exist; request-through-receipt does not.',
        status: 'in-progress',
        problem: blocks(
          'Orders were part of the original operational picture. The public write-up listed an end-to-end purchase workflow. Shipping that copy as a finished module would have presented work the product does not do yet.'
        ),
        solution: blocks(
          'Supplier records and customer orders are in the build. The request → approval → purchase → shipment → receipt path is not. It stays marked in progress.'
        ),
        before: [
          'A written purchase pipeline with no screen to show',
        ],
        after: [
          'Supplier and order foundations in place',
          'Purchase-order workflow not presented as shipped',
        ],
      },
    ],
  },
  deepDives: {
    eyebrow: '04 / Deep dives',
    heading: 'Product questions the system had to answer',
    intro:
      'Company isolation, roles and the ledger are how one workspace can control access, manage staff, review finance and keep stock without mixing organisations.',
    items: [
      {
        title: 'Access follows role and organisation',
        shortLabel: 'Access',
        problem: blocks(
          'SesaHub was meant to serve many independent businesses from one product. A business owner, a finance person, an HR or admin employee and general staff needed different visibility. A company dropdown on a shared table would mix organisations.'
        ),
        contribution:
          'I treated the company as the workspace and designed access around the person’s role inside that organisation. Consultants and family users can hold roles across companies without sharing rows. Creating a company starts its financial setup in the same step.',
        constraints:
          'No external client brief — this is an internal product.\nDominic helped define what the modules needed to support from an operational perspective.\nAmy helped think through the information the system needed to hold.\nIsolation had to hold for employees, sites, stock and the ledger, not only the company list.',
        decisions: [
          decision(
            'Scope access by organisation',
            'Permissions sit on the records, so a missed filter in the interface cannot mix companies.'
          ),
          decision(
            'Start the books with the company',
            'A company without financial setup is a list of names. The workspace and the records are created together.'
          ),
        ],
        outcome: blocks(
          'Shipped. Companies, sites, people and the ledger share the same organisation rules.'
        ),
      },
      {
        title: 'Keep financial records in the same product',
        shortLabel: 'Finance',
        problem: blocks(
          'If money is only a set of totals, the finance module cannot support the records a growing business needs. If the books live in another product, people and stock still send someone somewhere else to understand the operation.'
        ),
        contribution:
          'I designed finance as a first-class part of the same workspace: chart of accounts, general ledger, journal entries, trial balance and a fiscal calendar. The general ledger screenshot is that module, on seeded TechCorp data, balances at zero.',
        constraints:
          'The books have to belong to the same company as the parts and employees.\nThe screenshot is test data and is labelled as such.\nI will not publish named-client outcomes I do not have.',
        decisions: [
          decision(
            'Ship journals and a trial balance as screens',
            'Trial balance and journals live in the product, next to staff and stock.'
          ),
          decision(
            'Show the test company honestly',
            'TechCorp Solutions Ltd is seed data. Using it as a client logo would have been a lie.'
          ),
        ],
        outcome: blocks(
          'Shipped in the running build. The hero image is this ledger, on seeded TechCorp data.'
        ),
      },
      {
        title: 'Show the system that exists',
        shortLabel: 'Honesty',
        problem: blocks(
          'The older case study listed purchase orders and shipments as if they were done, then showed empty laptop frames and a registration clip from another stack. It also described the work as an ERP for enterprises across Africa.'
        ),
        contribution:
          'I kept suppliers and customer orders in the story because they exist. I marked request-to-receipt as in progress. I did not reuse another project’s interface, and I dropped the MemberPress registration block that had landed on that page by mistake. The African-market line stays an ambition, not a researched finding.',
        constraints:
          'Empty laptop mockups stay off this page.\nMemberPress, Divi and New User Approve were never this stack.\nA live URL is omitted until there is one to print.',
        decisions: [
          decision(
            'Only show screens that exist',
            'Modules without a still show as image coming soon. Companies and purchase orders have no screenshot yet. Sites, employees, customers, products, currency and the ledger are from the running app, on seed data.'
          ),
          decision(
            'Leave Live blank rather than a hash link',
            'The old page’s Live Project pointed at nothing. Recruiteware can say DigitalOcean because that URL exists. SesaHub will say it when there is a URL.'
          ),
        ],
        outcome: blocks(
          'This page describes the modules that run, and the one that does not, without filling gaps from the old Webflow CMS.'
        ),
      },
    ],
  },
  designToCode: {
    eyebrow: '05 / Design to code',
    heading: 'Making the product model run as one system',
    framing: blocks(
      'Owning both the interface and its implementation meant the module and permission model could be tested against a running multi-company system. Laravel, React, TypeScript and Inertia are how those records stay on one login. Docker on Render is how it shipped.'
    ),
    decisions: [
      decision(
        'Permissions on the company',
        'A person’s cross-company role is still a role on a company.'
      ),
      decision(
        'Let the system issue the codes',
        'Site codes and employee IDs come from the service layer so lists stay joinable when someone forgets a naming convention.'
      ),
      decision(
        'Keep conversion in the product',
        'Currency conversion and rate updates run in the same workspace as the books.'
      ),
    ],
    stackTags: [
      'Laravel 11',
      'PHP',
      'React',
      'TypeScript',
      'Inertia.js',
      'Tailwind CSS',
      'PostgreSQL',
      'Docker',
      'Render',
    ],
  },
  outcomeStatus: {
    eyebrow: '06 / Outcome and status',
    heading: 'Where the product stands',
    statusSummary:
      'SesaHub shipped on Render as Nyande ERP Solutions in October 2025, after work that started in December 2024. It is an internal product proposition: a working system for the jobs we believed a growing business would need to coordinate. The running app is seeded with test data. There is no external client and no named quote. The live URL is not on this page until there is one to give.',
    statusLabels: {
      concept: 'Out of scope',
    },
    whatsNextHeading: 'What I would validate next',
    whatsNext:
      'If I were developing this now, I would interview the growing Ghanaian businesses the product was aimed at and test which modules are essential versus unnecessary complexity. I would finish the purchase-order workflow only if that job is confirmed. The mobile, voice and AI items on the older page stay later work. The wider African ambition would remain an intent until it is researched.',
    quotes: [],
    evidence: [
      'Shipped: company workspaces, sites, employees, customers and suppliers, products and inventory, currency, and core financial records.',
      'Observed: a running internal app on Render, on seeded data. There is no public customer deployment on this page.',
      'Design evidence: modules and access designed around different responsibilities inside an organisation, with finance as records rather than totals only.',
      'Launch architecture: one product for multiple organisations. Implementation is in Design to code.',
    ],
    evidenceBoundary:
      'There was no external client and no Ghanaian SME interview programme. Screens use seeded demo data. I do not claim adoption, revenue or operational impact.',
    lookingBackHeading: 'Looking back',
    lookingBack:
      "Ghana Statistical Service's 2024 Integrated Business Establishment Survey reported that 92.3% of businesses operate informally, with informal status including businesses that do not maintain formal accounts. The same survey found that the overwhelming majority of establishments are micro businesses. That does not validate SesaHub by itself. It gives later context to the opportunity we were exploring: what happens when a growing business begins to need more structured records, responsibilities and operational systems.",
    reflection: blocks(
      'The honest version of this project is a 0→1 product proposition, not a client transformation. I would still start from the jobs a growing company has to coordinate, and I would still design access around role and organisation. I would validate those jobs with the businesses themselves before expanding the system, and I would not describe an African-market ambition as a finding.'
    ),
  },
}
