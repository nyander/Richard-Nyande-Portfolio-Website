import { blocks, decision, fact } from '@/lib/case-study-blocks'
import type { CaseStudyCard, CaseStudyPage } from '@/lib/sanity/types'

export const COOC_SLUG = 'cooc'

export const COOC_LIVE_URL = 'https://cooc.london/'

export const COOC_CARD: CaseStudyCard = {
  _id: 'caseStudy-cooc',
  title: 'Cooc',
  slug: COOC_SLUG,
  role: 'Product Designer, UX/UI Designer, Web Developer',
  year: 2025,
  summary:
    'A Central London members club that had to become a membership system after launch — registration, approval, billing and a wallet pass — designed and wired on WordPress at Greyzip.',
  status: 'shipped',
  heroImage: null,
}

export const COOC_STUDY: CaseStudyPage = {
  _id: 'caseStudy-cooc',
  title: 'Cooc',
  slug: COOC_SLUG,
  role: 'Product Designer, UX/UI Designer, Web Developer',
  year: 2025,
  summary:
    'A Central London members club that had to become a membership system after launch — registration, approval, billing and a wallet pass — designed and wired on WordPress at Greyzip.',
  status: 'shipped',
  contextFacts: [
    fact('Client', 'Cooc, with The Mandrake'),
    fact('Type', 'Members-club site and membership system'),
    fact(
      'Stack',
      'Figma, WordPress, Divi, MemberPress, New User Approve, Zapier, Passcreator'
    ),
    fact('Team', 'Greyzip; Beth Lucas on front-end development'),
  ],
  heroImages: [],
  seoTitle: 'Cooc — Product Design & Membership Case Study | Richard Nyande',
  seoDescription:
    'Greyzip, 2024–25. Product and UX design for Cooc: a brand site that pivoted into a WordPress membership platform with approval, billing and a designed wallet pass.',
  ogImage: null,
  liveUrl: COOC_LIVE_URL,
  reframing: {
    eyebrow: 'When the brief changed',
    heading:
      'The brand site had to become a membership operation in weeks.',
    intro:
      'Cooc is a private members club in Central London, under The Mandrake. The first brief was a brand site. Weeks after that site went live, the club needed people to apply, be approved, pay, and carry a pass on their phone.',
    initialProposal: blocks(
      'A brand-focused WordPress site: look, tone and a public presence for the club. Proposal agreed May 2024. UX, branding and graphic design in July. Front-end and back-end in August. Original site live December 2024.'
    ),
    discovery: blocks(
      'In February 2025 the request changed. They needed registration, payment collection and digital Apple and Android Wallet passes for door access, without waiting on a native app. A custom membership product — the kind of thing a house like Soho House runs as its own app — would have been the longer fit. The timeline did not allow it. WordPress, with plugins that already knew members, billing and passes, was the path that could ship in weeks.'
    ),
    productResponse: blocks(
      'I designed the membership journey in Figma — options, application, approval, email, wallet pass — and the pass itself. Beth Lucas was the front-end developer. I built the WordPress membership wiring: a Divi registration form into MemberPress, New User Approve holding applications, MemberPress plans and recurring billing, Passcreator for the wallet pass, Zapier for the welcome mail and admin notice. I designed that journey inside the WordPress constraint the timeline required.'
    ),
  },
  productModules: {
    eyebrow: 'The membership loop.',
    heading: 'A club site, then the membership loop that had to hang off it.',
    intro:
      'Built at Greyzip. Brand site through December 2024. Membership platform requested February 2025 and live March 2025. Screens here are the Figma work, the journey wireframe, the comparison that decided the stack, and the pass I designed. Mario Brown on the card is test data.',
    items: [
      {
        title: 'Brand and visual system',
        shortLabel: 'Brand',
        teaser:
          'Typography, palette and collage references had to hold a hedonistic club inside a WordPress theme.',
        status: 'shipped',
        problem: blocks(
          'The club’s tone is surreal and maximal — photography, costume, collage. A default Divi layout would have read as a brochure. The registration area still had to feel like joining a house, not filling a plugin form.'
        ),
        solution: blocks(
          'SangBlue Sans for display. Palette: burnt orange, light pink, salmon red, dark green. Logo as four overlapping crescents. Mood references layered like the venue. High-fidelity frames in Figma covered heroes, memberships, account and club pages before they were built in WordPress.'
        ),
        before: [
          'A brand site scoped as look and feel',
          'Plugin forms that look like plugin forms',
        ],
        after: [
          'Type, colour and logo specified in Figma',
          'Registration treated as an initiation, not a contact block',
          'Live site at cooc.london',
        ],
      },
      {
        title: 'Membership journey',
        shortLabel: 'Journey',
        teaser:
          'Five screens from landing to a pass in the wallet — designed before MemberPress was asked to carry it.',
        status: 'shipped',
        problem: blocks(
          'Membership is not a page. Someone has to pick a tier, apply, wait, pay, and then have something to show at the door. If that path only lived in the developers’ heads, WordPress would assemble the plugins in the wrong order.'
        ),
        solution: blocks(
          'A wireframe flow: Membership Options on the landing page, three tiers, the application form, internal approve or deny, a confirmation mail with a pass link, then the card stored in Apple or Android Wallet. Figma also explored account, merchandise and room layouts that WordPress would not fully become.'
        ),
        before: [
          'A live brand site with no join loop',
          'Door access as a later problem',
        ],
        after: [
          'Mapped path from options to wallet',
          'Approval as a named step, not an inbox',
          'Room-booking frames left as exploration, not a shipped module',
        ],
      },
      {
        title: 'Registration and approval',
        shortLabel: 'Approval',
        teaser:
          'A Divi form into MemberPress, held by New User Approve until someone on the inside says yes.',
        status: 'shipped',
        problem: blocks(
          'Anyone can submit a form. A members club cannot let that submission become a paying member on its own. The office had to see applications and approve or refuse them before billing started.'
        ),
        solution: blocks(
          'Members register through a custom-designed Divi form. MemberPress captures the submission. New User Approve holds it in review. An admin signs the person off, or they do not join.'
        ),
        before: [
          'A public site with no application gate',
          'No named hold between form and member',
        ],
        after: [
          'Divi form as the application',
          'MemberPress as the member record',
          'New User Approve as the hold',
        ],
      },
      {
        title: 'Plans and billing',
        shortLabel: 'Billing',
        teaser:
          'Once approved, MemberPress enrols the member on their plan and runs recurring billing.',
        status: 'shipped',
        problem: blocks(
          'Tiers existed in the design — including an Over 33 member type on the pass. Without a plan on the member record, approval is only a yes, and the door still has nothing to check against.'
        ),
        solution: blocks(
          'Approved members are auto-enrolled on their MemberPress plan — standard, inner circle, or otherwise — with recurring billing on that plan. The pass later reads the member type from that record.'
        ),
        before: [
          'Tiers as marketing copy',
          'Payment as a later conversation',
        ],
        after: [
          'Plan assignment on approval',
          'Recurring billing in MemberPress',
          'Member type available to the pass',
        ],
      },
      {
        title: 'Digital membership pass',
        shortLabel: 'Pass',
        teaser:
          'I designed the wallet card. Passcreator issues it. The QR is what the door can scan.',
        status: 'shipped',
        problem: blocks(
          'A native app would have been the membership card. They needed something people already carry: Apple Wallet and Google Wallet. The pass still had to look like Cooc, not like a default Passcreator template.'
        ),
        solution: blocks(
          'A portrait pass: Cooc mark, member type, name, status, email, QR and member ID. Passcreator generates the wallet file. Zapier sends the download link in the welcome mail. Mario Brown / mario.brown@test.co.uk on the still is test data, not a member.'
        ),
        before: [
          'No digital ID for the door',
          'A default wallet pass if we had skipped the design',
        ],
        after: [
          'Designed Cooc pass in Figma',
          'Passcreator as the issuer',
          'QR and member ID on the card',
        ],
      },
      {
        title: 'Club operations WordPress cannot hold',
        shortLabel: 'Limits',
        outcomeLabel: 'Full club operations',
        teaser:
          'Attendance, member messaging, behaviour history and SevenRooms were named as missing — not as screens I am showing.',
        status: 'concept',
        problem: blocks(
          'Once the club is a membership product, the next questions are who came, who they can message, what they did, and whether bookings in SevenRooms show up in the same place. WordPress with these plugins does not give those surfaces.'
        ),
        solution: blocks(
          'I compared a custom app with WordPress on flexibility, UX, scale, performance, speed, cost, CMS and security, and shipped WordPress because speed and the existing CMS won the February window. The gaps stay listed. They are not filled with empty laptop frames.'
        ),
        before: [
          'A membership loop that can launch',
          'No attendance, in-platform chat, member analytics, or SevenRooms API',
        ],
        after: [
          'Trade-offs written down rather than hidden',
          'Custom app named as the longer product, not this release',
        ],
      },
    ],
  },
  deepDives: {
    eyebrow: '04 / Deep dives',
    heading: 'What the March deadline forced us to decide',
    intro:
      'The brief looked like WordPress. The work that mattered was the pivot, the stack choice, and a join path that ended in a pass people could hold.',
    items: [
      {
        title: 'From a live brand site to a membership system in weeks',
        shortLabel: 'The pivot',
        problem: blocks(
          'The original site went live in December 2024 as a brand presence. In February 2025 the club asked for registration, payment and Apple Wallet passes. A native app or an ERP-style dashboard would have been the scale answer. They needed something that could be live in March.'
        ),
        contribution:
          'I already had the UX, branding and graphic design from July, and the site in WordPress from August. The February work was a front-end redesign plus MemberPress, Zapier and Passcreator — joining tools the CMS could already run, on a journey I had drawn.',
        constraints:
          'Original website live December 2024.\nMembership platform requested February 2025 and live March 2025.\nBeth Lucas on front-end development.\nDo not wait on a custom app.\nDoor access had to be a wallet pass, not a new download from an app store.',
        decisions: [
          decision(
            'Keep WordPress, add the membership loop',
            'The brand site was already the public face. Rebuilding it as Laravel would have missed March. MemberPress, New User Approve, Zapier and Passcreator sat on the stack that was already live.'
          ),
          decision(
            'Design the pass',
            'Passcreator issues the file. The layout — mark, member type, identity, QR, ID — is the Figma card. Test member on the still is Mario Brown.'
          ),
          decision(
            'Treat approval as operations',
            'New User Approve holds the application. Zapier tells admins. Billing starts after the yes.'
          ),
        ],
        outcome: blocks(
          'Membership platform live March 2025 at cooc.london. Brand site and membership loop on the same WordPress install.'
        ),
      },
      {
        title: 'From a custom club app to WordPress on purpose',
        shortLabel: 'App vs WP',
        problem: blocks(
          'A custom app would have given control over UX, workflows, scale and APIs. WordPress is limited to what plugins allow, can bloat, and makes SevenRooms and CRM joins harder. The February brief still had to launch.'
        ),
        contribution:
          'I wrote the comparison as a design artefact: flexibility, UX, scalability, performance, speed of development, cost now and later, admin, security. WordPress won on speed, CMS and upfront cost. The custom app won on almost everything the club would want next. We shipped WordPress, with those losses listed.',
        constraints:
          'Launch window was weeks, not a product cycle.\nWordPress and Divi were already the live site.\nA custom app was the longer ambition, not this sprint.\nDo not pretend plugins are an API layer.',
        decisions: [
          decision(
            'Choose speed for March, write down what you lose',
            'WordPress plus themes and plugins is faster for an MVP. Flexibility, mobile UX, scale and third-party APIs stay on the custom-app side of the table.'
          ),
          decision(
            'Use the CMS you already have for content and members',
            'Pages, media and forms were already in WordPress. MemberPress sits in that admin. A custom CMS would have been another product to train.'
          ),
          decision(
            'Keep this release to the join path',
            'Event attendance, in-platform messaging, member behaviour history and a direct SevenRooms API stay for a later custom app.'
          ),
        ],
        outcome: blocks(
          'WordPress shipped. The comparison table is in this study so the choice is visible, including what it could not do.'
        ),
      },
      {
        title: 'From a form fill to a pass in the wallet',
        shortLabel: 'UX to door',
        problem: blocks(
          'If the join path is only plugins in a row, the member meets a Divi form, an email, and a generic pass. The club asked for something that still felt like Cooc at the door.'
        ),
        contribution:
          'I wireframed the five-step journey and designed the card. The Figma board also holds membership tiers, registration, account and club pages — including room layouts that did not become a booking engine. The shipped path is the one on the wireframe: options, form, approval, mail, wallet.',
        constraints:
          'Wallet files come from Passcreator, not from a native app I built.\nApple and Android Wallet are the clients, not a Cooc app.\nRoom-booking wireframes are exploration.\nTest data on the card still, not a live member screenshot.',
        decisions: [
          decision(
            'Draw the whole loop before wiring plugins',
            'Membership Options, three tiers, application, approve or deny, mail with a link, pass in the wallet. MemberPress and Zapier then had a sequence to follow.'
          ),
          decision(
            'Make the registration area a ritual in the UI',
            'The form is still a Divi form. The surrounding design had to read as joining, so the plugin did not set the tone.'
          ),
          decision(
            'Put identity on the pass, not only in wp-admin',
            'Member type, name, status, email, QR and ID are the door artefact. The CMS record is not what the host sees.'
          ),
        ],
        outcome: blocks(
          'Shipped as the WordPress loop plus a designed Passcreator card. The wireframe is the UX record. The Figma board is the wider product thinking that WordPress only partly absorbed.'
        ),
      },
    ],
  },
  designToCode: {
    eyebrow: '05 / Design to code',
    heading: 'Where the design had to survive the plugins',
    framing: blocks(
      'Figma held the brand, the pages and the pass. WordPress, Divi and MemberPress were how those frames became a live club site. Zapier and Passcreator were how approval became a mail and a wallet file. I designed the system and wired it; Beth Lucas built front-end. The stack is the one that could ship in March.'
    ),
    decisions: [
      decision(
        'Hold applications in the CMS, not in an inbox',
        'Divi writes to MemberPress. New User Approve is the gate. Billing does not start on submit.'
      ),
      decision(
        'Let Zapier carry the pass link',
        'Welcome mail with a download link, and a notice to admins on approval. That is operations visibility without a custom notification service.'
      ),
      decision(
        'Design the wallet card as a product surface',
        'Passcreator issues it. The Cooc layout is mine. Test member on the still is labelled as test data.'
      ),
    ],
    stackTags: [
      'Figma',
      'WordPress',
      'Divi',
      'MemberPress',
      'New User Approve',
      'Zapier',
      'Passcreator',
      'Apple Wallet',
      'Google Wallet',
    ],
  },
  outcomeStatus: {
    eyebrow: '06 / Outcome and status',
    heading: 'Where the product stands',
    statusSummary:
      'The brand site launched in December 2024. Three months later, COOC had moved from a promotional website into an operational membership service, covering application, approval, billing and digital member access. The launch used WordPress and existing services rather than the custom club app originally explored, allowing the team to meet the March 2025 opening window.',
    statusLabels: {
      concept: 'Out of scope',
    },
    whatsNextHeading: 'Product boundary',
    whatsNext:
      'The shipped service covered acquisition and member access, not full club operations. Attendance, messaging, member history, analytics and a direct SevenRooms integration remained outside the launch scope. If those became operational priorities, I would reassess the service architecture rather than continuing to extend the plugin stack.',
    quotes: [],
    evidence: [
      'Shipped: brand site and membership journey covering application, approval, billing and digital pass.',
      'Observed in 2026: COOC continues to operate an online membership service, including active membership tiers, applications, payments and digital-pass support.',
      'Design evidence: Figma journey covering membership options, application, approval, welcome communication and wallet pass.',
      'Launch architecture: WordPress with Divi, MemberPress, New User Approve, Zapier and Passcreator, chosen to meet the launch window rather than delaying for a custom application.',
    ],
    evidenceBoundary:
      'Post-launch analytics and member behaviour were not available to me after handover, so I do not attribute conversion, retention or operational-efficiency figures to the work.',
    reflection: blocks(
      'The constraint was not something I would remove in hindsight. With the same February-to-March deadline, I would still ship WordPress. It gave COOC the membership capability it needed without waiting for a larger custom product. The important distinction is knowing where that solution should stop scaling.'
    ),
  },
}
