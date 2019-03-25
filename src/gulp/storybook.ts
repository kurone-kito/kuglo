import getPort from 'get-port';
import spawnAsync, { spawn } from './spawnAsync';

/** Default port number of Storybook server. */
const DEFAULT_PORT = 6006;

/** Options for Storybook server. */
const OPTION_PUBLIC = '--static-dir .storybook/public';

/**
 * Get CLI for launch Storybook server.
 * @param port Port number.
 */
const startStorybookCommand = (port: number = DEFAULT_PORT) =>
  `start-storybook ${OPTION_PUBLIC} --ci --port ${port}`;

/** Launch the Storybook server. */
export const launchAsync = () => spawnAsync(startStorybookCommand());

/** Build the static page of Storybook. */
export const buildAsync = () => spawnAsync(`build-storybook ${OPTION_PUBLIC}`);

/** Detect that whether to exists Storybook server on port 6006. */
export const findServer = async () => {
  const port = await getPort({ port: DEFAULT_PORT });
  const exists = port !== DEFAULT_PORT;
  return {
    /** Whether to exists Storybook server on port 6006. */
    exists,
    /** Port of the Storybook server. */
    port: exists ? DEFAULT_PORT : port
  };
};

/**
 * Launch the Storybook server.
 *
 * This function waits async for the server to start listening on specified port.
 * On the other hand, the `launchAsync` function waits at the server to closing.
 * @param port Port number.
 * @return A function for server killing.
 */
export const launchNoWaitAsync = async (port: number) => {
  const process = spawn(startStorybookCommand(port));
  while ((await getPort({ port })) === port) {
    await new Promise(r => setTimeout(r, 1000));
  }
  return () => process.kill();
};
