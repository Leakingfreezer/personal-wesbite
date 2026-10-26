import HeroPhoto from '../hero/HeroPhoto'
import SkillPills from '../hero/SkillPills'
import { site } from '../../data/site'

/**
 * Section 1: "I turn ideas into real things / through [pills] / and a bit of chaos ✳"
 * on the left, your photo on the right (stacked below the text until large screens).
 * Text, pills and photo → src/data/site.ts (hero).
 */
export default function Hero() {
  const { headline, lead, skills, outro, outroEmphasis, outroGraphic, photo, photoCaption, photoPlaceholder } = site.hero

  return (
    <section id="home" className="mx-auto max-w-page px-6 pt-hero-top pb-8 md:px-12 md:pb-12 lg:px-20">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="text-charcoal">
          <h1 className="text-hero font-semibold">
            {headline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          {/* "through" sits beside the pills on wider screens, above them on phones. */}
          <div className="mt-2 flex flex-col gap-3 text-heading sm:flex-row sm:items-start sm:gap-4">
            <p>{lead}</p>
            <SkillPills skills={skills} className="sm:mt-[0.6em]" />
          </div>

          {/* Slides up once the pills have popped in (the delay waits for them). */}
          <p className="mt-6 animate-slide-up text-heading motion-reduce:animate-none" style={{ animationDelay: '850ms' }}>
            {outro} <strong className="font-semibold">{outroEmphasis}</strong>{' '}
            <img
              src={outroGraphic.src}
              alt={outroGraphic.alt}
              className="inline-block size-[0.75em] animate-spin-slow align-[-0.05em] motion-reduce:animate-none"
            />
          </p>
        </div>

        <HeroPhoto
          photo={photo}
          placeholderLabel={photoPlaceholder}
          caption={photoCaption}
          className="mx-auto w-full max-w-hero-photo lg:mr-0"
        />
      </div>
    </section>
  )
}
