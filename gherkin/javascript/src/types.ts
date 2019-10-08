export interface IGherkinOptions {
  defaultDialect?: string
  includeSource?: boolean
  includeGherkinDocument?: boolean
  includePickles?: boolean
}

const defaultOptions: IGherkinOptions = {
  defaultDialect: 'en',
  includeSource: true,
  includeGherkinDocument: true,
  includePickles: true,
}

export function gherkinOptions(options: IGherkinOptions) {
  return { ...defaultOptions, ...options }
}
