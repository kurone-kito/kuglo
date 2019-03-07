import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
import React from 'react';

import Dummy from '~/Dummy';

storiesOf('Welcome', module).add('to Storybook', () => <div>Hello</div>);

storiesOf('Dummy', module)
  .add('with text', () => <Dummy>Hello Headming</Dummy>)
  .add('with some emoji', () => <Dummy>😀 😎 👍 💯</Dummy>);

// import { Button, Welcome } from '@storybook/react/demo';

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
