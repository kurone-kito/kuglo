import { getStorybook } from '@storybook/react';
import { toId } from '@storybook/router/dist/utils';
import fs from 'fs';
import { src } from 'gulp';
import path from 'path';
import through2 from 'through2';
import vinyl from 'vinyl';
import { IInteraction, IStories, ITOC } from '~/stories/stories.toc';

/** Build TOC data. */
class ScenarioBuilder {
  /** Collection of interactions scenario. */
  private interactionsMap = new Map<string, IInteraction[]>();

  /** Collect interactions scenario from all Storybook definitions. */
  public transform: through2.TransformFunction = async (
    chunk: vinyl,
    __,
    callback
  ) => {
    if (!chunk.isNull() && chunk.relative) {
      const src = `~/stories/${chunk.relative}`;
      const { default: story, interactions } = (await import(src)) as IStories;
      this.interactionsMap.set(story().kind, interactions || []);
    }
    callback(undefined, chunk);
  };

  /** Output to TOC data. */
  public flush: through2.FlushCallback = callback => {
    const toc = getStorybook().reduce<ITOC[]>((p, { kind, stories }) => {
      const names = stories.map(({ name }) => name);
      const interactions = (this.interactionsMap.get(kind) || []).filter(
        ({ name }) => names.some(n => name === n)
      );
      const scenarios = interactions.map(interaction => ({
        interaction,
        path: `/story/${toId(kind, interaction.name)}`
      }));

      return [...p, ...scenarios];
    }, []);
    const dst = path.join(process.cwd(), '.storybook', 'public', 'toc.json');
    fs.writeFileSync(dst, JSON.stringify(toc, undefined, 2));
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
