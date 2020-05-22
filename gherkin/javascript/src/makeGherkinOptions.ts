import { IdGenerator } from '@cucumber/messages'
import IGherkinOptions from './IGherkinOptions'

const defaultOptions: IGherkinOptions = {
  defaultDialect: 'en',
  includeSource: true,
  includeGherkinDocument: true,
  includePickles: true,
  newId: IdGenerator.uuid(),
}

export default function gherkinOptions(options: IGherkinOptions) {
  return { ...defaultOptions, ...options }
}
