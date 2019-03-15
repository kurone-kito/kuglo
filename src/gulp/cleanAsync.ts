import rmfr from 'rmfr';
import getArgs, { cleanOptions } from './args';

/** CLI Options definition. */
type OptionsType = typeof cleanOptions;

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
const keys = Object.keys(cleanOptions) as Keys[];

/**
 * Remove specific files.
 * @param options Options.
 *
 * It's apply prior to CLI options.
 */
const cleanAsync = async (options: Partial<OptionsType> = cleanOptions) => {
  const args = getArgs(options);
  const all = keys.reduce((p, key) => p && !args[key], true);
  const remove = (key: Keys, targets: string[]) =>
    all || args[key] ? forceRemoveAsync(targets) : undefined;
  await remove('logs', ['coverage', 'logs']);
  await remove('dist', ['dist']);
  await remove('storybook', ['storybook-static']);
};

export default cleanAsync;
