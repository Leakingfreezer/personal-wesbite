import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import type { ProjectImage } from '../../types/project'
import { sanityClient } from './client'
import type { SanityImage } from './queries'

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null

/** Widths offered to the browser; it picks the smallest one that looks sharp on the visitor's screen. */
const responsiveWidths = [480, 800, 1200, 1600, 2000]

/**
 * Turns a Sanity image into the app's ProjectImage: a resized, modern-format URL
 * (respecting the crop/hotspot you set in Studio) plus a srcSet for responsive loading.
 * Returns undefined when there's no image, so components show their placeholder.
 */
export function toProjectImage(image: SanityImage | undefined, fallbackAlt = ''): ProjectImage | undefined {
  if (!builder || !image?.asset) return undefined

  const source = image as SanityImageSource
  const urlAtWidth = (width: number) => builder.image(source).width(width).auto('format').url()
  const dimensions = image.asset.metadata?.dimensions

  return {
    url: urlAtWidth(1600),
    srcSet: responsiveWidths.map((width) => `${urlAtWidth(width)} ${width}w`).join(', '),
    alt: image.alt ?? fallbackAlt,
    width: dimensions?.width,
    height: dimensions?.height,
  }
}

/** A single small image URL (e.g. a tool logo), at roughly twice its display size for sharp screens. */
export function toImageUrl(image: SanityImage | undefined, width: number): string | undefined {
  if (!builder || !image?.asset) return undefined
  return builder.image(image as SanityImageSource).width(width).auto('format').url()
}
