import spawnAsync from './spawnAsync';

/** Launch the Storybook server on 6006 port. */
export const launchAsync = () =>
  spawnAsync('start-storybook --ci --static-dir .storybook/public --port 6006');

/** Build the static page of Storybook. */
export const buildAsync = () =>
  spawnAsync('build-storybook --static-dir .storybook/public');
