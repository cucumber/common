import { messages } from 'cucumber-messages'

/**
 * Looks up test results for a uri and an optional line number. Results are sorted, so the most
 * significant result is at index 0. Significance is determined by the ordinal value of the Status enum
 * (higher ordinal is more significant).
 */
export type ResultsLookup = (
  queryUri: string,
  queryLine: number | null,
) => messages.ITestResult[]

export type ResultsLookupByLine = (
  queryLine: number | null,
) => messages.ITestResult[]

/**
 * Looks up a step definition match for a uri and a line number
 */
export type StepMatchLookup = (
  queryUri: string,
  queryLine: number,
) => messages.ITestStepMatched[]

export type StepMatchLookupByLine = (
  queryLine: number,
) => messages.ITestStepMatched[]
