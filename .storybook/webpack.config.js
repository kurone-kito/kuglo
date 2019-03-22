const path = require('path');

/** @typedef {import('webpack').Configuration} Configuration */

/**
 * @param {Object} env
 * @param {Configuration} env.config
 * @returns {Configuration}
 */
module.exports = ({ config }) => {
  config.module.rules.push({
    exclude: /node_modules/,
    test: /\.tsx?$/,
    use: [
      { loader: require.resolve('ts-loader') },
      { loader: require.resolve('react-docgen-typescript-loader') }
    ]
  });
  config.performance = { hints: false };
  config.resolve.alias = {
    ...config.resolve.alias,
    '~': path.resolve(__dirname, '../src/app/'),
    '~t': path.resolve(__dirname, '../src/__tests__/')
  };
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
