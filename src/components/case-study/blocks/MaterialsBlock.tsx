import type { MaterialsBlock as MaterialsBlockData } from '../../../types/project'
import MaterialsRow from '../MaterialsRow'

/** Case-study block: designed pieces (flyers, posts, guides) in one row with a caption. See MaterialsRow. */
export default function MaterialsBlock({ block }: { block: MaterialsBlockData }) {
  return (
    <figure className="my-14 md:my-20">
      <MaterialsRow images={block.images} label={block.caption} />
      {block.caption && <figcaption className="mt-3 text-caption text-ink-muted">{block.caption}</figcaption>}
    </figure>
  )
}
