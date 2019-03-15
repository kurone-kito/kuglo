import getArgs, { packageBuildOptions as options } from './args';
import spawnAsync from './spawnAsync';

/** Keys list of CLI options definition. */
const keys = Object.keys(options) as (keyof typeof options)[];

/** Build redistributable package. */
const buildElectronAsync = () => {
  const args = getArgs();
  const cliOptions = keys.map(key => (args[key] ? `--${key}` : ''));

  return spawnAsync('electron-builder', ...cliOptions);
};

export default buildElectronAsync;
