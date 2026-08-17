# Palm Dashboard — case study content

Approved content for the `caseStudy` document type. Field names match the schema
in the scaffolding pass. Copy is final unless marked `[NEEDS RICHARD]`.

**Accuracy rules for whoever loads this:** do not embellish, do not add metrics,
do not invent quotes. Everything here is either verified or explicitly flagged.

---

## Hero

**title**
Palm Dashboard

**slug**
`palm-dashboard`

**role**
Product Designer, Full Stack Developer

**year**
2025

**summary**
A multi-tenant PR workspace that brought campaign planning, coverage tracking and
performance reporting into one place for teams and clients.

**status** (document root)
`in-progress`

Rationale: four modules shipped, two partly built. `shipped` at document root would
overstate it.

**featured**
`true`

**order**
`0`

**heroImages**
Asymmetric grid. Real screenshots available:

| Image | provenance | alt |
|---|---|---|
| Client dashboard, metrics tab | `test-data` | Palm Dashboard metrics view showing pillar scorecards for a test client |
| Objectives list view | `test-data` | Objectives table listing campaigns with dates and approval status |
| Objective detail, timeline view | `test-data` | Campaign timeline showing tactics, activities and timeplans across weeks |
| KPI criteria settings | `test-data` | KPI settings screen showing media types with global and client-specific scope tags |

All current screenshots use the Hyatt Regency London test client. Tag every one as
`test-data`, not `actual`.

**contextFacts**

| label | value |
|---|---|
| Client | Palm PR |
| Type | Multi-tenant SaaS workspace |
| Stack | Laravel, Inertia + React, MySQL |
| Team | Sole designer and developer |

---

## Reframing the brief

**Eyebrow:** Going beyond reporting
**Heading:** Connecting the work behind PR performance.

**Intro** (shortened — the original repeated what the three columns say)
Palm started as a request to improve reporting. What we found underneath it was a
bigger operational problem.

**reframing.initialProposal**
Bring performance data into one place for clearer client reporting.

**reframing.discovery**
Campaign planning, coverage tracking and reporting were spread across spreadsheets,
documents and disconnected tools, creating repetitive work and limited visibility.

**reframing.productResponse**
Replace the fragmented process with one connected workspace.

---

## Product modules

Six modules. Heading: **The work happened everywhere.** Eyebrow: **Mapping the reality.**

A static strip of six pills sits above the accordion for scanners.

### 1. Client onboarding — `shipped`

**teaser**
Client setup moved from scattered documents into one structured flow.

**problem**
Client information lived across Word documents, emails and internal notes, so the
team re-entered the same details at every stage. This created inconsistent client
context and duplicated admin.

**solution**
A structured onboarding flow centralising client information, finance details and
PR tracking configuration, including keywords and brand terms.

**before**
- Brief documents
- Excel spreadsheets
- Finance information held separately
- Internal setup notes

**after**
- Three-step onboarding flow
- Client information structure
- Finance and contact setup
- Keyword and brand-term configuration

### 2. Objectives and strategy — `shipped`

**teaser**
Goals, KPIs and activity connected in one workspace.

**problem**
Objectives, KPIs and campaign strategy were documented separately from the day-to-day
work of running a campaign. This made it harder to keep activity connected to the
original client goals, and meant strategic decisions could drift from planning and
coverage activity.

**solution**
An objectives and strategy area connecting campaign goals, KPI targets, tactics,
activities and timeplans into the same workspace as planning and coverage.

**before**
- Strategy documents
- KPI spreadsheets
- Client objective documents
- Manual progress tracking

**after**
- Objectives structure
- KPI target mapping
- Tactic to activity to timeplan flow
- Coverage linked back to objectives

**note**
Reporting integration was identified as a next step. The core objective-to-planning
and objective-to-coverage relationships were established first.

### 3. Customer profiling — `shipped`

**teaser**
Audience insight restructured into scannable profile cards.

**problem**
Customer information was available but hard to navigate. Audience details, behaviours,
pain points and messaging were often grouped together without clear structure, making
it difficult to understand segments or find insight during planning.

**solution**
A dedicated customer profiling module separating customer information into clearer
profile cards and structured fields, making audience insight easier to scan and
reference during campaign planning.

**before**
- Clustered audience notes
- Unstructured customer information
- Persona documents
- Client briefing notes

**after**
- Customer profile cards
- Structured audience fields
- Profile creation and editing flow
- Scan-friendly layout

**note**
Filtering and deeper links into planning were identified as future improvements.
Do not describe filtering as built.

### 4. Coverage tracking — `shipped`

**teaser**
Automated discovery replaced manual link-chasing.

**problem**
The team relied on a third-party tool that emailed every article matching agreed
client keywords, landing in the same inbox used for the rest of the business. Most
returned articles were not relevant, so every mention had to be read and filtered
manually before anyone could act on it. Coverage records became inconsistent and
relevant links could be missed.

**solution**
A keyword-driven coverage tracking workflow using automated Google News search via
ScrapingBee. Relevant client and keyword mentions are brought into a review space
where the team can approve, reject, classify and organise coverage before connecting
approved articles to KPI points and brand-awareness scoring.

**before**
- Separate media monitoring platform
- Manual article review by email
- Coverage links saved across documents
- Keyword mentions missed or duplicated

**after**
- Automated coverage discovery
- Pending / approved / rejected workflow
- Media type, tier and category taxonomy
- KPI-linked approval workflow

**note**
Strongest module. Give it visual weight.

### 5. Performance analysis — `in-progress`

**teaser**
GA, Search Console and SEMrush brought into pillar scorecards.

**problem**
Performance data lived across multiple platforms including analytics, search and SEO
tools. The team had to gather and interpret data manually before turning it into a
client update. The challenge was not only bringing data into one place, but making it
easier to understand what changed and why it mattered.

**solution**
A metrics area bringing GA, Search Console, SEMrush and coverage data into
pillar-based scorecards. The active Brand Awareness pillar connects search visibility,
coverage and scoring logic into a clearer performance view. Additional metric pillars
are structured as future areas.

**before**
- Google Analytics
- Google Search Console
- SEMrush
- Manual reporting spreadsheets

**after**
- Metrics area structure
- Pillar-based scorecards
- Brand Awareness scoring
- Coming-soon metric pillars

**note**
Do not say "one unified dashboard" — not fully true. Say the product created a
metrics area and scorecard structure.

### 6. Coverage reporting — `in-progress`

**teaser**
Approved coverage exports as branded, client-ready output.

**problem**
Turning coverage activity into branded client-facing materials was manual. Because
coverage information came from different places, the process was repetitive and
inconsistent, especially when preparing article summaries, exports or
presentation-ready outputs.

**solution**
A coverage reporting workflow allowing approved coverage to be turned into branded,
presentation-ready exports. The live flow supported individual article exports.
Broader period-based coverage reports were explored as part of the product direction.

**before**
- Manual report documents
- Presentation decks
- Copied screenshots
- Manually formatted article summaries

**after**
- Approved coverage records
- Branded article export flow
- PDF / PPTX article output
- Period-reporting concept

**note**
Call this "coverage reporting", not "client reporting". Do not claim it connected
objectives, analytics and narrative.

---

## Design deep-dives

Eyebrow: **04 / Design deep-dives**
Heading: **Inside three decisions that shaped the product**

Intro: Three areas where the workflow model became a real interface. Each one covers
the problem as the team experienced it, the decisions I made and why, and what shipped.

Three deep dives, stacked as full sections with a jump menu. No status field on
`deepDive` per the schema.

### Deep dive 01 — Objectives and strategy

**title**
From scattered documents to one connected timeline

**problem**
Objectives, tactics and timelines lived in templates rebuilt from scratch for every
client, split across documents and spreadsheets.

**quote**
"It was the longest process on the team, time better spent generating income than
duplicating paperwork."
— Charley, Palm PR

`[NEEDS RICHARD]` Confirm Charley's exact wording and role title. This quote is
paraphrased from an earlier draft and should be verified before publishing.

**contribution**
Product designer, working from Palm's existing four-layer structure — objective,
tactic, activity, timeplan — rather than inventing a new one.

**constraints**
- Users were largely non-technical, so navigation had to stay familiar
- Terminology from existing client documents had to carry over so onboarding did not
  require retraining

**decisions**
1. **Two views, one data model** — A nested list for detail work and an auto-generated
   timeline for overview, rather than forcing one view to do both jobs.
2. **Colour by layer, not by status** — Tactic, activity and timeplan each hold a fixed
   colour so hierarchy reads at a glance, deliberately kept separate from status or
   priority coding.
3. **Automate the schedule, not the thinking** — The system builds the visual timeline
   from entered activities. What to plan stays a human decision.

**beforeAfterPair**
`[NEEDS RICHARD]` Unresolved. The real design artifact was a paper sketch. Two honest
options, pick one:
- Photograph the paper sketch and caption it as initial exploration
- Omit the design artifact entirely and add: "Designed directly through iteration in
  code rather than in Figma first, a deliberate trade-off given the timeline."

Do NOT produce a Figma reconstruction after the fact.

After image is available: objective detail view with timeline showing tactic →
activity → timeplan hierarchy across weeks. Tag `test-data`.

**outcome**
Shipped and in active use. Internal feedback credited the timeline automation
specifically with removing a task that used to take around an hour per client.

`[NEEDS RICHARD]` Earlier drafts said "two days per client", your later correction
said "an hour". Using an hour — confirm which is accurate.

### Deep dive 02 — Coverage tracking

**title**
From a flooded inbox to a filtered review queue

**problem**
The team relied on a third-party tool that emailed every article matching agreed
client keywords, landing in the same inbox used for the rest of the business. Most
returned articles were not relevant, so every mention had to be read and filtered out
of a crowded inbox before anyone could act on it.

**quote**
`[NEEDS RICHARD]` No verified quote for this section. Charlotte's quote (in Outcome)
covers coverage tracking and could move here instead, or this section runs without one.

**contribution**
End to end. I interviewed staff and managers and shadowed them running the existing
process, then defined requirements, researched the filtering approach, and built the
backend and frontend. The team tested the new workflow and signed it off before rollout.

**constraints**
- Detection quality depends on what the scraping and keyword scope can reliably catch,
  so the interface had to make uncertainty visible rather than imply perfect coverage
- Volume meant triage speed mattered as much as detail

**decisions**
1. **Pull, don't wait for email** — Daily scraping via ScrapingBee replaced the
   inbound-email model, moving discovery into a dedicated review space instead of a
   personal inbox.
2. **Filter before it reaches a person** — The hardest part of the project was working
   out how to separate relevant from irrelevant matches before they reached the team,
   based on what shadowing revealed about how staff actually judged relevance.
3. **Queue, not inbox** — Coverage lands in a pending state for approval. A person
   still makes the final call, but starts from a filtered set rather than a flooded one.

**beforeAfterPair**
`[NEEDS RICHARD]` No before-state screenshot exists. The before was a third-party
tool's email digest. Options: describe it in the caption without an image, or create a
clearly-labelled representative illustration tagged `representative`.

After image: coverage review queue. `[NEEDS RICHARD]` Not yet supplied.

**outcome**
Shipped, tested with the team, and approved before rollout.

### Deep dive 03 — KPI criteria

**title**
From bespoke documents to one scoring structure

**problem**
Each client's scoring criteria for coverage lived in separate Word files and
spreadsheets, rebuilt and cross-checked by hand.

**quote**
"Something simple, easy to manage, that doesn't need cross-checking five documents."
— Palm PR team member

`[NEEDS RICHARD]` Attribution is vague. Confirm who said this, or drop the quote.

**contribution**
Product designer, translating a document structure the team already trusted into a
reusable in-app system.

**constraints**
- Criteria genuinely differ by client, so the system needed real flexibility, not a
  fixed template
- Had to mirror existing document logic closely enough that onboarding required no
  retraining

**decisions**
1. **Global template, client override** — Global KPI criteria act as a starting point;
   client-specific criteria override only what differs, avoiding full duplication per
   client.
2. **Tabs mirror the source documents** — Media types, tiers, categories and titles map
   directly onto the sections PR staff already used, so the mental model transferred.
3. **Visibility tags over separate screens** — Global versus client-specific is shown as
   an inline tag rather than a separate area, keeping everything in one table.

**beforeAfterPair**
Before: `[NEEDS RICHARD]` NDA prevents showing real internal documents. Either omit, or
build a clearly-labelled representative recreation with fake client data, tagged
`representative`.

After: KPI criteria settings screen showing the media types table with Global scope
tags and tabbed navigation. Available. Tag `test-data`.

**outcome**
Shipped. Onboarding new clients into the KPI system was noticeably faster than
onboarding them into the original document-based process, based on how quickly staff
picked it up.

Note: deliberately phrased as an observed comparison, not a measured metric. Do not
convert this into a percentage or a hard number.

---

## Design to code

Eyebrow: **05 / Design to code**
Heading: **Where building protected the design**

**framing**
Most product designers can't build. Most developers don't think in interaction and
hierarchy. On Coverage Tracking I owned both sides, so a handful of decisions were
shaped by how the system actually behaved, not lost somewhere in a handoff.

**decisions** (vertical stacked list, not a card grid — copy is explanatory and needs room)

1. **Finding coverage without slowing the team down**
   Coverage Tracking scans the web daily for articles that mention a client's agreed
   keywords, brand names, products or topics. Because that scan runs against an
   external search service, it can take time, so it runs in the background rather than
   making anyone wait. The team can keep working while a scan is running, and check
   back once results are ready to review. This replaced a process where staff had to
   manually search for and read through mentions one at a time.

2. **Handling scans that stall**
   External scans can occasionally fail or take longer than expected, often due to
   caching issues or stale results from the search service. To keep the process
   reliable, we built in a visible scan status and a cancel action, so the team can see
   what's happening and step in if a scan gets stuck, rather than being left waiting
   with no explanation.

3. **Scoring coverage against each client, not the article itself**
   An article's value isn't fixed, it depends on which client and which objective it's
   being measured against. So instead of scoring the article on its own, the score is
   tied to the specific client relationship. That decision directly shaped the review
   screen: when staff approve a piece of coverage, they're scoring what it's worth to
   that client, not giving the article a single, generic rating.

**figmaImage**
Figma design of the Brand Awareness Score modal, Digital Search Reach tab, with review
annotations. Tag `actual` (this is a real design artifact).

**shippedImage**
Live app, Brand Awareness Score modal, Digital Search Reach tab. Tag `test-data`.

**caption**
Shown with a test client before full data population. Score ranges, subcomponent
breakdown and tab structure carried through unchanged from Figma to build.

Important: pair matching states. Do not pair the fully-populated Figma overview against
the empty app card — it reads as "designed a rich thing, shipped an empty shell." Match
the Digital Search Reach tab against the Digital Search Reach tab.

**stackTags**
Laravel, Inertia + React, MySQL, ScrapingBee, Tailwind

---

## Outcome and status

Eyebrow: **06 / Outcome and status**
Heading: **Where the product stands**

**statusSummary**
Four core modules are shipped and in active use. Performance analysis and coverage
reporting have their core structure built, with further metric pillars still in
progress.

Status tags to render:
- Shipped: Onboarding, Objectives & strategy, Customer profiling, Coverage tracking
- In progress: Performance analysis, Coverage reporting

**quotes** (attributedQuote array — first names only, deliberate privacy choice)

1. "This is going to reposition Palm into the front-row leaders of PR tracking. We have
   an application that not only helps the client understand performance but also allows
   them to see their fallback and how they could improve and leverage their current
   keywords."
   — Emily, Founder, Palm PR

2. "This has made the onboarding process a lot easier, and the fact that we can have
   this all manageable in a single document is amazing. Before, when we made one update,
   we would have to make it in different documents, which made the process so long. This
   automates and speeds things up so much more."
   — Hannah, Account Executive, Palm PR

3. "The KPI Management really helps us identify and manage articles much more quickly,
   and the fact that all the articles found are in one place is great. Not to mention
   the fact that we can upload our own as well."
   — Charlotte, Account Director, Palm PR

**evidence** (plain strings)
- Building an Excel timeline manually took around an hour per client. That step was
  removed entirely once the timeline was generated automatically from entered activity.
- Word document use was reduced across onboarding and reporting, cutting time
  previously spent re-entering the same information into separate templates.

**whatsNext**
The next step identified was using an LLM to compare incoming articles against a
client's keywords and KPI criteria automatically, reducing manual filtering further.

Keep this to one direction. Do not let it grow into a feature roadmap.

**reflection**
The biggest lesson was underestimating how much time data retrieval would take,
working out how to extract and structure the analytics data properly, and building the
right formulas around it. That slowed the original plan more than expected. If I did
this again, I'd also want a larger tech team from earlier on, so development work could
be delegated and I could spend more time focused on UX and UI rather than splitting
attention across both.

---

## SEO

**seoTitle**
Palm Dashboard — Product Design & Build Case Study | Richard Nyande

**seoDescription**
A multi-tenant PR workspace bringing campaign planning, coverage tracking and
performance reporting into one place. Product design and full-stack build for Palm PR.

**ogImage**
Client dashboard metrics view. Tag `test-data`.

---

## Open items before publishing

1. Charley's quote wording and role title — verify
2. Timeline saving: an hour or two days per client — confirm which
3. Deep dive 01 before-state: photograph the paper sketch, or use the honest
   "designed in code" note. No Figma reconstruction.
4. Deep dive 02: no before image, no verified quote
5. Deep dive 03: quote attribution vague; before-state blocked by NDA
6. Coverage review queue screenshot not yet supplied
7. Richard's own visual identity — type, colour, spacing — not yet decided. All
   mockups so far used Palm's client branding, which is theirs, not his.
