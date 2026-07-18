# Home Copy Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the fixed home screen with the approved fundraising and youngest-in-the-room copy, a Neuralese link, tighter topic navigation, and a larger Astana clock.

**Architecture:** Keep the existing four-page Vite structure unchanged. Modify only the home content contract in `index.html`, its assertions in `tests/site-content.test.mjs`, and two spacing/type rules in `src/styles.css`; use the existing clock and reveal JavaScript without changes.

**Tech Stack:** Semantic HTML5, CSS, Vite, Node built-in test runner, in-app browser verification.

## Global Constraints

- The four introduction sentences remain adjacent lines inside one text block with no paragraph-sized gaps.
- Only `this thing` links to `https://neuralese.asia` and the external link uses `target="_blank" rel="noreferrer noopener"`.
- Neuralese does not appear on the Projects page.
- About, Projects, and Skills remain underlined and move closer to the introduction.
- Astana time uses the same type size as the social links.
- No divider, badge, panel, section, vertical scroll, or new JavaScript behavior is added.

---

### Task 1: Refine the Home Content and Rhythm

**Files:**
- Modify: `tests/site-content.test.mjs`
- Modify: `index.html`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: existing `.home-copy`, `.topic-links`, `.home-time`, and `.social-links` class hooks.
- Produces: one safe `https://neuralese.asia` link and exact approved copy rendered as adjacent `.home-copy` lines.

- [x] **Step 1: Write the failing content and styling assertions**

Add assertions requiring both new sentences, the safe Neuralese link, `.home-time` at `16px`, and `.topic-links` at `16px` top margin:

```js
assert.ok(pages.home.includes('Already raised $12k on'));
assert.ok(pages.home.includes('In every room I walk into, I’m always the youngest.'));
assert.match(
  pages.home,
  /href="https:\/\/neuralese\.asia" target="_blank" rel="noreferrer noopener">this thing<\/a>/,
);
assert.match(css, /\.home-time\s*{[\s\S]*?font-size:\s*16px;/);
assert.match(css, /\.topic-links\s*{[\s\S]*?margin-top:\s*16px;/);
```

- [x] **Step 2: Run the targeted test and verify RED**

Run: `npm test -- tests/site-content.test.mjs`

Expected: FAIL because the new copy/link and updated CSS values do not exist yet.

- [x] **Step 3: Add the two approved introduction lines and link**

Extend the existing `.home-copy` paragraph:

```html
<span>Already raised $12k on <a href="https://neuralese.asia" target="_blank" rel="noreferrer noopener">this thing</a>.</span>
<span>In every room I walk into, I’m always the youngest.</span>
```

- [x] **Step 4: Tighten the topic links and enlarge the Astana clock**

Update the desktop rules while preserving existing mobile alignment:

```css
.topic-links {
  margin-top: 16px;
}

.home-time {
  font-size: 16px;
}
```

- [x] **Step 5: Run automated verification**

Run: `npm test && npm run build && git diff --check`

Expected: 13 or more tests pass, Vite emits all four HTML pages, and `git diff --check` prints no errors.

- [x] **Step 6: Verify the fixed home screen in the browser**

At the current desktop viewport and at `390 × 844`, confirm the four lines, underlined Neuralese link, topic links, time, and social links are visible; confirm `document.documentElement.scrollHeight === innerHeight` and there is no horizontal overflow. Reset the viewport override and leave the browser on `/`.

- [x] **Step 7: Commit the completed change**

```bash
git add index.html src/styles.css tests/site-content.test.mjs docs/superpowers/plans/2026-07-18-home-copy-refinement.md
git commit -m "feat: refine portfolio home screen"
```
