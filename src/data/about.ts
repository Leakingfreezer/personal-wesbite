/**
 * ABOUT VISUAL — the overlapping photo cards beside your introduction.
 * (The introduction text itself lives in src/data/site.ts → about.)
 *
 * To change a photo:
 *   • Drop the file in /public/assets/about/ and set its `src` (and a real `alt`).
 *   • Leave `src` out to show a labelled grey placeholder instead.
 * To move/resize a card: edit its `box` (percentages of the whole arrangement).
 * To add a card: add another entry — later entries sit on top.
 */
import type { Box } from './hero'

export interface LayeredImage {
  /** Path inside /public. Omit while you don't have the photo yet. */
  src?: string
  alt: string
  /** Position and size in % of the arrangement's box. */
  box: Box
  /** Tilt in degrees (clockwise is positive). Keep it small. */
  rotate?: number
  /** Shown on the placeholder so you know which slot is which. */
  placeholderLabel: string
}

export interface LayeredImageSet {
  /** Width / height of the whole arrangement — keeps the layout from shifting while photos load. */
  aspectRatio: string
  images: LayeredImage[]
}

/** Proportions taken from the wireframe (big card top-right, small card overlapping bottom-left). */
export const aboutVisual: LayeredImageSet = {
  aspectRatio: '10 / 9',
  images: [
    {
      alt: '',
      box: { left: 18, top: 2, width: 80, height: 82 },
      rotate: 2,
      placeholderLabel: 'Photo 1 — large',
    },
    {
      alt: '',
      box: { left: 2, top: 56, width: 38, height: 42 },
      rotate: -4,
      placeholderLabel: 'Photo 2 — small',
    },
  ],
}
