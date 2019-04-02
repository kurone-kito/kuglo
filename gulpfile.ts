import { series, task } from 'gulp';
import * as tsConfigPaths from 'tsconfig-paths';
import backstopAsync from './src/gulp/backstopAsync';
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

task('clean', () => cleanAsync());
task('clean:dist', () => cleanAsync({ dist: true })); // Put before `contentBuilder.condition`.
task('clean:sb', () => cleanAsync({ storybook: true }));
task('build:content', contentBuilder.build); // Put before `contentBuilder.condition`.
task('build:binary', () => buildElectronAsync());
task('build:binary:full', contentBuilder.condition('build:binary'));
task('build:sb', () => storybook.buildAsync());
task('build:sb:dummy-ci', syncDummy);
task('build:sb:toc', createToc);
task('build:sb:pre', series('build:sb:dummy-ci', 'build:sb:toc'));
task('build:sb:rebuild', series('clean:sb', 'build:sb:pre', 'build:sb'));
task('run:backstop', () => backstopAsync());
task('run:backstop:approve', () => spawnAsync('backstop approve'));
task('run:backstop:rebuild', series('build:sb:pre', 'run:backstop'));
task('run:backstop:report', () => spawnAsync('backstop openReport'));
task('run:electron', () => spawnAsync('electron ./'));
task('run:sb:serve', () => storybook.launchAsync());
task('run:sb', series('build:sb:pre', 'run:sb:serve'));
task('test', () => testRunner.unitAsync());
task('test:coverage', () => testRunner.coverageAsync());

task('default', contentBuilder.condition('run:electron'));
