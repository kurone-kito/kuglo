import spawnAsync from './spawnAsync';

/** The underlying command. */
const command = 'jest --coverage';

/** Run the unit tests. */
export const unitAsync = () => spawnAsync(command);

/** Run the coverage tests. */
export const coverageAsync = () =>
  spawnAsync(`${command} --coverageReporters=text-lcov | coveralls`);
