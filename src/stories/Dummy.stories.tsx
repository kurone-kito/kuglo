import { storiesOf } from '@storybook/react';
import React from 'react';
import Dummy from '~/app/Dummy';

export default storiesOf('Dummy', module)
  .add('with text', () => <Dummy>Hello, World!</Dummy>)
  .add('with some emoji', () => <Dummy>😀 😎 👍 💯</Dummy>);
