const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

/** @typedef {import('webpack').Configuration} Configuration */

/**
 * @param {Configuration} __
 * @param {any} argv
 * @returns {Configuration}
 */
module.exports = (__, argv) => ({
  target: 'electron-renderer',
  entry: './src/ts/index.tsx',
  cache: true,
  devtool: argv.mode === 'development' ? 'inline-source-map' : false,
  mode: argv.mode,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc.yml'
        }
      }
    ]
  },
  plugins: [ProgressBarPlugin()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/ts/'),
      '~t': path.resolve(__dirname, 'src/__tests__/')
    },
    extensions: ['.ts', '.tsx', '.js']
  }
});
