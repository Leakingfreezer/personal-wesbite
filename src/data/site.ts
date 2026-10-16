/**
 * SITE CONTENT — edit text, links and fixed images here.
 * Components read from this file; they never hardcode copy.
 * (Projects are NOT here — they come from Sanity, or mockProjects.ts during development.)
 */

import { Box, PenTool, Target, Users, type LucideIcon } from 'lucide-react'

export interface NavLink {
  label: string
  /** Always "/#<section-id>" so links work from every page, not just the homepage. */
  href: string
}

export interface ImageAsset {
  /** Path inside /public, e.g. "/assets/hero/star-tin.png" */
  src: string
  alt: string
}

/** One of the hero pills ("Design", "Strategy", …). Icons come from lucide.dev — import the one you want above. */
export interface Skill {
  label: string
  icon: LucideIcon
}

/**
 * How a bit of text can be styled:
 *   'underline'                   → violet underline
 *   'pink' | 'blue' | 'yellow'    → marker highlight in that colour
 */
export type TextMark = 'underline' | 'pink' | 'blue' | 'yellow'

/**
 * A sentence with some words styled. Plain parts are strings; styled parts are { text, mark }.
 * Example: ['I am a ', { text: 'designer', mark: 'pink' }, '.']
 */
export type RichText = (string | { text: string; mark: TextMark })[]

export const site = {
  name: 'Irene D.',

  /** Used by the Contact CTA. TODO: replace with your real address. */
  email: 'hello@example.com',

  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Lets Chat!', href: '/#contact' },
  ] satisfies NavLink[],

  /** Small 3D star beside your name in the nav. Decorative, so alt is empty. */
  logo: {
    src: '/assets/brand/logo-star.webp',
    alt: '',
  } satisfies ImageAsset,

  hero: {
    /** The big headline (the page's h1). Each entry is one line. */
    headline: ['I turn ideas', 'into real things'],
    /** Small text before the pills. */
    lead: 'through',
    skills: [
      { label: 'Design', icon: PenTool },
      { label: 'Strategy', icon: Target },
      { label: 'Community', icon: Users },
      { label: 'Creative Tech', icon: Box },
    ] satisfies Skill[],
    /** Last line: "and a bit of **chaos** ✳". */
    outro: 'and a bit of',
    outroEmphasis: 'chaos',
    /** The little spinning asterisk after "chaos". Decorative, so alt is empty. The hero image lives in src/data/hero.ts. */
    outroGraphic: {
      src: '/assets/illustrations/asterisk.svg',
      alt: '',
    } satisfies ImageAsset,
    /**
     * Your photo, right of the headline. Drop the file in /public/assets/hero/ and set `src`
     * (e.g. '/assets/hero/me.jpg'). While `src` is empty a grey placeholder shows instead.
     */
    photo: {
      src: '',
      alt: 'Portrait of Irene',
    } satisfies ImageAsset,
    /** Shown on the grey placeholder until the photo is added. */
    photoPlaceholder: 'Your photo',
  },

  about: {
    greeting: 'Hi there!',
    /** Waves when the greeting is hovered. Decorative. */
    greetingEmoji: '👋',
    program: ['2nd ', { text: 'Management Engineering', mark: 'underline' }, ' @ University of Waterloo'] satisfies RichText,
    bio: [
      'I’m a product manager, ',
      { text: 'designer,', mark: 'pink' },
      ' and ',
      { text: 'builder', mark: 'blue' },
      ' working across strategy, UX, AI, ',
      { text: 'creative', mark: 'yellow' },
      ' technology, and storytelling.',
    ] satisfies RichText,
  },

  work: {
    heading: 'Past Work',
    /** Shown if there are no published projects yet. */
    emptyMessage: 'New work is on the way — check back soon.',
  },

  /**
   * Little UI sounds. Files live in /public/assets/sounds/ — swap a path to change a sound.
   * `hover` plays when the mouse moves onto a hero pill or an About highlight.
   */
  sounds: {
    hover: '/assets/sounds/liecio-menu_beep_short_snap-533778.mp3',
    /** 0 = silent, 1 = full volume. */
    hoverVolume: 0.4,
  },

  /** Fixed artwork for the Past Work widgets (their content — the song — is in Sanity). */
  widgets: {
    /** The record in the audio player — Irene's Figma artwork. */
    recordImage: '/assets/widgets/record.svg',
  },

  /** Labels on every case-study page (/work/:slug). The case-study content itself is in Sanity. */
  caseStudy: {
    backLabel: 'Back to Work',
    overviewHeading: 'Overview',
    roleLabel: 'Role',
    timelineLabel: 'Timeline',
    toolsLabel: 'Tools',
    linksLabel: 'Links',
    nextLabel: 'Next project',
    /** Shown where a case-study image hasn't been uploaded yet. */
    imagePlaceholder: 'Image placeholder',
  },

  /** Error screens. */
  notFound: {
    heading: 'Page not found.',
    body: 'That page doesn’t exist — it may have moved.',
    linkLabel: 'Back to home',
  },
  error: {
    heading: 'Something went wrong.',
    body: 'The page couldn’t load. Please try again in a moment.',
    linkLabel: 'Back to home',
  },

  contact: {
    heading: 'Ideas in Motion.',
    body: 'Open to thoughtful conversations about product, design, strategy, and creative technology. A project, collaboration, an idea, let’s chat!',
    ctaLabel: 'Explore an Idea Together',
    /** Pre-filled subject line when the CTA opens someone's email app. */
    emailSubject: 'Hi Irene — an idea to explore',
    /** The big asterisk beside the text. Decorative, so alt is empty. Replace the file to change it. */
    graphic: {
      src: '/assets/illustrations/asterisk.svg',
      alt: '',
    } satisfies ImageAsset,
  },
}
