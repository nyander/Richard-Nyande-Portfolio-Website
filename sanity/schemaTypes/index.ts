import type { SchemaTypeDefinition } from 'sanity'

import { archiveProject } from './documents/archiveProject'
import { caseStudy } from './documents/caseStudy'
import { altImage } from './objects/altImage'
import { attributedQuote } from './objects/attributedQuote'
import { beforeAfterPair } from './objects/beforeAfterPair'
import { contextFact } from './objects/contextFact'
import { decisionItem } from './objects/decisionItem'
import { deepDive } from './objects/deepDive'
import { deepDivesSection } from './objects/deepDivesSection'
import { designToCode } from './objects/designToCode'
import { outcomeStatus } from './objects/outcomeStatus'
import { productModule } from './objects/productModule'
import { productModulesSection } from './objects/productModulesSection'
import { reframing } from './objects/reframing'
import { restrictedPortableText } from './objects/restrictedPortableText'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    caseStudy,
    archiveProject,
    altImage,
    attributedQuote,
    beforeAfterPair,
    contextFact,
    decisionItem,
    deepDive,
    deepDivesSection,
    designToCode,
    outcomeStatus,
    productModule,
    productModulesSection,
    reframing,
    restrictedPortableText,
  ],
}
