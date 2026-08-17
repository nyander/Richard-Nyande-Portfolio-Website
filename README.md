# Richard Nyande Portfolio

Next.js rebuild of [richardnyande.co.uk](https://www.richardnyande.co.uk). Product designer / creative technologist portfolio. Sanity Studio is embedded at `/studio`.

## Sanity versions

`sanity`, `@sanity/vision`, and `next-sanity` are pinned to the **4.19 / 11.6** line because this environment runs **Node 20**. Sanity 5/6 (and `groq-js` 2 / `@sanity/ui` 4) require Node `>=22.12`. That is a platform constraint, not an arbitrary lock — bump majors only after Node is 22+.

The CMS project is Yandè Studio (`m0jxfzl3`), dataset `production`, shared with the Yandè site. This Studio only registers `caseStudy` and `archiveProject`. Yandè queries must stay `_type`-scoped; see that repo’s `docs/ARCHITECTURE.md`.
