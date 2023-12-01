/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: { '^\\$lib(.*)$': '<rootDir>/src/lib$1', '^\\$model(.*)$': '<rootDir>/src/model$1' },
  testPathIgnorePatterns: ["tests/readCsv/*", "tests/mock/*"]
};
