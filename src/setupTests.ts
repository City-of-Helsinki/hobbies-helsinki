/* eslint-disable @typescript-eslint/no-require-imports */
import "@testing-library/jest-dom/extend-expect";
import { TextEncoder, TextDecoder } from "util";

import { loadEnvConfig } from "@next/env";
// import { server } from "./tests/mocks/server";
import "./tests/initI18n";
import { toHaveNoViolations } from "jest-axe";

loadEnvConfig(process.cwd());

// Mock the fetch
// global.fetch = jest.fn();

// mock scrollTo in order to fix: "Error: Not implemented: window.scrollTo"
global.scrollTo = jest.fn();

// Mock the translations module
jest.mock("next-i18next", () => ({
  // When testing, i18n is set up with providers instead of the version that's
  // optimized for next. That's why we replace the next useTranslation with the
  // default react version.
  useTranslation: jest.requireActual('react-i18next').useTranslation,
}));

// Mock the ICS create event that fails during the tests
jest.mock("ics", () => {
  createEvent: jest.fn();
});

// Mock the NextJS-router
jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/dist/client/router", () => require("next-router-mock"));

// Extend except with jest-axe
expect.extend(toHaveNoViolations);

// To avoid error: ReferenceError: TextEncoder is not defined
// discusssed here: https://github.com/jsdom/jsdom/issues/2524
global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextDecoder = TextDecoder as any;

// global.IntersectionObserver = class IntersectionObserver {
//   readonly root: Element | Document | null;
//   readonly rootMargin: string;
//   readonly thresholds: ReadonlyArray<number>;

//   constructor() {
//     // pass
//   }

//   disconnect() {
//     return null;
//   }

//   observe() {
//     return null;
//   }

//   takeRecords() {
//     return null;
//   }

//   unobserve() {
//     return null;
//   }
// };

// Mock depended services with msw
// beforeAll(() => {
//   // Enable the mocking in tests.
//   server.listen();
// });
// afterEach(() => {
//   // Reset any runtime handlers tests may use.
//   server.resetHandlers();
// });
// afterAll(() => {
//   // Clean up once the tests are done.
//   server.close();
// });
