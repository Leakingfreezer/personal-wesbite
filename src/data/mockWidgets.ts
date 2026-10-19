import type { AudioWidget } from '../types/gallery'
import { site } from './site'

/**
 * MOCK WIDGETS — the record player in the Past Work grid.
 * Used until Sanity is connected (Phase 6); after that you edit them in Sanity Studio.
 *
 * `order` decides where a widget sits among the projects (see mockProjects.ts for theirs).
 */

export const mockAudio: AudioWidget = {
  kind: 'audio',
  id: 'now-playing',
  order: 2,
  cardSize: 'medium', // square, so the record card matches the sketch
  artist: 'Artist',
  songTitle: 'Title of Song',
  // audioUrl: '/assets/widgets/song.mp3',  ← add your track here to enable playback
  recordImage: site.widgets.recordImage,
}
