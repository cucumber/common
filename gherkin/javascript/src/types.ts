import { uuid } from './IdGenerator'

export interface IGherkinOptions {
  defaultDialect?: string
  includeSource?: boolean
  includeGherkinDocument?: boolean
  includePickles?: boolean
  newId?: NewId
}

const defaultOptions: IGherkinOptions = {
  defaultDialect: 'en',
  includeSource: true,
  includeGherkinDocument: true,
  includePickles: true,
  newId: uuid(),
}

export function gherkinOptions(options: IGherkinOptions) {
  return { ...defaultOptions, ...options }
}

export type NewId = () => string
