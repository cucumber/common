import SupportCode from './SupportCode'
import { IdGenerator } from 'cucumber-messages'
import PerfHooksClock from './PerfHooksClock'
import { withFullStackTrace } from './ErrorMessageGenerator'

export = new SupportCode(
  IdGenerator.uuid(),
  new PerfHooksClock(),
  withFullStackTrace()
)
