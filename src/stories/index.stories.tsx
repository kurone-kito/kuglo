import { withKnobs, text } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { IInteraction } from './stories.toc';

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

// import { Button, Welcome } from '@storybook/react/demo';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// storiesOf('Button', module)
//   .add('with text', () => (
//     <Button onClick={action('clicked')}>Hello Button</Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ));
