import { configure } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../src/stories', true, /.stories.[jt]sx?$/);
configure(() => req.keys().forEach(filename => req(filename)), module);
