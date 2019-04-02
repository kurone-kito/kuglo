import noop from 'lodash.noop';
import getArgs from './args';
import spawnAsync from './spawnAsync';
import * as storybook from './storybook';

/** Command definition for BackstopJS. */
type BackstopCommand = 'reference' | 'test';

/** CLI Options definition for BackstopJS. */
interface IBackstopOptions {
  /** Command for BackstopJS. */
  backstop: BackstopCommand;
}

/** Default values of options for BackstopJS. */
export const options = Object.freeze({ backstop: 'test' } as IBackstopOptions);

/**
 * Get CLI for BackstopJS.
 * @param options command for BackstopJS, and port number.
 */
const getBackstopCLI = ({
  command,
  port
}: {
  command: BackstopCommand;
  port?: number;
}) =>
  `backstop ${command} --configPath=backstop.config.js ${
    port && port > 0 ? `--port=${port}` : ''
  }`;

/**
 * Launch the BackstopJS.
 *
 * And launch the Storybook server on dynamic port if required.
 */
const backstopAsync = async () => {
  const { exists, port } = await storybook.findServer();
  const kill = exists ? noop : await storybook.launchNoWaitAsync(port);
  await spawnAsync(getBackstopCLI({ command: getArgs().backstop, port }));
  kill();
};

export default backstopAsync;
