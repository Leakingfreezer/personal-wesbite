/// <reference types="vite/client" />

/**
 * Environment variables the site reads (set them in .env.local — see .env.example).
 * Both are public, read-only identifiers. Never add a Sanity write token here.
 */
interface ImportMetaEnv {
  readonly VITE_SANITY_PROJECT_ID?: string
  readonly VITE_SANITY_DATASET?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
