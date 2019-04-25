import path from 'path';
import webpack from 'webpack';

const staticSettings: webpack.Configuration = {
  cache: true,
  entry: './src/app/index.tsx',
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
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  },
  resolve: {
    // TODO: Automatically sync from tsconfig.json
    alias: {
      '~': path.resolve(__dirname, 'src/')
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  target: 'electron-renderer',
  watch: true
};

export default (
  __: webpack.Configuration,
  args: { [x: string]: any }
): webpack.Configuration => ({
  ...staticSettings,
  devtool: args.mode === 'development' ? 'inline-source-map' : false,
  mode: args.mode
});
