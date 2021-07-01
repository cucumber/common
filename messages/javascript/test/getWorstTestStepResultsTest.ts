import { getWorstTestStepResult } from '../src/getWorstTestStepResult'
import { TestStepResultStatus } from '../src/messages'
import assert from 'assert'

describe('getWorstTestStepResult', () => {
  it('returns a FAILED result for PASSED,FAILED,PASSED', () => {
    const result = getWorstTestStepResult([
      {
        status: TestStepResultStatus.PASSED,
        duration: { seconds: 0, nanos: 0 },
      },
      {
        status: TestStepResultStatus.FAILED,
        duration: { seconds: 0, nanos: 0 },
      },
      {
        status: TestStepResultStatus.PASSED,
        duration: { seconds: 0, nanos: 0 },
      },
    ])
    assert.strictEqual(result.status, TestStepResultStatus.FAILED)
  })
})
