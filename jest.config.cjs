/** @type {import('ts-jest').JestConfigWithTsJest} */
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
    ".+/node_modules/(?!(@sveltejs/kit/.+))",
    ".+/node_modules/(?!(esm-env/prod-ssr\\.js))",
  ],
  moduleFileExtensions: [
    "ts",
    "js",
    "svelte"
  ],
};

