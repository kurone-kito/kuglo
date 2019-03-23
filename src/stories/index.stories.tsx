import { storiesOf } from '@storybook/react';
import React from 'react';
import { IInteractions } from './stories.toc';

/** Interactions definition for BackstopJS. */
export const interactions: IInteractions = [];

export default storiesOf('Welcome', module).add('to Storybook', () => (
  <div>Hello</div>
));

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
