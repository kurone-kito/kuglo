import fs from 'fs';
import { dest, series, src } from 'gulp';
import webpack from 'webpack-stream';
import getArgs from './args';
import webpackConfig from '../../webpack.config';

/**
 * Building if necessary, then perform the specified tasks.
 * @param postTasks Tasks for after built.
 * @returns Tasks for the Gulp.
 */
export const condition = (...postTasks: string[]) => {
  const production = getArgs().mode === 'production';
  return series(
    ...(production || !fs.existsSync('dist') ? ['clean', 'build:content'] : []),
    ...postTasks
  );
};

/**
 * Build the content.
 * @returns Stream for the Gulp.
 */
export const build = () => {
  const config = webpackConfig({}, getArgs());

  return src(config!.entry as string)
    .pipe(webpack(config))
    .pipe(dest(config!.output!.path as string));
};
