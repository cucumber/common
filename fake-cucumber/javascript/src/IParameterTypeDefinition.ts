export default interface IParameterTypeDefinition {
  name: string
  regexp: RegExp | RegExp[] | string | string[]
  type?: any
  transformer?: (...args: string[]) => any
  preferForRegexpMatch?: boolean
  useForSnippets?: boolean
}
