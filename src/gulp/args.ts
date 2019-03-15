import minimist from 'minimist';

/** CLI Options definition for building content. */
interface IContentBuildOptions {
  /** Build mode. */
  mode: 'development' | 'production';
}

/** Default values of options for building content. */
export const contentBuildOptions = Object.freeze({
  mode: 'development'
} as IContentBuildOptions);

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
  ...packageBuildOptions,
  ...contentBuildOptions,
  ...cleanOptions
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
