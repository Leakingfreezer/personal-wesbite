import type { Project, ProjectImage } from '../types/project'
import { bullets, flow, flowLanes, gallery, h2, h3, image, metrics, p, quote, table } from './caseStudyBlocks'

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

/* ── Food for Thought ──────────────────────────────────────────────────── */
// Every `undefined` image below shows a grey placeholder until a real event photo is added.

const fftWorkshop: ProjectImage = {
  url: '/assets/projects/food-for-thought-workshop-1200.webp',
  srcSet: '/assets/projects/food-for-thought-workshop-1200.webp 1200w, /assets/projects/food-for-thought-workshop-2400.webp 2400w',
  alt: 'A Food for Thought cooking workshop in a community hall: young people in aprons work at long tables with portable stoves, pickled carrots and grilled meat, while two participants in front fill bánh mì baguettes.',
  width: 4896,
  height: 3672,
}

const fftPolaroids: ProjectImage = {
  url: '/assets/projects/food-for-thought-polaroids.webp',
  alt: 'Four instant-film photos on red leather from a cooking workshop: participants in aprons stirring pans at the stove, and two friends posing with peace signs.',
  width: 590,
  height: 787,
}

const foodForThought: Project = {
  slug: 'food-for-thought',
  title: 'Food for Thought',
  shortDescription:
    'Founded and scaled a $15K-funded youth initiative, designing and delivering hands-on cultural and creative experiences for young people.',
  category: 'Product Management · Service Design',
  headline: 'Launch',
  year: 2025,
  cardSize: 'wide',
  order: 2,
  featured: false,
  comingSoon: true,
  thumbnail: fftWorkshop,
  heroImage: fftWorkshop,
  role: 'Founder & Project Lead',
  timeline: 'Aug 2024 – Nov 2025',
  tools: [],
  overview:
    'Food for Thought began as a youth cooking initiative in Toronto and grew into a recurring community program that brings young people together through food, culture, and shared creative experiences. I led it from concept to execution: I secured over $15,000 in grant funding and coordinated budgets, partners, facilitators, volunteers, venues, procurement, marketing, and workshop delivery. We delivered 10 workshops in under two months, with over 300 participant-attendances. I had to design not only the participant experience, but the operating system behind it.',
  body: [
    metrics([
      ['$15K+', 'grant funding secured'],
      ['10', 'workshops delivered'],
      ['300+', 'participant-attendances (not unique participants)'],
      ['<2', 'months to deliver all ten workshops'],
    ]),

    h2('A place to make, eat, and belong'),
    p('Food for Thought started as a concept for a youth cooking and nutrition club.'),
    p('Early conversations with students and teachers surfaced challenges around food costs, accessible learning, and opportunities for youth to connect. A community dumpling-making experience then showed how food could carry cultural storytelling and social connection.'),
    p('That reframed the project: from teaching cooking skills to designing a broader community experience.'),
    flow('The opportunity grew from a class into a service.', [
      ['Initial idea', 'Run youth cooking classes.'],
      ['User needs', 'Food costs, accessible learning, and ways for youth to connect.'],
      ['Expanded service', 'Accessible experiences connecting skills, culture, and community.'],
    ]),
    p('**Product direction:** a recurring workshop model that could be delivered across different activities.'),

    h2('Turning an idea into a deliverable'),
    p('To make the concept executable, I had to define who it was for and what it had to achieve, then plan everything needed to deliver it:'),
    ...bullets([
      'Defining the target audience and setting program objectives.',
      'Preparing grant proposals and securing funding.',
      'Planning workshop formats, and identifying venues and facilitators.',
      'Estimating attendance and material needs.',
      'Coordinating volunteers and stakeholders, and building an execution timeline.',
    ]),
    flow('Moving from an initial community idea to an operationally feasible program.', [
      'Discovery & concept',
      'Funding & scope',
      'Partners & resources',
      'Program delivery',
      'Feedback & iteration',
    ]),

    h2('Key product and operational decisions'),
    table(
      'Decisions at a glance. The last column is the intended impact, not a measured result.',
      ['Problem', 'Constraint', 'Decision', 'Intended impact'],
      [
        ['High participation barriers', 'Limited participant resources', 'Free workshops', 'Accessible participation'],
        ['Workshops need meaningful interaction', 'Higher facilitation complexity', 'Collaborative experiences', 'Stronger community connection'],
        ['Multiple workshops require coordination', 'Tight timeline and small team', 'Standardized operating workflows', 'Repeatable delivery'],
        ['Organizing team shrank', 'Reduced staffing capacity', 'Reallocated ownership', 'Protect the delivery schedule'],
      ],
    ),
    h3('01 — Accessibility over paid programming'),
    p('We designed free community workshops rather than charging registration fees, because cost was a known barrier to participation and accessibility was central to the initiative’s purpose.'),
    ...bullets([
      '**Constraint:** limited funding and rising material costs.',
      '**Decision:** secure grants and plan workshop budgets around accessible participation.',
      '**Trade-off:** greater reliance on funding and strict cost management.',
      '**Goal:** reduce barriers to youth participation.',
    ]),
    h3('02 — Shared experiences over traditional instruction'),
    p('We designed hands-on, collaborative activities rather than lecture-based sessions, because the program aimed to create both practical learning and social connection.'),
    ...bullets([
      '**Constraint:** collaborative workshops need more materials, facilitators, and setup.',
      '**Decision:** build in shared making, eating, discussion, and creative activities.',
      '**Trade-off:** more operational complexity.',
      '**Goal:** experiences where youth could learn and connect.',
    ]),
    h3('03 — Repeatable operations over one-off planning'),
    p('We standardized workshop planning rather than rebuilding the process for every event, because delivering 10 workshops in under two months required consistent coordination across suppliers, facilitators, and volunteers.'),
    ...bullets([
      '**Constraint:** limited organizing capacity and multiple delivery dependencies.',
      '**Decision:** repeatable workshop briefs, checklists, assignments, and preparation workflows.',
      '**Trade-off:** more process design up front.',
      '**Goal:** less coordination overhead and lower delivery risk.',
    ]),
    h3('04 — Clear ownership over the original team structure'),
    p('When the core organizing team went from six people to three, we reallocated responsibilities rather than keeping the original role structure.'),
    ...bullets([
      '**Constraint:** reduced team capacity during active delivery.',
      '**Decision:** clarify ownership, redistribute tasks, and run preparation in parallel.',
      '**Trade-off:** more responsibility concentrated on fewer organizers.',
      '**Goal:** protect delivery commitments while keeping program quality.',
    ]),

    h2('The workshop wasn’t the entire experience'),
    p('I designed the participant journey beyond the activity itself: how people found out about a workshop, registered, arrived, took part, and connected afterward.'),
    flow('The participant journey.', [
      ['Discover', 'Hear about a workshop.'],
      ['Register', 'Sign up for a spot.'],
      ['Arrive', 'Find the venue and check in.'],
      ['Settle in', 'Meet the group and the facilitator.'],
      ['Make together', 'The hands-on activity.'],
      ['Eat & share', 'Share what was made.'],
      ['Stay', 'Keep the conversation going.'],
      ['Return', 'Come back for the next one.'],
    ]),
    quote('The activity was the reason people arrived, but the surrounding experience created the opportunities for connection.', 'Key insight'),
    gallery([fftPolaroids, undefined], 'Instant photos from a cooking workshop. [Photo needed: a shared meal or group moment.]'),

    h2('An operating system for ten workshops'),
    p('Behind every workshop ran the same backstage process. Each step depended on the one before it, and all of it existed to make the frontstage experience feel simple.'),
    flowLanes('A service blueprint: what participants saw, and what made it possible.', [
      ['Frontstage — what participants experience', ['Discover', 'Register', 'Arrive', 'Participate', 'Share', 'Leave feedback']],
      [
        'Backstage — what makes it possible',
        [
          'Program planning',
          'Workshop brief',
          'Facilitator confirmation',
          'Attendance forecasting',
          'Resource estimation',
          'Procurement',
          'Venue setup',
          'Volunteer assignment',
          'Delivery',
          'Feedback review',
        ],
      ],
    ]),
    h3('Five workstreams, one timeline'),
    table(
      'Every workstream fed into one shared delivery timeline.',
      ['Workstream', 'What it covered'],
      [
        ['Programming', 'Workshop concepts and facilitators'],
        ['Operations', 'Venues, supplies, equipment, and timelines'],
        ['People', 'Volunteers, participant communications, and stakeholder coordination'],
        ['Finance', 'Budget allocation, procurement, and grant reporting'],
        ['Marketing', 'Outreach, registration, and promotional content'],
      ],
    ),
    h3('What running it took'),
    ...bullets([
      '**Scope and resource allocation:** fitting ten workshops’ materials, venues, and supplies inside one fixed grant budget.',
      '**Dependency mapping:** the backstage steps ran in order, so facilitators were confirmed before attendance was forecast, and quantities were estimated before anything was bought.',
      '**Process standardization:** the same workshop brief, checklist, and preparation workflow for every session.',
      '**Stakeholder coordination:** facilitators, volunteers, venues, suppliers, and funders working to one timeline.',
      '**Operational risk management:** below.',
    ]),

    h2('Designing for what happens when plans fail'),
    p('During one cooking workshop, an ingredient shortage threatened the activity. The team worked around it during the event to keep things moving. Afterward, I revised the preparation procedures and quantity-planning steps to make a repeat less likely.'),
    flow('A continuous-improvement loop: each fix fed back into preparation for the next workshop.', [
      'Issue identified',
      'Immediate workaround',
      'Root cause review',
      'SOP update',
      'Future risk mitigation',
    ]),
    h3('Team capacity changed mid-delivery'),
    ...bullets([
      '**Situation:** the organizing team went from six people to three.',
      '**Action:** reassigned responsibilities and clarified ownership.',
      '**Outcome:** the delivery schedule held.',
      '**Lesson:** clear accountability matters more as resources get tighter.',
    ]),

    h2('What we deliberately left out'),
    p('Prioritizing also meant deciding what not to build for the initial program. These calls were made early, weighing the team’s capacity against the return each would bring:'),
    ...bullets([
      '**Expansion into additional communities.**',
      '**Custom event registration software.**',
      '**Large-scale automated operations:** for a program of this size, the return didn’t justify the people-hours it would take.',
    ]),
    p('**The principle:** focus resources on delivering a repeatable, accessible experience before expanding the infrastructure around it.'),

    h2('Ten workshops. One community.'),
    p('Cooking, pottery painting, and floral workshops: different activities, all running on the same service model.'),
    gallery([undefined, undefined], '[Photos needed: cooking workshop, with participants making food together.]'),
    gallery([undefined, undefined], '[Photos needed: pottery painting and floral workshops, and what participants made.]'),

    h2('A concept became a delivered community program'),
    p('Alongside the results above, the project delivered:'),
    ...bullets([
      'A funded community workshop series.',
      'Multiple practical and creative experiences.',
      'Coordination of facilitators and volunteers.',
      'Repeatable program preparation processes.',
      'Event delivery and operating documentation.',
    ]),

    h2('Reflection'),
    p('I learned that the participant experience depends on everything happening behind it. What people see might be a group cooking together, but its quality depends on decisions made much earlier: budgeting, procurement, venue requirements, preparation timelines, staffing, and participant communications.'),
    p('Food for Thought taught me to treat community programming as a service, with interconnected users, resources, and operational dependencies.'),
    quote('Designing a great experience means designing both the interaction and the system that makes it possible.'),
  ],
}

export const projects: Project[] = [oneChild, foodForThought]
