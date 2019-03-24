import minimist from 'minimist';
import { options as binaryBuilderOptions } from './buildElectronAsync';
import { options as cleanOptions } from './cleanAsync';
import { options as contentBuilderOptions } from './contentBuilder';

/** Combined default values. */
const defaultArgs = {
  ...binaryBuilderOptions,
  ...cleanOptions,
  ...contentBuilderOptions
};

/** Type of combined default values. */
type ArgsType = typeof defaultArgs;

/**
 * Get specific options.
 * @param options Default options.
 */
const getArgs = (options: Partial<ArgsType> = {}): ArgsType => ({
  ...defaultArgs,
  ...options,
  ...minimist(process.argv)
});

export default getArgs;
