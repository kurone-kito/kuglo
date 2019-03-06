const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = (env, argv) => ({
  target: 'electron-renderer',
  entry: './src/ts/index.tsx',
  cache: true,
  devtool: argv.mode === 'development' ? 'source-map' : 'none',
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
