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
      { loader: require.resolve('awesome-typescript-loader') },
      { loader: require.resolve('react-docgen-typescript-loader') }
    ]
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
