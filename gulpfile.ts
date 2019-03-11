import childProcess from 'child_process';
import fs from 'fs';
import { dest, series, src, task } from 'gulp';
import minimist from 'minimist';
import rmfr from 'rmfr';
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config';

const BUILD_CONTENT_OPTIONS = { mode: 'development' };
const BUILD_BINARY_OPTIONS = { linux: true, macos: false, windows: true };
const CLEAN_OPTIONS = { logs: false, dist: false, storybook: false };

const args = minimist(process.argv, {
  default: {
    ...BUILD_BINARY_OPTIONS,
    ...BUILD_CONTENT_OPTIONS,
    ...CLEAN_OPTIONS
  }
});

const clean = async (
  options: Partial<typeof CLEAN_OPTIONS> = CLEAN_OPTIONS
) => {
  type KEYS = keyof typeof CLEAN_OPTIONS;
  const all = (Object.keys(CLEAN_OPTIONS) as KEYS[])
    .map<boolean>(k => args[k] || options[k])
    .every(v => !v);
  const remove = (key: KEYS, targets: string[]) =>
    all || args[key] || options[key]
      ? Promise.all(targets.map(target => rmfr(target)))
      : undefined;
  await remove('logs', ['converage', 'logs']);
  await remove('dist', ['dist']);
  await remove('storybook', ['storybook-static']);
};

const spawn = (command: string, ...options: string[]) =>
  new Promise<void>((resolve, reject) => {
    const p = childProcess.spawn(command, options, { stdio: 'inherit' });
    p.on('close', resolve);
    p.on('error', err => {
      console.error(err);
      reject(err);
    });
  });

const tasksBeforeBuildContent = (...tasks: string[]) => {
  const production = args.mode === 'production';
  return series(
    ...(production ? ['clean'] : []),
    ...(production || !fs.existsSync('dist') ? ['build:content'] : []),
    ...tasks
  );
};

const buildWebPack = async () => {
  await clean({ dist: true });
  const config = webpackConfig({}, args);

  return src(config!.entry as string)
    .pipe(webpack(config))
    .pipe(dest(config!.output!.path as string));
};

const buildElectron = () => {
  type KEYS = keyof typeof BUILD_BINARY_OPTIONS;
  const keys = Object.keys(BUILD_BINARY_OPTIONS) as KEYS[];

  return spawn('electron-builder', ...keys.map(k => (args[k] ? `--${k}` : '')));
};

task('clean', async end => clean().then(end));
task('build:content', buildWebPack);
task('build:binary:inner', end => buildElectron().then(end));
task('build:binary', tasksBeforeBuildContent('build:binary:inner'));
task('run:electron', end => spawn('electron', './').then(end));
task('test', end => spawn('jest', '--coverage').then(end));

task('default', tasksBeforeBuildContent('run:electron'));
