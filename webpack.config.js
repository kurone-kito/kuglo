const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  target: 'node',
  entry: './src/ts/index.tsx',
  cache: true,
  mode: 'development', // 'production' | 'development' | 'none'
  devtool: 'source-map',
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
};
