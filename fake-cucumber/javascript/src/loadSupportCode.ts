import SupportCode from './SupportCode'
import { IdGenerator } from '@cucumber/messages'
import {
  withFullStackTrace,
  withSourceFramesOnlyStackTrace,
} from './ErrorMessageGenerator'
import IncrementClock from './IncrementClock'
import * as dsl from './dsl'
import findSupportCodePaths from './findSupportCodePaths'
import DateClock from './DateClock'
import startIncrementStopwatch from './startIncrementStopwatch'
import startPerfHooksStopwatch from './startPerfHooksStopwatch'

export default async function loadSupportCode(
  predictableIds: boolean,
  requirePaths: ReadonlyArray<string>
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
  if (predictableIds) {
    return new SupportCode(
      IdGenerator.incrementing(),
      new IncrementClock(),
      startIncrementStopwatch,
      withSourceFramesOnlyStackTrace()
    )
  } else {
    return new SupportCode(
      IdGenerator.uuid(),
      new DateClock(),
      startPerfHooksStopwatch,
      withFullStackTrace()
    )
  }
}
