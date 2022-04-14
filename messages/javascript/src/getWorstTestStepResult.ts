import { TestStepResult, TestStepResultStatus } from './messages.js'
import { millisecondsToDuration } from './TimeConversion.js'

/**
 * Gets the worst result
 * @param testStepResults
 */
export function getWorstTestStepResult(testStepResults: readonly TestStepResult[]): TestStepResult {
  return (
    testStepResults.slice().sort((r1, r2) => ordinal(r2.status) - ordinal(r1.status))[0] || {
      status: TestStepResultStatus.UNKNOWN,
      duration: millisecondsToDuration(0),
    }
  )
}

function ordinal(status: TestStepResultStatus) {
  return [
    TestStepResultStatus.UNKNOWN,
    TestStepResultStatus.PASSED,
    TestStepResultStatus.SKIPPED,
    TestStepResultStatus.PENDING,
    TestStepResultStatus.UNDEFINED,
    TestStepResultStatus.AMBIGUOUS,
    TestStepResultStatus.FAILED,
  ].indexOf(status)
}
