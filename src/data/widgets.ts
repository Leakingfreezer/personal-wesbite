import type { AudioWidget } from '../types/gallery'
import { site } from './site'

/**
 * THE RECORD PLAYER in the Past Work grid. Song and cover live in /public/assets/widgets/.
 * `order` decides where it sits among the projects (see src/data/projects.ts for theirs).
 */
export const audioWidget: AudioWidget = {
  kind: 'audio',
  id: 'now-playing',
  order: 2,
  // Always a third of its row — the record player sizes itself around its record.
  cardSize: 'medium',
  artist: 'Dominic Fike',
  songTitle: 'Mona Lisa',
  audioUrl: '/assets/widgets/mona-lisa.mp3',
  cover: {
    url: '/assets/widgets/mona-lisa-cover.jpg',
    // The cover is decorative: the artist and song title are written right under the record.
    alt: '',
    width: 500,
    height: 500,
  },
  recordImage: site.widgets.recordImage,
}
