const astanaFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Almaty',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export function formatAstanaTime(date) {
  return astanaFormatter.format(date);
}

export function startAstanaClock(
  element,
  {
    now = () => new Date(),
    setIntervalFn = globalThis.setInterval,
    clearIntervalFn = globalThis.clearInterval,
  } = {},
) {
  const update = () => {
    const current = now();
    element.textContent = formatAstanaTime(current);
    element.dateTime = current.toISOString();
  };

  update();
  const intervalId = setIntervalFn(update, 1000);

  return () => clearIntervalFn(intervalId);
}

export function setupRevealObserver({
  elements = [],
  reduceMotion = false,
  Observer = globalThis.IntersectionObserver,
} = {}) {
  const targets = Array.from(elements);

  if (reduceMotion || !Observer) {
    targets.forEach((element) => element.classList.add('is-visible'));
    return undefined;
  }

  const observer = new Observer(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    },
  );

  targets.forEach((element) => observer.observe(element));
  return observer;
}

if (typeof document !== 'undefined') {
  document.documentElement.classList.add('reveal-ready');

  const clock = document.querySelector('#astana-time');
  if (clock) startAstanaClock(clock);

  setupRevealObserver({
    elements: document.querySelectorAll('[data-reveal]'),
    reduceMotion: globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
  });
}
