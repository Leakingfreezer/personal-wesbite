import type { Project, ProjectImage } from '../types/project'
import { bullets, h2, h3, image, metrics, p, quote, table } from './caseStudyBlocks'

/**
 * ALL PROJECTS — each entry is one card in the Past Work grid plus its case-study page at /work/<slug>.
 * This file is the site's content store (Sanity is switched off — see src/lib/projects.ts).
 * Images live in /public/assets/projects/. Order 2 is taken by the record player (src/data/widgets.ts).
 *
 * New project: copy an entry, change `slug`, `title`, `order` and `cardSize`.
 * Case-study text is written with the helpers in ./caseStudyBlocks.ts (h2, p, bullets…).
 */

/* ── OneChild ──────────────────────────────────────────────────────────── */

/** Both prototypes in browser windows: square for the Past Work card, wide for the case-study header. */
const mockupAlt =
  'Two OneChild Advocacy Hub screens in browser windows: the Opportunities Board, a grid of youth events, grants and internships, and in front of it the Advocacy Footprint, with a profile, skills, past experiences and a goal planner.'

const oneChildMockupSquare: ProjectImage = {
  url: '/assets/projects/onechild-mockup-square-1600.webp',
  srcSet: '/assets/projects/onechild-mockup-square-800.webp 800w, /assets/projects/onechild-mockup-square-1600.webp 1600w',
  alt: mockupAlt,
  width: 1600,
  height: 1600,
}

const oneChildMockupWide: ProjectImage = {
  url: '/assets/projects/onechild-mockup-wide-1200.webp',
  srcSet: '/assets/projects/onechild-mockup-wide-1200.webp 1200w, /assets/projects/onechild-mockup-wide-2400.webp 2400w',
  alt: mockupAlt,
  width: 2400,
  height: 1500,
}

const oneChildBoardScreen: ProjectImage = {
  url: '/assets/projects/onechild-opportunities-board-screen.png',
  alt: 'The Opportunities Board: a header illustration of five young people sitting together, location and type filters (Event, Internship, Challenge, Grant), a grid of opportunity cards, and the Youth Voices Summit 2027 opened in a side panel with its description, requirements, contact and the skills you will gain.',
  width: 1463,
  height: 1189,
}

const oneChildFootprintScreen: ProjectImage = {
  url: '/assets/projects/onechild-advocacy-footprint-screen.png',
  alt: "The Advocacy Footprint page: a profile card with top skills, sticky notes, a OneChild Journey of past experiences, and a Goal Planner tracking the goal 'Grow my voice online' with its milestones checked off.",
  width: 1463,
  height: 1268,
}

/** Slides exported from the "Advocacy Hub Phase 1 Design Decisions" FigJam board (3200 × 1800). */
function oneChildSlide(name: string, alt: string): ProjectImage {
  const base = `/assets/projects/onechild-${name}`
  return { url: `${base}-1600.webp`, srcSet: `${base}-1600.webp 1600w, ${base}-3200.webp 3200w`, alt, width: 3200, height: 1800 }
}

const oneChildJourney = oneChildSlide(
  'advocacy-journey',
  'From program to continued advocacy, in four steps: 1 Participate — learn and discuss in Project WHY. 2 Find support — browse opportunities and resources. 3 Take action — apply, attend, contribute. 4 Reflect and grow — document experiences and set goals. Core principle: equip and record advocacy — do not score it.',
)

const oneChildSynthesis = oneChildSlide(
  'research-synthesis',
  'Research synthesis, four recurring needs from the youth advocacy focus groups. 1 Access to action: reliable pathways into grants, internships, programs and advocacy opportunities. 2 Resources that help: practical support for funding outreach, networking, burnout and advocacy toolkits. 3 Autonomy and ownership: advocates wanted to record their own work, skills, achievements and personal milestones. 4 Connection with safety: youth valued community but raised concerns about unknown contacts, popularity and unrestricted messaging.',
)

const oneChildPersonas = oneChildSlide(
  'advocate-personas',
  'Two advocacy entry points. Emerging advocates are still exploring what advocacy means to them and need clear starting points, guidance and confidence-building opportunities. Established advocates already contribute to initiatives or lead their own work and need credible opportunities, leadership pathways and a record of achievements.',
)

const oneChild: Project = {
  slug: 'onechild-advocacy-hub',
  title: 'OneChild Advocacy Hub',
  shortDescription:
    'Designed and built a youth advocacy platform that connects young people to opportunities, resources, and tools to document their advocacy journeys.',
  category: 'Product Engineering',
  headline: '0→1',
  year: 2026,
  cardSize: 'medium',
  order: 1,
  featured: false,
  comingSoon: false,
  thumbnail: oneChildMockupSquare,
  heroImage: oneChildMockupWide,
  role: 'Product Engineer',
  timeline: 'May – Aug 2026',
  tools: ['Figma', 'FigJam', 'Framer', 'Framer CMS', 'Supabase'],
  overview:
    "The OneChild Advocacy Hub helps youth continue their advocacy journeys beyond OneChild's Project WHY initiative. I led the 0→1 process, from youth research and product strategy through interface design, implementation, and technical handoff, creating a practical, accessible platform that OneChild can maintain with limited technical resources. The first release established opportunity discovery, educational resources, authentication, and the initial Advocacy Footprint.",
  links: [{ label: 'Live website', comingSoon: true }],
  body: [
    h2('The challenge'),
    p("The OneChild Advocacy Hub is designed to help youth continue their advocacy journeys beyond OneChild's Project WHY initiative."),
    p('**How might we** help young people turn their advocacy interests into ongoing action, while giving them the tools and autonomy to recognize their growth?'),
    image(oneChildJourney, 'The Hub bridges initial participation and a self-directed next step. Core principle: equip and record advocacy — do not score it.'),

    h2('Research'),
    p('The research included youth focus groups, affinity mapping, benchmarking, user journeys, and feature prioritization.'),
    metrics([
      ['89%', 'of focus group respondents prioritized finding advocacy opportunities'],
      ['89%', 'selected the Opportunities Board as a Phase 1 feature'],
      ['100%', 'supported a mix of OneChild and approved partner opportunities'],
    ]),
    p('These are focus group findings that shaped MVP priorities, not post-launch results. The sample size was not specified in the source report.'),
    image(oneChildSynthesis, 'Research synthesis: four recurring needs from the youth advocacy focus groups.'),
    quote(
      "Youth didn't lack motivation to advocate. They lacked accessible pathways to act, practical support, and a way to document their work.",
      'Key research insight',
    ),
    p('This reframed the project. Instead of designing engagement mechanics to make youth participate more, we focused on tools that let advocates act on the motivation they already had.'),
    h3('Two advocacy entry points'),
    p('Research identified different needs, but the experience had to stay flexible: support both groups, without forcing anyone down a rigid pathway.'),
    image(oneChildPersonas, 'Emerging and established advocates: where they are now, and what they need most.'),

    h2('Decisions at a glance'),
    table(
      'Problem, evidence and decision, transcribed from the Phase 1 FigJam board.',
      ['Problem', 'Evidence', 'Decision', 'Trade-off / follow-up'],
      [
        ['External opportunities are valuable but hard to safely maintain', 'Youth strongly valued opportunity access', 'Keep the board + create a vetting SOP', 'OneChild still needs recurring review'],
        ['Advocacy impact is hard to see', 'Youth want to document accomplishments', 'Personalized milestones', 'Recognition format still unresolved'],
        ['A network feature creates safety and meaningless-connection risk', 'Multiple concerns around toxicity', 'Defer networking; keep profiles private', 'Revisit after usage data'],
      ],
    ),

    h2('Product decisions'),
    h3('01 — Opportunities over networking'),
    p('We prioritized the Opportunities Board over an open social network. 89% of focus group respondents prioritized access to advocacy opportunities, while networking introduced unresolved safeguarding and moderation risks.'),
    ...bullets([
      '**User goal:** Find credible pathways to participate.',
      '**Business goal:** Support continued youth advocacy beyond Project WHY.',
      '**Trade-off:** Direct peer networking was deferred in favour of safer, actionable discovery.',
    ]),
    p('**The design:** A CMS-powered board of OneChild and approved external opportunities, with clear information and application links. A vetting SOP supports reviewing external opportunities before they are published.'),
    image(oneChildBoardScreen, 'The Opportunities Board: filter by type and location, then open an opportunity to see the details and apply.'),

    h3('02 — Autonomy over gamification'),
    p('We chose self-defined milestones and skill-based progress over points, streaks, and public leaderboards, because youth research revealed concerns about unhealthy comparison and competition.'),
    ...bullets([
      '**User goal:** Recognize meaningful personal growth.',
      '**Trade-off:** Private progress reduces social comparison, but also limits social proof and external verification.',
      '**Still open:** the recognition format.',
    ]),
    p('**The design:** The Advocacy Footprint, a personal space for experiences, skills, private goals, and milestones.'),
    image(oneChildFootprintScreen, 'The Advocacy Footprint as designed. Phase 1 shipped its initial structure; the full experience is planned for later.'),

    h3('03 — Privacy over open connections'),
    p('We prioritized private-first profiles over unrestricted direct messaging and public connections, because research revealed safety, credibility, and popularity concerns.'),
    ...bullets([
      '**User goal:** Participate and document advocacy safely.',
      '**Trade-off:** Privacy protects personal information but limits immediate peer discovery.',
    ]),
    p('**The design:** Private account entry points and a personal advocacy record. Community networking stays out of scope until safeguarding requirements are validated, and will be revisited after usage data.'),

    h3('04 — Maintainability over technical complexity'),
    p('We built CMS-managed opportunities and resources instead of custom admin infrastructure, because OneChild had limited long-term technical maintenance capacity.'),
    ...bullets([
      '**Business goal:** Make routine content updates sustainable.',
      '**Trade-off:** External opportunities still need manual review, and some capabilities stay constrained by the existing stack, but staff can maintain the core content without rebuilding pages.',
    ]),
    p('**The design:** Reusable Framer CMS content structures, Supabase Authentication, and documentation for non-technical staff.'),

    h3('05 — Progressive access over forced registration'),
    p('Guests can browse opportunities and resources without creating an account first.'),
    ...bullets([
      "**User goal:** Discover the platform's value with minimal initial friction.",
      '**Trade-off:** Personalized features require an account, but public discovery stays open to everyone.',
    ]),

    h2('What we deliberately left out of V1'),
    p('Explicit anti-goals kept the launch scoped to its core value and safeguarding requirements.'),
    ...bullets([
      '**Open networking:** the safeguarding and moderation model was unresolved.',
      '**Points and leaderboards:** they risked turning personal advocacy into public competition.',
      '**Advanced recommendations:** core opportunity discovery needed to come first.',
      '**Persistent personal tracking:** user-specific data storage and permissions were incomplete.',
      '**Fully automated password reset:** Phase 1 uses a manual support process.',
    ]),

    h2('Shipping the MVP'),
    p('We prioritized opportunity discovery for the MVP because, while youth expressed interest in networking and personalized recognition, foundational research identified access to credible next steps as the primary unmet need.'),
    ...bullets([
      '**Designed:** the features, interfaces, and interactions explored in the final wireframes.',
      '**Implemented in Phase 1:** CMS-managed opportunities and resources, authentication, guest access, and the initial Advocacy Footprint structure.',
      '**Deferred:** full persistent Footprint data, saved resources, filters, recommendations, automated tracking, and additional community features.',
    ]),
    p('We launched V1 with CMS-managed content and simplified account support rather than building custom administration and fully automated account flows, allowing us to establish the core experience within the project timeline.'),

    h2('Measuring success'),
    p('**Proposed North Star: Meaningful Advocacy Action Rate.** The percentage of active youth who complete at least one defined meaningful advocacy action through the platform during a specified period.'),
    p('This is a proposed measurement framework, not a metric that has been tracked yet. Its definition and instrumentation still need validation.'),
  ],
}

export const projects: Project[] = [oneChild]
