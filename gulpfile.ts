import { series, task } from 'gulp';
import * as tsConfigPaths from 'tsconfig-paths';
import buildElectronAsync from './src/gulp/buildElectronAsync';
import cleanAsync from './src/gulp/cleanAsync';
import * as contentBuilder from './src/gulp/contentBuilder';
import createToc from './src/gulp/createToc';
import spawnAsync from './src/gulp/spawnAsync';
import * as storybook from './src/gulp/storybook';
import syncDummy from './src/gulp/syncDummy';
import * as testRunner from './src/gulp/testRunner';
import tsConfig from './tsconfig.json';

// XXX: Although the cause is unknown, alias can not be resolved unless paths are explicitly specified.
const { baseUrl, paths } = tsConfig.compilerOptions;
tsConfigPaths.register({ baseUrl, paths });

task('clean', end => cleanAsync().then(end));
task('clean:storybook', end => cleanAsync({ storybook: true }).then(end));
task('build:content', contentBuilder.build);
task('build:binary:inner', end => buildElectronAsync().then(end));
task('build:binary', contentBuilder.condition('build:binary:inner'));
task('run:electron', end => spawnAsync('electron ./').then(end));
task('test', end => testRunner.unitAsync().then(end));
task('test:coverage', end => testRunner.coverageAsync().then(end));
task('storybook:sync-dummy', syncDummy);
task('storybook:create-toc', createToc);
task('storybook:toc', series('storybook:create-toc', 'storybook:sync-dummy'));
task('storybook:flush', series('clean:storybook', 'storybook:toc'));
task('storybook:build', end => storybook.buildAsync().then(end));
task('storybook:rebuild', series('storybook:flush', 'storybook:build'));
task('storybook:launch', end => storybook.launchAsync().then(end));
task('storybook:start', series('storybook:toc', 'storybook:launch'));
task('default', contentBuilder.condition('run:electron'));
