# alimbv.com One-Page Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready static one-page personal portfolio with the supplied animated pixel-art GIF visible from first paint and every piece of meaningful content from the existing site.

**Architecture:** A semantic `index.html` contains the full page content, `src/styles.css` implements the generated image-to-code visual system, and `src/main.js` owns only live time and reveal behavior. Vite builds the site without a framework. Node's built-in test runner verifies content completeness and deterministic time formatting; browser inspection verifies visual fidelity and responsive behavior.

**Tech Stack:** Vite, semantic HTML5, modern CSS, vanilla ES modules, Node test runner.

## Global Constraints

- Use `/Users/alim/Downloads/AnasAbdin_ Photo.gif` unchanged as the animated source asset.
- Keep the full-bleed background visible immediately; only a local transparent scrim may sit behind content.
- No navigation bar, CTA button, bento grid, project cards, terminal styling, neon accents, or oversized marketing headline.
- Preserve all meaningful content and links from the previous Folk site.
- At `prefers-reduced-motion: reduce`, replace the animated GIF with a static first frame and disable reveal transitions.
- Support a 320 px viewport without horizontal overflow.

---

## File Map

- `package.json`: Vite and test scripts.
- `index.html`: metadata, fixed background layer, semantic page content, and all external links.
- `src/styles.css`: the complete responsive image-to-code visual system.
- `src/main.js`: Astana time formatter/updater and reveal observer.
- `tests/site-content.test.mjs`: required content, links, accessibility hooks, and background asset assertions.
- `tests/time.test.mjs`: deterministic `Asia/Almaty` formatting tests.
- `public/background.gif`: supplied 20-frame background.
- `public/background-static.png`: first frame for reduced motion.
- `public/avatar.jpg`: current portrait placeholder, intended for later replacement by the user.

### Task 1: Establish Testable Site Contract

**Files:**
- Create: `package.json`
- Create: `tests/site-content.test.mjs`
- Create: `tests/time.test.mjs`

**Interfaces:**
- Consumes: design requirements from `docs/superpowers/specs/2026-07-18-alimbv-onepager-design.md`
- Produces: required HTML copy contract and `formatAstanaTime(date: Date): string`

- [ ] **Step 1: Add project scripts**

Create `package.json` with `dev`, `build`, `preview`, and `test` scripts. Use Vite as the only development dependency and Node's built-in test runner.

- [ ] **Step 2: Write failing content tests**

Use a safe file reader so a missing `index.html` produces assertion failures rather than a setup error. Assert the document contains the identity, About, all four project/role entries, all achievement labels, all skill groups, contact links, background media, reduced-motion fallback hook, and module script.

- [ ] **Step 3: Write failing time tests**

Dynamically import `src/main.js` inside a `try/catch`, then assert `formatAstanaTime` exists and returns `11:12` for `2026-07-18T06:12:00Z` in `Asia/Almaty`, using a 24-hour two-digit format.

- [ ] **Step 4: Verify RED**

Run: `npm test`

Expected: assertions fail because `index.html` and `formatAstanaTime` do not exist yet.

### Task 2: Build Semantic Content and Assets

**Files:**
- Create: `index.html`
- Create: `public/background.gif`
- Create: `public/background-static.png`
- Create: `public/avatar.jpg`

**Interfaces:**
- Consumes: exact copy and URLs recorded from the Folk site
- Produces: elements `#astana-time`, `[data-reveal]`, `.scene-gif`, `.scene-static`, and semantic sections for styling and behavior

- [ ] **Step 1: Copy source assets without altering the GIF**

Copy the supplied GIF to `public/background.gif`, extract its first frame to `public/background-static.png`, and download the existing public `avatar.jpg` as a temporary portrait.

- [ ] **Step 2: Implement semantic HTML**

Create the fixed background media layer, a centered framed column, and five semantic content groups: identity/song, About, Projects, Achievements/Skills, and Contact. Use all old-site text, roles, skills, links, email, and phone. Mark external links with `target="_blank" rel="noreferrer noopener"`.

- [ ] **Step 3: Run content tests**

Run: `npm test -- tests/site-content.test.mjs`

Expected: all content assertions pass; time tests remain red.

### Task 3: Implement Deterministic Behavior with TDD

**Files:**
- Create: `src/main.js`
- Modify: `tests/time.test.mjs`

**Interfaces:**
- Produces: `formatAstanaTime(date: Date): string`, `startAstanaClock(element: HTMLElement): () => void`, and `setupRevealObserver(): void`

- [ ] **Step 1: Implement only the formatter**

Use `Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Almaty', hour: '2-digit', minute: '2-digit', hour12: false })` and export it.

- [ ] **Step 2: Verify GREEN for formatter**

Run: `npm test -- tests/time.test.mjs`

Expected: formatter tests pass.

- [ ] **Step 3: Add clock and reveal behavior**

Update the visible clock immediately and once per second. Return a cleanup callback from the clock starter. Add `.is-visible` through `IntersectionObserver`, with an immediate fallback when the API or reduced-motion preference is unavailable.

- [ ] **Step 4: Run all tests**

Run: `npm test`

Expected: all tests pass with no warnings.

### Task 4: Translate Generated References into CSS

**Files:**
- Create: `src/styles.css`

**Interfaces:**
- Consumes: the HTML class contract and the three generated image references
- Produces: desktop/tablet/mobile visual layout and reduced-motion states

- [ ] **Step 1: Implement global scene and scrim**

Use a fixed full-viewport media layer, pixelated `object-fit: cover`, carefully chosen `object-position`, a slight brightness adjustment, and a localized radial/linear scrim. Keep side artwork visibly brighter than the reading column.

- [ ] **Step 2: Implement the framed editorial column**

Use a `760px` maximum frame, two subtle vertical rules, desktop inner padding near `60px`, and open section spacing. Match the restrained generated hierarchy: 30-32 px titles, 18-20 px body text, 15-16 px metadata.

- [ ] **Step 3: Implement rows and responsive fallbacks**

Use rule-separated open project rows, two-column proof/skills groups that collapse on mobile, accessible focus styles, and no rounded card containers. At reduced motion, hide `.scene-gif`, show `.scene-static`, and remove reveal transitions.

- [ ] **Step 4: Build production output**

Run: `npm run build`

Expected: Vite emits `dist/` successfully with no compile errors.

### Task 5: Visual and Functional Verification

**Files:**
- Modify only if verification discovers a failing requirement

**Interfaces:**
- Consumes: local Vite preview
- Produces: verified desktop and mobile site

- [ ] **Step 1: Start the local server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite prints a reachable localhost URL.

- [ ] **Step 2: Verify desktop at 1440 x 900**

Confirm background visibility from first paint, the first viewport fits, GIF animates, text contrast is readable, rules align, every link is actionable, and the console has no errors.

- [ ] **Step 3: Verify mobile at 390 x 844**

Confirm no horizontal overflow, 18 px body copy, stacked rows, visible background, readable scrim, and an unclipped avatar/identity block.

- [ ] **Step 4: Verify automated checks again**

Run: `npm test && npm run build`

Expected: all tests pass and production build succeeds.

## Approved Revision Plan — Fixed Multipage Screens

- [x] Define a failing contract for four HTML entries, age 14, topic navigation, and removal of achievements/contact content.
- [x] Replace the long homepage with a fixed identity/navigation screen.
- [x] Add fixed About, Projects, and Skills pages with shared styling and `← home` navigation.
- [x] Configure Vite to emit all four HTML entries.
- [x] Verify tests, production output, in-tab navigation, and zero overflow at desktop and mobile sizes.
