import { task } from 'gulp';
import * as tsConfigPaths from 'tsconfig-paths';
import buildElectronAsync from './src/gulp/buildElectronAsync';
import cleanAsync from './src/gulp/cleanAsync';
import * as contentBuilder from './src/gulp/contentBuilder';
import spawnAsync from './src/gulp/spawnAsync';
import tsConfig from './tsconfig.json';

// XXX: Although the cause is unknown, alias can not be resolved unless paths are explicitly specified.
const { baseUrl, paths } = tsConfig.compilerOptions;
tsConfigPaths.register({ baseUrl, paths });

task('clean', end => cleanAsync().then(end));
task('build:content', contentBuilder.build);
task('build:binary:inner', end => buildElectronAsync().then(end));
task('build:binary', contentBuilder.condition('build:binary:inner'));
task('run:electron', end => spawnAsync('electron ./').then(end));
task('test', end => spawnAsync('jest --coverage').then(end));
task('test:coverage', end =>
  spawnAsync('jest --coverage --coverageReporters=text-lcov | coveralls').then(
    end
  )
);
task('default', contentBuilder.condition('run:electron'));