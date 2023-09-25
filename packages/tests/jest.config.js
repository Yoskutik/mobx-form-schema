const path = require('path');

// const preset = path.resolve(__dirname, 'node_modules/ts-jest');

module.exports = {
  preset: 'ts-jest',

  globals: {
    __DEV__: !!process.env.JEST_WITH_COVERAGE,
    'process.env.NODE_ENV': 'production',
  },

  rootDir: '..',

  moduleNameMapper: process.env.JEST_WITH_COVERAGE
    ? { '@yoskutik/mobx-form-schema(.*)': '<rootDir>/mobx-form-schema/src$1' }
    : undefined,

  transform: {
    '^.+\\.[tj]s?$': ['ts-jest', {
      tsconfig: process.env.LEGACY_DECORATORS ? './tsconfig.legacy-decorators.json' : './tsconfig.json',
      babelConfig: {
        presets: ['@babel/preset-env']
      },
    }],
  },

  transformIgnorePatterns: ['<rootDir>/node_modules/'],

  setupFiles: [
    process.env.LEGACY_DECORATORS && './tests/setup.legacy-decorators.ts',
  ].filter(Boolean),

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
