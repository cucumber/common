import { Readable } from 'stream'
import { IdGenerator } from 'cucumber-messages'

export default interface IGherkinOptions {
  defaultDialect?: string
  includeSource?: boolean
  includeGherkinDocument?: boolean
  includePickles?: boolean
  newId?: IdGenerator.NewId
  createReadStream?: (path: string) => Readable
}
