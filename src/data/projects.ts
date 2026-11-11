import type { Project, ProjectImage } from '../types/project'
import {
  bullets,
  compactMetrics,
  diagram,
  h2,
  h3,
  image,
  keyMetrics,
  metrics,
  operatingModel,
  p,
  quote,
  section,
  table,
  textWithNote,
} from './caseStudyBlocks'

/**
 * ALL PROJECTS — each entry is one card in the Past Work grid plus its case-study page at /work/<slug>.
 * This file is the site's content store (Sanity is switched off — see src/lib/projects.ts).
 * Images live in /public/assets/projects/. Order 3 is taken by the record player (src/data/widgets.ts).
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
  overviewHeading: 'TL;DR',
  overview:
    'I helped shape OneChild’s Advocacy Hub, a youth-centred platform designed to keep young advocates connected beyond their initial programs. Through focus-group research, journey mapping, and MVP prioritization, I translated youth needs into a digital experience that makes it easier to access resources, discover opportunities, and continue their advocacy journey.',
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

/* ── Food for Thought ──────────────────────────────────────────────────── */
// Layout follows Irene's Figma frame (personal-website, node 131:205). Images: scripts/make-fft-images.py.

const fftWorkshop: ProjectImage = {
  url: '/assets/projects/food-for-thought-workshop-1200.webp',
  srcSet: '/assets/projects/food-for-thought-workshop-1200.webp 1200w, /assets/projects/food-for-thought-workshop-2400.webp 2400w',
  alt: 'A Food for Thought cooking workshop in a community hall: young people in aprons work at long tables with portable stoves, pickled carrots and grilled meat, while two participants in front fill bánh mì baguettes.',
  width: 4896,
  height: 3672,
}

const fftJourneyMap: ProjectImage = {
  url: '/assets/projects/fft-journey-map.webp',
  alt: 'Participant journey map in six stages: Discovery, Consideration, Welcome, Settle In, Experience and Return. Each stage has a photo, what the participant does, what they are thinking ("Wait, this actually looks fun.", "Would I actually feel comfortable going?", "I feel like I’m actually part of this.", "I hope this isn’t awkward.", "I’d actually come back to this.", "Who can I bring next time?") and the design moves for that stage.',
  width: 931,
  height: 335,
}

const foodForThought: Project = {
  slug: 'food-for-thought',
  title: 'Food for Thought',
  shortDescription:
    'Curated and ran a recurring 10-workshop youth third-space program, bringing 30+ participants per session together through cooking, culture, and community.',
  category: 'Product Management · Service Design',
  eyebrow: 'Community Programming',
  tags: 'Service Design · Community Product · Program Operations',
  headline: 'Founder',
  year: 2025,
  cardSize: 'wide',
  order: 2,
  featured: false,
  comingSoon: false,
  thumbnail: fftWorkshop,
  heroImage: fftWorkshop,
  keyMetrics: keyMetrics([
    ['$15K+', 'funded'],
    ['10', 'workshops'],
    ['30+', 'participants per session'],
    ['300+', 'participant-attendances'],
  ]),
  role: 'Founder & Project Lead',
  timeline: 'Aug 2024 – Nov 2025',
  tools: [],
  overviewHeading: 'TL;DR',
  overview:
    'I founded and led Food for Thought, a free youth third-space program in Toronto built around cooking, culture, and community. Funded by $15K+ in grants, we ran 10 workshops in under two months with 30+ participants per session. I designed both the participant experience and the operating system behind it. My main takeaway: great experiences attract people; great systems keep them going.',
  body: [
    section('Problem'),
    h3('Friendships were becoming expensive.'),
    textWithNote(
      [
        'For many young people, spending time together had started to cost money: eating out, tickets, events. When every plan has a price, the people with the least to spend get left out, and meeting someone new feels like a risk as well as an expense.',
        '**The opportunity:** a free, low-pressure place to connect, where a shared hands-on activity does the social work, so showing up alone doesn’t feel awkward.',
      ],
      {
        stat: { value: '44%', label: 'of Gen Z and millennials skipped major social events because of the cost.' },
        source: {
          label: 'Ally Bank (2025)',
          url: 'https://media.ally.com/2025-07-30-New-Ally-Bank-Survey-Reveals-the-Hidden-Financial-Cost-of-Friendships',
        },
      },
    ),

    section('Designing the experience'),
    p('I mapped the end-to-end user journey and built a customer lifecycle around four experience principles: low social energy, authenticity, community, and advocacy. I used each touchpoint, from discovery and onboarding to the workshop itself and return behavior, to reduce social friction, create more natural interactions, and design moments that could turn first-time participants into repeat attendees and advocates.'),
    diagram(fftJourneyMap, 'The participant journey: what people did, thought and needed at each stage, and how I designed for it.'),

    section('Solution'),
    p('Food for Thought was a recurring youth third-space program built around shared creative experiences. Across 10 workshops, participants came together for cooking, bouquet-making, pottery painting, shared meals, and other low-pressure activities designed to make meeting new people feel natural.'),
    p('The experience wasn’t structured like a class or networking event. Each workshop combined a hands-on activity, small-group interaction, shared food or conversation, and time to stay after, with the goal of creating a space people would actually want to return to.'),
    p('**Cooking workshops · Bouquet making · Pottery painting · Community meals · Creative workshops**'),
    quote('Providing low-pressure mentorship for teens to actually want to return to.'),

    section('Creating the base: operating system'),
    operatingModel({
      title: 'Workshop operating model',
      subtitle: 'Cross-functional workflow · improved efficiency by 40%',
      workstreams: [
        { title: 'Partnerships', steps: ['Audience research', 'Sponsor + chef outreach', 'Onboarding + activity confirmation'] },
        { title: 'Finance', steps: ['Budget allocation', 'Reimbursement tracking'] },
        { title: 'Operations', steps: ['Supply planning + procurement', 'Venue + volunteer logistics'] },
        { title: 'Growth', steps: ['Marketing + registration', 'Participant communications'] },
      ],
      delivery: {
        title: 'Workshop delivery',
        steps: ['1-hour workshop setup', 'Day-of coordination meeting', 'Facilitation', 'Feedback gathering'],
      },
      retrospective: {
        title: 'Retrospective goals + backlog update',
        steps: ['Feedback', 'Operational improvements', 'Next workshop'],
      },
      loopNote: 'Feeds into the next workshop cycle',
    }),
    compactMetrics([
      ['$15K+', 'funding secured'],
      ['15', 'chefs + facilitators'],
      ['20', 'volunteers coordinated'],
      ['10', 'workshops delivered'],
      ['40K–60K', 'estimated content views across ~20 posts (2K–3K per post on average)', true],
      ['3', 'executives on the core team'],
    ]),

    section('What I’d do differently'),
    h3('01. Design for the second visit, not just the first.'),
    p('I focused on making workshops affordable and welcoming. Looking back, I’d put just as much thought into what happens after someone attends: how we follow up, help people recognize familiar faces, and give them a reason to return.'),
    h3('02. Think beyond the activity itself.'),
    p('I learned that choosing a fun activity isn’t enough. Pottery painting and bouquet-making gave people something to do with their hands, which made starting conversations feel less awkward. I’d be more intentional about designing those small moments of connection.'),
    h3('03. Make the community last beyond the workshop.'),
    p('Things like our cookbook, swag bags, mentorship, and shared photos helped make the experience feel bigger than a single event. I’d build these touchpoints into the experience earlier, so participants had something to take with them and a reason to stay connected.'),
    h3('04. Listen and adapt earlier.'),
    p('I’d build a more consistent feedback loop into every workshop. Instead of relying mostly on conversations afterwards, I’d make it easier to understand what people enjoyed, what made them uncomfortable, and what they’d actually want to do next.'),
    quote('Great experiences attract people; great systems keep them going.', 'My biggest takeaway'),
  ],
}

/* ── GROOVE ────────────────────────────────────────────────────────────── */
// Images made by scripts/make-groove-images.py from Irene's GROOVE slide and her MVP 1 sketch.

const grooveCover: ProjectImage = {
  url: '/assets/projects/groove-cover-1200.webp',
  srcSet: '/assets/projects/groove-cover-1200.webp 1200w, /assets/projects/groove-cover-1672.webp 1672w',
  alt: 'GROOVE concept development: a pencil sketch of the device labelled speaker, rotary selector, OLED screen, power button, USB-C charging port, light-pipe signifier and sound slot buttons; beside it, a form exploration render (a cream and translucent-lilac handheld with a metal dial, black screen and three square buttons) and handwritten sequencer notes with a row of drum sound boxes.',
  width: 1672,
  height: 941,
}

const grooveSketch: ProjectImage = {
  url: '/assets/projects/groove-sketch-1200.webp',
  srcSet: '/assets/projects/groove-sketch-1200.webp 1200w, /assets/projects/groove-sketch-2360.webp 2360w',
  alt: 'MVP 1 sketch: a pencil drawing of GROOVE labelled speaker, rotary selector, OLED screen, power button, USB-C charging port, light-pipe signifier and sound slot buttons. Blue notes describe the mechanisms (capture drums, melody and vocals; a step sequencer; swapping sound slots over NFC and Bluetooth) and sketch the loading screen and menu.',
  width: 2360,
  height: 1640,
}

const groove: Project = {
  slug: 'groove',
  title: 'GROOVE',
  shortDescription: 'A tactile music-making device.',
  category: 'Hardware · Industrial Design · Interaction',
  headline: 'Concept',
  year: 2026,
  cardSize: 'wide',
  order: 4,
  featured: false,
  comingSoon: true,
  thumbnail: grooveCover,
  heroImage: grooveCover,
  role: 'Product & Interaction Designer',
  tools: [],
  overview: 'GROOVE is a tactile music-making device: a small handheld for capturing beats, arranging them, and swapping sounds with friends.',
  body: [
    h2('MVP 1'),
    p('Three mechanisms: **capture** your three beats (drums, melody, vocals), arrange them in a **sequencer**, and **swap** sound slots with others over NFC and Bluetooth. A rotary selector moves through the menu and the sequencer; the sound slot buttons place notes.'),
    image(grooveSketch, 'The MVP 1 sketch, with the controls and screens labelled.'),
  ],
}

export const projects: Project[] = [oneChild, foodForThought, groove]
