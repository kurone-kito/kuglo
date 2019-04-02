const request = require('sync-request');
const minimist = require('minimist');
// @ts-ignore
const json = require('./backstop.json');

const args = minimist(process.argv);
const port = args.port || 6006;

// @ts-ignore
const response = request('GET', `http://localhost:${port}/toc.json`);

/** @type {import('./src/stories/stories.toc').ITOC[]} */
const raw = [...JSON.parse(response.getBody())];
const scenarios = raw.map(
  ({
    hash,
    interaction: { name, keyPressSelectors, ...interaction },
    path
  }) => ({
    label: `${path}: ${hash}`,
    misMatchThreshold: 0.001,
    url: `http://localhost:${port}/?path=${path}`,
    readyEvent: 'storiesConfigured',
    keyPressSelectors: [
      ...(keyPressSelectors || []),
      { selector: 'iframe', keyPress: 'f' }
    ],
    // See: https://github.com/storybooks/storybook/blob/master/addons/knobs/src/registerKnobs.js#L10
    postInteractionWait: 325,
    selectors: ['iframe'],
    ...interaction
  })
);

module.exports = { engine: 'puppeteer', engineOptions: {}, scenarios, ...json };
