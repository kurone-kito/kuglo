import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
configure(() => {
  const req = require.context('~/stories', true, /.stories.[jt]sx?$/);
  req.keys().forEach(filename => req(filename).default());
}, module);
