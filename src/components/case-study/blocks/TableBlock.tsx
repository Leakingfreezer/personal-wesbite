import type { TableBlock as TableBlockData } from '../../../types/project'

/**
 * Case-study block: a small comparison table. The first cell of each row is its row heading.
 * On narrow screens the table scrolls sideways inside its own box instead of squashing the text.
 */
export default function TableBlock({ block }: { block: TableBlockData }) {
  return (
    <figure className="mx-auto my-14 max-w-5xl md:my-20">
      {/* tabIndex lets keyboard users focus the box and scroll it with the arrow keys. */}
      <div tabIndex={0} className="overflow-x-auto rounded-photo bg-surface">
        <table className="w-full min-w-2xl border-collapse text-left">
          {block.caption && <caption className="sr-only">{block.caption}</caption>}
          <thead>
            <tr>
              {block.columns.map((column) => (
                <th key={column} scope="col" className="px-5 pt-5 pb-3 text-caption font-normal text-ink-muted">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row._key} className="border-t border-surface-strong">
                {row.cells.map((cell, index) =>
                  index === 0 ? (
                    <th key={index} scope="row" className="px-5 py-4 align-top font-medium">
                      {cell}
                    </th>
                  ) : (
                    <td key={index} className="px-5 py-4 align-top">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.caption && (
        <figcaption aria-hidden className="mt-3 text-caption text-ink-muted">
          {block.caption}
        </figcaption>
      )}
    </figure>
  )
}
