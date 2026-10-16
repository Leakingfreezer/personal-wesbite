import type { PointerEvent } from 'react'
import { site } from '../data/site'

/**
 * LITTLE UI SOUNDS — which file and how loud live in src/data/site.ts → sounds.
 *   playHoverSound → onPointerEnter (hero pills)
 *   playClickSound → onClick (nav links, the Contact button)
 * Browsers stay silent until the visitor has clicked or tapped the page once (their autoplay
 * rule), so hovers before the first click make no sound. Clicks always can.
 */

/** One shared player per sound file, created the first time it's needed. */
const players = new Map<string, HTMLAudioElement>()

function play(src: string, volume: number) {
  let audio = players.get(src)
  if (!audio) {
    audio = new Audio(src)
    players.set(src, audio)
  }
  audio.volume = volume
  // Rewind so quick repeats each get their own snap.
  audio.currentTime = 0
  audio.play().catch(() => {
    // Blocked until the first click (see above) — nothing to do.
  })
}

/** Hover snap — mouse only, so a tap on a phone doesn't beep. */
export function playHoverSound(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return
  play(site.sounds.hover, site.sounds.hoverVolume)
}

/** Click snap for links and buttons. */
export function playClickSound() {
  play(site.sounds.click, site.sounds.clickVolume)
}
