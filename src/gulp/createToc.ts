import { getStorybook } from '@storybook/react';
import fs from 'fs';
import { src } from 'gulp';
import path from 'path';
import through2 from 'through2';
import vinyl from 'vinyl';
import { IInteractions, IStories, ITOC } from '~/app/stories.toc';

/** Build TOC data. */
class ScenarioBuilder {
  /** Collection of interactions scenario. */
  private scenarioMap = new Map<string, IInteractions>();

  /** Collect interactions scenario from all Storybook definitions. */
  public transform: through2.TransformFunction = async (
    chunk: vinyl,
    __,
    callback
  ) => {
    if (!chunk.isNull() && chunk.relative) {
      const src = `~/stories/${chunk.relative}`;
      const { default: story, interactions } = (await import(src)) as IStories;
      this.scenarioMap.set(story.kind, interactions);
    }
    callback(undefined, chunk);
  };

  /** Output to TOC data. */
  public flush: through2.FlushCallback = callback => {
    const stories = getStorybook().reduce<ITOC[]>((p, { kind, stories }) => {
      const interactions = this.scenarioMap.get(kind) || [];
      const row = stories.map(({ name }) => ({ kind, name, interactions }));

      return [...p, ...row];
    }, []);
    const dst = path.join(process.cwd(), '.storybook', 'public', 'toc.json');
    fs.writeFileSync(dst, JSON.stringify(stories, undefined, 2));
    callback();
  };
}

/**
 * Build TOC data for Storybook.
 * @returns Stream for the Gulp.
 */
const createToc = () => {
  const builder = new ScenarioBuilder();
  const pipe = through2.obj(builder.transform, builder.flush);

  return src('src/stories/**/*.stories.?s*').pipe(pipe);
};

export default createToc;
