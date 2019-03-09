import { getStorybook } from '@storybook/react';
import fs from 'fs';
import path from 'path';
import '../src/stories/index.stories';

interface IStory {
  kind: string;
  name: string;
}

const stories = getStorybook().reduce<IStory[]>(
  (p, { kind, stories }) => [
    ...p,
    ...stories.map(({ name }) => ({ kind, name }))
  ],
  []
);

const dst = path.join(__dirname, 'public', 'toc.json');
fs.writeFileSync(dst, JSON.stringify(stories, undefined, 2));
