import SupportCode from '../src/SupportCode'
import { IdGenerator } from '@cucumber/messages'
import IncrementClock from '../src/IncrementClock'
import { withFullStackTrace } from '../src/ErrorMessageGenerator'
import assert from 'assert'

describe('SupportCode', () => {
  it('allows no tags', () => {
    const supportCode = new SupportCode(
      IdGenerator.incrementing(),
      new IncrementClock(),
      withFullStackTrace()
    )
    const error = new Error('In Body')
    supportCode.Before(() => {
      throw error
    })
    const supportCodeExecutor = supportCode.beforeHooks[0].match(null)
    assert.throws(() => supportCodeExecutor.execute(null), error)
  })

  it('does not define a step definition when a parameter type is not defined', () => {
    const supportCode = new SupportCode(
      IdGenerator.incrementing(),
      new IncrementClock(),
      withFullStackTrace()
    )
    supportCode.Given('a {bad} parameter type', () => {
      throw new Error('should never happen')
    })
    assert.deepStrictEqual(supportCode.stepDefinitions, [])
  })
})
