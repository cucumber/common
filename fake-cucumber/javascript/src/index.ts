import SupportCode from './SupportCode'
import { IdGenerator } from 'cucumber-messages'

export = new SupportCode(IdGenerator.uuid())
