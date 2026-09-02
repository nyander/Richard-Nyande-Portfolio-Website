import { blocks, decision, fact, quote } from '@/lib/case-study-blocks'
import type { CaseStudyCard, CaseStudyPage } from '@/lib/sanity/types'

export const YANDE_GADGETS_SLUG = 'yande-gadgets'

export const YANDE_WALKTHROUGH_URL =
  'https://www.youtube.com/watch?v=7t7FfB5XkBk&t=15s'

export const YANDE_GADGETS_CARD: CaseStudyCard = {
  _id: 'caseStudy-yande-gadgets',
  title: 'Yande Gadgets',
  slug: YANDE_GADGETS_SLUG,
  role: 'Product Designer, Full Stack Developer',
  year: 2020,
  summary:
    'A bespoke operations app for a second-hand electronics shop in Accra — replacing notebook stock, shipments and reports with one Laravel workspace.',
  status: 'shipped',
  heroImage: null,
}

export const YANDE_GADGETS_STUDY: CaseStudyPage = {
  _id: 'caseStudy-yande-gadgets',
  title: 'Yande Gadgets',
  slug: YANDE_GADGETS_SLUG,
  role: 'Product Designer, Full Stack Developer',
  year: 2020,
  summary:
    'A bespoke operations app for a second-hand electronics shop in Accra — replacing notebook stock, shipments and reports with one Laravel workspace.',
  status: 'shipped',
  walkthroughUrl: YANDE_WALKTHROUGH_URL,
  walkthroughTitle: 'Yande Gadgets walkthrough',
  contextFacts: [
    fact('Client', 'Yande Gadgets, Accra'),
    fact('Type', 'Bespoke operations web app'),
    fact('Stack', 'Laravel, PHP, MySQL, Bootstrap 4'),
    fact('Team', 'Sole designer and developer'),
  ],
  heroImages: [],
  seoTitle: 'Yande Gadgets — Product Design & Build Case Study | Richard Nyande',
  seoDescription:
    'Final-year project, 2019–20. A Laravel operations app for a Ghana electronics retailer: stock, shipments, deposits and financial reports in one place.',
  ogImage: null,
  reframing: {
    eyebrow: 'Beyond a shop website',
    heading: 'The work was the business process, not the storefront.',
    intro:
      'Yande Gadgets had been trading since 2011. Growth stalled because buying, shipping, selling and reporting still lived in a notebook.',
    initialProposal: blocks(
      'Put the shop online so customers in Accra could find the business.'
    ),
    discovery: blocks(
      'Observation in October 2019 showed the harder problem: purchases, shipments and sales were handwritten, reports missed expenses, and customer requests had been abandoned because people changed their minds after stock was already bought.'
    ),
    productResponse: blocks(
      'A role-based Laravel app that recorded each unique second-hand item, confirmed shipments, took a deposit on requests, and generated the statements the owner actually used to make buying decisions.'
    ),
  },
  productModules: {
    eyebrow: 'Mapping the reality.',
    heading: 'Ten iterations around one shop floor.',
    intro:
      'Built through Agile sprints with the owner testing each pass. Adobe XD first, then Bootstrap 4 on Laravel.',
    items: [
      {
        title: 'Access and roles',
        shortLabel: 'Roles',
        teaser: 'Admin, staff, supplier and customer each see a different slice of the same shop.',
        status: 'shipped',
        problem: blocks(
          'The owner, two store staff, suppliers and customers all needed the system, but not the same screens. A single login would have exposed reports and wage data to the shop floor.'
        ),
        solution: blocks(
          'Laravel auth plus Gates. Admin runs products, shipments, suppliers and reports. Staff confirm receipts and record in-store sales. Suppliers upload stock they want to sell. Customers browse received items and request what is not on the shelf.'
        ),
        before: [
          'Verbal instructions to staff',
          'No audit of who did what',
          'Suppliers contacted off-system',
        ],
        after: [
          'Role-gated navigation',
          'Admin settings for users and roles',
          'Login and registration with CSRF protection',
        ],
      },
      {
        title: 'Product catalogue',
        shortLabel: 'Products',
        teaser: 'Each second-hand item is its own record — condition, cost, supplier and photos included.',
        status: 'shipped',
        problem: blocks(
          'Stock lived in a notebook. Two iPhones from the same supplier were never the same object: different scratches, different faults. Treating them as quantity-on-hand would have hidden the thing the owner actually needed to see.'
        ),
        solution: blocks(
          'A product record per item: cost, selling price, type, supplier, purchase date, condition notes, thumbnail and gallery. Featured and category filters on the shop list. Quantity was deliberately left in the backlog.'
        ),
        before: [
          'Handwritten purchase notes',
          'Condition remembered, not stored',
          'No reliable photo of the actual unit',
        ],
        after: [
          'One record per unit',
          'Condition taxonomy with explanations',
          'Thumbnail and gallery on the product',
        ],
      },
      {
        title: 'Shipping and receiving',
        shortLabel: 'Shipments',
        teaser: 'Admin builds a consignment. Staff in Accra confirm it actually arrived.',
        status: 'shipped',
        problem: blocks(
          'There was no confirmation that a bought item had left the UK or arrived in Ghana. Loss in transit was invisible, and the shop could not tell customers what was actually on the floor.'
        ),
        solution: blocks(
          'Admin adds products to a shipment, records the courier and cost, then staff receive a persistent notification until they confirm receipt. Customers only see items that have been shipped and received. Sold items drop off the public list.'
        ),
        before: [
          'No shipment confirmation',
          'Stock assumed available when it was not',
          'Staff unaware a consignment was incoming',
        ],
        after: [
          'Shipment builder with save and remove',
          'Staff notification until confirmed',
          'Received / shipped / sold states on each item',
        ],
      },
      {
        title: 'Shop-floor sales',
        shortLabel: 'Sales',
        teaser: 'Staff record the negotiated price in store, with a floor of 70% and a live GHS conversion.',
        status: 'shipped',
        problem: blocks(
          'Ghana retail means negotiation. The owner would not take online checkout because the customer still had to collect in person. Sales were written down after the fact, in mixed GBP and cedi, which made the notebook totals unreliable.'
        ),
        solution: blocks(
          'Staff record the purchase against the product. The sold price cannot fall below 70% of the converted Ghana cedi value — the limit the owner set. A settings-controlled conversion rate shows GBP and GHS on the product page.'
        ),
        before: [
          'Sales written in the notebook after the fact',
          'Mixed GBP and cedi in the same page',
          'No enforced discount floor',
        ],
        after: [
          'In-store purchase form for staff',
          '70% floor on the converted price',
          'Admin-editable GBP to GHS rate',
        ],
      },
      {
        title: 'Requests and deposits',
        shortLabel: 'Requests',
        teaser: 'Customers ask for a missing model. A Stripe deposit means the buy is not a guess.',
        status: 'shipped',
        problem: blocks(
          'Requests used to be a unique selling point, then they stopped. People asked for a product, the owner bought and shipped it, and the customer changed their mind. That wasted the investment.'
        ),
        solution: blocks(
          'A request form for product, type, condition and notes, with a Stripe deposit in GBP. Admins are notified. Once the unit is found it is pulled into the main catalogue and the customer is told. Testers later called this the feature competitors did not have.'
        ),
        before: [
          'Informal requests, then abandoned',
          'Stock bought on a verbal maybe',
          'No payment until the customer arrived',
        ],
        after: [
          'Structured request form',
          'Stripe deposit on the request',
          'Acquire-and-notify flow for admin',
        ],
      },
      {
        title: 'Transactions and reports',
        shortLabel: 'Reports',
        teaser: 'Record the expenses once. The balance sheet and income statement build themselves.',
        status: 'shipped',
        problem: blocks(
          'Weekly expense notes missed rent, wages and other liabilities. The owner thought those pages were a performance view. They were not — and buying decisions followed the wrong totals.'
        ),
        solution: blocks(
          'Admin records transactions and staff wages. Reports pull sales, shipments, purchases and wages into an income statement, a balance sheet, and CanvasJS graphs for sign-ups and sales over six months. Wage windows that overlap the selected period are clipped so the liability is not double-counted.'
        ),
        before: [
          'Paper sales reports',
          'Missing rent and wages in the totals',
          'No period filter',
        ],
        after: [
          'Multi-row expense entry',
          'Generated statements for a chosen period',
          'Sales and sign-up charts',
        ],
      },
    ],
  },
  deepDives: {
    eyebrow: '04 / Design deep-dives',
    heading: 'Three problems that were not a website',
    intro:
      'The brief looked like ecommerce. The work that mattered was inventory identity, demand without waste, and numbers the owner could trust.',
    items: [
      {
        title: 'From a notebook line to one physical unit',
        shortLabel: 'Product identity',
        problem: blocks(
          'Second-hand stock cannot be SKU quantity. Two phones from the same supplier arrived with different faults. The owner already treated them as Cash Converters would — separate objects — and asked for the app to do the same.'
        ),
        contribution:
          'I interviewed the owner, watched how purchases were written down, and designed the product model around condition, supplier and photos instead of a quantity field.',
        constraints:
          'The owner was not technical, so forms needed an explanation column, including what each condition meant.\nQuantity was explicitly parked: useful later, a distraction in 2020.',
        decisions: [
          decision(
            'One row, one object',
            'A product record is a physical unit. Duplicating a listing is cheaper than hiding a scratch behind a stock count.'
          ),
          decision(
            'Condition as data, not a note in the margin',
            'A conditions table with details and explanations sits next to the form, so staff pick a type instead of inventing wording.'
          ),
          decision(
            'Photos on the unit, not the model',
            'Thumbnail plus gallery belong to that item, because the next iPhone in the same shipment will not look the same.'
          ),
        ],
        outcome: blocks(
          'Shipped. The catalogue the shop actually used was a list of unique units with shipped, received and sold states — not a warehouse quantity screen.'
        ),
      },
      {
        title: 'From abandoned requests to a deposit that holds the buy',
        shortLabel: 'Requests',
        problem: blocks(
          'Requests told the owner what was in demand, then cost him money. He stopped taking them. That also removed the signal.'
        ),
        quote: quote(
          'That would help my business so much. I think to make this one of the key priorities of this application.',
          'Project client',
          'Owner, Yande Gadgets'
        ),
        contribution:
          'End to end. I raised the deposit idea in the interviews, wired Stripe in GBP, and built the admin notify / acquire / customer-notify loop around it.',
        constraints:
          'PayPal was not a reliable live option in Ghana at the time, so the charge ran through Stripe in GBP.\nThe customer still collects in store — the deposit is a commitment, not fulfilment.',
        decisions: [
          decision(
            'Keep the request, attach money to it',
            'A deposit filters serious demand without turning the shop into a mail-order business the owner did not want.'
          ),
          decision(
            'Notify people, do not hope they refresh',
            'Admins get a NewRequestedProduct notification. When the unit is acquired, the customer is told. The old process had neither.'
          ),
          decision(
            'Pull the found item into the live catalogue',
            'A fulfilled request becomes a normal product record, so it can be shipped, received and sold on the same rails as everything else.'
          ),
        ],
        outcome: blocks(
          'Shipped and tested with a customer. In testing they flagged product requests as a feature competing shops did not offer — which is the unique selling point the owner had given up.'
        ),
      },
      {
        title: 'From a notebook total to a period the numbers can survive',
        shortLabel: 'Reports',
        problem: blocks(
          'The owner made a sales report by hand and used it to decide what to buy next. Observation showed missing expenses and arithmetic errors. He asked for a view of the last month without filling the statement in himself.'
        ),
        contribution:
          'I chose balance sheet and income statement with him, after walking through statement types. Then I had to make staff wages true when a report window cut across two wage periods.',
        constraints:
          'Wages are a daily rate with a start and end date, not a single expense line.\nThe balance sheet has to balance — if it does not, a transaction is missing, which is the point of generating it.',
        decisions: [
          decision(
            'Record transactions, generate the statement',
            'Admin enters description, type, amount and date. Rent, ads and wages stop living in a separate mental list.'
          ),
          decision(
            'Clip wage windows instead of multiplying them',
            'Four overlap cases were drawn out on paper first: enclose, sit inside, overhang left, overhang right. The report uses the intersection, not the raw wage span.'
          ),
          decision(
            'Charts for what he already watched',
            'CanvasJS line charts for six-month sales and sign-ups sit in front of the formal statements, because that is the question he asked in the interview.'
          ),
        ],
        outcome: blocks(
          'Shipped. The owner later called the report the icing on the cake: the same decisions as before, without filling the sheet in by hand.'
        ),
      },
    ],
  },
  designToCode: {
    eyebrow: '05 / Design to code',
    heading: 'Where building protected the design',
    framing: blocks(
      'Adobe XD set the Ghana-flag chrome — yellow bar, green footer, role-coloured dashboards. Laravel MVC, Blade and Bootstrap 4 were how those screens stayed honest once staff, suppliers and a Stripe charge were on the same host.'
    ),
    decisions: [
      decision(
        'Gates instead of hidden buttons',
        'NFR work said only admin ships, only staff confirm receipt, only admin sees reports. Those rules live in Laravel Gates and middleware, not in CSS. A staff login cannot open the statements by guessing a URL.'
      ),
      decision(
        'Charge the deposit where the money actually clears',
        'The request is a Ghana shop-floor idea. The payment ran through Stripe in GBP because that is what would actually take a card in 2020. Metadata on the charge keeps product, type and condition attached to the payment, not just a number.'
      ),
      decision(
        'Show both currencies, enforce one floor',
        'Selling price is stored in GBP. The product page multiplies by an admin-set rate for GHS. The 30% negotiation limit is checked against the converted value, then written back, so a cedi bargain cannot silently wipe the sterling cost.'
      ),
    ],
    stackTags: [
      'Laravel',
      'PHP',
      'MySQL',
      'Bootstrap 4',
      'Blade',
      'JavaScript',
      'CanvasJS',
      'Stripe',
      'Adobe XD',
    ],
  },
  outcomeStatus: {
    eyebrow: '06 / Outcome and status',
    heading: 'Where the product stood',
    statusSummary:
      'The 2019–20 final-year build shipped through ten iterations and was tested with the owner, a staff member, a supplier and a customer. Quantity search, receipt photos and colour-coded statement alerts were left as follow-ons.',
    whatsNext:
      'The backlog the owner agreed was quantity on products, staff photo confirmation on receipt, product search, and visual flags when a statement goes negative.',
    quotes: [
      quote(
        'This has improved the process of the business, but also, it has confirmed that my lack of investment into technology has made me fall behind in competition, if I invested into doing something like this earlier, I would have been in a better position than today. The staff members now understand their fundamental responsibility and their obligations, especially now I can see whether they have done what I have asked them to do. But overall, the business process has improved.',
        'Project client',
        'Owner, Yande Gadgets'
      ),
    ],
    evidence: [
      'Customer testing called product requests a unique selling point competitors did not have — the same request habit the owner had previously stopped.',
      'The owner described the generated report as the icing on the cake: buying decisions from statements he no longer had to fill in.',
    ],
    reflection: blocks(
      'The lesson was to treat the family shop as a real operations problem, not a portfolio storefront. Agile with the owner in the loop meant requests-and-deposits could still land as a priority once interviews proved the old version lost money. If I did it again I would add search and receipt photos before calling the shop-floor loop finished.'
    ),
  },
  liveUrl: YANDE_WALKTHROUGH_URL,
  liveNote: 'Archived student build. Walkthrough on YouTube.',
}
