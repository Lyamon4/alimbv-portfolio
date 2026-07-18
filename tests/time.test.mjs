import assert from 'node:assert/strict';
import test from 'node:test';

async function loadSiteModule() {
  try {
    return await import('../src/main.js');
  } catch {
    return {};
  }
}

test('exports an Astana time formatter', async () => {
  const module = await loadSiteModule();
  assert.equal(typeof module.formatAstanaTime, 'function');
});

test('formats Astana time using a two-digit 24-hour clock', async () => {
  const module = await loadSiteModule();
  const date = new Date('2026-07-18T06:12:00.000Z');
  assert.equal(module.formatAstanaTime?.(date), '11:12');
});
