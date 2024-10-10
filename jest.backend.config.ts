/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  testEnvironment: "node",

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  silent: false,

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Setup file for TypeScript
  //setupFiles: ["<rootDir>/jest.setup.ts"], // Setup file for TypeScript
};

export default createJestConfig(config);
