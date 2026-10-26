import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { CaseStudyBlock } from '../../types/project'
import GalleryBlock from './blocks/GalleryBlock'
import ImageBlock from './blocks/ImageBlock'
import MetricsBlock from './blocks/MetricsBlock'
import QuoteBlock from './blocks/QuoteBlock'
import TableBlock from './blocks/TableBlock'

interface CaseStudyContentProps {
  body: CaseStudyBlock[]
}

/**
 * Text is kept to a comfortable reading width (max-w-3xl) inside a wider column,
 * so images and galleries can be bigger than the paragraphs around them.
 */
const textWidth = 'mx-auto max-w-3xl'

/**
 * How each kind of content looks. To restyle headings, paragraphs, lists or links, edit them here.
 * To restyle a custom block (image, gallery, metrics, quote, table), edit its file in ./blocks/.
 */
const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className={`${textWidth} mt-16 mb-5 text-heading font-medium md:mt-24`}>{children}</h2>,
    h3: ({ children }) => <h3 className={`${textWidth} mt-10 mb-3 text-lead font-medium`}>{children}</h3>,
    normal: ({ children }) => <p className={`${textWidth} mb-5 text-lg leading-relaxed`}>{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className={`${textWidth} mb-5 list-disc space-y-2 pl-6 text-lg`}>{children}</ul>,
    number: ({ children }) => <ol className={`${textWidth} mb-5 list-decimal space-y-2 pl-6 text-lg`}>{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noreferrer" className="underline underline-offset-4">
        {children}
      </a>
    ),
  },
  types: {
    imageBlock: ({ value }) => <ImageBlock block={value} />,
    gallery: ({ value }) => <GalleryBlock block={value} />,
    metrics: ({ value }) => <MetricsBlock block={value} />,
    quote: ({ value }) => <QuoteBlock block={value} />,
    table: ({ value }) => <TableBlock block={value} />,
  },
}

/** The flexible middle of a case study — whatever sections the project has, in order. */
export default function CaseStudyContent({ body }: CaseStudyContentProps) {
  return (
    <section className="mx-auto max-w-page px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <PortableText value={body} components={components} />
      </div>
    </section>
  )
}
