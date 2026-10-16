/**
 * Everything that can sit in the Past Work grid: project cards plus the record-player widget.
 * Each item has a `kind`, so ProjectGrid knows which component to draw,
 * and its own `order` + `cardSize`, so widgets slot in between projects.
 * In Phase 6 the widgets become their own document types in Sanity Studio.
 */
import type { CardSize, ProjectImage, ProjectSummary } from './project'

interface GalleryItemBase {
  /** Unique key (a project's slug, or the widget's id). */
  id: string
  order: number
  cardSize: CardSize
}

export interface ProjectGalleryItem extends GalleryItemBase {
  kind: 'project'
  project: ProjectSummary
}

/** A small record player that plays one track. */
export interface AudioWidget extends GalleryItemBase {
  kind: 'audio'
  artist: string
  songTitle: string
  /** MP3 file. While missing, the play button is disabled. */
  audioUrl?: string
  /** Album art covering the whole record. When missing, the plain record artwork shows. */
  cover?: ProjectImage
  /** The record graphic itself (Irene's Figma artwork). */
  recordImage: string
}

export type GalleryItem = ProjectGalleryItem | AudioWidget
