module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@yoskutik/mobx-form-schema(.*)': process.env.JEST_WITH_COVERAGE
      ? '<rootDir>/packages/mobx-form-schema/src$1'
      : '<rootDir>/packages/mobx-form-schema$1',
    '@yoskutik/manual-form-schema(.*)': process.env.JEST_WITH_COVERAGE
      ? '<rootDir>/packages/manual-form-schema/src$1'
      : '<rootDir>/packages/manual-form-schema$1',
  },
  transform: {
    '\\.[tj]s$': ['@swc/jest', {
      jsc: {
        parser: {
          syntax: 'typescript',
          decorators: true,
        },
        transform: {
          legacyDecorator: true,
          decoratorMetadata: true,
        },
      },
    }],
  },
  coverageReporters: ['json-summary', 'text', 'lcov'],
  roots: [
    '<rootDir>/packages/manual-form-schema',
    '<rootDir>/packages/mobx-form-schema',
    '<rootDir>/tests',
  ],
};
