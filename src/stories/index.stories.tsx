import { withKnobs, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { IInteraction } from './stories.toc.d';

/** Interactions definition for BackstopJS. */
export const interactions: IInteraction[] = [
  {
    name: 'to Storybook',
    keyPressSelectors: [{ selector: '#title', keyPress: 'こんにちは' }]
  },
  {
    name: 'to Storybook',
    keyPressSelectors: [{ selector: '#title', keyPress: '您好' }]
  }
];

export default () =>
  storiesOf('Welcome', module)
    .addDecorator(withKnobs)
    .add('to Storybook', () => <div>{text('title', 'Hello')}</div>);
