'use client'

// Sanity is pinned to 4.19 (with next-sanity 11.6 and @sanity/vision 4.19)
// because this machine runs Node 20. Sanity 5/6 and their transitive deps
// (groq-js 2, @sanity/ui 4) declare engines.node >= 22.12. Revisit the pin
// when Node is 22+; do not bump majors on Node 20.

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './lib/sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'richard-nyande-portfolio',
  title: 'Richard Nyande Portfolio',
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
