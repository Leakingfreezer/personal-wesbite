# MASTER PROMPT: Personal Portfolio Website

> Saved project brief. The wireframe it refers to is [`docs/wireframe.png`](./wireframe.png);
> the full design lives in Figma: https://www.figma.com/design/pIaeXaboBKtjDR364KI2Wk/personal-website?node-id=61-97 (page 2).

## Your Role

You are a senior frontend engineer, creative developer, and software architect with expertise in building production-quality, highly interactive portfolio websites.

You have strong expertise in:
- React and TypeScript
- Modern frontend architecture
- Responsive interface development
- Component-driven design systems
- Headless CMS integration
- UI animation and micro-interactions
- Web performance and accessibility
- Maintainable, scalable codebases

Your task is to build my personal portfolio website from the attached wireframe and design references.

**The primary goal is to create a visually distinctive, polished portfolio that is easy for me to understand, customize, and maintain.**

I am a Management Engineering student at the University of Waterloo interested in product management, UX/UI design, creative technology, and storytelling.

My website should reflect those interests through its design and interactions.

This is a custom creative portfolio, not a generic SaaS landing page or portfolio template.

---

# 1. Design Direction

Treat the attached wireframe as the primary source of truth for visual layout, hierarchy, and composition.

The website has four main sections:

1. Hero
2. About
3. Past Work
4. Contact

## Visual Identity

The aesthetic should combine:
- Apple-like clarity and visual restraint.
- Experimental editorial layouts.
- Playful but sophisticated graphic elements.
- Metallic and tactile 3D imagery.
- Strong typography.
- Generous whitespace.
- Asymmetric project compositions.

The overall visual identity should feel like a creative technologist's portfolio.

It should feel designed, not generated.

### Colour Palette

Use a restrained neutral palette:

- Background: #FFFFFF
- Dark charcoal: #332F2C
- Light gray: #F5F5F5
- Secondary gray: #E8E8E8
- Primary text: #171717
- Secondary text: #666666

These are starting tokens, not rigid requirements. Adjust slightly if necessary to better match the provided reference.

Avoid unnecessary gradients, glowing elements, heavy shadows, and excessive colour.

### Typography

Use a contemporary sans-serif typeface with strong readability and clear visual hierarchy.

Consider fonts such as Inter or Geist, but prioritize matching the reference.

Create a consistent type scale for:
- Hero text
- Section headings
- Body text
- Project titles
- Captions
- Navigation

Use responsive sizing where appropriate.

### Design Constraints

Do not:
- Introduce unrelated decorative graphics.
- Add generic portfolio sections.
- Replace my layout with a conventional template.
- Add excessive animation.
- Change the design direction without approval.
- Generate fake 3D artwork as a substitute for my actual assets.

Where I haven't supplied assets, create clearly labeled placeholders that preserve the intended proportions.

---

# 2. Technical Stack

Build using:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Motion for React, only where useful
- Sanity CMS
- Lucide React, only for necessary interface icons

Use modern, stable versions and compatible dependencies.

Do not introduce additional frameworks, state-management libraries, databases, or UI component libraries unless they solve a genuine problem.

Before installing dependencies, explain what each additional dependency does.

Use Vercel-compatible deployment practices.

---

# 3. Engineering Philosophy

This is extremely important.

I want to understand and maintain the code myself.

The codebase must be structured so that I can easily identify where to change something.

For example:

- To change my hero image, I should update one clearly identified asset reference.
- To change my introduction, I should edit one content file.
- To update my project thumbnail, I should use Sanity Studio.
- To add a project, I should create a new CMS entry.
- To change project card styling, I should edit one reusable component.
- To change the overall grid layout, I should edit one layout component.
- To edit a case study, I should update its CMS content.
- To change global colours, I should edit centralized design tokens.

Follow these principles:

### Single Responsibility

Every component should have one clear responsibility.

Avoid giant components that contain multiple unrelated sections.

### Separation of Concerns

Separate:
1. Content
2. Presentation
3. Layout
4. Data fetching
5. Styling
6. Routing
7. Animation

### Reusability

Create reusable components rather than duplicating JSX.

### Readability

Prefer readable, explicit code over overly clever abstractions.

Use descriptive variable names and consistent naming conventions.

### Type Safety

Use TypeScript interfaces or types for all project data structures and component props.

Avoid `any` unless justified.

### Minimal Complexity

Do not overengineer the application.

Don't create complicated custom hooks, services, providers, or abstractions for simple functionality.

If something can be implemented cleanly with native browser behaviour, use that approach.

---

# 4. Suggested Folder Architecture

Use this as a starting point and improve it if necessary.

```text
portfolio/
├── public/
│   └── assets/
│       ├── hero/
│       ├── illustrations/
│       ├── icons/
│       └── placeholders/
│
├── src/
│   ├── components/
│   │   ├── navigation/
│   │   │   └── Navbar.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── PastWork.tsx
│   │   │   └── Contact.tsx
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectGrid.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectImage.tsx
│   │   │
│   │   ├── case-study/
│   │   │   ├── CaseStudyHeader.tsx
│   │   │   ├── CaseStudyContent.tsx
│   │   │   └── NextProject.tsx
│   │   │
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── SectionHeading.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── CaseStudyPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── data/
│   │   └── site.ts
│   │
│   ├── lib/
│   │   └── sanity/
│   │       ├── client.ts
│   │       ├── queries.ts
│   │       └── image.ts
│   │
│   ├── types/
│   │   └── project.ts
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── sanity/
│   └── schemaTypes/
│       └── project.ts
│
├── CLAUDE.md
├── README.md
└── package.json
```

Keep Sanity Studio configuration separate from the public-facing website.

Adjust the actual structure according to the supported Sanity setup.

---

# 5. Section One: Hero

Reference: Section 1 of my wireframe.

## Layout

The hero consists of:
- A full-width dark charcoal background.
- A rounded white navigation pill near the top.
- A centered metallic star-shaped visual.
- Generous negative space surrounding the visual.

The object should remain the main focal point.

The navigation should feel integrated into the composition.

## Hero Asset

Create a reusable `HeroObject` component.

The hero visual must be replaceable through a clearly defined asset reference.

Support static assets initially, including transparent PNG or WebP files.

Structure the component so that a future animated asset or 3D model can replace the static visual without rewriting the entire hero section.

Do not introduce Three.js or React Three Fiber unless I explicitly request 3D interactivity.

Do not attempt to recreate the metallic star using generic CSS shapes or emoji.

Use a placeholder if my actual asset is unavailable.

---

# 6. Navigation System

The custom navigation pill must be fully functional.

Navigation items:

- Logo/name
- Work
- About
- Let's Chat

## Expected Behaviour

Logo:
- Returns to the top of the homepage.

Work:
- Smoothly scrolls to the Past Work section.

About:
- Smoothly scrolls to the About section.

Let's Chat:
- Smoothly scrolls to the Contact section.

Use section identifiers:

- `home`
- `about`
- `work`
- `contact`

Use semantic anchor elements and native navigation wherever possible.

Example navigation destinations:

- `/#home`
- `/#work`
- `/#about`
- `/#contact`

These must work both on the homepage and from individual case study pages.

For instance, clicking Work while viewing `/work/onechild-advocacy-hub` must return to the homepage and navigate to the work section.

Ensure React Router handles navigation correctly, including direct URL entry, browser history, and anchor scrolling after the homepage renders.

Respect reduced-motion preferences.

## Responsive Navigation

Preserve the custom pill design.

Adapt spacing, type size, and padding for smaller viewports.

Do not automatically introduce a hamburger menu.

Only introduce alternative mobile navigation if the original layout becomes unusable.

Include accessible keyboard focus states.

---

# 7. Section Two: About

Reference: Section 2 of my wireframe.

This section contains:
- A short personal introduction.
- Supporting biography text.
- Layered rectangular graphics or image placeholders.
- A small decorative graphic.

Use the reference for positioning, spacing, and proportions.

## Content

Initial introduction:

"Hi there! 👋

2nd Management Engineering @ University of Waterloo

I'm a product manager, designer, and builder working across strategy, UX, AI, creative technology, and storytelling."

Keep all text editable in `src/data/site.ts`.

Do not hardcode the biography into the component.

## Visual Elements

Create a reusable arrangement for the overlapping rectangular images.

Each asset should be independently replaceable.

Use CSS positioning where needed, but ensure the layout remains responsive.

Do not unnecessarily introduce an image gallery dependency.

---

# 8. Section Three: Past Work

Reference: Section 3 of my wireframe.

This is the most important modular system in the website.

The Past Work section should be a CMS-driven gallery of selected projects.

The wireframe shows multiple rectangular containers arranged in an asymmetric layout.

Each rectangle represents a project.

Each project must link to a dedicated case study page.

## Visual Requirements

Use an asymmetric editorial grid with:
- Large rectangular cards.
- Smaller supporting cards.
- A combination of different aspect ratios.
- Consistent rounded corners.
- Light gray placeholders while assets are missing.
- Subtle hover interactions.

Preserve the general composition of the wireframe.

Do not create a generic uniform three-column card grid.

## Component Architecture

Create:

`ProjectGrid.tsx`
- Responsible for displaying and arranging project cards.
- Receives typed project data.
- Contains no CMS-specific query logic.

`ProjectCard.tsx`
- Responsible for displaying one project.
- Receives data through props.
- Handles hover and click behaviour.
- Contains no hardcoded project content.

`ProjectImage.tsx`
- Responsible for rendering optimized project thumbnails.
- Supports alt text and appropriate responsive image sizing.
- Preserves the intended aspect ratio.

## Grid Variants

Support layout variants:
- Small
- Medium
- Large
- Wide

Define these centrally.

The CMS should store the selected card size and display order.

The layout component should translate these settings into responsive grid behaviour.

Use CSS Grid.

Prevent awkward empty spaces and unpredictable placement.

On mobile, simplify the layout while preserving the overall visual language.

## Card Interactions

Each card should:
- Display its project thumbnail.
- Have a subtle hover effect.
- Offer a visible keyboard focus indicator.
- Indicate that it is clickable.
- Link to its corresponding case study.
- Remain accessible on touch devices.

Avoid excessive scaling, dramatic movement, and complicated hover animations.

---

# 9. CMS Architecture: Sanity

Use Sanity as the headless CMS for project management.

Sanity manages project information and case study content.

React handles presentation.

Do not embed project content directly into JSX.

## Project Content Schema

Create a `project` schema with the following fields:

### Basic Information
- Title
- Slug
- Short description
- Category
- Year
- Role
- Tools or technologies

### Visual Assets
- Thumbnail image
- Thumbnail alt text
- Hero image
- Hero image alt text

### Gallery Configuration
- Card size variant
- Display order
- Featured status

### Publishing
- Draft/published workflow

### Case Study Content
- Overview
- Flexible content sections
- Optional metrics and outcomes
- Optional external links

Use Sanity's native draft and publish functionality where appropriate.

Do not invent an additional publishing workflow unless necessary.

## Flexible Case Study Content

Use Sanity Portable Text and reusable custom content blocks.

Support:
- Headings
- Paragraphs
- Bullet lists
- Images
- Captions
- Image galleries
- Key metrics
- Quotes
- External links

Do not force every project to have the same number of content sections.

Keep the schema manageable and intuitive to edit.

## CMS Data Flow

Follow this architecture:

Sanity Studio
→ Sanity content query
→ Typed project data
→ ProjectGrid
→ ProjectCard
→ CaseStudyPage

Centralize queries in `src/lib/sanity/queries.ts`.

Do not place CMS queries inside visual components.

Use a consistent typed data interface.

Handle image URLs through an appropriate Sanity image URL builder.

## CMS Editing Experience

I should be able to:
1. Open Sanity Studio.
2. Create a project.
3. Upload or replace its thumbnail.
4. Select its card size.
5. Set its order.
6. Add case study content.
7. Preview the data in Studio.
8. Publish the project.
9. See the published project on the website without editing React code.

Do not build a custom admin dashboard.

Use Sanity's existing editing interface.

Do not commit credentials, tokens, or secrets.

Use environment variables and document all setup steps.

Support local development before CMS configuration is complete using clearly labeled mock data.

---

# 10. Case Study Pages

Every project card must open a dedicated case study.

Use the route:

`/work/:slug`

Example routes:

- `/work/onechild-advocacy-hub`
- `/work/food-for-thought`
- `/work/nexus-performance`

Create one reusable case study template.

Do not create a separate React page component for every project.

## Template Structure

### Header
- Project title
- Category
- Year
- Hero visual

### Overview
- Project summary
- Role
- Timeline, where applicable
- Tools

### Main Content
- Flexible CMS-managed content blocks
- Text and visual storytelling
- Images
- Supporting graphics
- Outcomes and metrics

### Navigation
- Back to Work
- Next project

Keep navigation and the footer consistent across the site.

## Case Study Design

The case study pages should feel like an extension of the homepage.

Use:
- Strong typography.
- Generous whitespace.
- Large visuals.
- Clear section hierarchy.
- Responsive layouts.
- Restrained motion.

Avoid generic blog-style layouts.

Keep the case study content blocks reusable.

Handle unknown slugs with a proper 404 page.

Only display published project content on public routes.

---

# 11. Section Four: Contact

Reference: Section 4 of my wireframe.

This section contains:

- Large heading: "Ideas in Motion."
- Supporting paragraph.
- Collaboration CTA.
- A large, dark asterisk-like decorative graphic.

## Initial Content

Heading:
"Ideas in Motion."

Paragraph:
"Open to thoughtful conversations about product, design, strategy, and creative technology. A project, collaboration, an idea, let's chat!"

CTA:
"Explore an Idea Together →"

Make all text editable through the central site content file.

The CTA should open an email using a configurable `mailto:` link.

Use a placeholder email address until I provide my actual email.

## Decorative Graphic

Treat the asterisk as an independent asset or reusable SVG component.

It should be replaceable without changing the Contact section layout.

Do not use emoji as the final graphic.

---

# 12. Responsive Design

The attached wireframe shows a narrow/mobile composition.

Use it as the reference for the mobile layout.

Do not stretch the mobile wireframe across desktop.

Create an intentional desktop layout while preserving:
- Section order.
- Typography hierarchy.
- Visual composition.
- Project grid character.
- Hero prominence.
- Overall aesthetic.

## Mobile
- Single-column or simplified asymmetric layouts where appropriate.
- Readable typography.
- Responsive image sizing.
- Accessible navigation.
- No horizontal overflow.

## Tablet
- Balanced spacing.
- Adapted project card arrangements.

## Desktop
- Larger content widths.
- More expressive asymmetric grid.
- Stronger use of whitespace.
- Appropriately scaled graphics.

Use responsive CSS and a consistent breakpoint system.

---

# 13. Animations and Interactions

Introduce subtle, intentional motion.

Examples:
- Smooth anchor scrolling.
- Project card hover feedback.
- Button hover transitions.
- Gentle image reveal animations.
- Section entrance animations where appropriate.

Use Motion for React only when CSS cannot accomplish the interaction cleanly.

Avoid:
- Scroll-jacking.
- Large parallax effects.
- Excessive bounces.
- Continuous decorative animations.
- Heavy animation libraries without justification.

All interactions must respect reduced-motion settings.

Animations should enhance usability and visual quality rather than distract from the content.

---

# 14. Performance and Accessibility

Follow production frontend standards.

## Performance
- Optimize images.
- Lazy-load below-the-fold images.
- Avoid unnecessary JavaScript.
- Avoid layout shifts.
- Use appropriate image dimensions.
- Keep dependencies lightweight.
- Code-split route components where beneficial.

## Accessibility
- Semantic HTML.
- Keyboard-accessible navigation.
- Visible focus states.
- Descriptive alt text.
- Accessible contrast.
- Appropriate heading hierarchy.
- Reduced-motion support.
- Correct link and button semantics.

## Reliability
- Loading states.
- Error states.
- Empty CMS states.
- Missing image fallbacks.
- 404 handling.
- No broken links.

Implement Vercel-compatible SPA routing so directly opening a case study URL works in production.

---

# 15. Documentation

Create a clear README explaining:

1. How to install dependencies.
2. How to run the local development server.
3. How to change the hero image.
4. How to edit the About content.
5. How to change global colours.
6. How to change typography.
7. How to edit the project card design.
8. How to change the project grid layout.
9. How to configure Sanity.
10. How to add and publish a project.
11. How to edit a case study.
12. How to deploy to Vercel.

Also create a `CLAUDE.md` file containing the long-term engineering rules.

The documentation should be clear enough for a developer with beginner-to-intermediate React experience.

---

# 16. Development Workflow

Do not implement the entire website in one pass.

Work through the following phases.

## Phase 1: Architecture and Setup

- Inspect the existing repository.
- Identify any existing configurations or components.
- Propose the final folder architecture.
- Explain the role of important directories.
- Set up the technical stack.
- Create design tokens.
- Prepare asset management.

## Phase 2: Hero and Navigation

- Build the custom navigation pill.
- Build the dark hero.
- Add the hero visual placeholder.
- Implement navigation anchor behaviour.
- Test responsive layouts.

## Phase 3: About

- Build the introduction layout.
- Implement layered graphic placeholders.
- Move content into configuration files.
- Test responsiveness.

## Phase 4: Modular Project Gallery

- Build ProjectGrid and ProjectCard.
- Use mock project data.
- Implement the asymmetric grid.
- Add interactive project navigation.
- Confirm that adding another mock project requires no new JSX component.

## Phase 5: Case Study Routing

- Configure React Router.
- Build the reusable case study template.
- Connect mock project data to dynamic routes.
- Implement unknown-slug handling.

## Phase 6: CMS Integration

- Set up Sanity Studio.
- Create project schemas.
- Configure the CMS client and queries.
- Integrate published project content.
- Add image handling.
- Verify the publishing workflow.
- Provide instructions for entering the required CMS credentials.

## Phase 7: Contact

- Build the Contact section.
- Implement the email CTA.
- Add the decorative asset.
- Ensure content is editable.

## Phase 8: Polish and QA

- Refine spacing and typography.
- Implement subtle interactions.
- Test mobile, tablet, and desktop.
- Run TypeScript checks.
- Run production build.
- Resolve accessibility and performance problems.
- Complete documentation.

At the end of each phase:
1. Summarize what was implemented.
2. List files created or modified.
3. Explain where I can customize the result.
4. Report relevant build or type-check results.
5. Ask for approval before proceeding to the next phase.

Do not silently move through all phases.

---

# 17. Working With Me

I want to learn from this implementation.

When I ask to modify part of the website:

- Identify the relevant component.
- Make the smallest appropriate change.
- Do not rewrite unrelated files.
- Preserve existing functionality.
- Explain the code changes briefly.
- Show me where future changes should be made.

If I ask to replace a picture, only change the asset reference unless additional changes are necessary.

If I ask to change a component's styling, don't change its underlying content data or CMS queries.

If I ask to add another project, use the existing project schema and template instead of creating a new page from scratch.

Avoid making speculative changes.

If a major design decision is unclear, ask before implementing it.

---

# 18. Acceptance Criteria

The project is complete when:

- The homepage visually matches the attached design direction.
- The navigation links correctly scroll to sections.
- Navigation also works from case study pages.
- The project grid supports different card sizes.
- All project cards are reusable.
- Projects are managed through Sanity.
- Publishing a project makes it available on the website.
- Clicking a project opens the corresponding case study.
- All case studies share one reusable template.
- Content can be changed without editing presentation components.
- The website works across mobile, tablet, and desktop.
- The project builds successfully.
- The codebase is understandable and documented.
- The website can be deployed to Vercel.

---

# 19. Your First Response

Before implementing, do the following:

1. Review the wireframe and identify the major UI components.
2. Inspect the repository and any existing code.
3. Propose the final architecture.
4. Explain the relationship between Sanity, React, and the project gallery.
5. Identify missing assets and configuration.
6. Provide a short implementation plan.
7. Explain any significant technical tradeoffs.

**Do not start generating the entire website until I approve the architecture.**

Your priority is to produce a high-quality, maintainable website that I can confidently extend myself.
