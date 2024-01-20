/* @type {import('ts-jest').JestConfigWithTsJest} */

const esModules = ['@sveltejs/kit/src/runtime/app/', 'svelte/', 'esm-env/'].join('|');

module.exports = {
  testPathIgnorePatterns: ["tests/model/timetable/time-table.*", "tests/readCsv/subject.test.ts"],
  moduleNameMapper: { '^\\$lib(.*)$': '<rootDir>/src/lib$1', '^\\$model(.*)$': '<rootDir>/src/model$1', '^\\$app/environment$': '"<rootDir>/__mocks__/$app/environment.js' },
  transform: {
      '^.+\\.(m?js|ts)$': 'babel-jest', // transpile mjs, mts, js, ts files
      '^.+\\.svelte$': 'svelte-jester',
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`, '/.svelte-kit/'],
  testEnvironment: 'jsdom',
};
