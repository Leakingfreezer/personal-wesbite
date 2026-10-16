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
      <div className="mx-auto grid max-w-page items-center gap-12 px-6 py-24 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16 md:px-12 md:py-32 lg:px-20">
        <div className="max-w-2xl">
          <h2 className="text-display font-semibold">{heading}</h2>
          <p className="mt-6 text-lead">{body}</p>
          <div className="mt-10">
            <ButtonLink href={mailto}>{ctaLabel}</ButtonLink>
          </div>
        </div>

        {/* Decorative — sized to the Figma design (300px) and scaled down on smaller screens. */}
        <img
          src={graphic.src}
          alt={graphic.alt}
          loading="lazy"
          className="w-[clamp(7rem,22vw,18.75rem)] justify-self-end md:justify-self-center"
        />
      </div>
    </section>
  )
}
