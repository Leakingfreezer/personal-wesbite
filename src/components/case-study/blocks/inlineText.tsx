/**
 * Turns 'Some **bold** words' into text with <strong> parts.
 * Used by case-study blocks whose text is a plain string in src/data/projects.ts.
 */
export function withBold(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map((part, index) =>
      part.startsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : <span key={index}>{part}</span>,
    )
}
