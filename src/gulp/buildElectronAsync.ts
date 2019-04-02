import getArgs from './args';
import spawnAsync from './spawnAsync';

/** Default values of options for building redistributable package. */
export const options = Object.freeze({
  /** For Linux. */
  linux: true,
  /** For macOS. */
  macos: false,
  /** For Windows. */
  windows: true
});

/** Keys list of CLI options definition. */
const keys = Object.keys(options) as (keyof typeof options)[];

/** Build redistributable package. */
const buildElectronAsync = () => {
  const args = getArgs();
  const cliOptions = keys.map(key => (args[key] ? `--${key}` : ''));

  return spawnAsync('electron-builder', ...cliOptions);
};

export default buildElectronAsync;
