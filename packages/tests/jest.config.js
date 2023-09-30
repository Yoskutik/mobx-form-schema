const path = require('path');

const isWithCoverage = !!process.env.JEST_WITH_COVERAGE;
const isLegacyDecorators = !!process.env.LEGACY_DECORATORS;
const isDevMode = process.env.NOVE_ENV === 'development';

module.exports = {
  preset: 'ts-jest',

  globals: {
    __DEV__: isWithCoverage || isDevMode,
  },

  rootDir: isWithCoverage ? '..' : '.',

  moduleNameMapper: isWithCoverage
    ? { '@yoskutik/mobx-form-schema(.*)': '<rootDir>/mobx-form-schema/src$1' }
    : undefined,

  transform: {
    '^.+\\.[tj]s?$': ['ts-jest', {
      tsconfig: isLegacyDecorators ? './tsconfig.legacy-decorators.json' : './tsconfig.json',
      babelConfig: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      },
    }],
  },

  transformIgnorePatterns: [
    'node_modules/(?!@yoskutik/mobx-form-schema)'
  ],

  setupFiles: [isLegacyDecorators && './setup.legacy-decorators.ts'].filter(Boolean),

  coverageReporters: ['json-summary', 'text', 'lcov'],

  coverageThreshold: {
    global: {
      statements: 100,
      functions: 100,
      branches: 100,
      lines: 100,
    },
  },
};
