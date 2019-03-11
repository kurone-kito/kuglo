import path from 'path';
import webpack from 'webpack';

const staticSettings: webpack.Configuration = {
  target: 'electron-renderer',
  entry: './src/ts/index.tsx',
  cache: true,
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
  resolve: {
    // TODO: Sync from tsconfig.json
    alias: {
      '~': path.resolve(__dirname, 'src/ts/'),
      '~t': path.resolve(__dirname, 'src/__tests__/')
    },
    extensions: ['.ts', '.tsx', '.js']
  }
};

export default (
  __: webpack.Configuration,
  args: { [x: string]: any }
): webpack.Configuration => ({
  ...staticSettings,
  devtool: args.mode === 'development' ? 'inline-source-map' : false,
  mode: args.mode
});
