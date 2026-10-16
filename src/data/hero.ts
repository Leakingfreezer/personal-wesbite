/**
 * HERO VISUAL — the metallic star tin and the stickers sitting inside it.
 *
 * To change the hero:
 *   • Swap the tin image        → change `base.src` (and `alt`).
 *   • Use one flattened image   → change `base.src`, set `layers: []`, remove `knob`.
 *   • Move/replace a sticker    → edit its entry in `layers`.
 *
 * All positions are percentages of the tin's box (523 × 716 in Figma),
 * so the whole composition scales together at every screen size.
 */

/** A rectangle in % of the hero box. */
export interface Box {
  left: number
  top: number
  width: number
  height: number
}

export interface HeroLayer {
  src: string
  box: Box
  /** Rotation in degrees (clockwise is positive). */
  rotate?: number
  /** If the image is cropped inside its box, the image's own size/offset in % of the box. */
  crop?: Box
  /** Soft drop shadow that follows the sticker's outline. */
  shadow?: boolean
}

export interface HeroVisual {
  base: {
    src: string
    /** Describes the whole composition (stickers are decorative). */
    alt: string
    /** Width / height of the hero box. */
    aspectRatio: string
    crop?: Box
  }
  /** Small enamel knob on the lid. */
  knob?: { left: number; top: number; width: number }
  /** Drawn in order — later entries sit on top. */
  layers: HeroLayer[]
}

export const heroVisual: HeroVisual = {
  base: {
    src: '/assets/hero/star-tin.webp',
    alt: 'An open metallic star-shaped tin holding stickers, an enamel pin and a circuit board',
    aspectRatio: '523 / 716',
    crop: { left: -21.99, top: -13.97, width: 140.73, height: 128.49 },
  },
  knob: { left: 41.82, top: 31.14, width: 2.86 },
  layers: [
    { src: '/assets/hero/sticker-blocks.webp', box: { left: 21.41, top: 51.58, width: 26.66, height: 22.6 } },
    {
      src: '/assets/hero/sticker-badge-backing.svg',
      box: { left: 24.31, top: 66.46, width: 10.89, height: 7.95 },
      rotate: -6.12,
    },
    {
      src: '/assets/hero/sticker-badge.webp',
      box: { left: 21.41, top: 64.67, width: 16.88, height: 12.33 },
      rotate: -6.12,
    },
    {
      src: '/assets/hero/sticker-letter.webp',
      box: { left: 40.74, top: 56.23, width: 14.69, height: 10.73 },
      shadow: true,
    },
    {
      src: '/assets/hero/sticker-board.webp',
      box: { left: 53.54, top: 62.85, width: 21.99, height: 16.06 },
      shadow: true,
    },
    {
      src: '/assets/hero/sticker-pin.webp',
      box: { left: 59.81, top: 51.26, width: 12.88, height: 11.37 },
      crop: { left: 0, top: 0, width: 127.13, height: 100 },
      shadow: true,
    },
  ],
}
