# Search Indexing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Alim's portfolio crawlable, canonical, and clearly associated with the query `Alim Bupeshev`.

**Architecture:** Keep the existing static Vite multipage architecture. Add crawl metadata directly to each HTML head, add `WebSite` and `Person` JSON-LD to the home page, and publish static `robots.txt` and `sitemap.xml` files through Vite's `public/` directory.

**Tech Stack:** Semantic HTML, JSON-LD/Schema.org, XML sitemap protocol, Vite public assets, Node built-in test runner.

## Global Constraints

- Use `https://www.alimbv.com/` as the canonical origin because Vercel redirects the apex domain to `www`.
- Keep all four pages indexable and include only their canonical URLs in the sitemap.
- Do not promise or encode a guaranteed search ranking.
- Do not add hidden keyword text, duplicate copy, or keyword stuffing.
- Preserve the fixed no-scroll visual layout and existing interaction behavior.

---

### Task 1: Define the Search Indexing Contract

**Files:**
- Modify: `tests/site-content.test.mjs`

**Interfaces:**
- Consumes: the four existing HTML entries and Vite's `public/` asset convention.
- Produces: assertions for canonical URLs, robots directives, structured data, `robots.txt`, and `sitemap.xml`.

- [x] **Step 1: Add failing assertions**

Require the home page to contain `WebSite` and `Person` JSON-LD, require self-referential canonicals on all pages, and require these crawler files:

```txt
User-agent: *
Allow: /
Sitemap: https://www.alimbv.com/sitemap.xml
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.alimbv.com/</loc></url>
  <url><loc>https://www.alimbv.com/about/</loc></url>
  <url><loc>https://www.alimbv.com/projects/</loc></url>
  <url><loc>https://www.alimbv.com/skills/</loc></url>
</urlset>
```

- [x] **Step 2: Verify RED**

Run: `npm test -- tests/site-content.test.mjs`

Expected: FAIL because the canonical links, structured data, and crawler files do not exist.

### Task 2: Implement Canonical Metadata and Crawler Files

**Files:**
- Modify: `index.html`
- Modify: `about/index.html`
- Modify: `projects/index.html`
- Modify: `skills/index.html`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

**Interfaces:**
- Consumes: exact canonical URLs asserted in Task 1.
- Produces: static head metadata and two public crawler endpoints copied unchanged into `dist/`.

- [x] **Step 1: Add home metadata and JSON-LD**

Add a self-canonical, index directive, consistent Open Graph/Twitter URLs, and an `application/ld+json` graph containing:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.alimbv.com/#website",
      "url": "https://www.alimbv.com/",
      "name": "Alim Bupeshev",
      "alternateName": "alimbv.com"
    },
    {
      "@type": "Person",
      "@id": "https://www.alimbv.com/#person",
      "name": "Alim Bupeshev",
      "url": "https://www.alimbv.com/",
      "image": "https://www.alimbv.com/avatar.jpg",
      "jobTitle": "Developer & Entrepreneur"
    }
  ]
}
```

- [x] **Step 2: Add self-canonicals to topic pages**

Use `https://www.alimbv.com/about/`, `https://www.alimbv.com/projects/`, and `https://www.alimbv.com/skills/` respectively, plus `index, follow, max-image-preview:large`.

- [x] **Step 3: Create crawler files**

Create `public/robots.txt` and `public/sitemap.xml` with the exact content from Task 1.

- [x] **Step 4: Verify GREEN and production output**

Run: `npm test && npm run build && git diff --check`

Expected: all tests pass, Vite emits all pages plus `dist/robots.txt` and `dist/sitemap.xml`, and the diff check is clean.

- [x] **Step 5: Commit and publish**

```bash
git add index.html about/index.html projects/index.html skills/index.html public/robots.txt public/sitemap.xml tests/site-content.test.mjs docs/superpowers/specs/2026-07-18-alimbv-onepager-design.md docs/superpowers/plans/2026-07-18-search-indexing.md
git commit -m "feat: add search indexing metadata"
git push origin HEAD:main
```
