import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio')
    .items([
      S.listItem()
        .title('Case Studies')
        .schemaType('caseStudy')
        .child(S.documentTypeList('caseStudy').title('Case Studies')),
      S.listItem()
        .title('Archive')
        .schemaType('archiveProject')
        .child(S.documentTypeList('archiveProject').title('Archive')),
    ])
