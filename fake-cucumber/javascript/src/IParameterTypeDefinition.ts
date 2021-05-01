export default interface IParameterTypeDefinition {
  name: string
  regexp: RegExp | readonly RegExp[] | string | readonly string[]
  type?: any
  transformer?: (...args: readonly string[]) => any
  preferForRegexpMatch?: boolean
  useForSnippets?: boolean
}
