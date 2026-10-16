import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

/**
 * SANITY STUDIO SETTINGS.
 * The project ID and dataset come from studio/.env (see studio/.env.example), so nothing
 * account-specific is hard-coded here.
 */
export default defineConfig({
  name: 'default',
  title: 'Irene D. — Portfolio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    // The main editing screen: lists of Projects, Tech stack folders and Record players.
    structureTool(),
    // The "Vision" tab: try GROQ queries and see what the website will receive.
    visionTool(),
  ],

  schema: { types: schemaTypes },
})
