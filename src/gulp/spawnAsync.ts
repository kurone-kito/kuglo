import childProcess from 'child_process';

/**
 * Launch the external command.
 * @param command Command.
 * @param options Options for command.
 * @returns Object of child process.
 */
export const spawn = (command: string, ...options: string[]) =>
  childProcess.spawn(command, options, {
    shell: true,
    stdio: 'inherit'
  });

/**
 * Launch the external command and waiting exits.
 * @param command Command.
 * @param options Options for command.
 * @returns The signal string.
 *
 * Get undefined when succeeded the external command.
 */
const spawnAsync = (command: string, ...options: string[]) =>
  new Promise<string>((resolve, reject) => {
    const p = spawn(command, ...options);
    p.on('close', (code, signal) => resolve(code === 0 ? undefined : signal));
    p.on('error', err => {
      console.error(err);
      reject(err);
    });
  });

export default spawnAsync;
