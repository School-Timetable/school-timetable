/* @type {import('ts-jest').JestConfigWithTsJest} */

/*
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: { '^\\$lib(.*)$': '<rootDir>/src/lib$1', '^\\$model(.*)$': '<rootDir>/src/model$1', '^\\$app(.*)$': '<rootDir>/node_modules/@sveltejs/kit/src/runtime/app$1' },
  testPathIgnorePatterns: ["tests/readCsv/*", "tests/mock/*"],
  transform: {
    "^.+\\.js$": "ts-jest",
    "^.+\\.ts$": "ts-jest",
    "^.+\\.svelte$": "svelte-jester",
  },
  transformIgnorePatterns: [
    "/node_modules/",
  ],
  moduleFileExtensions: [
    "ts",
    "js",
    "svelte"
  ],
};

*/
const esModules = ['@sveltejs/kit/src/runtime/app/', 'svelte/', 'esm-env/'].join('|');

module.exports = {
  testPathIgnorePatterns: ["tests/readCsv/*", "tests/mock/*", "tests/localStorage/*", "tests/model/timetable/time-table.*" ],
  moduleNameMapper: { '^\\$lib(.*)$': '<rootDir>/src/lib$1', '^\\$model(.*)$': '<rootDir>/src/model$1', '^\\$app/environment$': '"<rootDir>/__mocks__/$app/environment.js' },
  transform: {
      '^.+\\.(m?js|ts)$': 'babel-jest', // transpile mjs, mts, js, ts files
      '^.+\\.svelte$': 'svelte-jester',
  },
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`, '/.svelte-kit/'],
};
