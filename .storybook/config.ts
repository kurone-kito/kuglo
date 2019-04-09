import { configure } from '@storybook/react';

/**
 * Generate a comparison function for string arrays.
 * @param prioritizes List of regular expressions for preferred.
 *
 * If more than one was described, the first one takes precedence.
 */
const createComparer = (...prioritizes: RegExp[]) => (a: string, b: string) => {
  const matches = prioritizes.map(reg => ({ a: reg.test(a), b: reg.test(b) }));
  const prior = matches.reduce(
    (acc, { a: hitA, b: hitB }) => acc || +(hitA !== hitB) * (hitA ? -1 : 1),
    0
  );
  return prior || a.localeCompare(b);
};

// automatically import all files ending in *.stories.js(x), *.stories.ts(x)
configure(() => {
  const req = require.context('~/stories', true, /.stories.[jt]sx?$/);
  const files = req.keys().sort(createComparer());
  files.forEach(filename => req(filename).default());
}, module);
