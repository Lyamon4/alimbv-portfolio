import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

function readSite(path) {
  try {
    return readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
  } catch {
    return '';
  }
}

const pages = {
  home: readSite('index.html'),
  about: readSite('about/index.html'),
  projects: readSite('projects/index.html'),
  skills: readSite('skills/index.html'),
};

const allHtml = Object.values(pages).join('\n');
const css = readSite('src/styles.css');
const viteConfig = readSite('vite.config.js');
const robots = readSite('public/robots.txt');
const sitemap = readSite('public/sitemap.xml');

test('renders the supplied scene on every full-screen page', () => {
  for (const [name, html] of Object.entries(pages)) {
    assert.match(html, /background\.gif/, `${name} is missing the animated background`);
    assert.match(html, /background-static\.png/, `${name} is missing the reduced-motion fallback`);
    assert.match(html, /class="scene-gif"/, `${name} is missing the GIF hook`);
    assert.match(html, /class="scene-static"/, `${name} is missing the static hook`);
    assert.match(html, /class="page-frame screen"/, `${name} is not a fixed screen`);
  }
});

test('turns the home page into one compact navigation screen', () => {
  for (const text of [
    'Alim Bupeshev',
    '14 y/o Developer &amp; Entrepreneur',
    'I build AI and web products independently.',
    'Currently exploring how technology can make learning, focus, and communication more human.',
  ]) {
    assert.ok(pages.home.includes(text), `missing home content: ${text}`);
  }

  for (const [href, label] of [
    ['/about/', 'about'],
    ['/projects/', 'projects'],
    ['/skills/', 'skills'],
  ]) {
    assert.match(pages.home, new RegExp(`href="${href}"[^>]*>${label}<`));
  }

  assert.match(pages.home, /class="topic-links"/);
  assert.match(pages.home, /class="home-time"[\s\S]*id="astana-time"/);
  assert.doesNotMatch(pages.home, /class="hero-meta"/);
});

test('adds the approved fundraising copy and tighter home rhythm', () => {
  assert.ok(pages.home.includes('Already raised $12k on'));
  assert.ok(pages.home.includes('In every room I walk into, I’m always the youngest.'));
  assert.match(
    pages.home,
    /href="https:\/\/neuralese\.asia" target="_blank" rel="noreferrer noopener">this thing<\/a>/,
  );
  assert.match(css, /\.home-time\s*{[\s\S]*?font-size:\s*16px;/);
  assert.match(css, /\.topic-links\s*{[\s\S]*?margin-top:\s*16px;/);
});

test('uses lowercase social labels and preserves every profile link on home', () => {
  for (const [label, href] of [
    ['telegram', 'https://t.me/Lyamon4ik'],
    ['github', 'https://github.com/Aboba22222222233'],
    ['linkedin', 'https://linkedin.com/in/alim-bupeshev-7b19b03b5'],
    ['instagram', 'https://instagram.com/Lyam.dev'],
    ['email', 'mailto:wifiskeleton300@gmail.com'],
  ]) {
    assert.ok(pages.home.includes(`href="${href}"`), `missing link: ${href}`);
    assert.ok(pages.home.includes(`>${label}</a>`), `missing lowercase label: ${label}`);
  }

  assert.match(pages.home, /target="_blank" rel="noreferrer noopener"/);
});

test('links the supplied resume beside the social profiles', () => {
  assert.ok(
    existsSync(new URL('../public/alim-bupeshev-resume.pdf', import.meta.url)),
    'missing public resume PDF',
  );
  assert.match(
    pages.home,
    /href="\/alim-bupeshev-resume\.pdf" target="_blank" rel="noreferrer noopener">resume<\/a>/,
  );
});

test('moves the biography to its own no-scroll page', () => {
  for (const text of [
    'About',
    '14 years old',
    'Republican Physics and Mathematics School',
    'I started coding at 12',
    'competitive math',
    'product',
    'Goalden',
    'basketball, planes, AI startups, LARP, and electronic music',
  ]) {
    assert.ok(pages.about.includes(text), `missing About content: ${text}`);
  }

  assert.match(pages.about, /href="\/"[^>]*>← home<\/a>/);
});

test('moves the four current projects to their own page without Neuralese', () => {
  for (const text of [
    'Projects',
    'Prism',
    'Fizmat Street Journal',
    'StriveAI',
    'Society.association',
    'AI-powered student wellbeing platform',
  ]) {
    assert.ok(pages.projects.includes(text), `missing project content: ${text}`);
  }

  assert.ok((pages.projects.match(/>CEO</g) ?? []).length >= 2, 'missing CEO roles');
  assert.ok((pages.projects.match(/>CTO</g) ?? []).length >= 2, 'missing CTO roles');
  assert.doesNotMatch(pages.projects, /Neuralese/i);
  assert.match(pages.projects, /href="\/"[^>]*>← home<\/a>/);
});

test('moves all skill groups to their own page', () => {
  for (const text of [
    'Skills',
    'Languages',
    'Frameworks',
    'Tools',
    'Other',
    'TypeScript',
    'React Native',
    'Claude Code',
    'Data visualization',
  ]) {
    assert.ok(pages.skills.includes(text), `missing skill content: ${text}`);
  }

  assert.match(pages.skills, /href="\/"[^>]*>← home<\/a>/);
});

test('removes achievements, the Prism award paragraph and contact section everywhere', () => {
  for (const removed of [
    'Achievements',
    'Get in touch',
    'Let\'s talk.',
    'My first product',
    '1st place at Zerde 2026',
    'bronze at INFOMATRIX ASIA 2026',
    'nFactorial Incubator 2026',
    'Youngest prize winner',
    '13 y/o',
    '13 years old',
  ]) {
    assert.ok(!allHtml.includes(removed), `removed content still exists: ${removed}`);
  }
});

test('locks the site to the viewport and builds all four HTML entries', () => {
  assert.match(css, /html,[\s\S]*body[\s\S]*overflow:\s*hidden/);
  assert.match(css, /\.screen[\s\S]*height:\s*100(?:s|d)?vh/);
  assert.match(css, /\.topic-links a[\s\S]*text-decoration/);

  for (const entry of ['index.html', 'about/index.html', 'projects/index.html', 'skills/index.html']) {
    assert.ok(viteConfig.includes(entry), `missing Vite entry: ${entry}`);
  }
});

test('declares self-referential canonicals and index directives on every page', () => {
  for (const [name, path] of [
    ['home', ''],
    ['about', 'about/'],
    ['projects', 'projects/'],
    ['skills', 'skills/'],
  ]) {
    assert.ok(
      pages[name].includes(`<link rel="canonical" href="https://www.alimbv.com/${path}" />`),
      `missing canonical on ${name}`,
    );
    assert.ok(
      pages[name].includes('<meta name="robots" content="index, follow, max-image-preview:large" />'),
      `missing index directive on ${name}`,
    );
  }
});

test('identifies Alim and the website with crawlable structured data', () => {
  const match = pages.home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, 'missing JSON-LD graph');

  const data = JSON.parse(match[1]);
  const website = data['@graph'].find((entry) => entry['@type'] === 'WebSite');
  const person = data['@graph'].find((entry) => entry['@type'] === 'Person');

  assert.equal(website.name, 'Alim Bupeshev');
  assert.equal(website.url, 'https://www.alimbv.com/');
  assert.equal(person.name, 'Alim Bupeshev');
  assert.equal(person.url, 'https://www.alimbv.com/');
  assert.equal(person.image, 'https://www.alimbv.com/avatar.jpg');
  assert.ok(person.sameAs.includes('https://github.com/Aboba22222222233'));
  assert.ok(person.sameAs.includes('https://linkedin.com/in/alim-bupeshev-7b19b03b5'));

  assert.ok(pages.home.includes('<meta property="og:url" content="https://www.alimbv.com/" />'));
  assert.ok(pages.home.includes('<meta property="og:image" content="https://www.alimbv.com/avatar.jpg" />'));
});

test('publishes robots.txt and a four-page canonical sitemap', () => {
  assert.equal(
    robots,
    'User-agent: *\nAllow: /\nSitemap: https://www.alimbv.com/sitemap.xml\n',
  );

  for (const url of [
    'https://www.alimbv.com/',
    'https://www.alimbv.com/about/',
    'https://www.alimbv.com/projects/',
    'https://www.alimbv.com/skills/',
  ]) {
    assert.ok(sitemap.includes(`<loc>${url}</loc>`), `missing sitemap URL: ${url}`);
  }

  assert.equal((sitemap.match(/<loc>/g) ?? []).length, 4);
});
