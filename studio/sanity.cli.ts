import { defineCliConfig } from 'sanity/cli'

/** Settings for the `sanity` command line (npm run dev / build / deploy). Values come from studio/.env. */
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
})
