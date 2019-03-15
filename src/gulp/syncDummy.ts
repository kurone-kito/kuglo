import { dest, src } from 'gulp';

/** Base directory name. */
const base = '.circleci';

/** Copies dummy files to static directory of the Storybook. */
const syncDummy = () =>
  src([`${base}/**`], { base }).pipe(dest(`.storybook/public/${base}`));

export default syncDummy;
