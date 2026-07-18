import assert from 'node:assert/strict';
import test from 'node:test';

async function loadSiteModule() {
  try {
    return await import('../src/main.js');
  } catch {
    return {};
  }
}

test('starts the Astana clock immediately and returns interval cleanup', async () => {
  const module = await loadSiteModule();
  const element = {
    textContent: '',
    dateTime: '',
  };
  let intervalDelay;
  let clearedId;

  const cleanup = module.startAstanaClock?.(element, {
    now: () => new Date('2026-07-18T06:12:00.000Z'),
    setIntervalFn: (_callback, delay) => {
      intervalDelay = delay;
      return 17;
    },
    clearIntervalFn: (id) => {
      clearedId = id;
    },
  });

  assert.equal(element.textContent, '11:12');
  assert.equal(element.dateTime, '2026-07-18T06:12:00.000Z');
  assert.equal(intervalDelay, 1000);
  assert.equal(typeof cleanup, 'function');
  cleanup();
  assert.equal(clearedId, 17);
});

test('reveals every element immediately when reduced motion is requested', async () => {
  const module = await loadSiteModule();
  const revealed = [];
  const elements = [1, 2].map((id) => ({
    id,
    classList: {
      add(className) {
        revealed.push([id, className]);
      },
    },
  }));

  module.setupRevealObserver?.({
    elements,
    reduceMotion: true,
    Observer: undefined,
  });

  assert.deepEqual(revealed, [
    [1, 'is-visible'],
    [2, 'is-visible'],
  ]);
});

test('observes sections and stops observing them after they become visible', async () => {
  const module = await loadSiteModule();
  const calls = [];
  const element = {
    classList: {
      add(className) {
        calls.push(['add', className]);
      },
    },
  };

  class FakeObserver {
    constructor(callback, options) {
      this.callback = callback;
      calls.push(['options', options]);
    }

    observe(target) {
      calls.push(['observe', target]);
      this.callback([{ target, isIntersecting: true }], this);
    }

    unobserve(target) {
      calls.push(['unobserve', target]);
    }
  }

  module.setupRevealObserver?.({
    elements: [element],
    reduceMotion: false,
    Observer: FakeObserver,
  });

  assert.ok(calls.some(([type]) => type === 'observe'));
  assert.ok(calls.some(([type, value]) => type === 'add' && value === 'is-visible'));
  assert.ok(calls.some(([type]) => type === 'unobserve'));
});
