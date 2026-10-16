import type { PointerEvent } from 'react'
import { site } from '../data/site'

/** One shared player, created the first time it's needed. */
let audio: HTMLAudioElement | null = null

/**
 * Plays the hover "snap" (src/data/site.ts → sounds). Use it as an `onPointerEnter` handler.
 * Only for a mouse — a tap on a phone shouldn't beep.
 * Note: browsers stay silent until the visitor has clicked or tapped the page once (their
 * autoplay rule), so the very first hovers before any click make no sound. That's expected.
 */
export function playHoverSound(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return

  audio ??= new Audio(site.sounds.hover)
  audio.volume = site.sounds.hoverVolume
  // Rewind so quick hovers from one pill to the next each get their own snap.
  audio.currentTime = 0
  audio.play().catch(() => {
    // Blocked until the first click (see above) — nothing to do.
  })
}
