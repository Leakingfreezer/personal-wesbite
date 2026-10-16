import type { CardSize } from '../../types/project'

/**
 * CARD SIZE → GRID PLACEMENT. Change these to change how big each card size is.
 * Applies to project cards and widgets alike.
 *
 * Tablet and up: a 24-column grid (see ProjectGrid.tsx). 24 splits into both eighths
 * (⅜ + ⅝) and thirds (⅓ + ⅔), so both kinds of row below add up exactly.
 * Row height scales with the screen (--spacing-grid-row in globals.css).
 * Rows are split in half, so row spans count half rows:
 *   small  → 9 of 24 columns (⅜),  1 row        large → 15 of 24 columns (⅝), 2 rows
 *   medium → 8 of 24 columns (⅓),  1.5 rows     wide  → 16 of 24 columns (⅔), 1.5 rows
 * Pair a `large` with two smalls (15 + 9 = 24), and a `wide` with a `medium` (16 + 8 = 24).
 *
 * Phones: one column, and every card gets its own shape (aspect ratio) instead.
 *
 * Tailwind only sees class names written out in full, so keep each string complete.
 */
export const gridSpanClasses: Record<CardSize, string> = {
  small: 'aspect-5/4 md:col-span-9 md:row-span-2 md:aspect-auto',
  // No fixed shape: the record player sizes itself around its record (see AudioPlayerWidget).
  medium: 'md:col-span-8 md:row-span-3',
  large: 'aspect-4/3 md:col-span-15 md:row-span-4 md:aspect-auto',
  wide: 'aspect-4/3 md:col-span-16 md:row-span-3 md:aspect-auto',
}

/**
 * Roughly how wide each card is on screen, so the browser downloads a thumbnail
 * of the right size (used for the <img sizes> attribute).
 */
export const imageSizes: Record<CardSize, string> = {
  small: '(min-width: 768px) 37vw, 100vw',
  medium: '(min-width: 768px) 33vw, 100vw',
  large: '(min-width: 768px) 62vw, 100vw',
  wide: '(min-width: 768px) 66vw, 100vw',
}
