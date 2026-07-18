# alimbv.com Fixed-Screen Portfolio Design

## Goal

Build a dark, extremely minimal personal portfolio for Alim Bupeshev at `alimbv.com`. The final site uses four fixed-view pages in one visual system and replaces the old opaque black presentation with a clearly visible full-screen animated pixel-art background.

## Approved Direction

The user's supplied Igor Martynyuk screenshot is the layout reference. The generated references establish a single continuous visual system across three viewports: identity/intro, projects/proof, and about/contact.

The page is not a landing page. It has no navigation bar, CTA button, bento grid, project cards, terminal styling, neon accents, or oversized marketing headline. It should read like a carefully typeset personal homepage.

## Image-to-Code Analysis

- Generated references are `1586 x 992`, a realistic 16:10 laptop viewport.
- The principal frame spans roughly 46% of the viewport width; the readable text measure stays near 600-650 px.
- Two subtle vertical rules frame the content. The content itself has approximately 60 px of inset on desktop.
- The identity block sits around the vertical center of the first viewport. The background is visible on every side and between content rows.
- Type hierarchy is restrained: name/project titles about 28-32 px, body copy 18-21 px, metadata 15-16 px. There is no giant display type.
- Primary text is warm off-white (`#f1f1ef`), supporting text is neutral gray (`#9a9996`), and separators are low-contrast white at approximately 14% opacity.
- Readability comes from a localized navy-black scrim behind the column, not an opaque panel. The edge of the scrim must fade to transparent.
- Rows are open and separated by 1 px rules. No rounded containers are used.
- Motion is limited to the source GIF, a small background drift, and staggered fade-up reveals.

## Background Asset

Use `/Users/alim/Downloads/AnasAbdin_ Photo.gif` unchanged as the visual background source.

- Source dimensions: `640 x 400`
- Frames: `20`
- Frame duration: `100 ms`
- Loop: infinite
- Rendering: fixed full viewport, `object-fit: cover`, crisp pixel scaling
- Reduced motion: use a static first-frame PNG instead of the animated GIF

The GIF must be visible immediately on load. A fixed scrim may darken the center column but cannot flatten the full frame to black.

## Page Structure

1. **Home — `/`**
   - Current circular portrait
   - `yo, I'm`, `Alim Bupeshev`, and `14 y/o Developer & Entrepreneur · Kazakhstan`
   - Four compact introduction lines, including the Neuralese fundraising link and youngest-in-the-room line
   - Underlined links to About, Projects, and Skills
   - Astana live time and lowercase Telegram, GitHub, LinkedIn, Instagram, and Email links

2. **About — `/about/`**
   - A compact biography covering RFMSH, starting code at 12, competitive math, product thinking, Prism, Goalden, and interests
   - `← home` navigation

3. **Projects — `/projects/`**
   - Prism / CEO
   - Fizmat Street Journal / CEO
   - StriveAI / CTO
   - Society.association / CTO with its Instagram link
   - No Neuralese entry and no award copy
   - `← home` navigation

4. **Skills — `/skills/`**
   - Languages, Frameworks, Tools, and Other skill groups
   - `← home` navigation

Achievements, Song of the Day, and the old contact section do not appear on any page.

## Interaction

- Live Astana time updates once per second.
- External links open in a new tab with safe `rel` attributes.
- Screen content fades upward once on load.
- Hover effects only adjust opacity/color and underline offset.
- With `prefers-reduced-motion`, disable reveal transitions and show the static background frame.

## Responsive Behavior

- Desktop: frame width `min(760px, calc(100vw - 48px))`, two vertical rules, 56-64 px inner padding.
- Tablet: 36-44 px inner padding.
- Mobile: full-width column with 22-24 px padding, one continuous center scrim, smaller 18 px body copy, projects and proof lists collapse to one column.
- First viewport uses `min-height: 100svh` and remains readable on a small laptop.
- Background positioning favors the sun and reflection instead of an arbitrary center crop.

## Accessibility and Quality

- Semantic headings and landmarks.
- Keyboard-visible focus states.
- Minimum AA contrast for all essential text.
- Descriptive image alt text and link labels.
- No autoplay audio.
- No broken or decorative-only controls.
- No horizontal overflow at 320 px width.

## Technology

Use a small Vite-powered vanilla HTML/CSS/JavaScript multipage site. React is unnecessary for this static experience. Keep dependencies minimal and deployment compatible with Vercel or any static host.

## Approved Multipage Revision

The user later approved replacing the long scrolling document with four fixed-view screens in the same browser tab:

- `/` contains the identity, two adjacent intro lines, Astana time, social links, and underlined links to About, Projects, and Skills.
- `/about/`, `/projects/`, and `/skills/` each reuse the same background, frame, typography, and reveal behavior and include a `← home` return link.
- Every screen is locked to the viewport with no vertical scrolling on desktop or mobile.
- Alim's age is 14 everywhere.
- Achievements, award copy, the complete contact section, and the Song of the Day module are removed.
- Neuralese is intentionally deferred until the user supplies project information.
- The gray separator above the social links is removed. Astana time keeps its restrained footer styling but appears directly on the home screen.
- The supplied resume PDF is published unchanged and linked as lowercase `resume` beside the social profiles.

## Approved Home Copy Refinement

The home introduction remains a single compact text block with four adjacent lines and no paragraph-sized gaps:

1. `I build AI and web products independently.`
2. `Currently exploring how technology can make learning, focus, and communication more human.`
3. `Already raised $12k on this thing.`
4. `In every room I walk into, I’m always the youngest.`

Only the words `this thing` are underlined and link to `https://neuralese.asia`. The link opens safely in a new tab. This mention does not add Neuralese to the Projects page.

The underlined About, Projects, and Skills links move closer to the introduction while remaining visually distinct from its four lines. The Astana time label increases to the same type size as the social links. No new panel, divider, badge, or content section is introduced.

## Approved Search Indexing Revision

The live Vercel configuration redirects `https://alimbv.com/` to `https://www.alimbv.com/`, so the `www` URL is the single canonical origin across HTML metadata, structured data, and the sitemap.

- Every HTML page uses a self-referential canonical URL and an explicit `index, follow` robots directive.
- The home page identifies the site and Alim Bupeshev with JSON-LD `WebSite` and `Person` nodes, including the crawlable portrait and existing public profiles in `sameAs`.
- Open Graph and Twitter metadata describe the home page consistently as Alim's personal developer portfolio.
- `/robots.txt` allows crawling and points to `/sitemap.xml`.
- `/sitemap.xml` lists `/`, `/about/`, `/projects/`, and `/skills/` as absolute canonical URLs.
- No ranking position is promised; Google Search Console submission remains a required manual indexing step after deployment.
