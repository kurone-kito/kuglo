import rmfr from 'rmfr';
import getArgs from './args';

/** Default values of options for cleaning. */
export const options = Object.freeze({
  /** Remove the logs. */
  logs: false,
  /** Remove the built data. */
  dist: false,
  /** Remove the built data of Storybook. */
  storybook: false
});

/** CLI Options definition. */
type OptionsType = typeof options;

/** Keys definition of CLI options definition. */
type Keys = keyof OptionsType;

/**
 * Remove forcibly the listed files.
 * @param targets Files or directories list.
 */
const forceRemoveAsync = (targets: string[]) =>
  Promise.all(
    targets.map(async target => {
      await rmfr(target);
      console.debug(`Removed: ${target}`);
    })
  );

/** Keys list of CLI options definition. */
const keys = Object.keys(options) as Keys[];

/**
 * Remove specific files.
 * @param o Options.
 *
 * It's apply prior to CLI options.
 */
const cleanAsync = async (o: Partial<OptionsType> = options) => {
  const args = getArgs(o);
  const all = keys.reduce((p, key) => p && !args[key], true);
  const remove = (key: Keys, targets: string[]) =>
    all || args[key] ? forceRemoveAsync(targets) : undefined;
  await remove('logs', ['coverage', 'logs']);
  await remove('dist', ['dist']);
  await remove('storybook', [
    'storybook-static',
    '.storybook/public/.circleci',
    '.storybook/public/toc.json'
  ]);
};

export default cleanAsync;
