import type { CurrentRole } from '../../data/site'

interface CurrentRolesProps {
  label: string
  roles: CurrentRole[]
}

/**
 * "Currently: Design Engineer @ [logo] | Logistics Executive @ [logo] · …" at the bottom of the hero.
 * The `main` role comes first, bigger and darker; a thin line separates it from the smaller, grey others.
 * Each organization appears only as its logo, linked to its website (opens in a new tab).
 * The logo's alt text is the organization's name, so screen readers still hear it.
 * Roles, logos and links → src/data/site.ts (hero.currently).
 */
export default function CurrentRoles({ label, roles }: CurrentRolesProps) {
  const mainRoles = roles.filter((r) => r.main)
  const otherRoles = roles.filter((r) => !r.main)

  return (
    <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
      <p className="text-caption font-semibold tracking-wide text-ink uppercase">{label}</p>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {mainRoles.map((r) => (
          <Role key={r.org} {...r} className="text-button font-semibold text-ink" />
        ))}
        {mainRoles.length > 0 && otherRoles.length > 0 && (
          <li aria-hidden className="hidden h-8 w-px bg-line sm:block" />
        )}
        {otherRoles.map((r) => (
          <Role key={r.org} {...r} className="text-nav text-ink-muted" />
        ))}
      </ul>
    </div>
  )
}

/** One "role @ logo" item. Text size and colour come from `className`; the logo scales with the text. */
function Role({ role, org, url, logo, className }: CurrentRole & { className: string }) {
  return (
    <li className={`flex items-center gap-2.5 ${className}`}>
      <span>{role}</span>
      <span aria-hidden>@</span>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="rounded-sm transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink motion-reduce:transition-none"
      >
        <img src={logo.src} alt={org} width={logo.width} height={logo.height} className="h-[1.6em] w-auto" />
      </a>
    </li>
  )
}
