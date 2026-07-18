# alimbv.com One-Page Portfolio Design

## Goal

Build a dark, extremely minimal personal one-page website for Alim Bupeshev at `alimbv.com`. The site must preserve all meaningful content from the existing Folk portfolio while replacing its opaque black presentation with a clearly visible full-screen animated pixel-art background.

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

1. **Identity / first viewport**
   - Temporary circular current portrait, easy to replace later
   - `yo, I'm` and `Alim Bupeshev`
   - `13 y/o Developer & Entrepreneur · Kazakhstan`
   - Concise introduction and Prism proof line
   - Astana live time
   - Telegram, GitHub, LinkedIn, Instagram, Email links
   - Compact `Song of the Day` row for `Night, Blooming Jasmine.` by fakemink

2. **About**
   - Preserve the complete story from the previous website: school, starting at 12, connection to competitive math, product thinking, Prism, Goalden, and interests

3. **Projects**
   - Prism / CEO
   - Fizmat Street Journal / CEO
   - StriveAI / CTO
   - Society.association / CTO with its Instagram link
   - Goalden appears in About, matching the previous site's information architecture

4. **Achievements and skills**
   - All four achievement entries from the previous website
   - Languages, Frameworks, Tools, and Other skill groups with every listed item

5. **Contact**
   - Email, phone, all social links, copyright, and `alimbv.com`

## Interaction

- Live Astana time updates once per second.
- External links open in a new tab with safe `rel` attributes.
- Section content fades upward once as it enters the viewport.
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

Use a small Vite-powered vanilla HTML/CSS/JavaScript site. React is unnecessary for this static one-page experience. Keep dependencies minimal and deployment compatible with Vercel or any static host.
