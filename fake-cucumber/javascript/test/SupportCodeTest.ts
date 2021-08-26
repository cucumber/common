import SupportCode from '../src/SupportCode.js'
import { IdGenerator } from '@cucumber/messages'
import IncrementClock from '../src/IncrementClock.js'
import { withFullStackTrace } from '../src/ErrorMessageGenerator.js'
import assert from 'assert'
import IncrementStopwatch from '../src/IncrementStopwatch.js'

describe('SupportCode', () => {
  it('allows no tags', () => {
    const supportCode = new SupportCode(
      IdGenerator.incrementing(),
      new IncrementClock(),
      new IncrementStopwatch(),
      withFullStackTrace()
    )
    const error = new Error('In Body')
    supportCode.defineBeforeHook(null, () => {
      throw error
    })
    const supportCodeExecutor = supportCode.beforeHooks[0].match(null)
    assert.throws(() => supportCodeExecutor.execute(null), error)
  })

  it('does not define a step definition when a parameter type is not defined', () => {
    const supportCode = new SupportCode(
      IdGenerator.incrementing(),
      new IncrementClock(),
      new IncrementStopwatch(),
      withFullStackTrace()
    )
    supportCode.defineStepDefinition(null, 'a {bad} parameter type', () => {
      throw new Error('should never happen')
    })
    assert.deepStrictEqual(supportCode.stepDefinitions, [])
  })
})
