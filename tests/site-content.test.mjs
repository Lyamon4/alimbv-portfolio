import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

function readSite() {
  try {
    return readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  } catch {
    return '';
  }
}

const html = readSite();

test('renders the supplied animated scene with a reduced-motion fallback', () => {
  assert.match(html, /background\.gif/);
  assert.match(html, /background-static\.png/);
  assert.match(html, /class="scene-gif"/);
  assert.match(html, /class="scene-static"/);
});

test('preserves the identity and story from the previous site', () => {
  for (const text of [
    'Alim Bupeshev',
    '13 y/o Developer &amp; Entrepreneur',
    'Republican Physics and Mathematics School',
    'I started coding at 12',
    'competitive math',
    'code alone isn\'t enough',
    'Goalden',
    'basketball, planes, AI startups, LARP, and electronic music',
  ]) {
    assert.ok(html.includes(text), `missing previous-site content: ${text}`);
  }
});

test('removes the song module and uses lowercase social labels', () => {
  assert.ok(!html.includes('Song of the Day'));
  assert.ok(!html.includes('Night, Blooming Jasmine.'));

  for (const label of ['telegram', 'github', 'linkedin', 'instagram', 'email']) {
    assert.ok((html.match(new RegExp(`>${label}<`, 'g')) ?? []).length >= 2, `missing lowercase label: ${label}`);
  }
});

test('preserves every project and role', () => {
  for (const text of [
    'Prism',
    'Fizmat Street Journal',
    'StriveAI',
    'Society.association',
    'AI-powered student wellbeing platform',
    'Coordinated 20+ people in the tech department',
    'Qualified for American Corner competition',
  ]) {
    assert.ok(html.includes(text), `missing project content: ${text}`);
  }

  assert.ok((html.match(/>CEO</g) ?? []).length >= 2, 'missing CEO roles');
  assert.ok((html.match(/>CTO</g) ?? []).length >= 2, 'missing CTO roles');
});

test('preserves achievements and all four skill groups', () => {
  for (const text of [
    'INFOMATRIX ASIA 2026',
    'Zerde 2026',
    'nFactorial Incubator 2026',
    'Youngest prize winner',
    'Languages',
    'Frameworks',
    'Tools',
    'Other',
    'TypeScript',
    'React Native',
    'Claude Code',
    'Data visualization',
  ]) {
    assert.ok(html.includes(text), `missing proof or skill content: ${text}`);
  }
});

test('includes semantic structure, the live time hook and safe contact links', () => {
  assert.match(html, /<main/);
  assert.match(html, /<h1[^>]*>Alim Bupeshev<\/h1>/);
  assert.match(html, /id="astana-time"/);
  assert.match(html, /<footer>[\s\S]*id="astana-time"[\s\S]*<\/footer>/);
  assert.match(html, /data-reveal/);
  assert.match(html, /src="\/src\/main\.js"/);

  for (const href of [
    'https://t.me/Lyamon4ik',
    'https://github.com/Aboba22222222233',
    'https://linkedin.com/in/alim-bupeshev-7b19b03b5',
    'https://instagram.com/Lyam.dev',
    'mailto:wifiskeleton300@gmail.com',
    'tel:+77016755633',
  ]) {
    assert.ok(html.includes(`href="${href}"`), `missing link: ${href}`);
  }

  assert.match(html, /target="_blank" rel="noreferrer noopener"/);
});
