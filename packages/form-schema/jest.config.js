module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@yoskutik/mobx-form-schema/dist/enable-es-decorators-types': process.env.JEST_WITH_COVERAGE
      ? '<rootDir>/src/enable-legacy-experimental-decorators-types'
      : '<rootDir>/dist/enable-legacy-experimental-decorators-types',
    '@yoskutik/mobx-form-schema(.*)': process.env.JEST_WITH_COVERAGE
      ? '<rootDir>/src$1'
      : '<rootDir>/dist$1',
  },
  transform: {
    '^.+\\.[tj]s?$': ['ts-jest', {
      tsconfig: process.env.ES6_DECORATORS ? './tests/tsconfig.es6-decorators.json' : './tests/tsconfig.json',
      babelConfig: {
        presets: ['@babel/preset-env']
      },
    }],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  setupFiles: [
    '<rootDir>/tests/setup.ts',
    process.env.ES6_DECORATORS && './tests/setup.es6-decorators.ts',
  ].filter(Boolean),
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
