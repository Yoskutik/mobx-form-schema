module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '@yoskutik/mobx-react-mvvm': process.env.JEST_WITH_COVERAGE ? '<rootDir>/src' : '<rootDir>/src',
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
};
