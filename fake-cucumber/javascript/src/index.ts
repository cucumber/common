import SupportCode from './SupportCode'
import { IdGenerator } from 'cucumber-messages'
import PerfHooksClock from './PerfHooksClock'

export = new SupportCode(IdGenerator.uuid(), new PerfHooksClock())
