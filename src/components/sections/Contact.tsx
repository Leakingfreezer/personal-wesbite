import ButtonLink from '../ui/ButtonLink'
import { site } from '../../data/site'

/**
 * Section 4: "Ideas in Motion." with a short invitation and an email button on the left,
 * and the big asterisk on the right (stacked below the text on phones).
 * Text, email and the asterisk image all come from src/data/site.ts → contact / email.
 */
export default function Contact() {
  const { heading, body, ctaLabel, emailSubject, graphic } = site.contact
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(emailSubject)}`

  return (
    <section id="contact" className="bg-surface">
      <div className="mx-auto grid max-w-page items-center gap-8 px-6 py-14 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16 md:px-12 md:py-20 lg:px-20">
        <div className="max-w-2xl">
          <h2 className="text-title font-semibold">{heading}</h2>
          <p className="mt-4 text-button">{body}</p>
          <div className="mt-8">
            <ButtonLink href={mailto}>{ctaLabel}</ButtonLink>
          </div>
        </div>

        {/* Decorative — up to 200px, scaled down on smaller screens. */}
        <img
          src={graphic.src}
          alt={graphic.alt}
          loading="lazy"
          className="w-[clamp(5rem,14vw,12.5rem)] justify-self-end md:justify-self-center"
        />
      </div>
    </section>
  )
}
