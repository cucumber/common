export default interface RegexExecArray extends ReadonlyArray<string> {
  index: ReadonlyArray<number>
  input: string
}
