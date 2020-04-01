export default interface IParameterTypeDefinition {
  name: string
  regexp: RegExp | ReadonlyArray<RegExp> | string | ReadonlyArray<string>
  type?: any
  transformer?: (...args: ReadonlyArray<string>) => any
  preferForRegexpMatch?: boolean
  useForSnippets?: boolean
}
