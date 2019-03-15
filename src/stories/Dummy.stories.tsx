import { storiesOf } from '@storybook/react';
import React from 'react';
import Dummy from '~/Dummy';
import { IInteractions } from './toc';

/** Interactions definition for BackstopJS. */
export const interactions: IInteractions = [];

export default storiesOf('Dummy', module)
  .add('with text', () => <Dummy>Hello, World!</Dummy>)
  .add('with some emoji', () => <Dummy>😀 😎 👍 💯</Dummy>);
