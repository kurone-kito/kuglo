const request = require('sync-request');
const queryString = require('query-string');
const minimist = require('minimist');

const args = minimist(process.argv);
const port = args.port || 6006;

/**
 * Create URL to stories.
 * @param {Object} options
 * @param {string} options.kind
 * @param {string} options.name
 */
const createUrl = ({ kind: selectedKind, name: selectedStory }) => {
  const query = queryString.stringify({ selectedKind, selectedStory });

  return `http://localhost:${port}/iframe.html?${query}`;
};
// @ts-ignore
const body = request('GET', `http://localhost:${port}/toc.json`).getBody();
const scenarios = [...JSON.parse(body)].map(row => ({
  label: JSON.stringify(row),
  misMatchThreshold: 0.01,
  url: createUrl(row)
}));

module.exports = {
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
  engine: 'puppeteer',
  engineOptions: {},
  id: 'kuglo',
  onReadyScript: 'puppet/onReady.js',
  paths: {
    bitmaps_reference: 'backstop_data/bitmaps_reference',
    bitmaps_test: 'backstop_data/bitmaps_test',
    engine_scripts: 'backstop_data/engine_scripts',
    html_report: 'backstop_data/html_report',
    ci_report: 'backstop_data/ci_report'
  },
  report: ['browser'],
  scenarios,
  viewports: [
    { label: '480p', width: 854, height: 480 },
    { label: '1080p', width: 1920, height: 1080 }
  ]
};
