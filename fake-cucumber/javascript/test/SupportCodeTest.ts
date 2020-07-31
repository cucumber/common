import SupportCode from '../src/SupportCode'
import { IdGenerator } from '@cucumber/messages'
import IncrementClock from '../src/IncrementClock'
import { withFullStackTrace } from '../src/ErrorMessageGenerator'
import assert from 'assert'
import IncrementStopwatch from '../src/IncrementStopwatch'

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
