import SupportCode from './SupportCode.js'
import { IdGenerator } from '@cucumber/messages'
import PerfHooksStopwatch from './PerfHooksStopwatch.js'
import {
  MakeErrorMessage,
  withFullStackTrace,
  withSourceFramesOnlyStackTrace,
} from './ErrorMessageGenerator.js'
import IncrementClock from './IncrementClock.js'
import * as dsl from './dsl.js'
import findSupportCodePaths from './findSupportCodePaths.js'
import IClock from './IClock.js'
import DateClock from './DateClock.js'
import IStopwatch from './IStopwatch.js'
import IncrementStopwatch from './IncrementStopwatch.js'

export default async function loadSupportCode(
  predictableIds: boolean,
  requirePaths: readonly string[]
): Promise<SupportCode> {
  const supportCode = makeSupportCode(predictableIds)

  dsl.setSupportCode(supportCode)
  const supportCodePaths = await findSupportCodePaths(requirePaths)
  let tsNodeRegistered = false
  for (const supportCodePath of supportCodePaths) {
    if (supportCodePath.endsWith('.ts') && !tsNodeRegistered) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const tsnode = require('ts-node')
      tsnode.register({
        transpileOnly: true,
      })
      tsNodeRegistered = true
    }
    require(supportCodePath)
  }
  return supportCode
}

function makeSupportCode(predictableIds: boolean) {
  let newId: IdGenerator.NewId
  let clock: IClock
  let stopwatch: IStopwatch
  let makeErrorMessage: MakeErrorMessage
  if (predictableIds) {
    newId = IdGenerator.incrementing()
    clock = new IncrementClock()
    stopwatch = new IncrementStopwatch()
    makeErrorMessage = withSourceFramesOnlyStackTrace()
  } else {
    newId = IdGenerator.uuid()
    clock = new DateClock()
    stopwatch = new PerfHooksStopwatch()
    makeErrorMessage = withFullStackTrace()
  }
  return new SupportCode(newId, clock, stopwatch, makeErrorMessage)
}
