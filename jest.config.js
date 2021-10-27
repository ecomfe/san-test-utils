/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    ".+\\.(j|t)sx?$": "ts-jest"
  },
};