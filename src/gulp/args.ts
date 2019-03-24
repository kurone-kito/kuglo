import minimist from 'minimist';
import { options as binaryBuilderOptions } from './buildElectronAsync';
import { options as contentBuilderOptions } from './contentBuilder';

/** Default values of options for building redistributable package. */
export const packageBuildOptions = Object.freeze({
  /** For Linux. */
  linux: true,
  /** For macOS. */
  macos: false,
  /** For Windows. */
  windows: true
});

/** Default values of options for cleaning. */
export const cleanOptions = Object.freeze({
  /** Remove the logs. */
  logs: false,
  /** Remove the built data. */
  dist: false,
  /** Remove the built data of Storybook. */
  storybook: false
});

/** Combined default values. */
const defaultArgs = {
  ...binaryBuilderOptions,
  ...contentBuilderOptions,
  ...cleanOptions,
  ...packageBuildOptions
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
