export default interface Dialect {
  readonly name: string
  readonly native: string
  readonly feature: ReadonlyArray<string>
  readonly background: ReadonlyArray<string>
  readonly rule: ReadonlyArray<string>
  readonly scenario: ReadonlyArray<string>
  readonly scenarioOutline: ReadonlyArray<string>
  readonly examples: ReadonlyArray<string>
  readonly given: ReadonlyArray<string>
  readonly when: ReadonlyArray<string>
  readonly then: ReadonlyArray<string>
  readonly and: ReadonlyArray<string>
  readonly but: ReadonlyArray<string>
}
