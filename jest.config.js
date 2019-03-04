const convPaths = require('tsconfig-paths-jest');

const tsconfig = require('./tsconfig.json');

module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: convPaths(tsconfig),
  setupFilesAfterEnv: ['<rootDir>/enzyme.config.ts'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
