const path = require('path');
const tsJest = require.resolve('ts-jest').replace('/dist/index.js', '');

const isWithCoverage = !!process.env.JEST_WITH_COVERAGE;
const isLegacyDecorators = !!process.env.LEGACY_DECORATORS;

module.exports = {
  preset: tsJest,

  globals: {
    __DEV__: isWithCoverage,
    'process.env.NODE_ENV': 'production',
  },

  rootDir: '..',

  moduleNameMapper: isWithCoverage
    ? { '@yoskutik/mobx-form-schema(.*)': '<rootDir>/mobx-form-schema/src$1' }
    : undefined,

  transform: {
    '^.+\\.[tj]s?$': [tsJest, {
      tsconfig: isLegacyDecorators ? './tsconfig.legacy-decorators.json' : './tsconfig.json',
      babelConfig: {
        presets: ['@babel/preset-env']
      },
    }],
  },

  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  setupFiles: [isLegacyDecorators && './tests/setup.legacy-decorators.ts'].filter(Boolean),

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
